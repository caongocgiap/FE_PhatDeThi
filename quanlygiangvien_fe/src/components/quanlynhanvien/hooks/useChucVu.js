import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {getAllChucVu_ByCoSoId_API} from "../../../apis/QuanLyNhanVienAPI";


export const useChucVu = ({co_so_id}) => {
    const [listChucVu,setListChucVu] = useState([]);

    const getAllListChucVu = async () => {
        try {
            const response = await getAllChucVu_ByCoSoId_API(co_so_id);
            setListChucVu(response.data);
        }catch (e){
            toast.error("Không lấy được danh sách chức vụ!");
        }
    }

    useEffect(() => {
        getAllListChucVu();
    }, []);

    return {listChucVu};
}