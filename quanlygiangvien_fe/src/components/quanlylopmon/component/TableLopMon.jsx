import {Button, Flex, Table, Tag, Tooltip, Typography} from "antd";
import {
    CheckCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    EyeOutlined,
    PlusCircleFilled,
    UnorderedListOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LopMonContext} from "../store/context/Context";
import {useLopMon} from "../hooks/useLopMon";
import Loading from "../../../utils/Loading";
import ModalDetailLopMon from "./ModalDetailLopMon";

const TableLopMon = () => {

    //useContext
    const [state,dispatch] = useContext(LopMonContext);

    //nav
    const nav = useNavigate();

    //custom Hooks
    const { handleGetSearchLopMon , handleDeleteLopMon , loading , pageSize  , handleGetLopMonDetail } = useLopMon();

    //state open Modal
    const [openDetailModal,setOpenDetailModal] = useState(false);

    //state
    const [currentPage,setCurrentPage] = useState(1);


    useEffect(()=>{
        handleGetSearchLopMon("",1);
    },[]);


    const handleOpenDetailModal = (lopMonId) => {
        setOpenDetailModal(true);
        handleGetLopMonDetail(lopMonId);
    }

    const columns = [
        {
            title : "STT",
            render:(text,record,index) => {
                if (currentPage === 1){
                    return index + 1;
                }else{
                    return (currentPage - 1) * pageSize + (index + 1);
                }
            },
            width : "5%"
        },
        {title : "Môn Học",dataIndex : "tenMonHoc",key : "tenMonHoc",width : "15%"},
        {title : "Mã Lớp",dataIndex : "maLop",key : "maLop",width : "10%"},
        {title : "Phòng Học",dataIndex : "phongHoc",key : "phongHoc",width : "5%"},
        {title : "Ca",dataIndex : "caHoc",key : "caHoc",width : "5%"},
        {title : "Ngày Bắt Đầu",dataIndex : "ngayBatDau",key : "ngayBatDau",width : "10%"},
        {title : "Giảng Viên Dạy",dataIndex : "tenGiaoVien",key : "tenGiaoVien",width : "15%"},
        {title : "Block",dataIndex : "tenBlock",key : "tenBlock",width : "5%"},
        {
            title : "Trạng Thái",dataIndex : "trangThai",key : "trangThai",
            render:(text, record, index) => {
                return (
                    <>
                        <Tag color={text === "CHUA_XOA" ? "green" : "red"}
                             icon={text === "CHUA_XOA" ? <CheckCircleOutlined/> : <ExclamationCircleOutlined/>}>
                            {text === "CHUA_XOA" ? "Đang hoạt động" : "Ngưng hoạt động!"}
                        </Tag>
                    </>
                )
            },
            width : "10%"
        },
        {
            title : "Hành Động",
            render:(text,record,index) => {
                return(
                    <>
                        <Tooltip title="Cập nhật" color="#030405">
                            <Button onClick={ () => {nav(`/bandaotao/quan-ly-lop-mon/sua-lop-mon/${record.lopMonId}`)} } style={{backgroundColor:"#030405",color:"#fff"}}>
                                <EditOutlined style={{fontSize:"18px"}}/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Chi tiết">
                            <Button onClick={ () => {handleOpenDetailModal(record.lopMonId)} } style={{margin:"0 10px"}}>
                                <EyeOutlined style={{fontSize:"18px"}}/>
                            </Button>
                        </Tooltip>
                        <Tooltip title={record.trangThai === "CHUA_XOA" ? "Xóa nhân viên" : "Hoạt động lại"} color="red">
                            <Button onClick={ () => {handleDeleteLopMon(record.lopMonId,record.trangThai)} } style={{backgroundColor:"red",color:"#fff"}}>
                                <DeleteOutlined style={{fontSize:"18px"}}/>
                            </Button>
                        </Tooltip>
                    </>
                )
            },
            width : "20%"
        },
    ]

    return(
        <>
            {loading && <Loading/>}
            <ModalDetailLopMon openModal={openDetailModal} setOpenModal={setOpenDetailModal} />
            <Flex justify="space-between" align="center" className="mb-2">
                <Typography.Title level={4}>
                    <UnorderedListOutlined style={{marginRight: '0.5rem'}}/>Danh Sách Lớp Môn
                </Typography.Title>
                <Button
                    type="primary"
                    icon={<PlusCircleFilled />}
                    size="middle"
                    color="#222"
                    onClick={() => nav("/bandaotao/quan-ly-lop-mon/them-lop-mon")}
                >
                    Thêm Lớp Môn
                </Button>
            </Flex>
            <Table loading={state.loadingTable}
                   columns={columns}
                   dataSource={state.listLopMon}
                   scroll={{x: 1200}}
                   pagination={{
                       pageSize : pageSize,
                       total : state.totalElements,
                       onChange:(page,pageSize) => {
                           handleGetSearchLopMon(state.searchValue , page);
                           setCurrentPage(page);
                       }
                   }}
            />
        </>
    )
}

export default TableLopMon