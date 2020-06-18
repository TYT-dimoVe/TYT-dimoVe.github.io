import {
  DesktopOutlined,
  FrownOutlined,
  LoadingOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu, Spin } from "antd";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { FiFileText, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { COLOR } from "ultis/functions";
import BusOperator from "./component/busOperatorTable";
import CustomerList from "./component/customerList";
import Home from "./component/homePage";
import OrderList from "./component/orderListTable";
import TripList from "./component/tripTable";
import "./dashboard.css";
import { GetBusOperatorDetail } from "./redux/actions";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [menuSelect, setMenuSelect] = useState("0");
  const accountType = useSelector((state) => state.Dashboard.accountType);
  const accountDetail = useSelector((state) => state.Dashboard.accountDetail);
  const isLoadingDashboard = useSelector(
    (state) => state.Dashboard.isLoadingDashboard
  );

  useEffect(() => {
    if (accountType && accountType !== "admin") {
      dispatch(GetBusOperatorDetail.get({ busOperatorId: accountType }));
    }
  }, []);

  const onMenuSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    setMenuSelect(key);
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
    history.push("/");
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

  if (isLoadingDashboard) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }

  if (!accountType) {
    return (
      <div id="empty">
        <div id="errorWrap">
          <FrownOutlined style={{ fontSize: 60, color: COLOR.primary }} />
          <p style={{ textAlign: "center", paddingBottom: 16 }}>
            Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn. Nhấn đăng nhập
            để đăng nhập lại.
          </p>
          <Button
            type="primary"
            style={{
              borderColor: "white",
            }}
            onClick={() => history.push("/")}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div id="dashboardBg">
      <div id="menuContainer">
        <Avatar size={100} src="https://source.unsplash.com/random" />
        <span id="adminName">
          {accountDetail ? accountDetail.name : "Admin"}
        </span>
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
          {accountType === "admin" && (
            <Menu.Item
              style={{ color: "white" }}
              key="4"
              icon={<FiUsers size={16} style={{ marginRight: 8 }} />}
            >
              Hành khách
            </Menu.Item>
          )}
        </Menu>
        <Button
          type="primary"
          style={{
            width: "80%",
            marginTop: 64,
            borderColor: "white",
          }}
          onClick={() => handleSignOut()}
        >
          Đăng xuất
        </Button>
      </div>
      {renderRightDashboard()}
    </div>
  );
}

export default Dashboard;
