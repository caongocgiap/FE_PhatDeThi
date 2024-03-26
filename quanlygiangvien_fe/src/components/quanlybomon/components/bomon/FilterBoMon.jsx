import { Card, Typography, Select } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { useQuanLyBoMon } from "../../QuanLyBoMon";
import { setKeyword } from "../../reducer/action";

const FilterBoMon = () => {

    const { stateBoMon, dispatchBoMon } = useQuanLyBoMon();


    return (
        <Card
            style={{
                boxShadow: 'rgba(0, 0, 0, 0.1) 1px 0px 8px 0px'
            }}
        >
            <Typography.Title level={4}><FileSearchOutlined style={{marginRight: '0.5rem'}}/>Tìm kiếm</Typography.Title>

            <Select
                mode="tags"
                size="middle"
                placeholder="Tìm kiếm bộ môn theo tên"
                value={stateBoMon.keyword}
                style={{ width: '100%' }}
                onChange={(names) => {
                    dispatchBoMon(setKeyword(names));
                }}
                options={[]}
                disabled={stateBoMon.isLoading}
            />

        </Card>
    );
};

export default FilterBoMon;