import { Button, Form, Input, Select, Space, Modal, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  fetchAllCoSoConById,
  saveCoSo,
  updateCoSo,
  updateXoaMemCoSoCon,
} from "../../apis/QuanLyCoSoAPI";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import TablePaginaton from "../component/TablePagination";
import { Container } from "react-bootstrap";
import SearchBar from "../component/SearchBarInput";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import ModalAddCoSoCon from "./ModalAddCoSoCon";
import ModalUpdateCoSoCon from "./ModalUpdateCoSoCon";

const ModalUpdateCoSo = ({
  isModalUpdateCoSoOpen,
  dataUpdateCoSo,
  setIsModalUpdateCoSoOpen,
  setDataUpdateCoSo,
}) => {
  const [form] = Form.useForm();
  const [dataTimKiemCoSoCon, setDataTimKiemCoSoCon] = useState({
    pageNo: 1,
    pageSize: 3,
    listTenCoSoCon: [""],
  });
  const [totalCoSoCon, setTotalCoSoCon] = useState(); // số lượng cơ sở con
  const [dataCoSoCon, setDataCoSoCon] = useState([]); // Danh sách cơ sở con
  const [isModalAddCoSoConOpen, setIsModalAddCoSoConOpen] = useState(false); //
  const [isModalUpdateCoSoConOpen, setIsModalUpdateCoSoConOpen] =
    useState(false); //
  const [dataUpdateCoSoCon, setDataUpdateCoSoCon] = useState(); //
  const [deleteItemId, setDeleteItemId] = useState(null);

  const columns = [
    {
      title: "STT",
      dataIndex: "idCoSoCon",
      key: "idCoSoCon",
      width: "5%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên cơ sở con",
      dataIndex: "tenCoSoCon",
      key: "idCoSoCon",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      dataIndex: "xoaMemCoSoCon",
      key: "idCoSoCon",
      align: "center",
      render: (text) => (
        <Tag color={text === "CHUA_XOA" ? "green" : "red"}>
          {text === "CHUA_XOA" ? "Hoạt động" : "Ngừng hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "idCoSoCon",
      align: "center",
      render: (row) => (
        <>
          <Button
            icon={<FontAwesomeIcon icon={faBuildingCircleArrowRight} />}
            size={"large"}
            type={"primary"}
            style={{
              backgroundColor: "#052C65",
              color: "#ffff",
              marginRight: "10px",
            }}
            onClick={() => {
              handleUpdateCoSoCon(row);
            }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            size={"large"}
            type={"primary"}
            style={{
              backgroundColor: "#BF3131",
              color: "#ffff",
            }}
            onClick={() => {
              handleUpdateXoaMemCoSoCon(row.idCoSoCon);
            }}
          ></Button>
        </>
      ),
    },
  ];

  const fetchDataCoSoCon = async () => {
    try {
      const data = await fetchAllCoSoConById(
        dataTimKiemCoSoCon.pageNo,
        dataTimKiemCoSoCon.pageSize,
        dataTimKiemCoSoCon.listTenCoSoCon,
        dataUpdateCoSo.idCoSo
      );
      console.log(data.data.content);
      setDataCoSoCon(data.data.content);
      setTotalCoSoCon(data.data.totalElement);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onFinish = () => {
    hanleUpdateCoSo();
  };

  const handleCloseUpdateCoSoOpen = () => {
    setIsModalUpdateCoSoOpen(false);
    form.resetFields();
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDataUpdateCoSo({ ...dataUpdateCoSo, [name]: value });
    console.log(dataUpdateCoSo);
  };

  const hanleUpdateCoSo = async () => {
    // const formValue = await form.getFieldsValue().tenCoSo;
    // console.log(formValue);
    try {
      const res = await updateCoSo(dataUpdateCoSo);
      console.log(res.data);
      if (res.data.httpStatus === "OK") {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        handleCloseUpdateCoSoOpen();
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

  const handlePageChange = (page, pageSize) => {
    setDataTimKiemCoSoCon({
      ...dataTimKiemCoSoCon,
      pageNo: page,
      pageSize: pageSize,
    });
  };

  const handleUpdateXoaMemCoSoCon = async (idCoSoCon) => {
    setDeleteItemId(idCoSoCon);
    try {
      const res = await updateXoaMemCoSoCon(idCoSoCon);
      console.log(res.data);
      if (res.data.httpStatus === "OK") {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
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
      setDeleteItemId(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setDeleteItemId(null);
    }
  };

  const handleUpdateCoSoCon = (row) => {
    setDataUpdateCoSoCon(row);
    setIsModalUpdateCoSoConOpen(true);
  };

  useEffect(() => {
    form.setFieldsValue({ tenCoSo: dataUpdateCoSo?.tenCoSo }); // Cập nhật giá trị của form khi dataUpdateCoSo thay đổi
    fetchDataCoSoCon();
    console.log(dataCoSoCon);
  }, [
    dataTimKiemCoSoCon,
    isModalAddCoSoConOpen,
    isModalUpdateCoSoConOpen,
    deleteItemId,
    dataUpdateCoSo,
  ]);

  return (
    <>
      <Modal
        open={isModalUpdateCoSoOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalUpdateCoSoOpen(false)}
        footer={null}
        width={1000} // Thiết lập chiều rộng của Modal
        height={3000} // Thiết lập chiều cao của Modal
      >
        <h2>Sửa cơ sở</h2>

        <Container fluid className={"shadow-sm border p-4 rounded-3 pt-5"}>
          <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            className={"d-flex justify-content-center align-items-center"}
            //   style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="tenCoSo"
              label="Tên cơ sở"
              rules={[{ required: true }]}
            >
              <Input
                onChange={(e) => onChangeInput(e)}
                name="tenCoSo"
                className="mx-2"
                style={{ width: "650px" }} // Sử dụng thuộc tính style để thiết lập chiều rộng là 100%
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
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#052C65",
                  color: "#ffff",
                }}
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        </Container>

        <Container fluid className={"shadow-sm border p-4 rounded-3 mt-3 "}>
          <SearchBar
            setDataTimKiem={setDataTimKiemCoSoCon}
            dataTimKiem={dataTimKiemCoSoCon}
            nameField={"listTenCoSoCon"}
          ></SearchBar>
        </Container>
        <Container fluid className={"shadow-sm border p-4 rounded-3 mt-3"}>
          <div className={"d-flex justify-content-between align-items-center"}>
            <div className={"d-flex align-items-center mb-3"}>
              <Button
                icon={<UnorderedListOutlined />}
                style={{
                  backgroundColor: "#052C65",
                  color: "#ffff",
                }}
              ></Button>
              <h4 className="p-2">Quản lý cơ sở con</h4>
            </div>

            <Button
              onClick={() => setIsModalAddCoSoConOpen(true)}
              style={{
                backgroundColor: "#052C65",
                color: "#ffff",
              }}
              icon={<PlusCircleOutlined className="custom-icon" />}
            ></Button>
          </div>
          <TablePaginaton
            column={columns}
            data={dataCoSoCon}
            setTotalProducts={setTotalCoSoCon}
            total={totalCoSoCon}
            pageNo={dataTimKiemCoSoCon.pageNo}
            pageSize={dataTimKiemCoSoCon.pageSize}
            handlePageChange={handlePageChange}
          ></TablePaginaton>
        </Container>

        <ModalAddCoSoCon
          isModalAddCoSoConOpen={isModalAddCoSoConOpen}
          setIsModalAddCoSoConOpen={setIsModalAddCoSoConOpen}
          dataUpdateCoSo={dataUpdateCoSo}
        ></ModalAddCoSoCon>
        <ModalUpdateCoSoCon
          isModalUpdateCoSoConOpen={isModalUpdateCoSoConOpen}
          setIsModalUpdateCoSoConOpen={setIsModalUpdateCoSoConOpen}
          dataUpdateCoSoCon={dataUpdateCoSoCon}
          setDataUpdateCoSoCon={setDataUpdateCoSoCon}
        ></ModalUpdateCoSoCon>
      </Modal>
    </>
  );
};
export default ModalUpdateCoSo;
