import { Button, Form, Input, Select, Space, Modal } from "antd";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { saveCoSoCon } from "../../apis/QuanLyCoSoAPI";

const ModalAddCoSoCon = ({
  isModalAddCoSoConOpen,
  setIsModalAddCoSoConOpen,
  dataUpdateCoSo,
}) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    addCoSoCon();
  };

  const handleCloseAddCoSoConOpen = () => {
    setIsModalAddCoSoConOpen(false);
    form.resetFields();
  };

  const addCoSoCon = async () => {
    const formValue = await form.getFieldsValue();
    const data = {
      idCoSo: dataUpdateCoSo.idCoSo,
      tenCoSoCon: formValue.tenCoSoCon,
    };
    console.log(formValue);
    try {
      const res = await saveCoSoCon(data);
      console.log(res.data);
      if (res.data.httpStatus === "CREATED") {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        handleCloseAddCoSoConOpen();
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
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <>
      <Modal
        title="Thêm cơ sở con"
        open={isModalAddCoSoConOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalAddCoSoConOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          className={"d-flex align-items-center"}
        >
          <Form.Item
            name="tenCoSoCon"
            label="Tên cơ sở con"
            rules={[{ required: true }]}
          >
            <Input style={{ width: "320px", marginRight: "10px" }} />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          ></Form.Item>
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
export default ModalAddCoSoCon;
