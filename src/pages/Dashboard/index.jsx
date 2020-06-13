import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import React, { useState } from "react";
import { FiFileText, FiUsers } from "react-icons/fi";
import BusOperator from "./component/busOperatorTable";
import CustomerList from "./component/customerList";
import OrderList from "./component/orderListTable";
import TripList from "./component/tripTable";
import "./dashboard.css";

function Dashboard() {
  const [menuSelect, setMenuSelect] = useState("1");

  const onMenuSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    setMenuSelect(key);
  };

  const renderRightDashboard = () => {
    switch (menuSelect) {
      case "1":
        return <BusOperator />;
      case "2":
        return <TripList />;
      case "3":
        return <OrderList />;
      case "4":
        return <CustomerList />;
      default:
        return <BusOperator />;
    }
  };

  return (
    <div id="dashboardBg">
      <div id="menuContainer">
        <Avatar size={100} src="https://source.unsplash.com/random" />
        <span id="adminName">Admin</span>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          onSelect={onMenuSelect}
        >
          <Menu.Item
            style={{ color: "white" }}
            key="1"
            icon={<PieChartOutlined />}
          >
            Nhà xe
          </Menu.Item>
          <Menu.Item
            style={{ color: "white" }}
            key="2"
            icon={<DesktopOutlined />}
          >
            Chuyến xe
          </Menu.Item>
          <Menu.Item
            style={{ color: "white" }}
            key="3"
            icon={<FiFileText size={16} style={{ marginRight: 8 }} />}
          >
            Đơn hàng
          </Menu.Item>
          <Menu.Item
            style={{ color: "white" }}
            key="4"
            icon={<FiUsers size={16} style={{ marginRight: 8 }} />}
          >
            Hành khách
          </Menu.Item>
        </Menu>
      </div>
      {renderRightDashboard()}
    </div>
  );
}

export default Dashboard;
