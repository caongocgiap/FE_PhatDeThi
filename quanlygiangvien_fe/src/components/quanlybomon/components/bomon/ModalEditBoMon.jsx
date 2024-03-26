import { Modal } from "antd";
import { useQuanLyBoMon } from "../../QuanLyBoMon";
import { showModalEdit } from "../../reducer/action";

import UpdateBoMon from "./UpdateBoMon";
import FilterChuyenNganh from "../chuyennganh/FilterChuyenNganh";
import ListChuyenNganh from "../chuyennganh/ListChuyenNganh";


const ModalEditBoMon = () => {
    const { stateBoMon, dispatchBoMon } = useQuanLyBoMon();

    return (
        <Modal
            open={stateBoMon.isShowEdit}
            title="Cập nhật bộ môn"
            onCancel={() => {
                dispatchBoMon(showModalEdit(false));
            }}
            footer={null}
            width={800}
        >
            <UpdateBoMon />
            <FilterChuyenNganh />
            <ListChuyenNganh />
        </Modal>
    );
};

export default ModalEditBoMon;