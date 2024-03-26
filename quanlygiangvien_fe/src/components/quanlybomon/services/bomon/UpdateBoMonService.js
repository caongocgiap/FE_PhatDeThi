import { requestPut } from "../../../../apis/QuanLyBoMonAPI";
import { URL_API_BOMON } from "../../../../apis/QuanLyBoMonAPI";


const updateBoMonService = async (id, name) => {
    const response = await requestPut(URL_API_BOMON.update + '/' + id, {
        ten: name
    });
    return response;
};

export default updateBoMonService;