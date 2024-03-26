import { Button, Form, Input, Select, Space, Modal } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { updateChucVu } from "../../apis/QuanLyChucVuAPI";

const ModalUpdateChucVu = ({
  isModalUpdateChucVuOpen,
  setIsModalUpdateChucVuOpen,
  dataUpdateChucVu,
  setDataUpdateChucVu,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    try {
      const res = await updateChucVu(
        dataUpdateChucVu,
        dataUpdateChucVu.idChucVu
      );
      console.log(res.data);
      // Xử lý kết quả trả về
      if (res.data.httpStatus === "OK") {
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
    } finally {
      setLoading(false); // Kết thúc hiển thị loading sau khi xử lý xong
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataUpdateChucVu({ ...dataUpdateChucVu, [name]: value });
    console.log(e.target);
  };

  const handleCloseAddChucVuOpen = () => {
    setIsModalUpdateChucVuOpen(false);
    form.resetFields();
  };

  //   const updateChucVu = async () => {
  //     const formValue = await form.getFieldsValue();
  //     setDataUpdateChucVu({ ...dataUpdateChucVu, formValue });
  //     console.log("==================");
  //     console.log(formValue);
  //     console.log(dataUpdateChucVu);
  //     console.log("==================");
  //     try {
  //       const res = await updateChucVu(dataUpdateChucVu);
  //       console.log(res.data);
  //       if (res.data.httpStatus === "OK") {
  //         toast.success(res.data.message, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         handleCloseAddChucVuOpen();
  //       } else if (res.data.httpStatus === "NOT_ACCEPTABLE") {
  //         toast.warning(res.data.message, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       } else {
  //         toast.error(res.data.message, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  useEffect(() => {
    form.setFieldsValue({ tenChucVu: dataUpdateChucVu?.tenChucVu }); // Cập nhật giá trị của form khi dataUpdateCoSo thay đổi
  }, [dataUpdateChucVu]);

  return (
    <>
      <Modal
        title="Sửa chức vụ"
        open={isModalUpdateChucVuOpen}
        onCancel={() => setIsModalUpdateChucVuOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="tenChucVu"
            label="Tên chức vụ"
            rules={[{ required: true }]}
            className={"d-flex align-items-center mt-3"}
          >
            <Input
              style={{ width: "320px" }}
              name="tenChucVu"
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              icon={<FontAwesomeIcon icon={faBuildingCircleArrowRight} />}
              style={{
                backgroundColor: "#052C65",
                color: "#ffff",
              }}
              loading={loading} // Hiển thị loading khi đang xử lý
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpdateChucVu;
