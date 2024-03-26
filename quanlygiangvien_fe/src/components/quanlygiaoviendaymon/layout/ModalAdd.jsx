import { useGiaoVienDayMon } from "../hooks/useGiaoVienDayMon";
import Loading from "../../../utils/Loading";

import { Button, Form, Modal, Select } from "antd";
import Swal from "sweetalert2";

const ModalAdd = ({openModal, setOpenModal, afterClose}) => {

    const [form] = Form.useForm()

    const {loading, listNhanVien, listMonHoc, listHocKy, handlePostGiaoVienDayMon} = useGiaoVienDayMon()

    const onFinish = (values) => {
        Swal.fire({
            title: "Bạn có chắc muốn thêm nhân viên này?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#39EA35",
            confirmButtonText: "Thêm",
        }).then(result=>{
            if(result.isConfirmed){
                handlePostGiaoVienDayMon(values)
                form.resetFields()
                setOpenModal(false)
            }
        })
    }

    return (
        <>
            {loading && <Loading/>}
            <Modal
                title="Thêm mới giáo viên dạy môn"
                open={openModal}
                onCancel={() => setOpenModal(false)}
                footer={null}
                afterClose={afterClose}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Giáo viên"
                        name="idNhanVien"
                        rules={[{required: true, message: 'Vui lòng chọn giáo viên'}]}
                    >
                        <Select>
                            {listNhanVien.map((item) => (
                                <Select.Option key={item.id} value={item.id}>{item.ten}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Môn học"
                        name="idMonHoc"
                        rules={[{required: true, message: 'Vui lòng chọn môn học'}]}
                    >
                        <Select>
                            {listMonHoc.map((item) => (
                                <Select.Option key={item.id} value={item.id}>{item.ten}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Học kỳ"
                        name="idHocKy"
                        rules={[{required: true, message: 'Vui lòng chọn học kỳ'}]}
                    >
                        <Select>
                            {listHocKy.map((item) => (
                                <Select.Option key={item.id} value={item.id}>{item.ten}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="mt-3">
                            Thêm mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )

}

export default ModalAdd;