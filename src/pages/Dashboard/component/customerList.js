import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Table } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import { CUSTOMER_STATUS } from "../constant";
import "../dashboard.css";
import { GetOrderList } from "../redux/actions";
import { getColumnSearchProps } from "./searchInput";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function CustomerList() {
  const orderList = useSelector((state) => state.Dashboard.orderList);
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchColumn] = useState("");
  const refInput = useRef();
  const [filteredInfo, setFilterInfo] = useState(null)

  useEffect(() => {
    dispatch(GetOrderList.get());
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setFilterInfo(filters)
  };

  const orderColumns = [
    {
      title: "CMND",
      dataIndex: "identityId",
      key: 'identityId',
      sorter: (a, b) => a.identityId.localeCompare(b.identityId),
      ...getColumnSearchProps(
        "identityId",
        "Nhập CMND",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
    },
    {
      title: "Tên",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps(
        "customerName",
        "Nhập tên hành khách",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: 'email',
      sorter: (a, b) => a.identityId.localeCompare(b.identityId),
      ...getColumnSearchProps(
        "email",
        "Nhập email",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
      ...getColumnSearchProps(
        "phoneNumber",
        "Nhập SĐT",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value, record, index) => {
        if (value === CUSTOMER_STATUS.PAID) {
          return <span style={{ color: 'green' }}>Đã thanh toán</span>
        }
        if (value === CUSTOMER_STATUS.NOT_PAID) {
          return <span style={{ color: 'red' }}>Chưa thanh toán</span>
        }
        return <span>--</span>
      },
      filters: [
        { text: 'Đã thanh toán', value: CUSTOMER_STATUS.PAID },
        { text: 'Chưa thanh toán', value: CUSTOMER_STATUS.NOT_PAID },
        { text: '--', value: CUSTOMER_STATUS.NO_ACTIVITY },
      ],
      filteredValue: filteredInfo ? filteredInfo.name : null,
      onFilter: (value, record) => record.paymentStatus === value,
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
      <span className="titleTopic">Danh sách hành khách</span>
      <Table columns={orderColumns} dataSource={orderList} onChange={handleChange} />
    </div>
  );
}

export default CustomerList;
