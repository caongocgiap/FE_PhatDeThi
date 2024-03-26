import { requestPost } from "../../../../apis/QuanLyBoMonAPI";
import { URL_API_BOMON } from "../../../../apis/QuanLyBoMonAPI";


const addBoMonService = async (name) => {
    const response = await requestPost(URL_API_BOMON.add, {
        ten: name
    });
    return response;
};

export default addBoMonService;