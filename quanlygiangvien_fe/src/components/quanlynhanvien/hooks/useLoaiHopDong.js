import {useEffect, useState} from "react";
import {getAllBoMonTheoCoSo_ByCoSoId_API, getAllLoaiHopDong_API} from "../../../apis/QuanLyNhanVienAPI";
import {toast} from "react-toastify";


export const useLoaiHopDong = () => {

    const [listLoaiHopDong,setListLoaiHopDong] = useState([]);

    const getAllLoaiHopDong = async () => {
        try {
            const response = await getAllLoaiHopDong_API();
            setListLoaiHopDong(response.data);
        }catch (e){
            toast.error("Không lấy được danh sách loại hợp đồng!")
        }
    }

    useEffect(() => {
        getAllLoaiHopDong();
    }, []);

    return {listLoaiHopDong};
}
