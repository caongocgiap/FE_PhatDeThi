import { Modal } from "antd";
import { useQuanLyBoMon } from "../../QuanLyBoMon";
import { 
    showModalEdit
} from "../../reducer/action";
import UpdateChuyenNganh from "./UpdateChuyenNganh";

const ModalEditChuyenNganh = () => {
    const { stateChuyenNganh, dispatchChuyenNganh } = useQuanLyBoMon();

    return (
        <Modal
            open={stateChuyenNganh.isShowEdit}
            title="Cập nhật chuyên ngành"
            onCancel={() => {
                dispatchChuyenNganh(showModalEdit(false));
            }}
            footer={null}
        >
            <UpdateChuyenNganh />
        </Modal>
    );
};

export default ModalEditChuyenNganh;