import { requestPut } from "../../../../apis/QuanLyBoMonAPI";
import { URL_API_CHUYENNGANH } from "../../../../apis/QuanLyBoMonAPI";


const updateChuyenNganhService = async (id, name) => {
    const response = await requestPut(URL_API_CHUYENNGANH.update + '/' + id, {
        ten: name
    });
    return response;
};

export default updateChuyenNganhService;