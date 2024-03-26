import { Button, Form, Input, Select, Space, Modal } from "antd";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Option } from "antd/es/mentions";
import {
  addBoMonTheoCoSo,
  fetchAllBoMon,
  fetchAllNhanVien,
} from "../../../apis/QuanLyCoSoAPI";
import { useEffect, useState } from "react";

const ModalAddBoMonTheoCoSo = ({
  isModalAddBoMonTheoCoSoOpen,
  setIsModalAddBoMonTheoCoSoOpen,
  dataCoSo,
  dataCreateBoMon,
  setDataCreateBoMon,
}) => {
  const [form] = Form.useForm();
  const [dataBoMon, setDataBoMon] = useState([]);
  const [dataNhanVien, setDataNhanVien] = useState([]);

  //   let dataBoMon = [];

  const fetchDataNhanVien = async () => {
    try {
      const datanv = await fetchAllNhanVien();
      const databm = await fetchAllBoMon();
      console.log(databm.data);
      setDataNhanVien(datanv.data);
      setDataBoMon(databm.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onFinish = () => {
    addBMTCS();
  };

  const handleCloseAddChucVuOpen = () => {
    setIsModalAddBoMonTheoCoSoOpen(false);
    form.resetFields();
  };

  const onChange = () => {
    const formValue = form.getFieldsValue();
    console.log(formValue);
    setDataCreateBoMon({ ...dataCreateBoMon, ...formValue });
  };

  const addBMTCS = async () => {
    try {
      console.log(dataCreateBoMon);
      const res = await addBoMonTheoCoSo(dataCreateBoMon);
      console.log(res.data);
      if (res.data.httpStatus === "CREATED") {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleCloseAddChucVuOpen();
      } else if (res.data.httpStatus === "NOT_ACCEPTABLE") {
        toast.warning(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchDataNhanVien();
  }, []);

  return (
    <>
      <Modal
        title="Thêm bộ môn theo cơ sở"
        open={isModalAddBoMonTheoCoSoOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalAddBoMonTheoCoSoOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          className="pt-4"
        >
          <Form.Item name="idBoMon" label="Bộ môn" rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="Chọn bộ môn"
              optionFilterProp="children"
              style={{ paddingLeft: "50px" }}
              onChange={onChange}
            >
              {dataBoMon.map((item) => (
                <Select.Option key={item.idBoMon} value={item.idBoMon}>
                  {item.tenBoMon}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="idCoSo" label="Cơ sở" rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="Chọn cơ sở"
              optionFilterProp="children"
              style={{ paddingLeft: "63px" }}
              onChange={onChange}
            >
              {dataCoSo.map((item) => (
                <Select.Option key={item.idCoSo} value={item.idCoSo}>
                  {item.tenCoSo}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="idTruongBoMon"
            label="Trưởng bộ môn"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Chọn trưởng bộ môn"
              optionFilterProp="children"
              onChange={onChange}
            >
              {dataNhanVien.map((item) => (
                <Select.Option key={item.idNhanVien} value={item.idNhanVien}>
                  {item.taiKhoan + " - " + item.tenNhanVien}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              icon={<FontAwesomeIcon icon={faBuildingCircleArrowRight} />}
              style={{
                backgroundColor: "#052C65",
                color: "#ffff",
              }}
            ></Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddBoMonTheoCoSo;
