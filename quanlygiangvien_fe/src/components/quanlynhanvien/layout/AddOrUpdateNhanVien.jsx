import {CloseOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Col, Form, Input, Row, Select} from "antd";
import {Container} from "react-bootstrap";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useHocKy} from "../hooks/useHocKy";
import {useChucVu} from "../hooks/useChucVu";
import {useBoMon} from "../hooks/useBoMon";
import {useLoaiHopDong} from "../hooks/useLoaiHopDong";
import Swal from "sweetalert2";
import {useLoading} from "../hooks/useLoading";
import Loading from "../../../utils/Loading";
import {useNhanVien} from "../hooks/useNhanVien";
import {useTrangThaiNhanVien} from "../hooks/useTrangThaiNhanVien";


const AddOrUpdateNhanVien = () => {

    //useNav
    const nav = useNavigate();

    //useForm
    const [form] = Form.useForm();

    //custom hooks

    const {listHocKy} = useHocKy();

    const {listChucVu} = useChucVu({co_so_id:1});

    const {listBoMon} = useBoMon({co_so_id:1});

    const {listLoaiHopDong} = useLoaiHopDong();

    const {listTrangThaiNhanVien} = useTrangThaiNhanVien();

    const {loading,handlePostOrPutNhanVien,getAllNhanVienChucVuById} = useNhanVien();

    const { id} = useParams();

    //UseEffect to determine whether to fillAllFields -> For Adding or Updating
    useEffect(() => {
        if(id !== undefined){
            fillAllFields();
        }
    }, []);

    const fillAllFields = async () =>{

        const detailNhanVien = await getAllNhanVienChucVuById(id);

        let chucVuId = [];

        if(detailNhanVien.chucVu_Id !== null){
            chucVuId = detailNhanVien.chucVuId.split(",").map(item=>{
                return Number(item);
            });
        }

        form.setFieldsValue({
            ten : detailNhanVien.tenNhanVien,
            taiKhoanFE : detailNhanVien.taiKhoanFE,
            maNhanVien : detailNhanVien.maNhanVien,
            chucVu : chucVuId,
            hocKy_id : detailNhanVien.hocKyId,
            loaiHopDong : detailNhanVien.loaiHopDong,
            boMonTheoCoSo_id : detailNhanVien.boMonId,
            trangThaiNhanVien : detailNhanVien.trangThaiNhanVien
        });

    }


    const onFinish = async () => {
        Swal.fire({
            title:id === undefined ? "Bạn có chắc muốn thêm nhân viên này?" : "Bạn có chắc muốn sửa nhân viên này?",
            icon:"warning",
            showCancelButton:true,
        }).then(result=>{
            if(result.isConfirmed){
                handlePostOrPutNhanVien(form,id);
            }
        })
    }

    const onFinishFailed = (e) => {
        toast.warning("Bạn chưa điền đủ thông tin!")
    }

    return(
        <>
            {loading && <Loading/>}
            <Container>
                <div>
                    <CloseOutlined style={{fontSize:"20px",cursor:"pointer"}} onClick={()=>{nav("/bandaotao/quan-ly-nhan-vien")}}/>
                </div>
                <h4 style={{fontSize:"30px",fontWeight:"700",margin:"20px 0"}}>{id === undefined ? "Thêm Nhân Viên" : "Cập Nhật Nhân Viên"}</h4>
                <div className="shadow mb-5 p-5 rounded-4">
                    <Form
                        form={form}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row className="mb-4" >
                            <Col span={10} className="me-5">
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name="ten"
                                    label="Họ Và Tên"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập họ và tên",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Họ và tên" />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name="maNhanVien"
                                    label={"Mã Nhân Viên"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mã nhân viên",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Mã Nhân Viên" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/**/}
                        <Row className="mb-4">
                            <Col span={10} className={"me-5"}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name={"hocKy_id"}
                                    label={"Kỳ OnBroad"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn kỳ OnBroad",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Chọn kỳ OnBroad"
                                        options={listHocKy.map(item => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name="taiKhoanFE"
                                    label={"Tài Khoản FE"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập tài khoản fe",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Tài khoản fe" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/**/}
                        <Row className="mb-4">
                            <Col span={10} className={"me-5"}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name={"chucVu"}
                                    label={"Chức Vụ"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn chức vụ",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        mode="multiple"
                                        placeholder="Vui lòng chọn chức vụ"
                                        style={{
                                            width: '100%',
                                        }}
                                        options={listChucVu.map(item=>{
                                            return {label:item.name,value:item.id}
                                        })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name="boMonTheoCoSo_id"
                                    label={"Bộ Môn"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn bộ môn",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Chọn bộ môn"
                                        options={listBoMon.map(item=>{
                                            return {label:item.name,value:item.id}
                                        })}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/**/}
                        <Row>
                            <Col span={10} className={"me-5"}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name={"loaiHopDong"}
                                    label={"Loại Hợp Đồng"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn loại hợp đồng",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Chọn loại hợp đồng"
                                        options={listLoaiHopDong.map(item=>{
                                            return {label:item === "HOI_CONG_TAC" ? "Hợp đồng hợp tác" :
                                                            item === "TOAN_THOI_GIAN" ? "Hợp đồng toàn thời gian" :
                                                                item === "BAN_THOI_GIAN" ? "Hợp đồng bán thời gian" :
                                                                    item === "THUC_TAP" ? "Hợp đồng thực tập" :
                                                                        item === "DAU_CONG_TAC" ? "Hợp đồng đầu công tác" : ""
                                                ,value:item}
                                        })}
                                    />
                                </Form.Item>
                            </Col>
                            {id !== undefined ?
                                <Col span={10} className={"me-5"}>
                                    <Form.Item
                                        labelCol={{span:24}}
                                        wrapperCol={{span:24}}
                                        name={"trangThaiNhanVien"}
                                        label={"Trạng Thái Nhân Viên"}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng chọn trạng thái nhân viên",
                                            },
                                        ]}
                                    >
                                        <Select
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Chọn trạng thái nhân viên"
                                            options={listTrangThaiNhanVien.map(item=>{
                                                return(
                                                    {label:item, value:item}
                                                )
                                            })}
                                        />
                                    </Form.Item>
                                </Col> : ""}
                        </Row>
                        <div className="d-flex justify-content-end">
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    {id === undefined ? "Thêm Nhân Viên" : "Cập Nhật Nhân Viên"}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default AddOrUpdateNhanVien