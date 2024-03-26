import { Card, Typography, Button, Flex, Table, Tag, Space, Tooltip, Popconfirm, message, Pagination } from "antd";
import { 
    UnorderedListOutlined,
    PlusCircleFilled,
    DeleteFilled,
    FormOutlined
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useQuanLyBoMon } from "../../QuanLyBoMon";
import { 
    showModalAdd,
    showModalEdit,
    setPage,
    setPageSize,
    setLoading,
    reloadData,
    setTarget,
    setKeyword
} from "../../reducer/action";

import getBoMonService from "../../services/bomon/GetBoMonService";
import deleteBoMonService from "../../services/bomon/DeleteBoMonService";
import { XOA_MEM } from "../../../../apis/QuanLyBoMonAPI";

const ListBoMon = () => {

    const { stateBoMon, dispatchBoMon, dispatchChuyenNganh } = useQuanLyBoMon();

    const handleEdit = (id) => {
        dispatchBoMon(setTarget(null));
        dispatchChuyenNganh(setKeyword([]));
        dispatchBoMon(setLoading(true));
        getBoMonService(id)
            .then(response => {
                dispatchBoMon(setTarget(response));
                dispatchBoMon(showModalEdit(true));
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể GET thông tin bộ môn");
            })
            .finally(() => {
                dispatchBoMon(setLoading(false));
            });
    };

    const handleDelete = (id) => {
        dispatchBoMon(setLoading(true));
        deleteBoMonService(id)
            .then(response => {
                if (response.httpStatus !== "OK") {
                    return toast.error(response.message);
                }

                message.info(response.message);
                dispatchBoMon(reloadData());
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể xoá bộ môn");
            })
            .finally(() => {
                dispatchBoMon(setLoading(false));
            });
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: '5%',
            render: (stt) => <Typography.Text>{stt}</Typography.Text>
        },
        {
            title: 'Tên bộ môn',
            dataIndex: 'ten',
            sorter: (a, b) => a.ten.length - b.ten.length,
            render: ten => <Typography.Text>{ten}</Typography.Text>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            render: trangThai => {

                if (trangThai === XOA_MEM.chua_xoa) {
                    return <Tag color="green">Đang hoạt động</Tag>;
                }

                if (trangThai === XOA_MEM.da_xoa) {
                    return <Tag color="red">Ngưng hoạt động</Tag>;
                }

                return <Tag>Đã xoá</Tag>;
            }
        },
        {
            title: 'Hành động',
            width: '25%',
            render: (o) => (
                <Space size="middle">

                    <Tooltip title="Cập nhật" color="blue">
                        <Button 
                            onClick={() => {
                                handleEdit(o.id);
                            }}
                            type="primary" 
                            icon={<FormOutlined />}
                        ></Button>
                    </Tooltip>

                    <Tooltip title={o.trangThai === "CHUA_XOA" ? "Xoá Mềm" : "Xoá vĩnh viễn"} color="red">
                        <Popconfirm
                            title="Thông báo"
                            description="Bạn có muốn xoá không?"
                            onConfirm={event => {
                                handleDelete(o.id);
                            }}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button 
                                type="primary"
                                icon={<DeleteFilled />}
                                danger
                            ></Button>                        
                        </Popconfirm>
                    </Tooltip>

                </Space>
            ),
        },
    ];

    return (
        <Card
            style={{
                marginTop: '1.5rem',
                boxShadow: 'rgba(0, 0, 0, 0.1) 1px 0px 8px 0px'
            }}
        >
            <Flex justify="space-between" align="center">
                <Typography.Title level={4}><UnorderedListOutlined style={{marginRight: '0.5rem'}}/>Danh sách bộ môn</Typography.Title>
                <Tooltip title="Thêm bộ môn" color="blue">
                    <Button 
                        type="primary" 
                        icon={<PlusCircleFilled />} 
                        size="middle" 
                        color="#222"
                        onClick={e => {
                            dispatchBoMon(showModalAdd(true));
                        }} />                     
                </Tooltip>
               
            </Flex>

            <Table 
                columns={columns} 
                dataSource={stateBoMon.data || []} 
                pagination={false}
                rowKey={o => o.stt}
                style={{marginTop: '30px'}} 
                loading={stateBoMon.isLoading}
                scroll={{x: 400}}
            />


            <Pagination
                disabled={stateBoMon.isLoading}
                defaultCurrent={stateBoMon.page}
                pageSize={stateBoMon.pageSize}
                total={stateBoMon.totalElements}
                showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} bộ môn`}
                style={{ marginTop: '1rem', textAlign: 'right'}}
                onChange={(page, pageSize) => {
                    dispatchBoMon(setPage(page));
                    dispatchBoMon(setPageSize(pageSize));
                }} />


        </Card>
    );
};

export default ListBoMon;