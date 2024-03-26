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
    setTarget
} from "../../reducer/action";

import getChuyenNganhService from "../../services/chuyennganh/GetChuyenNganhService";
import deleteChuyenNganhService from "../../services/chuyennganh/DeleteChuyenNganhService";
import { XOA_MEM } from "../../../../apis/QuanLyBoMonAPI";


const ListChuyenNganh = () => {

    const { stateChuyenNganh, dispatchChuyenNganh } = useQuanLyBoMon();

    const handleEdit = (id) => {
        dispatchChuyenNganh(setTarget(null));
        dispatchChuyenNganh(setLoading(true));
        getChuyenNganhService(id)
            .then(async(response) => {
                await dispatchChuyenNganh(setTarget(response));
                console.log(response);
                console.log(stateChuyenNganh.target)
                dispatchChuyenNganh(showModalEdit(true));
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể GET thông tin chuyên ngành");
            })
            .finally(() => {
                dispatchChuyenNganh(setLoading(false));
            });
    };

    const handleDelete = (id) => {
        dispatchChuyenNganh(setLoading(true));
        deleteChuyenNganhService(id)
            .then(response => {
                if (response.httpStatus !== "OK") {
                    return toast.error(response.message);
                }

                message.info(response.message);
                dispatchChuyenNganh(reloadData());
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể xoá chuyên ngành");
            })
            .finally(() => {
                dispatchChuyenNganh(setLoading(false));
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
            title: 'Tên chuyên ngành',
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

                    <Tooltip title={o.trangThai === XOA_MEM.chua_xoa ? "Xoá Mềm" : "Xoá vĩnh viễn"} color="red">
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
                <Typography.Title level={4}><UnorderedListOutlined style={{marginRight: '0.5rem'}}/>Danh sách chuyên ngành</Typography.Title>
                <Tooltip title="Thêm chuyên ngành" color="blue">
                    <Button 
                            type="primary" 
                            icon={<PlusCircleFilled />} 
                            size="middle" 
                            color="#222"
                            onClick={e => {
                                dispatchChuyenNganh(showModalAdd(true));
                            }} />                     
                </Tooltip>
                
            </Flex>

            <Table 
                columns={columns} 
                dataSource={stateChuyenNganh.data || []} 
                pagination={false}
                rowKey={o => o.stt}
                style={{marginTop: '30px'}} 
                loading={stateChuyenNganh.isLoading}
                scroll={{x: 400}}
            />


            <Pagination
                disabled={stateChuyenNganh.isLoading}
                defaultCurrent={stateChuyenNganh.page}
                pageSize={stateChuyenNganh.pageSize}
                total={stateChuyenNganh.totalElements}
                showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} chuyên ngành`}
                style={{ marginTop: '1rem', textAlign: 'right'}}
                onChange={(page, pageSize) => {
                    dispatchChuyenNganh(setPage(page));
                    dispatchChuyenNganh(setPageSize(pageSize));
                }} />


        </Card>
    );
};

export default ListChuyenNganh;