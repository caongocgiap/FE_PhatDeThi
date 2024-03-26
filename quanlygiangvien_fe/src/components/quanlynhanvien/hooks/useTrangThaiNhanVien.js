import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getAllTrangThaiNhanVien_API} from "../../../apis/QuanLyNhanVienAPI";

export const useTrangThaiNhanVien = () => {
    const [listTrangThaiNhanVien,setListTrangThaiNhanVien] = useState([]);

    const getAllTrangThaiNhanVien = async () => {
        try {
            const response = await getAllTrangThaiNhanVien_API();
            setListTrangThaiNhanVien(response.data);
        }catch (e){
            toast.error("Không lấy được danh sách trạng thái nhân viên!")
        }
    }

    useEffect(  () => {
        getAllTrangThaiNhanVien();
    }, []);

    return {listTrangThaiNhanVien};
}