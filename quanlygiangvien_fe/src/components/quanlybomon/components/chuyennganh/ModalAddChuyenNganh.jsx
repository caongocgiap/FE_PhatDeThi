import { Modal, Form, Input, Button, Popconfirm, message } from "antd";

import { useQuanLyBoMon } from "../../QuanLyBoMon";
import { reloadData, showModalAdd } from "../../reducer/action";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import addChuyenNganhService from "../../services/chuyennganh/AddChuyenNganhService";


const ModalAddChuyenNganh = () => {
    const { stateBoMon, stateChuyenNganh, dispatchChuyenNganh } = useQuanLyBoMon();

    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (stateChuyenNganh.isShowAdd) {
            setIsLoading(false);
            form.resetFields();
        }
    }, [stateChuyenNganh.isShowAdd, form]);

    const handleSubmit = (data) => {
        setIsLoading(true);
        addChuyenNganhService(stateBoMon.target.id, data.name)
            .then(response => {
                if (response.httpStatus !== "OK") {
                    return toast.error(response.message);
                }

                message.info(response.message);
                dispatchChuyenNganh(showModalAdd(false));
                dispatchChuyenNganh(reloadData());
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể thêm mới chuyên ngành");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Modal
            open={stateChuyenNganh.isShowAdd}
            title="Thêm mới chuyên ngành"
            onCancel={() => {
                dispatchChuyenNganh(showModalAdd(false));
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
                        {required: true, message: "Tên chuyên ngành không được bỏ trống"}
                    ]}
                >
                    <Input
                        allowClear
                        placeholder="Tên chuyên ngành"
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
                        <Button type="primary" loading={isLoading}>Thêm mới chuyên ngành</Button>                       
                    </Popconfirm>
                    
                </div>
                
            </Form>
        </Modal>
    );
};

export default ModalAddChuyenNganh;