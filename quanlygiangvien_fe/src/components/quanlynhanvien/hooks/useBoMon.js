import {useEffect, useState} from "react";
import {getAllBoMonTheoCoSo_ByCoSoId_API} from "../../../apis/QuanLyNhanVienAPI";
import {toast} from "react-toastify";


export const useBoMon = ({co_so_id}) => {

    const [listBoMon,setListBoMon] = useState([]);

    const getAllBoMon = async () => {
        try {
            const response = await getAllBoMonTheoCoSo_ByCoSoId_API(co_so_id);
            setListBoMon(response.data);
        }catch (e){
            toast.error("Không lấy được danh sách bộ môn!")
        }
    }

    useEffect(() => {
        getAllBoMon();
    }, []);

    return {listBoMon};
}
