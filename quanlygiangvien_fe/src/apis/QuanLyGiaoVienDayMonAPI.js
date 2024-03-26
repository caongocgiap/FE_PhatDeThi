import instance from '../utils/axiosCustomize'

export const getPageGiaoVienDayMonApi = async (page) => {
    return instance.get(`giao-vien-day-mon/get-list/page=${page}`)
}

export const getDetailGiaoVienDayMonApi = async (id) => {
    return instance.get(`giao-vien-day-mon/get/${id}`)
}

export const postGiaoVienDayMonApi = async (dataPost) => {
    return instance.post('giao-vien-day-mon/save', dataPost)
}

export const putGiaoVienDayMonApi = async (id, dataPut) => {
    return instance.put(`giao-vien-day-mon/update/${id}`, dataPut)
}

export const deleteGiaoVienDayMonApi = (id) => {
    return instance.delete(`giao-vien-day-mon/delete/${id}`)
}

export const getAllNVChuaXoaApi = () => {
    return instance.get('giao-vien-day-mon/get-id-ten-nhan-vien')
}

export const getAllMHChuaXoaApi = () => {
    return instance.get('giao-vien-day-mon/get-id-ten-mon-hoc')
}

export const getAllHKChuaXoaApi = () => {
    return instance.get('giao-vien-day-mon/get-id-ten-hoc-ky')
}

export const getDataUpdateByIdApi = (idGiaoVienDayMon) => {
    return instance.get(`giao-vien-day-mon/get-data-update/id=${idGiaoVienDayMon}`)
}