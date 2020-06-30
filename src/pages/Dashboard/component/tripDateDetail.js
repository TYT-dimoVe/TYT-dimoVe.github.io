import { LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, DatePicker, Spin } from "antd";
import "antd/dist/antd.css";
import viVN from "antd/es/locale/vi_VN";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import "../dashboard.css";
import { GetMapSeat, GetOrderDetail } from "../redux/actions";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function TripDateDetail(props) {
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const dispatch = useDispatch();
  const tripDetail = useSelector((state) => state.Dashboard.tripDetail);
  const { seats, trip, date } = tripDetail

  const breadcrumbItem = (route, params, routes, paths) => {
    if (route === routes[0]) {
      return (
        <a
          className="titleTopic"
          style={{ textDecorationColor: COLOR.primary }}
          onClick={() => props.handleReset()}
        >
          Danh sách chuyến xe
        </a>
      );
    }
    return <span className="titleTopic">{route.breadcrumbName}</span>;
  };

  const handleChangeDate = (value) => {
    dispatch(GetMapSeat.get({ tripId: trip.tripId, busType: trip.busType, date: value }))
  }

  const goToOrderDetail = (seat) => {
    dispatch(GetOrderDetail.get({ search: seat.ticketId }))
  }

  const renderOneSeat = (seat) => (
    <div className='seatStyle' style={{ backgroundColor: seat.status ? COLOR.lightBlue : COLOR.gray }} onClick={seat.status ? () => goToOrderDetail(seat) : () => { }}>
      <span className="infoContent">{seat.seatId}</span>
      {seat.status && seat.ticketId && <span className="infoContent">{seat.ticketId}</span>}
    </div>
  )

  const renderSeat = (floor) => (
    <table style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      {floor.map(item => (
        <tr>
          {item.map(seat => (<td>{seat ? renderOneSeat(seat) : <div className='seatStyle' style={{ backgroundColor: 'white' }} />}</td>))}
        </tr>
      ))}
    </table>
  )

  if (isLoading || !trip) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }
  const routes = [
    { breadcrumbName: "Danh sách đơn hàng" },
    { breadcrumbName: trip.tripId },
  ];
  return (
    <div className="chooseContainer">
      <Breadcrumb itemRender={breadcrumbItem} routes={routes} separator=">" />
      <div style={{ display: "flex", marginTop: 24 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div id="infoBigCell">
            <span className="infoTitle">Loại xe:</span>
            <span className="infoContent">{trip.busTypeTitle}</span>
          </div>
          <div id="infoBigCell">
            <span className="infoTitle">Điểm khởi hành:</span>
            <span className="infoContent">{trip.from}</span>
          </div>
          <div id="infoBigCell">
            <span className="infoTitle">Điểm đến:</span>
            <span className="infoContent">{trip.to}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div id="infoBigCell">
            <span className="infoTitle">Nhà xe:</span>
            <span className="infoContent">{trip.busOperator}</span>
          </div>
          <div id="infoBigCell">
            <span className="infoTitle">Giờ khởi hành:</span>
            <span className="infoContent">{trip.timeStart}</span>
          </div>
          <div id="infoBigCell">
            <span className="infoTitle">Ngày khởi hành:</span>
            <DatePicker
              locale={viVN}
              value={moment(date, 'DD/MM/YYYY')}
              format="DD/MM/YYYY"
              allowClear={false}
              onChange={(value, dateStr) => handleChangeDate(dateStr)}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: 24 }}>
        <div
          style={{ backgroundColor: COLOR.lightBlue }}
          className="smallSquare"
        />
        <span className="infoContent" style={{ marginRight: 28 }}>
          Ghế đã đặt
          </span>
        <div
          style={{ backgroundColor: COLOR.gray }}
          className="smallSquare"
        />
        <span className="infoContent" style={{ marginRight: 28 }}>
          Ghế trống
          </span>
      </div>
      {seats && <div style={{ display: 'flex', marginTop: 24 }}>
        {renderSeat(seats.floor1)}
        {seats.floor2 && seats.floor2.length > 0 && renderSeat(seats.floor2)}
      </div>}
    </div>
  );
}

export default TripDateDetail;
