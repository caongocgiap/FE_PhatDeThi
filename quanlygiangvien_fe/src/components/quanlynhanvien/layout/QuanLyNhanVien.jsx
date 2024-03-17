import "../style/QuanLyNhanVienStyle.css"
import {Button, Input, Table, Tooltip} from "antd";
import {useEffect, useRef, useState} from "react";
import {Container} from "react-bootstrap";
import {
    DeleteOutlined,
    EditOutlined, ExclamationCircleFilled,
    EyeOutlined, FileExcelOutlined,
    PlusOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useNhanVien} from "../hooks/useNhanVien";
import DetailNhanVien from "./DetailNhanVien";
import confirm from "antd/es/modal/confirm";
import {toast} from "react-toastify";
import {deleteNhanVien_API, importExcelNhanVien_API} from "../../../apis/QuanLyNhanVienAPI";
import {useImportExcel} from "../hooks/useImportExcel";

const QuanLyNhanVien = () => {

    //Custom Hook
    const {handleImportExcel} = useImportExcel();

    //useNav
    const nav = useNavigate();

    //state Search Value
    const [searchValue,setSearchValue] = useState("");

    //state Open Modal
    const [openModalDetail,setOpenModalDetail] = useState(false);

    //state NhanVienId for Open Modal Detail or Update
    const [nhanVienId,setNhanVienId] = useState(0);

    //state list NhanVien
    const {pageSize,totalPage,listNhanVien,tableLoading,getAllNhanVienChucVu} = useNhanVien();

    const timeOutId = useRef(null);

    const [firstRerender,setFirstRerender] = useState(false);

    //Người dùng gõ xong
    useEffect(() => {
        if(firstRerender){
            timeOutId.current = setTimeout(()=>{
                getAllNhanVienChucVu(1,searchValue);
            },[500]);
        }else{
            setFirstRerender(true);
        }
    }, [searchValue]);

    //handle OnChange SearchValue
    const handleChangeSearchValue = (e) => {
        clearTimeout(timeOutId.current);
        setSearchValue(e.target.value);
    }

    //Column Table
    const columnTable = [
        {
            title:"STT",key:"stt",
            render:(text, record, index, column, indent) => {
                return(
                    index + 1
                )
            },
            width:"5%"
        },
        {title:"Mã Nhân Viên",dataIndex:"maNhanVien",key:"maNhanVien",width:"10%"},
        {title:"Họ Và Tên",dataIndex:"tenNhanVien",key:"tenNhanVien",width:"10%"},
        {
            title:"Chức Vụ",dataIndex:"tenChucVu",key:"tenChucVu",width:"10%",
            render:(text, record, index, column, indent) => {
                if(record.tenChucVu !== null ){
                    if(record.tenChucVu.includes(",")){
                        let myNameConvert = record.tenChucVu.split(",").map((item)=>{
                            if(item === "TRUONG_MON"){
                                item = "Trưởng môn"
                            }else if (item === "GIANG_VIEN"){
                                item = "Giảng viên"
                            }
                            else if (item === "CHU_NHIEM_BO_MON"){
                                item = "Chủ nhiệm bộ môn"
                            }
                            else if (item === "ADMIN"){
                                item = "Admin"
                            }
                            return item;
                        })
                        return(
                            <>
                                {myNameConvert.map((item,index)=>{
                                    if(index>0){
                                        return(
                                            ` , ${item}`
                                        )
                                    }else{
                                        return(
                                            item
                                        )
                                    }
                                })}
                            </>
                        )
                    }else{
                        return(
                            <>
                                {record.tenChucVu === "TRUONG_MON" ? "Trưởng môn" :
                                    record.tenChucVu === "GIANG_VIEN" ? "Giảng viên" :
                                        record.tenChucVu === "CHU_NHIEM_BO_MON" ? "Chủ nhiệm bộ môn" :
                                            record.tenChucVu === "ADMIN" ? "Admin" : ""}
                            </>
                        )
                    }
                }else{
                    return (<></>)
                }
            }
        },
        {title:"Học Kỳ OnBroad",dataIndex:"hocKy",key:"hocKy",width:"10%"},
        {title:"Email FE",dataIndex:"taiKhoanFE",key:"taiKhoanFE",width:"10%"},
        {title:"Bộ Môn",dataIndex:"boMon",key:"boMon",width:"15%"},
        {
            title:"Thao Tác",
            key:"actions",
            render:(record)=>{
                return(
                    <>
                        <Tooltip title="Cập nhật" color="#030405">
                            <Button onClick={()=>{nav(`/bandaotao/quan-ly-nhan-vien/sua-nhan-vien/${record.id}`)}} style={{backgroundColor:"#030405",color:"#fff"}}>
                                <EditOutlined style={{fontSize:"18px"}}/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết">
                            <Button onClick={()=>{setOpenModalDetail(true) ;setNhanVienId(record.id)}} style={{margin:"0 10px"}}>
                                <EyeOutlined style={{fontSize:"18px"}}/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Xóa nhân viên" color="red">
                            <Button style={{backgroundColor:"red",color:"#fff"}}>
                                <DeleteOutlined onClick={()=>{
                                    confirm({
                                        title: 'Xác nhận',
                                        icon: <ExclamationCircleFilled style={{color:"#faad14"}}/>,
                                        content: 'Bạn có chắc muốn xóa nhân viên này?',
                                        onOk: async () => {
                                            try{
                                                const response = await deleteNhanVien_API(record.id);
                                                getAllNhanVienChucVu(1);
                                                toast.success(response.data.message);
                                            }catch (e) {
                                                toast.error("Không tìm thấy nhân viên này!");
                                            }
                                        },
                                        okCancel:true
                                    });
                                }} style={{fontSize:"18px"}}/>
                            </Button>
                        </Tooltip>
                    </>
                )
            },
            width:"30%"
        }
    ]

    return(
        <>
            <DetailNhanVien open={openModalDetail} setOpen={setOpenModalDetail} nhanVienId={nhanVienId}/>
            <Container className="shadow mb-5 p-5 rounded-4">
                <h4 style={{marginBottom:"15px"}}>Tìm Kiếm Nhân Viên</h4>
                <Input
                    type="text"
                    style={{height:"40px"}}
                    placeholder="Tìm kiếm nhân viên theo Mã nhân viên, Tên nhân viên, Email..."
                    value={searchValue}
                    onChange={handleChangeSearchValue}
                />
            </Container>
            <Container className="shadow mb-5 p-5 rounded-4">
                <div className="mb-5 d-flex justify-content-between">
                    <div className="d-flex justify-content-between align-items-center">
                        <UnorderedListOutlined className="rounded-2" style={{fontSize:"20px",padding:"5px 10px", backgroundColor:"#030405",color:"#fff"}}/>
                        <h4 style={{margin:"0 0 0 10px"}}>Danh Sách Nhân Viên</h4>
                    </div>
                    <div className="d-flex justify-content-between">
                        <input type="file" className="import-excel" hidden/>
                        <Button onClick={()=>{
                            const file = document.querySelector(".import-excel");
                            file.click();
                            handleImportExcel(file).then(res=>{
                                if(res === 201){
                                    getAllNhanVienChucVu(1,"");
                                }
                            }).catch(e=>{
                                console.log(e);
                            })
                        }} style={{marginRight:"10px",backgroundColor:"#00FF00"}} type="primary">
                            <FileExcelOutlined style={{fontSize:"15px"}}/>
                            Import Excel
                        </Button>
                        <Button  onClick={()=>{nav(`/bandaotao/quan-ly-nhan-vien/them-nhan-vien`)}} type="primary" style={{display:"flex",alignItems:"center"}}
                        icon={<PlusOutlined style={{fontSize:"15px"}}/>}>
                            Thêm Nhân Viên
                        </Button>
                    </div>
                </div>
                <Table columns={columnTable}
                       loading={tableLoading}
                       dataSource={listNhanVien}
                       pagination={{
                           pageSize:pageSize,
                           total:totalPage,
                           onChange:(page, pageSize)=>{
                               getAllNhanVienChucVu(page,searchValue);
                           }
                       }}>
                </Table>
            </Container>
        </>
    )
}
export default QuanLyNhanVien