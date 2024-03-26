import { Form, Input, Button, Popconfirm, message } from "antd";
import { useQuanLyBoMon } from "../../QuanLyBoMon";
import { useEffect, useState } from "react";
import { setLoading, showModalEdit, reloadData } from "../../reducer/action";
import updateChuyenNganhService from "../../services/chuyennganh/UpdateChuyenNganhService";
import { toast } from "react-toastify";

const UpdateChuyenNganh = () => {

    const { stateChuyenNganh, dispatchChuyenNganh } = useQuanLyBoMon();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (stateChuyenNganh.isShowEdit) {
            setIsLoading(false);
            form.resetFields();
        }
    }, [stateChuyenNganh.isShowEdit, form]);



    const handleSubmit = (data) => {
        dispatchChuyenNganh(setLoading(true));
        dispatchChuyenNganh(showModalEdit(false));

        updateChuyenNganhService(stateChuyenNganh.target.id, data.ten)
            .then(response => {
                if (response.httpStatus !== "OK") {
                    return toast.error(response.message);
                }

                message.info(response.message);
                dispatchChuyenNganh(reloadData());
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể cập nhật chuyên ngành");
            })
            .finally(() => {
                dispatchChuyenNganh(setLoading(false));
            });
    };

    return (
        <Form
            form={form}
            layout="horizontal"
            initialValues={stateChuyenNganh.target}
            onFinish={values => handleSubmit(values)}
        >
            <Form.Item 
                name="ten"
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
                    description="Bạn có muốn lưu lại không?"
                    onConfirm={event => form.submit()}
                    okText="Có"
                    cancelText="Không"
                >
                    <Button type="primary" loading={isLoading}>Cập nhật chuyên ngành</Button>                       
                </Popconfirm>
            </div>

        </Form>
    );
};

export default UpdateChuyenNganh;