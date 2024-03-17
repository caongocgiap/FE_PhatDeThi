import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const DashBroardBanDaoTao = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key) => {
    nav(key);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: "/bandaotao/quan-ly-co-so",
              icon: <UserOutlined />,
              label: "Quản lý cơ sở",
            },
            {
              key: "/bandaotao/quan-ly-mon-hoc",
              icon: <VideoCameraOutlined />,
              label: "Quản lý môn học",
            },
            {
              key: "/bandaotao/quan-ly-hoc-ky",
              icon: <UploadOutlined />,
              label: "Quản lý học kỳ",
            },
            {
              key: "/bandaotao/quan-ly-nhan-vien",
              icon: <UploadOutlined />,
              label: "Quản lý nhân viên",
            },
            {
              key: "/bandaotao/quan-ly-bo-mon",
              icon: <UploadOutlined />,
              label: "Quản lý bộ môn",
            },
            {
              key: "/bandaotao/quan-ly-chuc-vu",
              icon: <UploadOutlined />,
              label: "Quản lý chức vụ",
            },
              {
                  key: "/bandaotao/quan-ly-lop-mon",
                  icon: <UploadOutlined />,
                  label: "Quản lý lớp môn",
              },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashBroardBanDaoTao;
