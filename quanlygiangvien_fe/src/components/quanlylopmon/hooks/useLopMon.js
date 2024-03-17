import {toast} from "react-toastify";
import {
    deleteLopMonAPI,
    getLopMonDetailAPI,
    getSearchLopMonAPI,
    postLopMonAPI,
    putLopMonAPI
} from "../../../apis/QuanLyLopMonAPI";
import {useContext, useState} from "react";
import {LopMonContext} from "../store/context/Context";
import {
    setListLopMonAction,
    setLoadingTableAction,
    setLopMonDetailAction,
    setTotalElementAction
} from "../store/actions/Actions";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


export const useLopMon = () => {

    //useContext
    const [state,dispatch] = useContext(LopMonContext);

    //loading
    const [loading,setLoading] = useState(false);

    //nav
    const nav = useNavigate();

    //state
    const [pageSize,setPageSize] = useState(0);


    //handle
    const handleGetLopMonDetail = async (lopMonId) => {
        try {
            const response = await getLopMonDetailAPI(lopMonId);
            dispatch(setLopMonDetailAction(response.data));
        }catch (e) {
            for (let message in e.response.data){
                toast.error(e.response.data[message]);
            }
        }
    }

    const handleGetSearchLopMon = (input,page) => {
        dispatch(setLoadingTableAction(true));
        setTimeout( async ()=>{
            try {
                const response = await getSearchLopMonAPI(input,page);
                //get List lop mon
                dispatch(setListLopMonAction(response.data.content));
                //get total Element for table
                dispatch(setTotalElementAction(response.data.totalElements));
                //get pageSize for table
                setPageSize(response.data.pageable.pageSize);
                //get loading
                dispatch(setLoadingTableAction(false));
            }catch (e) {
                for (let message in e.response.data){
                    toast.error(e.response.data[message]);
                }
                dispatch(setLoadingTableAction(false));
            }
        },[500]);
    }

    const handlePostLopMon = (postLopMonRequest) => {
        Swal.fire({
            title : "Bạn có chắc muốn thêm lớp môn này!",
            icon : "warning",
            showCancelButton:true,
        }).then(result =>{
            if(result.isConfirmed){
                setLoading(true);
                setTimeout( async ()=>{
                    try {
                        const response = await postLopMonAPI(postLopMonRequest);
                        toast.success(response.data);
                        nav("/bandaotao/quan-ly-lop-mon");
                        setLoading(false);
                    }catch (e) {
                        for (let message in e.response.data){
                            toast.error(e.response.data[message]);
                        }
                        setLoading(false);
                    }
                },[500])
            }
        });
    }

    const handlePutLopMon = (putLopMonRequest) => {
        Swal.fire({
            title : "Bạn có chắc muốn cập nhật lớp môn này!",
            icon : "warning",
            showCancelButton:true,
        }).then(result =>{
            if(result.isConfirmed){
                setLoading(true);
                setTimeout( async ()=>{
                    try {
                        const response = await putLopMonAPI(putLopMonRequest);
                        toast.success(response.data);
                        nav("/bandaotao/quan-ly-lop-mon");
                        setLoading(false);
                    }catch (e) {
                        for (let message in e.response.data){
                            toast.error(e.response.data[message]);
                        }
                        setLoading(false);
                    }
                },[500])
            }
        });
    }

    const handleDeleteLopMon = (lopMonId,trangThai) => {
        Swal.fire({
            title : trangThai === "CHUA_XOA" ? "Bạn có chắc muốn xóa lớp môn này!" : "Bạn có chắc muốn hoạt động lại lớp môn này!",
            icon : "warning",
            showCancelButton:true,
        }).then(result =>{
            if(result.isConfirmed){
                setLoading(true);
                setTimeout( async  ()=>{
                    try {
                        const response = await deleteLopMonAPI(lopMonId);
                        toast.success(response.data);
                        handleGetSearchLopMon("",1);
                        setLoading(false);
                    }catch (e) {
                        for (let message in e.response.data){
                            toast.error(e.response.data[message]);
                        }
                        setLoading(false);
                    }
                },[500])
            }
        })
    }


    return { handlePostLopMon , handleGetSearchLopMon , handlePutLopMon , handleDeleteLopMon , loading , pageSize  , handleGetLopMonDetail };

}