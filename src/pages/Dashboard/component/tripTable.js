import {
  DeleteOutlined, EditOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { Space, Spin, Table } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import { PAGE } from "../constant";
import "../dashboard.css";
import { GetMapSeat, GetTripList, SetCurrentPage } from "../redux/actions";
import { getColumnSearchProps } from "./searchInput";
import TripDateDetail from "./tripDateDetail";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function TripList() {
  const tripList = useSelector((state) => state.Dashboard.tripList);
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const accountType = useSelector((state) => state.Dashboard.accountType);
  const detailPage = useSelector((state) => state.Dashboard.detailPage);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchColumn] = useState("");
  const refInput = useRef();

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
    dispatch(GetMapSeat.get({ tripId: record.tripId, busType: record.busType, date: moment(new Date()).format('DD/MM/YYYY') }))
    dispatch(SetCurrentPage.get({ currentPage: PAGE.TRIP_LIST, detailPage: PAGE.TRIP_DETAIL }))
  };

  const handleReset = () => {
    getTripList();
    dispatch(SetCurrentPage.get({ currentPage: PAGE.TRIP_LIST }))
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

  if (isLoading) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }
  if (detailPage === PAGE.TRIP_DETAIL) {
    return (
      <TripDateDetail handleReset={handleReset} />
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
