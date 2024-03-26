import { requestDelete } from "../../../../apis/QuanLyBoMonAPI";
import { URL_API_CHUYENNGANH } from "../../../../apis/QuanLyBoMonAPI";


const deleteChuyenNganhService = async (id) => {
    const response = await requestDelete(URL_API_CHUYENNGANH.delete + '/' + id);
    return response;
};

export default deleteChuyenNganhService;