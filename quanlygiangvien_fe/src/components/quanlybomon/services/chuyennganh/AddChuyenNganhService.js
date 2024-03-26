import { requestPost } from "../../../../apis/QuanLyBoMonAPI";
import { URL_API_CHUYENNGANH } from "../../../../apis/QuanLyBoMonAPI";


const addChuyenNganhService = async (idBoMon, name) => {
    const response = await requestPost(URL_API_CHUYENNGANH.add, {
        idBoMon: idBoMon,
        ten: name
    });
    return response;
};

export default addChuyenNganhService;