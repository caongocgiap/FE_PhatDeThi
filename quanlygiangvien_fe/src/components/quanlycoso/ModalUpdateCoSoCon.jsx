import { Button, Form, Input, Select, Space, Modal } from "antd";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { saveCoSoCon, updateCoSoCon } from "../../apis/QuanLyCoSoAPI";
import { useEffect } from "react";

const ModalUpdateCoSoCon = ({
  isModalUpdateCoSoConOpen,
  setIsModalUpdateCoSoConOpen,
  dataUpdateCoSoCon,
  setDataUpdateCoSoCon,
}) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    addCoSoCon();
  };

  const handleCloseUpdateCoSoConOpen = () => {
    setIsModalUpdateCoSoConOpen(false);
    form.resetFields();
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataUpdateCoSoCon({ ...dataUpdateCoSoCon, [name]: value });
    console.log(dataUpdateCoSoCon);
  };

  const addCoSoCon = async () => {
    const formValue = form.getFieldsValue();
    const data = {
      idCoSo: dataUpdateCoSoCon.idCoSo,
      tenCoSoCon: formValue.tenCoSoCon,
    };
    console.log(data);
    try {
      const res = await updateCoSoCon(data, dataUpdateCoSoCon.idCoSoCon);
      console.log(res.data);
      if (res.data.httpStatus === "OK") {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        handleCloseUpdateCoSoConOpen();
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

  useEffect(() => {
    form.setFieldsValue({ tenCoSoCon: dataUpdateCoSoCon?.tenCoSoCon }); // Cập nhật giá trị của form khi dataUpdateCoSo thay đổi
  }, [dataUpdateCoSoCon]);
  return (
    <>
      <Modal
        title="Sửa cơ sở con"
        open={isModalUpdateCoSoConOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalUpdateCoSoConOpen(false)}
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
            <Input
              style={{ width: "320px", marginRight: "10px" }}
              onChange={(e) => onChangeInput(e)}
              name="tenCoSoCon"
              //   value={dataUpdateCoSoCon.tenCoSoCon}
            />
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
export default ModalUpdateCoSoCon;
