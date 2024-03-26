import { Button, Form, Input, Select, Space, Modal } from "antd";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Option } from "antd/es/mentions";
import { saveChucVu } from "../../apis/QuanLyChucVuAPI";

const ModalAddChucVu = ({
  isModalAddChucVuOpen,
  setIsModalAddChucVuOpen,
  dataCoSo,
}) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    addChucVu();
  };

  const handleCloseAddChucVuOpen = () => {
    setIsModalAddChucVuOpen(false);
    form.resetFields();
  };

  const addChucVu = async () => {
    const formValue = await form.getFieldsValue();
    console.log(formValue);
    try {
      const res = await saveChucVu(formValue);
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

  return (
    <>
      <Modal
        title="Thêm chức vụ"
        open={isModalAddChucVuOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalAddChucVuOpen(false)}
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
            <Input style={{ width: "320px" }} />
          </Form.Item>
          {/* <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          ></Form.Item> */}
          <Form.Item name="idCoSo" label="Cơ sở" rules={[{ required: true }]}>
            <Select
              placeholder="Chọn cơ sở"
              style={{ width: "320px", marginLeft: "38px" }}
              //   onChange={onGenderChange}
              allowClear
            >
              {dataCoSo.map((option) => (
                <Option key={option.idCoSo} value={option.idCoSo}>
                  {option.tenCoSo}
                </Option>
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
export default ModalAddChucVu;
