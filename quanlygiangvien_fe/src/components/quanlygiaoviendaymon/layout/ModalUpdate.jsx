import { useGiaoVienDayMon } from "../hooks/useGiaoVienDayMon";
import Loading from "../../../utils/Loading";

import { Button, Form, Modal, Select } from "antd";
import Swal from "sweetalert2";
import { useEffect } from "react";

const ModalUpdate = ({
  openModal,
  setOpenModal,
  idGiaoVienDayMon,
  afterClose
}) => {
  const [form] = Form.useForm();

  const {
    loading,
    listNhanVien,
    listMonHoc,
    listHocKy,
    dataFillUpdate,
    getDataFillUpdateById,
    handlePutGiaoVienDayMon,
  } = useGiaoVienDayMon();

  const onFinish = (idGiaoVienDayMon, values) => {
    const dataUpdate = {
      idNhanVien: values.idGiaoVien,
      idMonHoc: values.idMonHoc,
      idHocKy: values.idHocKy,
    };
    Swal.fire({
      title: "Bạn có chắc muốn chỉnh sửa nhân viên này?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#39EA35",
      confirmButtonText: "Chỉnh sửa",
    }).then((result) => {
      if (result.isConfirmed) {
        handlePutGiaoVienDayMon(idGiaoVienDayMon, dataUpdate);
        setOpenModal(false);
      }
    });
  };

  useEffect(() => {
    if(idGiaoVienDayMon) {
      getDataFillUpdateById(idGiaoVienDayMon);
    }
  }, [idGiaoVienDayMon]);

  useEffect(() => {
    if (dataFillUpdate) {
      form.setFieldsValue({ 
        idGiaoVien: dataFillUpdate.idGiaoVien, 
        idMonHoc: dataFillUpdate.idMonHoc,
        idHocKy: dataFillUpdate.idHocKy
    });
    }
  }, [dataFillUpdate]);

  return (
    <>
      {loading && <Loading />}
      <Modal
        title="Chỉnh sửa giáo viên dạy môn"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        afterClose={afterClose}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => onFinish(idGiaoVienDayMon, values)}
        >
          <Form.Item
            label="Giáo viên"
            name="idGiaoVien"
            rules={[{ required: true, message: "Vui lòng chọn giáo viên" }]}
          >
            <Select>
              {listNhanVien.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.ten}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Môn học"
            name="idMonHoc"
            rules={[{ required: true, message: "Vui lòng chọn môn học" }]}
          >
            <Select>
              {listMonHoc.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.ten}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Học kỳ"
            name="idHocKy"
            rules={[{ required: true, message: "Vui lòng chọn học kỳ" }]}
          >
            <Select>
              {listHocKy.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.ten}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mt-3">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdate;
