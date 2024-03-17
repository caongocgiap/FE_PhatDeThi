import {
    SET_LIST_LOP_MON,
    SET_LOADING_TABLE,
    SET_LOP_MON_DETAIL,
    SET_TOTAL_ELEMENT,
    SET_VALUE_SEARCH
} from "../types/LopMonTypes";

export const INITIAL_STATE = {
    listLopMon : [],
    lopMonDetail : {},
    loadingTable : false,
    searchValue : "",
    totalElements : 0
}

export const LopMonReducer = (state = INITIAL_STATE,action) => {
    switch (action.type){
        case SET_LIST_LOP_MON :
            return {
                ...state,
                listLopMon : action.payload
            }
        case SET_LOP_MON_DETAIL :
            return {
                ...state,
                lopMonDetail : action.payload
            }
        case SET_LOADING_TABLE :
            return {
                ...state,
                loadingTable : action.payload
            }
        case SET_VALUE_SEARCH :
            return {
                ...state,
                searchValue : action.payload
            }
        case SET_TOTAL_ELEMENT :
            return {
                ...state,
                totalElements : action.payload
            }
        default :
            return state
    }
}