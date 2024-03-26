import { Button, Form, Input, Select, Space, Modal } from "antd";
import { saveCoSo } from "../../apis/QuanLyCoSoAPI";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "../component/FileUpload";
import { useState } from "react";

const ModalImportExcel = ({
  isModalImportExcelOpen,
  setIsModalImportExcelOpen,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(false);

  const onFinish = () => {
    addCoSo();
  };

  const handleCloseAddCoSoOpen = () => {
    setIsModalImportExcelOpen(false);
    form.resetFields();
  };

  const addCoSo = async () => {
    // setLoading(true);
    const formValue = form.getFieldsValue();
    let data = { tenCoSo: formValue.tenCoSo };
    try {
      const res = await saveCoSo(data);
      console.log(res.data);
      if (res.data.httpStatus === "CREATED") {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        handleCloseAddCoSoOpen();
      } else if (res.data.httpStatus === "NOT_ACCEPTABLE") {
        toast.warning(res.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
      //   setLoading(false);
    } catch (error) {
      //   setLoading(false);
      console.error("Error fetching products:", error);
    }
  };
  return (
    <>
      <Modal
        title="Thêm cơ sở"
        open={isModalImportExcelOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalImportExcelOpen(false)}
        footer={null}
      >
        <FileUpload
          setIsModalImportExcelOpen={setIsModalImportExcelOpen}
        ></FileUpload>
      </Modal>
    </>
  );
};
export default ModalImportExcel;
