import React, { useState, useEffect } from "react";
import { Form, Select, DatePicker, Modal } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const SuaHocKy = ({ data, openModal, setOpenModal, afterClose }) => {
  dayjs.extend(customParseFormat);
  const dataTenHocKy = ["SPRING", "SUMMER", "FALL"];
  const [ten, setTen] = useState(data ? data.ten : "");
  const [nam, setNam] = useState(data ? data.nam : "");
  const [ngayBD, setNgayBD] = useState(data ? data.thoiGianBatDau : "");
  const [ngayKT, setNgayKT] = useState("");
  const [ngayKTBlock1, setNgayKTBlock1] = useState("");
  const [dataBlock, setDataBlock] = useState([]);
  const idHocKy = data ? data.id : 1;

  useEffect(() => {
    if (data) {
      setTen(data.ten);
      setNam(data.nam);
      setNgayBD(data.thoiGianBatDau);
    }
    fetchDataTableBlock(idHocKy);
  }, [data, idHocKy]);

  const fetchDataTableBlock = (idHocKy) => {
    if (idHocKy) {
      axios
        .get(`http://localhost:8080/block/get-block-by-id-hoc-ky/${idHocKy}`)
        .then((response) => {
          if (response && response.status === 200) {
            setDataBlock(response.data);
            setNgayKT(response.data[1].thoiGianKetThuc);
            setNgayKTBlock1(response.data[0].thoiGianKetThuc);
          }
        })
        .catch((error) => {
          console.log("Lỗi khi lấy dữ liệu từ API: ", error);
        });
    }
  };

  const handleSubmit = async () => {
    const linkApiHocKy = `http://localhost:8080/hoc-ky/update/${data.id}`;
    const linkApiBlock1 = `http://localhost:8080/block/update/${dataBlock[0].id}`;
    const linkApiBlock2 = `http://localhost:8080/block/update/${dataBlock[1].id}`;

    if (!ten || !nam || !ngayBD || !ngayKT || !ngayKTBlock1) {
      Swal.fire({
        title: "Cập nhật thất bại!",
        text: "Vui lòng nhập đầy đủ thông tin trên form",
        icon: "error",
      });
      return;
    }

    const hocKyData = {
      ten: ten,
      nam: nam,
      thoiGianBatDau: ngayBD,
      xoaMem: "CHUA_XOA",
    };

    Swal.fire({
      title: "Cảnh báo",
      text: "Bạn có chắc muốn cập nhật không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(linkApiHocKy, hocKyData);
          const hocKy = response.data.id;

          const block1Data = {
            idHocKy: hocKy,
            ten: "BLOCK 1",
            thoiGianBatDau: ngayBD,
            thoiGianKetThuc: ngayKTBlock1,
          };

          const block2Data = {
            idHocKy: hocKy,
            ten: "BLOCK 2",
            thoiGianBatDau: ngayKTBlock1,
            thoiGianKetThuc: ngayKT,
          };

          await axios.put(linkApiBlock1, block1Data);
          await axios.put(linkApiBlock2, block2Data);

          toast.success("Cập nhật thành công!");
          setOpenModal(false);
        } catch (error) {
          console.error("Lỗi khi gửi yêu cầu:", error);
          toast.error("Cập nhật thất bại!");
        }
      }
    });
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa thông tin chi tiết học kỳ"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        afterClose={afterClose}
      >
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 17,
          }}
          layout="horizontal"
          initialValues={{
            size: "large",
          }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Tên học kỳ">
            <Select value={ten} onChange={(value) => setTen(value)}>
              {dataTenHocKy.map((ten, index) => (
                <Select.Option key={index} value={ten}>
                  {ten}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Năm học">
            <DatePicker
              value={dayjs(`${nam}`, "YYYY")}
              onChange={(value) =>
                setNam(value ? parseInt(value.format("YYYY")) : "")
              }
              format={"YYYY"}
              picker="year"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Ngày bắt đầu">
            <DatePicker
              value={dayjs(ngayBD, "YYYY/MM/DD")}
              onChange={(value) =>
                setNgayBD(value ? value.format("YYYY-MM-DD") : "")
              }
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Ngày kết thúc">
            <DatePicker
              value={dayjs(ngayKT, "YYYY/MM/DD")}
              onChange={(value) =>
                setNgayKT(value ? value.format("YYYY-MM-DD") : "")
              }
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Ngày KT block 1">
            <DatePicker
              value={dayjs(ngayKTBlock1, "YYYY/MM/DD")}
              onChange={(value) =>
                setNgayKTBlock1(value ? value.format("YYYY-MM-DD") : "")
              }
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <div className="text-end">
            <button type="submit" className="btn btn-warning mb-3">
              Cập nhật
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default SuaHocKy;
