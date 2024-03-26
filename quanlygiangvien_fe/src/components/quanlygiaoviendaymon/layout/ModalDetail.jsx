import { useGiaoVienDayMon } from "../hooks/useGiaoVienDayMon";

import { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const ModalDetail = ({
  openModal,
  setOpenModal,
  idGiaoVienDayMon,
}) => {
  const { detailGiaoVienDayMon, getDetail } = useGiaoVienDayMon();

  useEffect(() => {
    if(openModal) {
        getDetail(idGiaoVienDayMon);
    }
  }, [idGiaoVienDayMon, openModal, getDetail]);

  return (
    <>
      <Modal
        title="Chi tiết giáo viên dạy môn"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          layout="horizontal"
          initialValues={{ size: "large" }}
        >
          <Form.Item label="Mã giáo viên">
            <Input value={detailGiaoVienDayMon ? detailGiaoVienDayMon.maGiaoVien : '' } disabled />
          </Form.Item>
          <Form.Item label="Tên giáo viên">
            <Input value={detailGiaoVienDayMon ? detailGiaoVienDayMon.tenGiaoVien : '' } disabled />
          </Form.Item>
          <Form.Item label="Học kỳ">
            <Input value={detailGiaoVienDayMon ? detailGiaoVienDayMon.tenHocKy : '' } disabled />
          </Form.Item>
          <Form.Item label="Bộ môn">
            <Input value={detailGiaoVienDayMon ? detailGiaoVienDayMon.tenBoMon : '' } disabled />
          </Form.Item>
          <Form.Item label="Mã môn">
            <Input value={detailGiaoVienDayMon ? detailGiaoVienDayMon.maMonHoc : '' } disabled />
          </Form.Item>
          <Form.Item label="Tên môn">
            <Input value={detailGiaoVienDayMon ? detailGiaoVienDayMon.tenMonHoc : '' } disabled />
          </Form.Item>
          <Form.Item label="Hình thức">
            <Input value={detailGiaoVienDayMon ? detailGiaoVienDayMon.hinhThuc : '' } disabled />
          </Form.Item>
          <Form.Item label="Trạng thái">
            <Input value={detailGiaoVienDayMon ? detailGiaoVienDayMon.trangThai : '' } disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalDetail;
