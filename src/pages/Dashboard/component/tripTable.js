import {
  DeleteOutlined, EditOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { Breadcrumb, DatePicker, Space, Spin, Table } from "antd";
import "antd/dist/antd.css";
import viVN from "antd/es/locale/vi_VN";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import { PAGE } from "../constant";
import "../dashboard.css";
import { GetMapSeat, GetTripList } from "../redux/actions";
import { getColumnSearchProps } from "./searchInput";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function TripList() {
  const tripList = useSelector((state) => state.Dashboard.tripList);
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const accountType = useSelector((state) => state.Dashboard.accountType);
  const mapSeat = useSelector((state) => state.Dashboard.mapSeat);
  const trip = useSelector((state) => state.Dashboard.tripDetail);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchColumn] = useState("");
  const refInput = useRef();
  const [currentPage, setCurrentPage] = useState(PAGE.DEFAULT);
  const [routes, setRoutes] = useState([
    { breadcrumbName: "Danh sách đơn hàng" },
  ]);
  const [date, setDate] = useState(moment(new Date()).format('DD/MM/YYYY'));

  const getTripList = () => {
    if (accountType && accountType !== "admin") {
      dispatch(GetTripList.get({ busOperatorId: accountType }));
    } else {
      dispatch(GetTripList.get());
    }
  };
  useEffect(() => {
    getTripList();
  }, []);

  const handleEdit = (value, record) => {
    console.log(record)
    dispatch(GetMapSeat.get({ tripId: record.tripId, busType: record.busType, date }))
    setRoutes([{ breadcrumbName: "Danh sách chuyến xe" }, { breadcrumbName: record.tripId }]);
    setCurrentPage(PAGE.TRIP);
  };

  const handleReset = () => {
    setRoutes([{ breadcrumbName: "Danh sách chuyến xe" }]);
    getTripList();
    setCurrentPage(PAGE.DEFAULT);
  };

  const handleChangeDate = (value) => {
    setDate(value)
    dispatch(GetMapSeat.get({ tripId: trip.tripId, busType: trip.busType, date: value }))
  }

  const breadcrumbItem = (route, params, routes, paths) => {
    if (route === routes[0]) {
      return (
        <a
          className="titleTopic"
          style={{ textDecorationColor: COLOR.primary }}
          onClick={() => handleReset()}
        >
          Danh sách chuyến xe
        </a>
      );
    }
    return <span className="titleTopic">{route.breadcrumbName}</span>;
  };

  const tripsColumns = [
    {
      ...getColumnSearchProps(
        "busOperator",
        "Nhập tên nhà xe",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: "Nhà xe",
      dataIndex: "busOperator",
      key: "busOperator",
    },
    {
      title: "Mã chuyến",
      dataIndex: "tripId",
      sorter: (a, b) => a.tripId.localeCompare(b.tripId),
    },
    {
      title: "Loại xe",
      dataIndex: "busTypeTitle",
      key: "busTypeTitle",
      ...getColumnSearchProps(
        "busTypeTitle",
        "Nhập loại xe",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
    },
    {
      title: "Điểm khởi hành",
      dataIndex: "from",
      key: "from",
      ...getColumnSearchProps(
        "from",
        "Nhập điểm khởi hành",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
    },
    {
      title: "Điểm đến",
      dataIndex: "to",
      key: "to",
      ...getColumnSearchProps(
        "to",
        "Nhập điểm điến",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
    },
    {
      title: "Thời điểm khởi hành",
      dataIndex: "timeStart",
      sorter: (a, b) => a.timeStart.localeCompare(b.timeStart),
    },
    {
      title: "Tác vụ",
      key: "action",
      render: (value, record) => {
        return (
          <Space>
            <EditOutlined
              style={{ fontSize: 20 }}
              onClick={() => handleEdit(value, record)}
            />
            <DeleteOutlined
              style={{ fontSize: 20, color: "#FF0000" }}
              onClick={() => { }}
            />
          </Space>
        );
      },
    },
  ];

  const renderOneSeat = (seat) => (
    <div className='seatStyle' style={{ backgroundColor: seat.status ? COLOR.lightBlue : COLOR.gray }}>
      <span className="infoContent">{seat.seatId}</span>
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

  if (isLoading) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }
  if (currentPage === PAGE.TRIP && trip) {
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
            <div id="infoCell">
              <span className="infoTitle">Nhà xe:</span>
              <span className="infoContent">{trip.busOperator}</span>
            </div>
            <div id="infoCell">
              <span className="infoTitle">Giờ khởi hành:</span>
              <span className="infoContent">{trip.timeStart}</span>
            </div>
            <div id="infoCell">
              <span className="infoTitle">Ngày khởi hành:</span>
              <DatePicker
                locale={viVN}
                defaultValue={moment(date, 'DD/MM/YYYY')}
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
        {mapSeat && <div style={{ display: 'flex', marginTop: 24 }}>
          {renderSeat(mapSeat.floor1)}
          {mapSeat.floor2 && mapSeat.floor2.length > 0 && renderSeat(mapSeat.floor2)}
        </div>}
      </div>
    );
  }
  return (
    <div className="chooseContainer">
      <span className="titleTopic">Danh sách chuyến xe</span>
      <Table columns={tripsColumns} dataSource={tripList} />
    </div>
  );
}

export default TripList;
