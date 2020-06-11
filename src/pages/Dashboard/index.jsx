import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Menu, Avatar, Input, Button, Table } from "antd";
import React, { useState } from "react";
import "./dashboard.css";
import "antd/dist/antd.css";

const { Search } = Input;

const columns = [
  {
    title: "Nhà xe",
    dataIndex: "name",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    sorter: {
      compare: (a, b) => a.address < b.address,
      multiple: 3,
    },
  },
  {
    title: "SĐT",
    dataIndex: "phoneNumber",
    sorter: {
      compare: (a, b) => a.phoneNumber < b.phoneNumber,
      multiple: 2,
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: {
      compare: (a, b) => a.email < b.email,
      multiple: 1,
    },
  },
];

const data = [
  {
    busOperatorId: "TRALANVIEN",
    username: "tra_lan_vien",
    name: "Trà Lan Viên",
    address: "221 PHẠM NGŨ LÃO, QUẬN 1, TP.HCM",
    email: "tralanvien@gmail.com",
    phoneNumber: "0912345678",
  },
  {
    busOperatorId: "TRALANVIEN",
    username: "tra_lan_vien",
    name: "Trà Lan Viên",
    address: "221 PHẠM NGŨ LÃO, QUẬN 1, TP.HCM",
    email: "tralanvien@gmail.com",
    phoneNumber: "0912345678",
  },
  {
    busOperatorId: "TRALANVIEN",
    username: "tra_lan_vien",
    name: "Trà Lan Viên",
    address: "221 PHẠM NGŨ LÃO, QUẬN 1, TP.HCM",
    email: "tralanvien@gmail.com",
    phoneNumber: "0912345678",
  },
  {
    busOperatorId: "TRALANVIEN",
    username: "tra_lan_vien",
    name: "Trà Lan Viên",
    address: "221 PHẠM NGŨ LÃO, QUẬN 1, TP.HCM",
    email: "tralanvien@gmail.com",
    phoneNumber: "0912345678",
  },
];

function Dashboard() {
  const [collapsed, setCollasped] = useState(false);
  const [menuSelect, setMenuSelect] = useState("1");

  const onChangeBusOperator = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const renderBusOperatorList = () => (
    <div className="chooseContainer">
      <span className="titleTopic">Danh sách nhà xe</span>
      <div id="searchContainer">
        <Search
          placeholder="Nhập tên nhà xe,..."
          onSearch={(value) => console.log(value)}
          style={{ width: "50%" }}
        />
        <Button type="primary" icon={<PlusCircleOutlined />}>
          Thêm nhà xe mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChangeBusOperator}
      />
    </div>
  );

  const renderBusTripList = () => (
    <div className="chooseContainer">
      <span className="titleTopic">Danh sách chuyến xe</span>
      <div id="searchContainer">
        <Search
          placeholder="Nhập tên nhà xe,..."
          onSearch={(value) => console.log(value)}
          style={{ width: "50%" }}
        />
        <Button type="primary" icon={<PlusCircleOutlined />}>
          Thêm nhà xe mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChangeBusOperator}
      />
    </div>
  );

  const renderBookingList = () => (
    <div className="chooseContainer">
      <span className="titleTopic">Danh sách đơn hàng</span>
      <div id="searchContainer">
        <Search
          placeholder="Nhập tên nhà xe,..."
          onSearch={(value) => console.log(value)}
          style={{ width: "50%" }}
        />
        <Button type="primary" icon={<PlusCircleOutlined />}>
          Thêm nhà xe mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChangeBusOperator}
      />
    </div>
  );

  const renderCustomerList = () => (
    <div className="chooseContainer">
      <span className="titleTopic">Danh sách hành khách</span>
      <div id="searchContainer">
        <Search
          placeholder="Nhập tên nhà xe,..."
          onSearch={(value) => console.log(value)}
          style={{ width: "50%" }}
        />
        <Button type="primary" icon={<PlusCircleOutlined />}>
          Thêm nhà xe mới
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChangeBusOperator}
      />
    </div>
  );

  const onMenuSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    setMenuSelect(key);
  };

  const renderRightDashboard = () => {
    switch (menuSelect) {
      case "1":
        return renderBusOperatorList();
      case "2":
        return renderBusTripList();
      case "3":
        return renderBookingList();
      case "4":
        return renderCustomerList();
      default:
        return renderBusOperatorList();
    }
  };

  return (
    <div id="dashboardBg">
      <div id="menuContainer">
        <Avatar size={100} src="https://source.unsplash.com/random" />
        <span id="adminName">Admin Black</span>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          // theme="dark"
          inlineCollapsed={collapsed}
          onSelect={onMenuSelect}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Nhà xe
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Chuyến xe
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Đơn hàng
          </Menu.Item>
          <Menu.Item key="4" icon={<ContainerOutlined />}>
            Hành khách
          </Menu.Item>
        </Menu>
      </div>
      {renderRightDashboard()}
    </div>
  );
}

export default Dashboard;
