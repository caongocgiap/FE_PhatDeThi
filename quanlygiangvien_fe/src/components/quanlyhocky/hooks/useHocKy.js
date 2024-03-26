import { getHocKyApi, getHocKyByIdApi, postHocKyApi } from '../../../apis/QuanLyHocKyAPI'

import { useState, useEffect } from "react";

export const useHocKy = () => {

    const [listHocKy, setListHocKy] = useState([]);

    const [totalPage, setTotalPage] = useState(1);

    const [pageSize, setPageSize] = useState(0);

    const [tableLoading, setTableLoading] = useState(false);

    const [hocKy, setHocKy] = useState([])

    const getPaggingHocKy = async (page) => {
        setTableLoading(true);
        setTimeout(async () => {
            try {
                const response = await getHocKyApi(page);
                setListHocKy(response.data.content);
                setTotalPage(response.data.totalElements);
                setPageSize(response.data.size);
                setTableLoading(false);
            } catch (e) {
                setTableLoading(false);
                console.log("Lỗi khi lấy dữ liệu từ API: ", e);
            }
        }, [100])
    }

    useEffect(() => {
        getPaggingHocKy(0);
    }, [])

    const getHocKyById = async (idHocKy) => {
        try {
            const response = await getHocKyByIdApi(idHocKy);
            setHocKy(response.data);
        } catch (e) {
            console.log("Lỗi khi lấy dữ liệu từ API: ", e);
        }
    }

    const postHocKy = async (data) => {
        try {
            const response = await postHocKyApi(data);
            return response.data
        } catch (e) {
            console.log('Thêm thất bại', e);
        }
    }

    return {
        listHocKy, totalPage, pageSize, tableLoading, hocKy, getPaggingHocKy, getHocKyById, postHocKy
    }
}