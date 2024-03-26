import { requestGet } from "../../../../apis/QuanLyBoMonAPI";
import { URL_API_CHUYENNGANH } from "../../../../apis/QuanLyBoMonAPI";


const getChuyenNganhService = async (id) => {
    const response = await requestGet(URL_API_CHUYENNGANH.get + '/' + id);
    return response;
};

export default getChuyenNganhService;