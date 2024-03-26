import { requestDelete } from "../../../../apis/QuanLyBoMonAPI";
import { URL_API_BOMON } from "../../../../apis/QuanLyBoMonAPI";


const deleteBoMonService = async (id) => {
    const response = await requestDelete(URL_API_BOMON.delete + '/' + id);
    return response;
};

export default deleteBoMonService;