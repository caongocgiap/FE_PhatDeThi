import {
    getPageGiaoVienDayMonApi,
    getDetailGiaoVienDayMonApi,
    postGiaoVienDayMonApi,
    putGiaoVienDayMonApi,
    getAllNVChuaXoaApi,
    getAllMHChuaXoaApi,
    getAllHKChuaXoaApi,
    getDataUpdateByIdApi
} from '../../../apis/QuanLyGiaoVienDayMonAPI'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useLoading } from '../../quanlynhanvien/hooks/useLoading'

export const useGiaoVienDayMon = () => {

    const {loading, handleSetLoading} = useLoading()

    const [listGiaoVienDayMon, setListGiaoVienDayMon] = useState([])

    const [detailGiaoVienDayMon, setDetailGiaoVienDayMon] = useState()

    const [totalPage, setTotalPage] = useState(1)

    const [pageSize, setPageSize] = useState(5)

    const [tableLoading, setTableLoading] = useState(false)

    const [listNhanVien, setListNhanVien] = useState([])
    
    const [listMonHoc, setListMonHoc] = useState([])

    const [listHocKy, setListHocKy] = useState([])

    const [dataFillUpdate, setDataFillUpdate] = useState([])

    useEffect(() => {
        getAllNhanVien()
        getAllMonHoc()
        getIdTenHocKy()
    }, [])

    const getPageGiaoVienDayMon = async (page) => {
        setTableLoading(true)
        try {
            const response = await getPageGiaoVienDayMonApi(page)
            const list = await response.data.content
            setListGiaoVienDayMon(list)
            setTotalPage(response.data.totalElements)
            setPageSize(response.data.size)
            setTimeout(() => {
                setTableLoading(false)
            }, 500)
        } catch (error) {
            setTableLoading(false)
            toast.error("Lỗi khi lấy dữ liệu từ API")
        }
    }

    const getDetail = async (id) => {
        try {
            const response = await getDetailGiaoVienDayMonApi(id)
            if (response.data) {
                setDetailGiaoVienDayMon(response.data)
            } else {
                toast.error('Không tìm thấy giáo viên dạy môn này!')
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi lấy dữ liệu từ API!")
        }
    }

    const handlePostGiaoVienDayMon = async (data) => {
        handleSetLoading(true)
        try {
            const response = await postGiaoVienDayMonApi(data)
            if (response.status === 201) {
                toast.success('Thêm mới dữ liệu thành công!')
                handleSetLoading(false)
            }
        } catch (error) {
            handleSetLoading(false)
            toast.error('Có lỗi xảy ra trong quá trình thêm dữ liệu vào database')
        }
    }

    const handlePutGiaoVienDayMon = async (id, data) => {
        try {
            const response = await putGiaoVienDayMonApi(id, data)
            if (response.status === 200) {
                toast.success('Cập nhật dữ liệu thành công!')
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra trong quá trình cập nhật dữ liệu vào database!')
        }
    }

    const getAllNhanVien = async () => {
        try {
            const response = await getAllNVChuaXoaApi()
            if(response.status === 200) {
                setListNhanVien(response.data)
            }
        } catch (error) {
            toast.error('Lỗi khi lấy dữ liệu từ API')
        }
    }

    const getAllMonHoc = async () => {
        try {
            const response = await getAllMHChuaXoaApi()
            if(response.status === 200) {
                setListMonHoc(response.data)
            }
        } catch (error) {
            toast.error('Lỗi khi lấy dữ liệu từ API')
        }
    }

    const getIdTenHocKy = async () => {
        try {
            const response = await getAllHKChuaXoaApi()
            if(response.status === 200) {
                setListHocKy(response.data)
            }
        } catch (error) {
            toast.error('Lỗi khi lấy dữ liệu từ API')
        }
    }

    const getDataFillUpdateById = async (idGiaoVienDayMon) => {
        try {
            const response = await getDataUpdateByIdApi(idGiaoVienDayMon)
            if(response.status === 200) {
                setDataFillUpdate(response.data)
            }
        } catch (error) {
            toast.error('Lỗi khi lấy dữ liệu từ API')
        }
    }

    return {
        loading, listGiaoVienDayMon: listGiaoVienDayMon, detailGiaoVienDayMon, totalPage, pageSize, tableLoading, listNhanVien, listMonHoc, listHocKy, dataFillUpdate,
        getPageGiaoVienDayMon, getDetail, handlePostGiaoVienDayMon, handlePutGiaoVienDayMon, getAllNhanVien, getAllMonHoc, getIdTenHocKy, getDataFillUpdateById
    }
}