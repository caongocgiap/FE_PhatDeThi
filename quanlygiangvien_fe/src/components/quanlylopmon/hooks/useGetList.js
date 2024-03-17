import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {
    getListBlockByHocKyIdAPI, getListCaHocAPI,
    getListCampusByCoSoIdAPI,
    getListGiangVienByCoSoIdAPI, getListHocKyAPI,
    getListMonHocAPI
} from "../../../apis/QuanLyLopMonAPI";

export const useGetList = () => {

    const [listMonHoc,setListMonHoc] = useState([]);

    const [listBlock,setListBlock] = useState([]);

    const [listCampus,setListCampus] = useState([]);

    const [listGiangVien,setListGiangVien] = useState([]);

    const [listHocKy,setListHocKy] = useState([]);

    const [listCaHoc,setListCaHoc] = useState([]);


    const handleGetListMonHoc = async () => {
        try {
            const response = await getListMonHocAPI();
            setListMonHoc(response.data);
        }catch (e) {
            toast.error("Không lấy được danh sách môn học!");
        }
    }

    const handleGetListBlock = async (hocKyId) => {
        if(hocKyId === undefined){
            setListBlock([]);
        }else{
            try {
                const response = await getListBlockByHocKyIdAPI(hocKyId);
                setListBlock(response.data);
            }catch (e) {
                toast.error("Không lấy được danh sách block!");
            }
        }
    }

    const handleGetListCampus = async (coSoId) => {
        try {
            const response = await getListCampusByCoSoIdAPI(coSoId);
            setListCampus(response.data);
        }catch (e) {
            toast.error("Không lấy được danh sách cơ sở con!");
        }
    }

    const handleGetListGiangVien = async (coSoId) => {
        try {
            const response = await getListGiangVienByCoSoIdAPI(coSoId);
            setListGiangVien(response.data);
        }catch (e) {
            toast.error("Không lấy được danh sách giảng viên!");
        }
    }

    const handleGetListHocKy = async () => {
        try {
            const response = await getListHocKyAPI();
            setListHocKy(response.data);
        }catch (e) {
            toast.error("Không lấy được danh sách học kỳ!");
        }
    }

    const handleGetListCaHoc = async () => {
        try {
            const response = await getListCaHocAPI();
            setListCaHoc(response.data);
        }catch (e) {
            toast.error("Không lấy được danh sách ca học!");
        }
    }

    useEffect(() => {
        handleGetListMonHoc();
        handleGetListCampus(1);
        handleGetListGiangVien(1);
        handleGetListHocKy();
        handleGetListCaHoc();
    }, []);

    return { listMonHoc , listBlock , listCampus , listGiangVien , listHocKy , listCaHoc , handleGetListBlock };

}