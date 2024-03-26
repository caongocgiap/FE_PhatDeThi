import axios from "../utils/axiosCustomize.js";

const fetchAllChucVus = (data) => {
  let res = axios.get(
    `/api/chucvu?pageNo=${data.pageNo}&&pageSize=${data.pageSize}&tenChucVu=${
      data.tenChucVu ? data.tenChucVu : ""
    }&idCoSo=${data.idCoSo}`
  );
  return res;
};

const saveChucVu = (data) => {
  let res = axios.post("/api/chucvu", data);
  return res;
};

const updateChucVu = (data, idChucVu) => {
  let res = axios.put(`/api/chucvu/${idChucVu}`, data);
  return res;
};

const deleteChucVu = (idChucVu) => {
  let res = axios.delete(`/api/chucvu/${idChucVu}`);
  return res;
};

export { fetchAllChucVus, saveChucVu, updateChucVu, deleteChucVu };
