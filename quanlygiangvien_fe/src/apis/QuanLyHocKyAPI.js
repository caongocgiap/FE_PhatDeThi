import instance from '../utils/axiosCustomize'

export const getHocKyApi = (page) => {
    return instance.get(`hoc-ky/get-list/page=${page}`);
}

export const getHocKyByIdApi = (idHocKy) => {
    return instance.get(`hoc-ky/get/${idHocKy}`);
}

export const postHocKyApi = (data) => {
    return instance.post("hoc-ky/save", data);
}