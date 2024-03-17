import {CloseOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {Button, Col, DatePicker, Form, Input, Row, Select, Typography} from "antd";
import {Container} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useGetList} from "../hooks/useGetList";
import {toast} from "react-toastify";
import {useLopMon} from "../hooks/useLopMon";
import {useEffect} from "react";
import {getLopMonByIdAPI} from "../../../apis/QuanLyLopMonAPI";
import dayjs from "dayjs";
import Loading from "../../../utils/Loading";


const QuanLyLopMonAddOrUpdate = () => {
    //custom hooks
    const { listBlock, listCaHoc, listMonHoc, listCampus, listGiangVien, listHocKy , handleGetListBlock } = useGetList();

    const { handlePostLopMon , handlePutLopMon , loading } = useLopMon();

    //use Form
    const [form] = Form.useForm();
    //get Id from uri
    const { id} = useParams();
    //nav
    const nav = useNavigate();
    //useContext

    const handleAddLopMonFailed = () => {
        toast.warning("Bạn chưa điền đủ thông tin!");
    }

    const handleCreateLopMon = () => {
        if(id === undefined){
            const lopMonRequest = form.getFieldsValue();
            lopMonRequest.ngayHoatDong.format("YYYY-MM-DD");
            handlePostLopMon(lopMonRequest);
        }else{
            const lopMonRequest = form.getFieldsValue();
            lopMonRequest.lopMonId = id;
            lopMonRequest.ngayHoatDong.format("YYYY-MM-DD");
            handlePutLopMon(lopMonRequest);
        }
    }

    useEffect(  () => {
        if(id !== undefined){
            handleGetLopMonById(id);
        }
    }, []);

    const handleGetLopMonById = async (lopMonId) => {
        try {
            const response = await getLopMonByIdAPI(lopMonId);
            handleFillFields(response.data);
        }catch (e) {
            toast.error("Lớp môn này không tồn tại!");
        }
    }

    const handleFillFields = (data) => {
        handleGetListBlock(data.hocKyId);
        form.setFieldsValue({
            caHoc : data.caHoc,
            campusId : data.campusId,
            hocKyId : data.hocKyId,
            blockId : data.blockId,
            maLop : data.maLop,
            monHocId : data.monHocId,
            ngayHoatDong : dayjs(data.ngayBatDau,"YYYY-MM-DD"),
            nhanVienId : data.nhanVienId,
            phongHoc : data.phongHoc,
        })
    }

    return(
        <>
            {loading && <Loading/>}
            <Container>
                <div>
                    <CloseOutlined style={{fontSize:"20px",cursor:"pointer"}} onClick={()=>{nav("/bandaotao/quan-ly-lop-mon")}}/>
                </div>
                <Typography.Title level={2} className="my-3">
                    {id === undefined ? "Thêm Lớp Môn" : "Cập Nhật Lớp Môn"}
                </Typography.Title>
                <div className="shadow mb-5 p-5 rounded-4">
                    <Form
                        form={form}
                        name="basic"
                        onFinish={handleCreateLopMon}
                        onFinishFailed={handleAddLopMonFailed}
                        autoComplete="off"
                    >
                        <Row className="mb-4" >
                            <Col span={10} className="me-5">
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name="maLop"
                                    label="Mã Lớp"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập mã lớp",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập mã lớp" />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    labelCol = {{span:24}}
                                    wrapperCol = {{span:24}}
                                    name = "phongHoc"
                                    label = "Phòng Học"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập phòng học",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập phòng học" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/**/}
                        <Row className="mb-4">
                            <Col span={10} className={"me-5"}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name={"ngayHoatDong"}
                                    label={"Ngày Hoạt Động"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn ngày lớp hoạt động",
                                        },
                                    ]}
                                >
                                    <DatePicker format="YYYY-MM-DD" placeholder="Chọn ngày lớp hoạt động" style={{width:"100%"}}/>
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name="caHoc"
                                    label={"Ca Học"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui chọn ca học",
                                        },
                                    ]}
                                >
                                    <Select allowClear
                                            placeholder="Chọn ca học"
                                            options={listCaHoc.map(item=>{
                                                return {label:item,value:item}
                                            })}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/**/}
                        <Row className="mb-4">
                            <Col span={10} className={"me-5"}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name={"monHocId"}
                                    label="Môn Học"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn môn học",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        placeholder="Chọn môn học"
                                        style={{
                                            width: '100%',
                                        }}
                                        options={listMonHoc.map(item=>{
                                            return {label:item.tenMonHoc,value:item.monHocId}
                                        })}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name="nhanVienId"
                                    label="Giáo viên"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn giáo viên dạy",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Chọn giáo viên dạy"
                                        options={listGiangVien.map(item=>{
                                            return {label:item.tenNhanVien,value:item.nhanVienId}
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
                                    name={"hocKyId"}
                                    label={"Học Kỳ"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn học kỳ",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Chọn học kỳ"
                                        onChange={ (value) => {
                                            handleGetListBlock(value)
                                        }}
                                        options={listHocKy.map(item => {
                                            return {label:item.tenHocKy,value:item.hocKyId}
                                        })}
                                    />
                                </Form.Item>
                            </Col>
                            {/**/}
                            <Col span={10} className={"me-5"}>
                                <Form.Item
                                    labelCol={{span:24}}
                                    wrapperCol={{span:24}}
                                    name={"blockId"}
                                    label={"Block"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn block",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Chọn block"
                                        options={listBlock.map(item => {
                                            return {label:item.tenBlock,value:item.blockId}
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
                                    name={"campusId"}
                                    label={"Cơ Sở"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn cơ cở",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Chọn cơ sở"
                                        options={listCampus.map((item,index) => {
                                            return {label:item.tenCampus,value:item.campusId}
                                        })}
                                    />
                                </Form.Item>
                            </Col>

                        </Row>
                        <div className="d-flex justify-content-end">
                            <Form.Item>
                                <Button icon={<PlusCircleOutlined/>} type="primary" htmlType="submit">
                                    {id === undefined ? "Thêm Lớn Môn" : "Cập Nhật Lớp Môn"}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    )
}
export default QuanLyLopMonAddOrUpdate