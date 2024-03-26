import { useBlock } from '../hooks/useBlock'

import React, { useEffect } from 'react';
import { Form, Select, DatePicker, Table } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs'

const ChiTietHocKy = ({ data }) => {
  dayjs.extend(customParseFormat);
  const idHocKy = data.id

  const {listBlockByIdHk, getListBlockByIdHocKy} = useBlock();

  useEffect(() => {
    getListBlockByIdHocKy(idHocKy);
  }, [idHocKy]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_, __, index) => index + 1
    },
    {
      title: 'Tên block',
      dataIndex: 'ten',
      key: 'ten',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'thoiGianBatDau',
      key: 'thoiGianBatDau',
      render: (text) => {return dayjs(text).format('DD/MM/YYYY')}
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'thoiGianKetThuc',
      key: 'thoiGianKetThuc',
      render: (text) => {return dayjs(text).format('DD/MM/YYYY')}
    },
  ];

  return (
    <>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        layout="horizontal"
        initialValues={{ size: 'large' }}
      >
        <Form.Item label="Tên học kỳ" >
          <Select value={data.ten} disabled ></Select>
        </Form.Item>
        <Form.Item label="Năm học">
          <DatePicker
            value={dayjs(`${data.nam}`, "YYYY")}
            format={"YYYY"}
            style={{ width: '100%' }}
            disabled
          />
        </Form.Item>
        <Form.Item label="Ngày bắt đầu">
          <DatePicker
            value={dayjs(data.thoiGianBatDau, "YYYY/MM/DD")}
            format={"DD/MM/YYYY"}
            style={{ width: '100%' }}
            disabled
          />
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={ listBlockByIdHk } rowKey={(record) => record.id} pagination={false}/>
    </>
  );
};

export default ChiTietHocKy;