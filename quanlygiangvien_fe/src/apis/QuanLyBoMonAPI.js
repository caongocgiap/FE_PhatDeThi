import instance from "../utils/axiosCustomize";

export const XOA_MEM = {
    chua_xoa: "CHUA_XOA",
    da_xoa: "DA_XOA",
    xoa_han: "XOA_HAN"
};


export const URL_API_BOMON = {
    list: '/api/bo-mon/list',
    add: '/api/bo-mon/add',
    delete: '/api/bo-mon/delete',
    update: '/api/bo-mon/update',
    get: '/api/bo-mon/get'
};

export const URL_API_CHUYENNGANH = {
    list: '/api/chuyen-nganh/list',
    add: '/api/chuyen-nganh/add',
    delete: '/api/chuyen-nganh/delete',
    update: '/api/chuyen-nganh/update',
    get: '/api/chuyen-nganh/get'
};

const requestGet = async (path, options = {}) => {
    const response = await instance.get(path, options);
    return response.data;
};

const requestPut = async (path, options = {}) => {
    const response = await instance.put(path, options);
    return response.data;
};

const requestPost = async (path, options = {}) => {
    const response = await instance.post(path, options);
    return response.data;
};

const requestDelete = async (path, options = {}) => {
    const response = await instance.delete(path, options);
    return response.data;
};

export { requestGet, requestDelete, requestPut, requestPost };