import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Table } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import "../dashboard.css";
import { GetTripList } from "../redux/actions";
import { getColumnSearchProps } from "./searchInput";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function TripList() {
  const tripList = useSelector((state) => state.Dashboard.tripList);
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const accountType = useSelector((state) => state.Dashboard.accountType);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchColumn] = useState("");
  const refInput = useRef();

  useEffect(() => {
    if (accountType !== 'admin') {
      dispatch(GetTripList.get({ busOperatorId: accountType }));
    } else {
      dispatch(GetTripList.get());
    }
  }, []);

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
      key: 'busTypeTitle',
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
      key: 'from',
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
      key: 'to',
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
  ];

  if (isLoading) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
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
