import { Button, Table } from "antd";
import { useGiaoVienDayMon } from "../hooks/useGiaoVienDayMon";
import ModalDetail from "../layout/ModalDetail";

import { Space } from "antd";
import { EditOutlined, EyeFilled, PlusCircleFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";
import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";

const QuanLyGiaoVienDayMon = () => {
  const {
    listGiaoVienDayMon,
    tableLoading,
    totalPage,
    pageSize,
    getPageGiaoVienDayMon,
  } = useGiaoVienDayMon();

  const [openDetail, setOpenDetail] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [openUpdate, setOpenUpdate] = useState(false);

  const [giaoVienDayMonId, setGiaoVienDayMonId] = useState(0);

  const handleDetailGiaoVienDayMon = (id) => {
    setGiaoVienDayMonId(id);
    setOpenDetail(true);
  };

  const handleUpdateGiaoVienDayMon = (id) => {
    setGiaoVienDayMonId(id);
    setOpenUpdate(true);
  };

  const fetchDataTable = async (page) => {
    getPageGiaoVienDayMon(page)
  }

  useEffect(() => {
    fetchDataTable(0)
  }, [openAdd, openUpdate]);

  const columns = [
    {
      title: "STT",
      dataIndex: "idGiaoVienDayMon",
      key: "stt",
      render: (_, __, index) => index + 1            
    },
    {
      title: "Mã giáo viên",
      dataIndex: "maGiaoVien",
      key: "nhanVien",
    },
    {
      title: "Tên giáo viên",
      dataIndex: "tenGiaoVien",
      key: "nhanVien",
    },
    {
      title: "Mã môn học",
      dataIndex: "maMonHoc",
      key: "monHoc",
    },
    {
      title: "Tên môn học",
      dataIndex: "tenMonHoc",
      key: "monHoc",
    },
    {
      title: "Hình thức",
      dataIndex: "hinhThuc",
      key: "monHoc",
    },
    {
      title: "Học kỳ",
      dataIndex: "tenHocKy",
      key: "hocKy",
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => handleDetailGiaoVienDayMon(record.idGiaoVienDayMon)}
          >
            <EyeFilled />
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => handleUpdateGiaoVienDayMon(record.idGiaoVienDayMon)}
          >
            <EditOutlined />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1>Quản lý giáo viên dạy môn</h1>
      <Button
        type="primary"
        shape="round"
        icon={<PlusCircleFilled />}
        size={"large"}
        className="bg-success mt-3 mb-3"
        onClick={() => setOpenAdd(true)}
      >
        Thêm
      </Button>
      <Table
        columns={columns}
        loading={tableLoading}
        dataSource={listGiaoVienDayMon}
        pagination={{
          pageSize: pageSize,
          total: totalPage,
          onChange: (page) => {
            getPageGiaoVienDayMon(page - 1);
          },
        }}
        rowKey={(record) => record.idGiaoVienDayMon}
      />
      <ModalDetail
        openModal={openDetail}
        setOpenModal={() => setOpenDetail(false)}
        idGiaoVienDayMon={giaoVienDayMonId}
      />
      <ModalAdd
        openModal={openAdd}
        setOpenModal={() => setOpenAdd(false)}
        afterClose={() => fetchDataTable(0)}
      />
      <ModalUpdate
        openModal={openUpdate}
        setOpenModal={() => setOpenUpdate(false)}
        idGiaoVienDayMon={giaoVienDayMonId}
        afterClose={() => fetchDataTable(0)}
      />
    </>
  );
};

export default QuanLyGiaoVienDayMon;
