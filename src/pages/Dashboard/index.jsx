import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Avatar, Menu, Button } from "antd";
import React, { useState } from "react";
import { FiFileText, FiUsers } from "react-icons/fi";
import BusOperator from "./component/busOperatorTable";
import CustomerList from "./component/customerList";
import OrderList from "./component/orderListTable";
import TripList from "./component/tripTable";
import "./dashboard.css";
import firebase from "firebase";
import Home from "./component/homePage";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const [menuSelect, setMenuSelect] = useState("0");
  const accountType = useSelector((state) => state.Dashboard.accountType);

  const onMenuSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    setMenuSelect(key);
  };

  const renderRightDashboard = () => {
    switch (menuSelect) {
      case "0":
        return <Home />;
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
          defaultSelectedKeys={["0"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          onSelect={onMenuSelect}
        >
          <Menu.Item
            style={{ color: "white" }}
            key="0"
            icon={<PieChartOutlined />}
          >
            Trang chủ
          </Menu.Item>
          {accountType === "admin" && (
            <Menu.Item
              style={{ color: "white" }}
              key="1"
              icon={<PieChartOutlined />}
            >
              Nhà xe
            </Menu.Item>
          )}
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
        <Button
          type="primary"
          style={{
            width: "80%",
            marginTop: 64,
            borderColor: "white",
          }}
          onClick={() => firebase.auth().signOut()}
        >
          Đăng xuất
        </Button>
      </div>
      {renderRightDashboard()}
    </div>
  );
}

export default Dashboard;
