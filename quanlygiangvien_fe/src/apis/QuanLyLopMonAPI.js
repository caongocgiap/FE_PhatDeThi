import instance from "../utils/axiosCustomize";

export const getLopMonByIdAPI = (lopMonId) => {
    return instance.get(`api/v1/lop-mon/lop-mon-by-id/${lopMonId}`);
}

export const getLopMonDetailAPI = (lopMonAPI) => {
    return instance.get(`api/v1/lop-mon/lop-mon-detail/${lopMonAPI}`);
}

export const getListLopMonAPI = () => {
    return instance.get(`api/v1/lop-mon/list-lop-mon`);
}

export const getSearchLopMonAPI = (input,page) => {
    return instance.get(`api/v1/lop-mon/search-lop-mon`,{
        params : {
            input : input,
            page : page
        }
    });
}

export const postLopMonAPI = (postLopMonRequest) => {
    return instance.post(`api/v1/lop-mon/post-lop-mon`,postLopMonRequest);
}

export const putLopMonAPI = (putLopMonRequest) => {
    return instance.put(`api/v1/lop-mon/put-lop-mon`,putLopMonRequest);
}

export const deleteLopMonAPI = (lopMonId) => {
    return instance.put(`api/v1/lop-mon/delete-lop-mon/${lopMonId}`);
}

export const getListMonHocAPI = () => {
    return instance.get(`api/v1/lop-mon/list-mon-hoc`);
}

export const getListBlockByHocKyIdAPI = (hocKyId) => {
    return instance.get(`api/v1/lop-mon/list-block-by-hoc-ky-id/${hocKyId}`);
}

export const getListCampusByCoSoIdAPI = (coSoId) => {
    return instance.get(`api/v1/lop-mon/list-campus-by-co-so-id/${coSoId}`);
}

export const getListGiangVienByCoSoIdAPI = (coSoId) => {
    return instance.get(`api/v1/lop-mon/list-nhan-vien-by-co-so-id/${coSoId}`);
}

export const getListHocKyAPI = () => {
    return instance.get(`api/v1/lop-mon/list-hoc-ky`);
}

export const getListCaHocAPI = () => {
    return instance.get(`api/v1/lop-mon/list-ca-hoc`);
}