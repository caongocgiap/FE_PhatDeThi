import { Modal, Form, Input, Button, Popconfirm, message } from "antd";

import { useQuanLyBoMon } from "../../QuanLyBoMon";
import { reloadData, showModalAdd } from "../../reducer/action";
import addBoMonService from "../../services/bomon/AddBoMonService";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModalAddBoMon = () => {
    const { stateBoMon, dispatchBoMon } = useQuanLyBoMon();

    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (stateBoMon.isShowAdd) {
            setIsLoading(false);
            form.resetFields();
        }
    }, [stateBoMon.isShowAdd, form]);

    const handleSubmit = (data) => {
        setIsLoading(true);
        addBoMonService(data.name)
            .then(response => {
                if (response.httpStatus !== "OK") {
                    return toast.error(response.message);
                }

                message.info(response.message);
                dispatchBoMon(showModalAdd(false));
                dispatchBoMon(reloadData());
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể thêm mới bộ môn");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Modal
            open={stateBoMon.isShowAdd}
            title="Thêm mới bộ môn"
            onCancel={() => {
                dispatchBoMon(showModalAdd(false));
            }}
            footer={null}
        >
            <Form
                form={form}
                layout="horizontal"
                initialValues={{}}
                onFinish={values => handleSubmit(values)}
            >
                <Form.Item 
                    name="name"
                    rules={[
                        {required: true, message: "Tên bộ môn không được bỏ trống"}
                    ]}
                >
                    <Input
                        allowClear
                        placeholder="Tên bộ môn"
                    />
                </Form.Item>

                <div style={{ textAlign: 'right' }}>
                    <Popconfirm
                        title="Thông báo"
                        description="Bạn có muốn thêm không?"
                        onConfirm={event => form.submit()}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary" loading={isLoading}>Thêm mới bộ môn</Button>                       
                    </Popconfirm>
                    
                </div>
                
            </Form>
        </Modal>
    );
};

export default ModalAddBoMon;