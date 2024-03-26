import React, { useEffect, useState } from "react";
import { Tag, Button, Modal } from "antd";
import TablePaginaton from "../../component/TablePagination";
import {
  fetchAllBoMon,
  fetchAllBoMonTheoCoSo,
  fetchAllNhanVien,
  updateXoaMemBoMonTheoCoSo,
} from "../../../apis/QuanLyCoSoAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import SearchBar from "../../component/SearchBarInputSelect";
import ModalAddBoMonTheoCoSo from "./ModalAddBoMonTheoCoSo";
import { toast } from "react-toastify";

const QuanLyBoMonTheoCoSo = ({
  isModalBoMonOpen,
  setIsModalBoMonOpen,
  dataCoSo,
}) => {
  const [dataTimKiem, setDataTimKiem] = useState({
    pageNo: 1,
    pageSize: 5,
    idCoSo: 0,
    tenBoMon: "",
  }); // Dữ liệu tìm kiếm
  const [dataCreateBoMon, setDataCreateBoMon] = useState({
    idBoMon: 0,
    idNhanVien: 0,
    idCoSo: 0,
  }); // Dữ liệu tìm kiếm
  const [dataBoMonTheoCoSo, setDataBoMonTheoCoSo] = useState([]); // Dữ liệu sản phẩm hiện tại
  const [totalProducts, setTotalProducts] = useState(0); // Tổng số sản phẩm
  const [timKiem, setTimKiem] = useState(false); // Tổng số sản phẩm
  const [idBoMonTheoCoSoXoaMem, setIdBoMonTheoCoSoXoaMem] = useState(0); // Tổng số sản phẩm
  const [isModalAddBoMonTheoCoSoOpen, setIsModalAddBoMonTheoCoSoOpen] =
    useState(false);

  const columns = [
    {
      title: "STT",
      dataIndex: "idBoMonTheoCoSo",
      key: "idBoMonTheoCoSo",
      width: "5%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Bộ môn",
      dataIndex: "tenBoMon",
      key: "idBoMonTheoCoSo",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Cơ sở",
      dataIndex: "tenCoSo",
      key: "idBoMonTheoCoSo",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trưởng bộ môn",
      dataIndex: "tenTruongBoMon",
      key: "idBoMonTheoCoSo",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      dataIndex: "xoaMem",
      key: "idBoMonTheoCoSo",
      align: "center",
      render: (text) => (
        <Tag color={text === "CHUA_XOA" ? "green" : "red"}>
          {text === "CHUA_XOA" ? "Hoạt động" : "Ngừng hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "idBoMonTheoCoSo",
      align: "center",
      render: (row) => (
        <>
          <Button
            icon={<DeleteOutlined />}
            size={"large"}
            type={"primary"}
            style={{
              backgroundColor: "#BF3131",
              color: "#ffff",
            }}
            onClick={() => {
              handleUpdateXoaMemBoMonCoSo(row.idBoMonTheoCoSo);
            }}
          ></Button>
        </>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      // console.log(dataTimKiem);
      const data = await fetchAllBoMonTheoCoSo(dataTimKiem);
      console.log(data.data.content);
      setDataBoMonTheoCoSo(data.data.content);
      setTotalProducts(data.data.totalElement);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageChange = (page, pageSize) => {
    // setPageNo(page);
    // setPageSize(pageSize);
    setDataTimKiem({ ...dataTimKiem, pageNo: page, pageSize: pageSize });
  };

  const handleUpdateXoaMemBoMonCoSo = async (idBoMonTheoCoSo) => {
    setIdBoMonTheoCoSoXoaMem(idBoMonTheoCoSo);
    console.log(idBoMonTheoCoSoXoaMem);
    try {
      const res = await updateXoaMemBoMonTheoCoSo(idBoMonTheoCoSo);
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
      setIdBoMonTheoCoSoXoaMem(0);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // Hàm gọi fetchAllProducts khi pageNo hoặc pageSize thay đổi
    fetchData();
  }, [
    dataTimKiem.pageNo,
    timKiem,
    isModalAddBoMonTheoCoSoOpen,
    idBoMonTheoCoSoXoaMem,
  ]);

  return (
    <Modal
      open={isModalBoMonOpen}
      // onOk={handleOk}
      onCancel={() => setIsModalBoMonOpen(false)}
      width={1300}
      footer={null}
    >
      <h2
        className={"text-primary-emphasis p-4 gap-3 d-flex align-items-center"}
      >
        Quản lý bộ môn
      </h2>
      <Container fluid className={"shadow-lg p-5 rounded-3 "}>
        <SearchBar
          dataCoSo={dataCoSo}
          setDataTimKiem={setDataTimKiem}
          dataTimKiem={dataTimKiem}
          field1={"idCoSo"}
          field2={"tenBoMon"}
          setTimKiem={setTimKiem}
          timKiem={timKiem}
        ></SearchBar>
      </Container>
      <Container fluid className={"shadow-lg p-4 rounded-3 mt-5"}>
        <div className={"d-flex justify-content-between align-items-center"}>
          <div className={"d-flex align-items-center mb-3"}>
            <Button
              icon={<UnorderedListOutlined className="custom-icon" />}
              style={{
                backgroundColor: "#052C65",
                color: "#ffff",
              }}
            ></Button>
            <h4 className="p-2">Quản lý bộ môn</h4>
          </div>
          <Button
            type="primary"
            onClick={() => setIsModalAddBoMonTheoCoSoOpen(true)}
            style={{
              backgroundColor: "#052C65",
              color: "#ffff",
            }}
            icon={<PlusCircleOutlined />}
          ></Button>
        </div>
        <TablePaginaton
          column={columns}
          data={dataBoMonTheoCoSo}
          setTotalProducts={setTotalProducts}
          total={totalProducts}
          pageNo={dataTimKiem.pageNo}
          pageSize={dataTimKiem.pageSize}
          handlePageChange={handlePageChange}
        ></TablePaginaton>
      </Container>
      <ModalAddBoMonTheoCoSo
        isModalAddBoMonTheoCoSoOpen={isModalAddBoMonTheoCoSoOpen}
        setIsModalAddBoMonTheoCoSoOpen={setIsModalAddBoMonTheoCoSoOpen}
        dataCoSo={dataCoSo}
        dataCreateBoMon={dataCreateBoMon}
        setDataCreateBoMon={setDataCreateBoMon}
      ></ModalAddBoMonTheoCoSo>
    </Modal>
  );
};
export default QuanLyBoMonTheoCoSo;
