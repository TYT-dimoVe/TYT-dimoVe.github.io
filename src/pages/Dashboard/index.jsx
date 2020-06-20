import {
  DesktopOutlined,
  LoadingOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu, Spin } from "antd";
import firebase from "firebase";
import React, { useEffect } from "react";
import { FiFileText, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { COLOR } from "ultis/functions";
import BusOperator from "./component/busOperatorTable";
import CustomerList from "./component/customerList";
import Home from "./component/homePage";
import OrderList from "./component/orderListTable";
import TripList from "./component/tripTable";
import { PAGE } from "./constant";
import "./dashboard.css";
import {
  GetAccountType,
  GetBusOperatorDetail,
  ResetDashboard,
  SetCurrentPage,
} from "./redux/actions";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const accountType = useSelector((state) => state.Dashboard.accountType);
  const accountDetail = useSelector((state) => state.Dashboard.accountDetail);
  const isLoadingDashboard = useSelector(
    (state) => state.Dashboard.isLoadingDashboard
  );

  useEffect(() => {
    dispatch(GetAccountType.get());
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await firebase
          .database()
          .ref("users")
          .child(firebase.auth().currentUser.uid)
          .once("value", async (snapshot) => {
            dispatch(
              GetBusOperatorDetail.get({ busOperatorId: snapshot.val() })
            );
          });
      }
    });
  }, []);

  const currentPage = useSelector((state) => state.Dashboard.currentPage);

  const onMenuSelect = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    dispatch(SetCurrentPage.get({ currentPage: key }));
  };

  const handleSignOut = () => {
    firebase.auth().signOut();
    dispatch(ResetDashboard.get());
    history.push("/");
  };

  const renderRightDashboard = () => {
    switch (currentPage) {
      case PAGE.HOME:
        return <Home />;
      case PAGE.BUS_OPERATOR:
        return <BusOperator />;
      case PAGE.TRIP_LIST:
        return <TripList />;
      case PAGE.ORDER_LIST:
        return <OrderList />;
      case PAGE.CUSTOMER_LIST:
        return <CustomerList />;
      default:
        return <BusOperator />;
    }
  };

  if (isLoadingDashboard || !accountType) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }

  // if (!accountType) {
  //   return (
  //     <div id="empty">
  //       <div id="errorWrap">
  //         <FrownOutlined style={{ fontSize: 60, color: COLOR.primary }} />
  //         <p style={{ textAlign: "center", paddingBottom: 16 }}>
  //           Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn. Nhấn đăng nhập
  //           để đăng nhập lại.
  //         </p>
  //         <Button
  //           type="primary"
  //           style={{
  //             borderColor: "white",
  //           }}
  //           onClick={() => history.push("/")}
  //         >
  //           Đăng nhập
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div id="dashboardBg">
      <div id="menuContainer">
        <Avatar size={100} src="https://source.unsplash.com/random" />
        <span id="adminName">
          {accountType !== "admin" ? accountDetail.name : "Admin"}
        </span>
        <Menu
          defaultSelectedKeys={[PAGE.HOME]}
          selectedKeys={[currentPage]}
          mode="inline"
          onSelect={onMenuSelect}
        >
          <Menu.Item
            style={{ color: "white" }}
            key={PAGE.HOME}
            icon={<PieChartOutlined />}
          >
            Trang chủ
          </Menu.Item>
          {accountType === "admin" && (
            <Menu.Item
              style={{ color: "white" }}
              key={PAGE.BUS_OPERATOR}
              icon={<PieChartOutlined />}
            >
              Nhà xe
            </Menu.Item>
          )}
          <Menu.Item
            style={{ color: "white" }}
            key={PAGE.TRIP_LIST}
            icon={<DesktopOutlined />}
          >
            Chuyến xe
          </Menu.Item>
          <Menu.Item
            style={{ color: "white" }}
            key={PAGE.ORDER_LIST}
            icon={<FiFileText size={16} style={{ marginRight: 8 }} />}
          >
            Đơn hàng
          </Menu.Item>
          {accountType === "admin" && (
            <Menu.Item
              style={{ color: "white" }}
              key={PAGE.CUSTOMER_LIST}
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
