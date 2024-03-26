import { requestGet } from "../../../../apis/QuanLyBoMonAPI";
import { URL_API_BOMON } from "../../../../apis/QuanLyBoMonAPI";


const getBoMonService = async (id) => {
    const response = await requestGet(URL_API_BOMON.get + '/' + id);
    return response;
};

export default getBoMonService;