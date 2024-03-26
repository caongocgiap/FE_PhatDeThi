import ChiTietHocKy from "./ChiTietHocKy";
import ThemMoiHocKy from "./ThemMoiHocKy";
import SuaHocKy from "./SuaHocKy";
import { useHocKy } from "../hooks/useHocKy";

import { Input, Space, Button, Table, Tag, Modal } from "antd";
import { PlusCircleFilled, EditOutlined, EyeFilled } from "@ant-design/icons";
import { React, useState } from "react";
import dayjs from "dayjs";

const QuanLyHocKy = () => {
  const [rowData, setRowData] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showInsertHK, setShowInsertHK] = useState(false);
  const [showEditHK, setShowEditHK] = useState(false);
  const { Search } = Input;

  const { listHocKy, totalPage, pageSize, tableLoading, getPaggingHocKy } =
    useHocKy();
  const onSearch = (value, _e, info) => console.log(info.source, value);

  const showDetailModal = (data) => {
    setShowDetail(true);
    setRowData(data);
  };

  const showEditModal = (data) => {
    setShowEditHK(true);
    setRowData(data);
  };

  const fetchDataTable = async (page) => {
    getPaggingHocKy(page);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên học kỳ",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Năm học",
      dataIndex: "nam",
      key: "nam",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "thoiGianBatDau",
      key: "thoiGianBatDau",
      render: (text) => {
        return dayjs(text).format("DD/MM/YYYY");
      },
    },
    {
      title: "Trạng thái",
      key: "xoaMem",
      dataIndex: "xoaMem",
      render: (_, { xoaMem }) => {
        let color = xoaMem === "CHUA_XOA" ? "green" : "volcano";
        let contentTag = xoaMem === "CHUA_XOA" ? "Chưa xóa" : "Đã xóa";
        return (
          <>
            <Tag color={color} key={xoaMem}>
              {contentTag.toUpperCase()}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => showDetailModal(record)}
          >
            <EyeFilled />
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => showEditModal(record)}
          >
            <EditOutlined />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1>Quản lý học kỳ - Block</h1>
      <Button
        type="primary"
        shape="round"
        icon={<PlusCircleFilled />}
        size={"large"}
        className="bg-success mt-3 mb-3"
        onClick={() => setShowInsertHK(true)}
      >
        Thêm
      </Button>
      <div className="d-flex justify-content-end">
        <Space direction="vertical">
          <Search
            placeholder="Tìm theo năm học"
            allowClear
            onSearch={onSearch}
            className="mb-4"
          />
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={listHocKy}
        pagination={{
          pageSize: pageSize,
          total: totalPage,
          onChange: (page) => {
            getPaggingHocKy(page - 1);
          },
        }}
        loading={tableLoading}
        rowKey={(record) => record.id}
      />

      <Modal
        title="Thông tin chi tiết học kỳ"
        open={showDetail}
        onCancel={() => setShowDetail(false)}
        footer={null}
        width={700}
        maxWidth={"50%"}
      >
        <ChiTietHocKy data={rowData} rowKey={(record) => record.id} />
      </Modal>

      <ThemMoiHocKy
        openModal={showInsertHK}
        setOpenModal={() => setShowInsertHK(false)}
        afterClose={() => fetchDataTable(0)}
      />

      <SuaHocKy
        openModal={showEditHK}
        setOpenModal={() => setShowEditHK(false)}
        afterClose={() => fetchDataTable(0)}
        data={rowData}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default QuanLyHocKy;
