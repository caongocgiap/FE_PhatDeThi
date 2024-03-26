import instance from '../utils/axiosCustomize'

export const getBlockByIdHocKyApi = (idHocKy) => {
    return instance.get(`http://localhost:8080/block/get-block-by-id-hoc-ky/${idHocKy}`);
}

export const postBlockApi = (data) => {
    return instance.post("block/save", data);
}