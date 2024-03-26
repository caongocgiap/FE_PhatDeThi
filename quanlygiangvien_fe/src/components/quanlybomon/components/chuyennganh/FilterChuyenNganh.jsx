import { Card, Typography, Select, Flex } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { useQuanLyBoMon } from "../../QuanLyBoMon";
import { setKeyword } from "../../reducer/action";

const FilterChuyenNganh = () => {

    const { stateChuyenNganh, dispatchChuyenNganh } = useQuanLyBoMon();


    return (
        <Card
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.1) 1px 0px 8px 0px',
                marginTop: '1rem'
            }}
        >
            <Flex justify="center" align="center">
                <Typography.Title level={4}><FileSearchOutlined style={{marginRight: '0.5rem'}}/>Tìm kiếm</Typography.Title>

            </Flex>

            <Select
                mode="tags"
                size="middle"
                placeholder="Tìm kiếm chuyên ngành theo tên"
                value={stateChuyenNganh.keyword}
                style={{ width: '100%' }}
                onChange={(names) => {
                    dispatchChuyenNganh(setKeyword(names));
                }}
                options={[]}
                disabled={stateChuyenNganh.isLoading}
            />

        </Card>
    );
};

export default FilterChuyenNganh;