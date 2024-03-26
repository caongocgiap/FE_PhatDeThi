import { useBlock } from "../hooks/useBlock";
import { useHocKy } from "../hooks/useHocKy";

import React, { useState } from "react";
import { Form, Select, DatePicker, Modal } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ThemMoiHocKy = ({ openModal, setOpenModal, afterClose }) => {
  dayjs.extend(customParseFormat);
  const dataTenHocKy = ["SPRING", "SUMMER", "FALL"];
  const [ten, setTen] = useState("");
  const [nam, setNam] = useState("");
  const [ngayBD, setNgayBD] = useState("");
  const [ngayKT, setNgayKT] = useState("");
  const [ngayKTBlock1, setNgayKTBlock1] = useState("");
  const { postHocKy } = useHocKy();
  const { postBlock } = useBlock();

  const handleTenChange = (value) => setTen(value);

  const handleNamChange = (value) =>
    setNam(value ? parseInt(value.format("YYYY")) : "");

  const handleNgayBDChange = (value) =>
    setNgayBD(value ? value.format("YYYY-MM-DD") : "");

  const handleNgayKTChange = (value) =>
    setNgayKT(value ? value.format("YYYY-MM-DD") : "");

  const handleNgayKTBlock1Change = (value) =>
    setNgayKTBlock1(value ? value.format("YYYY-MM-DD") : "");

  const handleSubmit = async () => {
    let flag = true;

    if (!ten || !nam || !ngayBD || !ngayKT || !ngayKTBlock1) {
      Swal.fire({
        title: "Thêm thất bại",
        text: "Vui lòng nhập đủ thông tin",
        icon: "info",
      });
      flag = false;
    } else {
      let namBD = parseInt(ngayBD.split("-")[0]);
      let namKT = parseInt(ngayKT.split("-")[0]);
      let namKTBlock1 = parseInt(ngayBD.split("-")[0]);

      if (namBD < nam || namKT < nam || namKTBlock1 < nam) {
        Swal.fire({
          title: "Thêm thất bại",
          text: "Năm kết thúc phải sau năm học",
          icon: "info",
        });
        flag = false;
      }
      if (ngayKT <= ngayBD) {
        Swal.fire({
          title: "Thêm thất bại",
          text: "Ngày kết thúc phải sau ngày bắt đầu",
          icon: "info",
        });
        flag = false;
      } else if (ngayKTBlock1 > ngayKT || ngayKTBlock1 < ngayBD) {
        Swal.fire({
          title: "Thêm thất bại",
          text: "Ngày kết thúc block 1 phải sau ngày bắt đầu và trước ngày kết thúc",
          icon: "info",
        });
        flag = false;
      }
    }

    Swal.fire({
      title: "Cảnh báo",
      text: "Bạn có chắc muốn thêm không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm mới",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (flag) {
          const hocKyData = {
            ten: ten,
            nam: nam,
            thoiGianBatDau: ngayBD,
            xoaMem: "CHUA_XOA",
          };
          try {
            const response = await postHocKy(hocKyData);
            const hocKy = response.id;

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

            postBlock(block1Data);
            postBlock(block2Data);
            toast.success("Thêm thành công!");
            setOpenModal(false);
          } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
            Swal.fire({
              title: "Thêm thất bại!",
              icon: "error",
            });
          }
        }
      }
    });
  };

  return (
    <>
      <Modal
        title="Thêm mới học kỳ"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        afterClose={afterClose}
        footer={null}
      >
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          initialValues={{ size: "large" }}
          onFinish={handleSubmit}
        >
          <Form.Item label="Tên học kỳ" name="ten">
            <Select onChange={handleTenChange}>
              {dataTenHocKy.map((ten, index) => (
                <Select.Option key={index} value={ten}>
                  {ten}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Năm học" name="nam">
            <DatePicker
              onChange={handleNamChange}
              format="YYYY"
              picker="year"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Ngày bắt đầu" name="ngayBD">
            <DatePicker
              onChange={handleNgayBDChange}
              format="DD/MM/YYYY"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Ngày kết thúc" name="ngayKT">
            <DatePicker
              onChange={handleNgayKTChange}
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Ngày KT block 1" name="ngayKTBlock1">
            <DatePicker
              onChange={handleNgayKTBlock1Change}
              format={"DD/MM/YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <button type="submit" className="btn btn-success">
            Add
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default ThemMoiHocKy;
