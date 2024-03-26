import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { deleteChucVu, fetchAllChucVus } from "../../apis/QuanLyChucVuAPI";
import TablePaginaton from "../component/TablePagination";
import ModalAddChucVu from "./ModalAddChucVu";
import { fetchAllCoSo } from "../../apis/QuanLyCoSoAPI";
import ModalUpdateChucVu from "./ModalUpdateChucVu";
import SearchBar from "../component/SearchBarInputSelect";

const QuanLyChucVu = () => {
  const [dataTimKiem, setDataTimKiem] = useState({
    pageNo: 1,
    pageSize: 5,
    tenChucVu: "",
    idCoSo: 0,
  });
  const [timKiem, setTimKiem] = useState(false); // id cơ sở
  const [dataChucVu, setDataChucVu] = useState([]); // Dữ liệu sản phẩm hiện tại
  const [dataCoSo, setDaTaCoSo] = useState([]); //dữ liệu danh sách sơ sở
  const [totalProducts, setTotalProducts] = useState(0); // Tổng số sản phẩm
  const [isModalAddChucVuOpen, setIsModalAddChucVuOpen] = useState(false);
  const [isModalUpdateChucVuOpen, setIsModalUpdateChucVuOpen] = useState(false);
  const [dataUpdateChucVu, setDataUpdateChucVu] = useState();
  const [deleteItemId, setDeleteItemId] = useState(null);

  const columns = [
    {
      title: "STT",
      dataIndex: "idChucVu",
      key: "idChucVu",
      width: "5%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên chức vụ",
      dataIndex: "tenChucVu",
      key: "idChucVu",
      width: "20%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "TenCoSo",
      dataIndex: "tenCoSo",
      key: "idChucVu",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hành động",
      key: "idCoSo",
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
              handleUpdateChucVu(row);
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
              setDeleteItemId(row.idChucVu);
            }}
          ></Button>
        </>
      ),
    },
  ];

  const fetchDataChucVu = async () => {
    try {
      const data = await fetchAllChucVus(dataTimKiem);
      setDataChucVu(data.data.content);
      setTotalProducts(data.data.totalElement);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchDataCoSo = async () => {
    try {
      const data = await fetchAllCoSo();
      setDaTaCoSo(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setDataTimKiem({ ...dataTimKiem, pageNo: page, pageSize: pageSize });
  };

  const handelDeletedChucVu = async () => {
    try {
      const res = await deleteChucVu(deleteItemId);
      console.log(res.data);
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
        setDeleteItemId(null);
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

  const handleUpdateChucVu = (row) => {
    setIsModalUpdateChucVuOpen(true);
    setDataUpdateChucVu(row);
    console.log(row);
    console.log(dataUpdateChucVu);
  };

  // const handleUpdateXoaMemCoSo = async (row) => {
  //   // const formValue = await form.getFieldsValue().tenCoSo;
  //   // console.log(formValue);
  //   setDataUpdateCoSo(row);
  //   try {
  //     const res = await updateXoaMemCoSo(row);
  //     console.log(res.data);
  //     if (res.data.httpStatus === "OK") {
  //       toast.success(res.data.message, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     } else if (res.data.httpStatus === "NOT_ACCEPTABLE") {
  //       toast.warning(res.data.message, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     } else {
  //       toast.error(res.data.message, {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  useEffect(() => {
    // Hàm gọi fetchAllProducts khi pageNo hoặc pageSize thay đổi
    fetchDataChucVu();
    fetchDataCoSo();
  }, [
    dataTimKiem.pageNo,
    isModalAddChucVuOpen,
    deleteItemId,
    isModalUpdateChucVuOpen,
    timKiem,
  ]);

  return (
    <>
      <h2
        className={"text-primary-emphasis p-4 gap-3 d-flex align-items-center"}
      >
        Quản lý chức vụ
      </h2>
      <Container fluid className={"shadow-lg p-5 rounded-3 "}>
        <SearchBar
          dataCoSo={dataCoSo}
          setDataTimKiem={setDataTimKiem}
          dataTimKiem={dataTimKiem}
          field1={"idCoSo"}
          field2={"tenChucVu"}
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
            <h4 className="p-2">Quản lý chức vụ</h4>
          </div>
          <Button
            type="primary"
            onClick={() => setIsModalAddChucVuOpen(true)}
            style={{
              backgroundColor: "#052C65",
              color: "#ffff",
            }}
            icon={<PlusCircleOutlined />}
          ></Button>
        </div>
        <TablePaginaton
          column={columns}
          data={dataChucVu}
          setTotalProducts={setTotalProducts}
          total={totalProducts}
          pageNo={dataTimKiem.pageNo}
          pageSize={dataTimKiem.pageSize}
          handlePageChange={handlePageChange}
        ></TablePaginaton>
      </Container>

      <ModalAddChucVu
        isModalAddChucVuOpen={isModalAddChucVuOpen}
        setIsModalAddChucVuOpen={setIsModalAddChucVuOpen}
        dataCoSo={dataCoSo}
      ></ModalAddChucVu>

      <ModalUpdateChucVu
        isModalUpdateChucVuOpen={isModalUpdateChucVuOpen}
        setIsModalUpdateChucVuOpen={setIsModalUpdateChucVuOpen}
        dataUpdateChucVu={dataUpdateChucVu}
        setDataUpdateChucVu={setDataUpdateChucVu}
      ></ModalUpdateChucVu>

      <Modal
        title="Xác nhận xóa"
        visible={deleteItemId !== null}
        onCancel={() => setDeleteItemId(null)}
        onOk={handelDeletedChucVu}
      >
        <p>Bạn có chắc muốn xóa chức vụ này?</p>
      </Modal>
    </>
  );
};
export default QuanLyChucVu;
