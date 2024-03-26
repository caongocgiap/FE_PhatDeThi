import { requestGet } from "../../../../apis/QuanLyBoMonAPI";
import { URL_API_CHUYENNGANH } from "../../../../apis/QuanLyBoMonAPI";

const paramsSerializer = (params) => {
    return Object.entries(params)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(v => `${key}=${encodeURIComponent(v)}`).join('&');
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join('&');
};

const listChuyenNganhService = async (idBoMon, searchName = null, page) => {
    const response = await requestGet(URL_API_CHUYENNGANH.list + '/' + idBoMon, {
        params: {
            page: page,
            searchName
        },
        paramsSerializer
    });
    return response;
};

export default listChuyenNganhService;