import axios from "../utils/axiosCustomize.js";

const fetchAllCoSos = (data) => {
  const listTenCoSoParam = data.listTenCoSo.join(",");
  let res = axios.get(
    `/api/coso?pageNo=${data.pageNo}&pageSize=${data.pageSize}&listTenCoSo=${data.listTenCoSo}`
  );
  return res;
};

const fetchAllCoSo = () => {
  let res = axios.get(`/api/coso/getall`);
  return res;
};

const fetchAllBoMon = () => {
  let res = axios.get(`/api/bomontheocoso/bomon`);
  return res;
};

const fetchAllNhanVien = () => {
  let res = axios.get(`/api/bomontheocoso/nhanvien`);
  return res;
};

const fetchAllCoSoConById = (pageNo, pageSize, listTenCoSoCon, idCoSo) => {
  const listTenCoSoConParam = listTenCoSoCon.join(",");
  let res = axios.get(
    `/api/coso/campus/${idCoSo}?pageNo=${pageNo}&&pageSize=${pageSize}&listTenCoSoCon=${listTenCoSoConParam}`
  );
  return res;
};

const fetchAllBoMonTheoCoSo = (data) => {
  let res = axios.get(
    `http://localhost:8080/api/bomontheocoso?idCoSo=${
      data.idCoSo ? data.idCoSo : 0
    }&pageNo=${data.pageNo}&pageSize=${data.pageSize}&tenBoMon=${
      data.tenBoMon ? data.tenBoMon : ""
    }`
  );
  return res;
};

const addBoMonTheoCoSo = (data) => {
  let res = axios.post(`http://localhost:8080/api/bomontheocoso`, data);
  return res;
};

const updateXoaMemBoMonTheoCoSo = (idBoMonTheoCoSo) => {
  let res = axios.put(
    `http://localhost:8080/api/bomontheocoso/${idBoMonTheoCoSo}`
  );
  return res;
};

const saveCoSo = (tenCoSo) => {
  let res = axios.post("/api/coso", tenCoSo);
  return res;
};

const updateCoSo = (data) => {
  let res = axios.put(`/api/coso/${data.idCoSo}/update`, data);
  return res;
};

const updateXoaMemCoSo = (idCoSo) => {
  let res = axios.put(`/api/coso/${idCoSo}/update-xoa-mem`);
  return res;
};

const saveCoSoCon = (data) => {
  let res = axios.post(`/api/coso/campus`, data);
  return res;
};

const updateCoSoCon = (data, idCoSoCon) => {
  let res = axios.put(`/api/coso/campus/${idCoSoCon}/update`, data);
  return res;
};

const updateXoaMemCoSoCon = (idCoSoCon) => {
  let res = axios.put(`/api/coso/campus/${idCoSoCon}/update-xoa-mem`);
  return res;
};

export {
  fetchAllCoSos,
  fetchAllCoSo,
  saveCoSo,
  updateCoSo,
  updateXoaMemCoSo,
  fetchAllCoSoConById,
  saveCoSoCon,
  updateXoaMemCoSoCon,
  fetchAllBoMonTheoCoSo,
  addBoMonTheoCoSo,
  fetchAllBoMon,
  fetchAllNhanVien,
  updateXoaMemBoMonTheoCoSo,
  updateCoSoCon,
};
