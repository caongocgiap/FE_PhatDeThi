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

export const initDataChuyenNganh = {
    isShowAdd: false,
    isShowEdit: false,
    isLoading: true,
    keyword: [],
    page: 0,
    pageSize: 0,
    totalElements: 0,
    isReload: false,
    target: null,
    data: []
};

const reducerChuyenNganh = (state, action) => {

    let newState;

    switch(action.type) {

        case RELOAD_DATA: 
            newState = {
                ...state,
                isReload: !state.isReload
            };
            break;

        case SET_LOADING: 
            newState = {
                ...state,
                isLoading: action.payload
            };
            break;

        case SET_KEYWORD:
            newState = {
                ...state,
                keyword: action.payload
            };
            break;

        case SET_PAGE:
            newState = {
                ...state,
                page: action.payload
            };
            break;

        case SET_PAGE_SIZE:
            newState = {
                ...state,
                pageSize: action.payload
            };
            break;

        case SET_TOTAL_ELEMENT:
            newState = {
                ...state,
                totalElements: action.payload
            };
            break;

        case SET_DATA: 
            newState = {
                ...state,
                data: action.payload
            };
            break;

        case SHOW_MODAL_ADD: 
            newState = {
                ...state,
                isShowAdd: action.payload
            };
            break;
        
        case SHOW_MODAL_EDIT: 
            newState = {
                ...state,
                isShowEdit: action.payload
            };
            break;

        case SET_TARGET: 
            newState = {
                ...state,
                target: action.payload
            };
            break;

        default: break;
    }

    return newState;
};

export default reducerChuyenNganh;