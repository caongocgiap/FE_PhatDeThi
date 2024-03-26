import { Button, Form, Input, Select, Space, Modal } from "antd";
const { Option } = Select;

const SearchBar = ({
  dataCoSo,
  dataTimKiem,
  setDataTimKiem,
  setTimKiem,
  field1,
  field2,
  timKiem,
}) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    setDataTimKiem({
      ...dataTimKiem,
      [field1]: 0,
      [field2]: "",
    });
    let reset = !timKiem;
    setTimKiem(reset);
  };

  const onChangeSelect = async (e) => {
    setDataTimKiem({
      ...dataTimKiem,
      [field1]: e,
    });
    console.log(e);
    // console.log(formValue);
    // console.log(dataTimKiem);
  };

  const onChangeInput = async (e) => {
    // setIdCoSo(e);
    setDataTimKiem({
      ...dataTimKiem,
      [field2]: e.target.value,
    });
    console.log(e);
    // console.log(formValue);
    // console.log(dataTimKiem);
  };

  return (
    <>
      <Form
        form={form}
        name="control-hooks"
        onFinish={() => setTimKiem(!timKiem)}
        style={{ maxWidth: 600 }}
      >
        <div
          className={
            "d-flex align-items-center justify-content-between mt-3 w-100"
          }
        >
          <Form.Item
            name={field2}
            label="Tên chức vụ"
            style={{ marginRight: "150px" }}
          >
            <Input
              style={{ width: "500px" }}
              name={field2}
              onChange={(e) => onChangeInput(e)}
            />
          </Form.Item>
          <Form.Item name="idCoSo" label="Cơ sở" style={{ width: "320px" }}>
            <Select
              placeholder="Chọn cơ sở"
              style={{ width: "500px" }}
              name={field1}
              onChange={(e) => onChangeSelect(e)}
              //   onChange={onGenderChange}
              //   allowClear
            >
              {dataCoSo.map((option) => (
                <Option key={option.idCoSo} value={option.idCoSo}>
                  {option.tenCoSo}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#052C65",
              color: "#ffff",
              marginRight: "10px",
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            htmlType="submit"
            style={{
              backgroundColor: "#052C65",
              color: "#ffff",
            }}
            onClick={handleReset}
          >
            Làm mới
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default SearchBar;
