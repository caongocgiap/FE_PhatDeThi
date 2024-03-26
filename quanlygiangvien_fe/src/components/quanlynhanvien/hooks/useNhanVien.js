import {
    getAllNhanVienChucVu_API,
    getAllNhanVienChucVuById_API, getDetailNhanVienChucVu_API,
    postNhanVien_API, putNhanVien_API
} from "../../../apis/QuanLyNhanVienAPI";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useLoading} from "./useLoading";
import {useEffect, useState} from "react";


export const useNhanVien = () => {

    const {loading,handleSetLoading} = useLoading();

    const nav = useNavigate();

    const [listNhanVien,setListNhanVien] = useState([]);

    const [detailNhanVien,setDetailNhanVien] = useState({});

    const [totalPage,setTotalPage] = useState(1);

    const [pageSize,setPageSize] = useState(1);

    const [tableLoading,setTableLoading] = useState(false);

    const handlePostOrPutNhanVien = async (form,id) => {
        if(id === undefined){
            handleSetLoading(true);
            setTimeout( async  ()=>{
                try {
                    const response = await postNhanVien_API(form.getFieldsValue());
                    if(response && response.status === 201){
                        nav("/bandaotao/quan-ly-nhan-vien")
                        console.log(response)
                        toast.success(response.data);
                        handleSetLoading(false);
                    }
                }catch (e) {
                    handleSetLoading(false);
                    for (let message in e.response.data){
                        toast.error(e.response.data[message]);
                    }
                }
            },[500])
        }else{
            handleSetLoading(true);
            setTimeout( async  ()=>{
                const putNhanVienRequest = form.getFieldsValue();
                putNhanVienRequest.id = id;
                try {
                    const response = await putNhanVien_API(putNhanVienRequest);
                    if(response && response.status === 200){
                        nav("/bandaotao/quan-ly-nhan-vien")
                        toast.success(response.data);
                        handleSetLoading(false);
                    }
                }catch (e) {
                    handleSetLoading(false);
                    for (let message in e.response.data){
                        toast.error(e.response.data[message]);
                    }
                }
            },[500])
        }
    }


    const getAllNhanVienChucVu = async (page,input) => {
        setTableLoading(true);
        setTimeout( async  ()=>{
            try {
                const response = await getAllNhanVienChucVu_API(page,input);
                setListNhanVien(response.data.content);
                setTotalPage(response.data.totalElements);
                setPageSize(response.data.size);
                setTableLoading(false)
            }catch (e) {
                setTableLoading(false);
                toast.error("Không Gọi Được Danh Sách Nhân Viên!");
            }
        },[500])
    }

    const getAllNhanVienChucVuById = async (nhanVienId) => {
        try {
            const response = await getAllNhanVienChucVuById_API(nhanVienId);
            return response.data;
        }catch (e) {
            toast.error("Không tìm thấy nhân viên này!");
        }
    }

    const getDetailNhanVienChucVu = async (nhanVienId) => {
        try {
            const response = await getDetailNhanVienChucVu_API(nhanVienId);
            setDetailNhanVien(response.data);
        }catch (e) {
            toast.error("Không tìm thấy nhân viên này!");
        }
    }

    const deleteNhanVien = async (nhanVienId) => {
        try{
            await deleteNhanVien(nhanVienId);
        }catch (e) {
            toast.error("Không tìm thấy nhân viên này!");
        }
    }

    useEffect(() => {
        getAllNhanVienChucVu(1,"")
    }, []);

    return {loading,detailNhanVien,tableLoading,pageSize,totalPage,listNhanVien,handlePostOrPutNhanVien,getAllNhanVienChucVuById,getAllNhanVienChucVu,getDetailNhanVienChucVu}
}