import { LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Select, Spin } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR, formatCurrency } from "ultis/functions";
import { PAYMENT_TITLE } from "../constant";
import "../dashboard.css";
import { EditOrderDetail } from "../redux/actions";

const { Option } = Select;

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function EditOrderPage(props) {
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const orderDetail = useSelector((state) => state.Dashboard.orderDetail);
  const dispatch = useDispatch();

  const handleSubmitEdit = () => {
    dispatch(EditOrderDetail.get({ ticket: orderDetail }));
    props.handleReset();
  };

  const breadcrumbItem = (route, params, routes, paths) => {
    if (route === routes[0]) {
      return (
        <a
          className="titleTopic"
          style={{ textDecorationColor: COLOR.primary }}
          onClick={() => props.handleReset()}
        >
          Danh sách đơn hàng
        </a>
      );
    }
    return <span className="titleTopic">{route.breadcrumbName}</span>;
  };

  if (isLoading || !orderDetail) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }
  const routes = [
    { breadcrumbName: "Danh sách đơn hàng" },
    { breadcrumbName: orderDetail.ticketId },
  ];
  return (
    <div className="chooseContainer">
      <Breadcrumb itemRender={breadcrumbItem} routes={routes} separator=">" />
      <span className="titleInfo">Thông tin hành khách</span>
      <div id="infoCell">
        <span className="infoTitle">Tên:</span>
        <span className="infoContent">{orderDetail.customerName}</span>
      </div>
      <div id="infoCell">
        <span className="infoTitle">Số điện thoại:</span>
        <span className="infoContent">{orderDetail.phoneNumber}</span>
      </div>
      {orderDetail.customerEmail && (
        <div id="infoCell">
          <span className="infoTitle">Email:</span>
          <span className="infoContent">{orderDetail.customerEmail}</span>
        </div>
      )}
      <span className="titleInfo">Thông tin đơn hàng</span>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div id="infoCell">
            <span className="infoTitle">Ngày tạo:</span>
            <span className="infoContent">
              {moment(orderDetail.dateBooked).format("DD/MM/YYYY")}
            </span>
          </div>
          <div id="infoCell">
            <span className="infoTitle">Số lượng chỗ:</span>
            <span className="infoContent">{orderDetail.totalTicketAmount}</span>
          </div>
          <div id="infoCell">
            <span className="infoTitle">Vị trí:</span>
            <span className="infoContent">{orderDetail.seatId.join(", ")}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div id="infoBigCell">
            <span className="infoTitle">Tổng tiền:</span>
            <span className="infoContent" style={{ color: COLOR.orange }}>
              {formatCurrency(orderDetail.totalPrice)}
            </span>
          </div>
          <div id="infoBigCell">
            <span className="infoTitle">Phương thức thanh toán:</span>
            <span className="infoContent">
              {PAYMENT_TITLE[orderDetail.paymentCode]}
            </span>
          </div>
          <div id="infoBigCell">
            <span className="infoTitle">Trạng thái:</span>
            <Select
              defaultValue={orderDetail.paymentStatus}
              id="dropdown"
              onChange={(value) => {
                orderDetail.paymentStatus = value;
              }}
            >
              <Option value={true}>Đã thanh toán</Option>
              <Option value={false}>Chưa thanh toán</Option>
            </Select>
          </div>
        </div>
      </div>
      <span className="titleInfo">Thông tin chuyến xe</span>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div id="infoCell">
            <span className="infoTitle">Mã chuyến:</span>
            <span className="infoContent">{orderDetail.tripId}</span>
          </div>
          <div id="infoCell">
            <span className="infoTitle">Điểm khởi hành:</span>
            <span className="infoContent">{orderDetail.from}</span>
          </div>
          <div id="infoCell">
            <span className="infoTitle">Điểm đến:</span>
            <span className="infoContent">{orderDetail.to}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div id="infoBigCell">
            <span className="infoTitle">Nhà xe:</span>
            <span className="infoContent">{orderDetail.busOperator}</span>
          </div>
          <div id="infoBigCell">
            <span className="infoTitle">Giờ khởi hành:</span>
            <span className="infoContent">{orderDetail.timeStart}</span>
          </div>
          <div id="infoBigCell">
            <span className="infoTitle">Ngày khởi hành:</span>
            <span className="infoContent">{orderDetail.departureDay}</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <Button
          className="btnStyle"
          type="primary"
          style={{
            backgroundColor: "#EB5757",
            borderColor: "white",
          }}
          onClick={() => props.handleReset()}
        >
          Hủy
        </Button>
        <Button
          className="btnStyle"
          type="primary"
          style={{
            backgroundColor: COLOR.primary,
            borderColor: "white",
          }}
          onClick={() => handleSubmitEdit()}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
}

export default EditOrderPage;
