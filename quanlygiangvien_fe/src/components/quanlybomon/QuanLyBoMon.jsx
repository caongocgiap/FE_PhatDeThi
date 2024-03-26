
import { createContext, useContext, useEffect, useReducer } from 'react';
import { Typography } from "antd";
import { toast } from 'react-toastify';
import ListBoMon from './components/bomon/ListBoMon';
import FilterBoMon from './components/bomon/FilterBoMon';
import ModalAddBoMon from './components/bomon/ModalAddBoMon';
import ModalEditBoMon from './components/bomon/ModalEditBoMon';
import ModalAddChuyenNganh from './components/chuyennganh/ModalAddChuyenNganh';
import ModalEditChuyenNganh from './components/chuyennganh/ModalEditChuyenNganh';

import { 
    setData, 
    setLoading, 
    setPageSize, 
    setTotalElement 
} from './reducer/action';
import reducerBoMon, { initDataBoMon } from './reducer/reducerBoMon';
import reducerChuyenNganh, { initDataChuyenNganh } from './reducer/reducerChuyenNganh';
import listBoMonService from './services/bomon/ListBoMonService';
import ListChuyenNganhService from './services/chuyennganh/ListChuyenNganhService';



const QuanLyBoMonContext = createContext();

const QuanLyBoMon = () => {
    const [stateBoMon, dispatchBoMon] = useReducer(reducerBoMon, initDataBoMon);
    const [stateChuyenNganh, dispatchChuyenNganh] = useReducer(reducerChuyenNganh, initDataChuyenNganh);

    useEffect(() => {
        dispatchBoMon(setLoading(true));
        listBoMonService(stateBoMon.keyword, stateBoMon.page)
            .then(response => {
                dispatchBoMon(setData(response.content));
                dispatchBoMon(setPageSize(response.pageable.pageSize));
                dispatchBoMon(setTotalElement(response.totalElements));
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể GET danh sách bộ môn");
            })
            .finally(() => {
                dispatchBoMon(setLoading(false));
            });
    }, [stateBoMon.keyword, stateBoMon.page, stateBoMon.isReload]);

    useEffect(() => {
        if (stateBoMon.target === null) {
            return;
        }

        dispatchChuyenNganh(setLoading(true));
        ListChuyenNganhService(stateBoMon.target.id, stateChuyenNganh.keyword, stateChuyenNganh.page)
            .then(response => {
                dispatchChuyenNganh(setData(response.content));
                dispatchChuyenNganh(setPageSize(response.pageable.pageSize));
                dispatchChuyenNganh(setTotalElement(response.totalElements));
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Không thể GET danh sách chuyên ngành");
            })
            .finally(() => {
                dispatchChuyenNganh(setLoading(false));
            });
    }, [stateBoMon.target, stateChuyenNganh.keyword, stateChuyenNganh.page, stateChuyenNganh.isReload]);


    return(
        <QuanLyBoMonContext.Provider value={{ stateBoMon, dispatchBoMon, stateChuyenNganh, dispatchChuyenNganh }}>
            <Typography.Title level={3}>Quản lý bộ môn</Typography.Title>
            <FilterBoMon />
            <ListBoMon />

            <ModalAddBoMon />
            <ModalEditBoMon />

            <ModalAddChuyenNganh />
            <ModalEditChuyenNganh />

        </QuanLyBoMonContext.Provider>
    );
};

export const useQuanLyBoMon = () => useContext(QuanLyBoMonContext);
export default QuanLyBoMon;