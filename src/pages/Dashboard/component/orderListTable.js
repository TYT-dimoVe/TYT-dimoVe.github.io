import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Table } from "antd";
import "antd/dist/antd.css";
import moment from 'moment';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR, formatCurrency } from "ultis/functions";
import "../dashboard.css";
import { GetOrderList } from "../redux/actions";
import { getColumnSearchProps } from "./searchInput";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function OrderList() {
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
      title: "Mã đơn",
      dataIndex: "ticketId",
      key: 'ticketId',
      sorter: (a, b) => a.ticketId.localeCompare(b.ticketId),
    },
    {
      title: "Ngày tạo",
      dataIndex: "dateBooked",
      sorter: {
        compare: (a, b) => a.dateBooked - b.dateBooked,
      },
      render: (value, record, index) => {
        return <span>{moment(value).format("DD/MM/YYYY")}</span>
      }
    },
    {
      title: "Hành khách",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps(
        "customerName",
        "Nhập tên ngườt đặt",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
    },
    // {
    //   title: "Nhà xe",
    //   dataIndex: "customerName",
    //   key: "customerName",
    //   ...getColumnSearchProps(
    //     "customerName",
    //     "Nhập tên nhà xe",
    //     searchText,
    //     setSearchText,
    //     searchedColumn,
    //     setSearchColumn,
    //     refInput
    //   ),
    // },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      sorter: {
        compare: (a, b) => a.totalPrice - b.totalPrice,
      },
      render: (value, record, index) => {
        return <span>{formatCurrency(value)}</span>
      }
    },
    {
      title: "Trạng thái",
      dataIndex: "paymentStatus",
      render: (value, record, index) => {
        if (value) {
          return <span style={{ color: 'green' }}>Đã thanh toán</span>
        }
        return <span style={{ color: 'red' }}>Chưa thanh toán</span>
      },
      filters: [
        { text: 'Đã thanh toán', value: true },
        { text: 'Chưa thanh toán', value: false },
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
      <span className="titleTopic">Danh sách đơn hàng</span>
      <Table columns={orderColumns} dataSource={orderList} onChange={handleChange} />
    </div>
  );
}

export default OrderList;
