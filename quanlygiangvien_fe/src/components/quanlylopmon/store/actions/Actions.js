import {
    SET_LIST_LOP_MON,
    SET_LOADING_TABLE,
    SET_LOP_MON_DETAIL,
    SET_TOTAL_ELEMENT,
    SET_VALUE_SEARCH
} from "../types/LopMonTypes";


export const setListLopMonAction = (data) => {
    return {
        type : SET_LIST_LOP_MON,
        payload : data
    }
}

export const setLopMonDetailAction = (data) => {
    return {
        type : SET_LOP_MON_DETAIL,
        payload : data
    }
}

export const setLoadingTableAction = (data) => {
    return {
        type : SET_LOADING_TABLE,
        payload : data
    }
}

export const setValueSearchAction = (data) => {
    return {
        type : SET_VALUE_SEARCH,
        payload : data
    }
}

export const setTotalElementAction = (data) => {
    return {
        type : SET_TOTAL_ELEMENT,
        payload : data
    }
}
