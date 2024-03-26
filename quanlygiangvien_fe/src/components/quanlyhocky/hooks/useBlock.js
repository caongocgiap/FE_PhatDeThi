import { getBlockByIdHocKyApi, postBlockApi } from '../../../apis/QuanLyBlockAPI'

import { useState } from 'react'

export const useBlock = () => {

    const [listBlockByIdHk, setListBlockByIdHk] = useState([]);

    const getListBlockByIdHocKy = async (idHocKy) => {
        try {
            const response = await getBlockByIdHocKyApi(idHocKy);
            setListBlockByIdHk(response.data)
        } catch (e) {
            console.log('Lỗi khi lấy dữ liệu từ API: ', e);
        }
    }

    const postBlock = async (data) => {
        try {
            const response = await postBlockApi(data);
            if(response && response.status === 201) {
            }
        } catch (e) {
            console.log('Thêm thất bại', e);
        }
    }

    return {
        listBlockByIdHk, getListBlockByIdHocKy, postBlock
    }
}