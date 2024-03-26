import { 
    SET_LOADING,
    SET_DATA,
    SHOW_MODAL_ADD,
    SHOW_MODAL_EDIT,
    SET_TARGET,
    SET_KEYWORD,
    SET_PAGE,
    SET_PAGE_SIZE,
    SET_TOTAL_ELEMENT,
    RELOAD_DATA
} from "./constants";

export const reloadData = payload => {
    return {
        type: RELOAD_DATA,
        payload
    };
};

export const setPage = payload => {
    return {
        type: SET_PAGE,
        payload
    };
};

export const setPageSize = payload => {
    return {
        type: SET_PAGE_SIZE,
        payload
    };
};

export const setTotalElement = payload => {
    return {
        type: SET_TOTAL_ELEMENT,
        payload
    };
};

export const setKeyword = payload => {
    return {
        type: SET_KEYWORD,
        payload
    };
};


export const setLoading = payload => {
    return {
        type: SET_LOADING,
        payload
    };
};

export const setData = payload => {
    return {
        type: SET_DATA,
        payload
    };
};

export const showModalAdd = payload => {
    return {
        type: SHOW_MODAL_ADD,
        payload
    };
};

export const showModalEdit = payload => {
    return {
        type: SHOW_MODAL_EDIT,
        payload
    };
};

export const setTarget = payload => {
    return {
        type: SET_TARGET,
        payload
    };
};