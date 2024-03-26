import { Card, Form, Flex, Input, Button, Popconfirm, Tooltip, message } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useQuanLyBoMon } from "../../QuanLyBoMon";
import { useEffect, useState } from "react";
import { setLoading, showModalEdit, reloadData } from "../../reducer/action";
import updateBoMonService from "../../services/bomon/UpdateBoMonService";
import { toast } from "react-toastify";

const UpdateBoMon = () => {

    const { stateBoMon, dispatchBoMon } = useQuanLyBoMon();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (stateBoMon.isShowEdit) {
            setIsLoading(false);
            form.resetFields();
        }
    }, [stateBoMon.isShowEdit, form]);



    const handleSubmit = (data) => {
        dispatchBoMon(setLoading(true));
        dispatchBoMon(showModalEdit(false));

        updateBoMonService(stateBoMon.target.id, data.ten)
            .then(response => {
                if (response.httpStatus !== "OK") {
                    return toast.error(response.message);
                }

                message.info(response.message);
                dispatchBoMon(reloadData());
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể cập nhật bộ môn");
            })
            .finally(() => {
                dispatchBoMon(setLoading(false));
            });
    };

    return (
        <Card
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.1) 1px 0px 8px 0px'
            }}
        >

            <Form
                form={form}
                layout="horizontal"
                initialValues={stateBoMon.target}
                onFinish={values => handleSubmit(values)}
            >
                <Flex justify="space-between" align="center">
                    <Form.Item 
                        name="ten"
                        style={{
                            marginBottom: 0,
                            marginRight: '1rem',
                            width: '100%'
                        }}
                        rules={[
                            {required: true, message: "Tên bộ môn không được bỏ trống"}
                        ]}
                    >
                        <Input
                            allowClear
                            placeholder="Tên bộ môn"
                        />
                    </Form.Item>

                    <Tooltip title="Cập nhật tên bộ môn" color="blue">
                        <Popconfirm
                            title="Thông báo"
                            description="Bạn có muốn lưu lại không?"
                            onConfirm={event => form.submit()}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button type="primary" loading={isLoading} icon={<FormOutlined />}></Button>                       
                        </Popconfirm>
                    </Tooltip>
                </Flex>

            </Form>

        </Card>
    );
};

export default UpdateBoMon;