import instance from "../utils/axiosCustomize";


export const getAllNhanVienChucVu_API = (page,input) => {
    return instance.get("api/v1/nhan_vien/getAll-nhan_vien-chuc_vu",{
        params:{
            page:page,
            input:input
        }
    });
}

export const getAllNhanVienChucVuById_API = (nhanVienId) => {
    return instance.get(`api/v1/nhan_vien/getAll-nhan_vien-chuc_vu/${nhanVienId}`);
}

export const getDetailNhanVienChucVu_API = (nhanVienId) => {
    return instance.get(`api/v1/nhan_vien/detail-nhan_vien/${nhanVienId}`);
}

export const getAllHocKy_API = () => {
    return instance.get("api/v1/nhan_vien/getAll-hoc_ky");
}

export const getAllChucVu_ByCoSoId_API = (co_so_id) => {
    return instance.get(`api/v1/nhan_vien/getAll-chuc_vu-By-co_so_id/${co_so_id}`);
}

export const getAllBoMonTheoCoSo_ByCoSoId_API = (co_so_id) => {
    return instance.get(`api/v1/nhan_vien/getAll-bo_mon-By-co_so_id/${co_so_id}`);
}

export const getAllLoaiHopDong_API = () => {
    return instance.get(`api/v1/nhan_vien/getAll-loai_hop_dong`);
}

export const getAllTrangThaiNhanVien_API = () => {
    return instance.get(`api/v1/nhan_vien/getAll-trang_thai_nhan_vien`);
}

export const postNhanVien_API = (postNhanVienRequest) => {
    return instance.post(`api/v1/nhan_vien/post-nhan_vien`,postNhanVienRequest);
}

export const putNhanVien_API = (putNhanVienRequest) => {
    return instance.put(`api/v1/nhan_vien/put-nhan_vien`,putNhanVienRequest);
}

export const deleteNhanVien_API = (nhanVienId) => {
    return instance.delete(`api/v1/nhan_vien/delete-nhan_vien/${nhanVienId}`);
}

export const importExcelNhanVien_API = (file) => {
    return instance({
        method:"post",
        headers:{
            "Content-Type":"multipart/form-data",
        },
        data:file,
        url:"api/v1/nhan_vien/import-excel"
    })
}