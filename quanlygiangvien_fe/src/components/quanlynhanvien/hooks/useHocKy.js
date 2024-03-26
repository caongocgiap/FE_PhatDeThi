import {useEffect, useState} from "react";
import {getHocKyApi} from "../../../apis/QuanLyHocKyAPI";
import {toast} from "react-toastify";


export const useHocKy = () => {

    const [listHocKy,setListHocKy] = useState([]);

    const getAllHocKy = async (page) => {
        try {
            const response = await getHocKyApi(page);
            setListHocKy(response.data.content);
        }catch (e){
            toast.error("Không lấy được danh sách học kỳ!")
        }
    }

    useEffect(() => {
        getAllHocKy(0);
    }, []);

    return {listHocKy, getAllHocKy};
}
