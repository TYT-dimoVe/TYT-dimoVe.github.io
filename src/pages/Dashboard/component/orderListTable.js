import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Space, Spin, Table } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR, formatCurrency } from "ultis/functions";
import { PAGE, PAYMENT_TYPE } from "../constant";
import "../dashboard.css";
import { GetOrderDetail, GetOrderList } from "../redux/actions";
import EditOrderPage from "./editOrderPage";
import { getColumnSearchProps } from "./searchInput";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function OrderList() {
  const orderList = useSelector((state) => state.Dashboard.orderList);
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const accountType = useSelector((state) => state.Dashboard.accountType);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchColumn] = useState("");
  const refInput = useRef();
  const [filteredInfo, setFilterInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(PAGE.DEFAULT);

  const getOrderList = () => {
    if (accountType && accountType !== "admin") {
      dispatch(GetOrderList.get({ busOperatorId: accountType }));
    } else {
      dispatch(GetOrderList.get());
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setFilterInfo(filters);
  };

  const handleEdit = (value, record) => {
    dispatch(
      GetOrderDetail.get({
        search: record.ticketId,
        phoneNumber: record.phoneNumber,
      })
    );
    setCurrentPage(PAGE.ORDER);
  };

  const handleReset = () => {
    getOrderList();
    setCurrentPage(PAGE.DEFAULT);
  };

  const orderColumns = [
    {
      title: "Mã đơn",
      dataIndex: "ticketId",
      key: "ticketId",
      sorter: (a, b) => a.ticketId.localeCompare(b.ticketId),
    },
    {
      title: "Ngày tạo",
      dataIndex: "dateBooked",
      sorter: {
        compare: (a, b) => a.dateBooked - b.dateBooked,
      },
      render: (value, record, index) => {
        return <span>{moment(value).format("DD/MM/YYYY")}</span>;
      },
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
    {
      title: "Nhà xe",
      dataIndex: "busOperator",
      key: "busOperator",
      ...getColumnSearchProps(
        "busOperator",
        "Nhập tên nhà xe",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      sorter: {
        compare: (a, b) => a.totalPrice - b.totalPrice,
      },
      render: (value, record, index) => {
        return <span>{formatCurrency(value)}</span>;
      },
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "paymentCode",
      render: (value, record, index) => {
        switch (value) {
          case PAYMENT_TYPE[0].value:
            return <span>{PAYMENT_TYPE[0].text}</span>;
          case PAYMENT_TYPE[1].value:
            return <span>{PAYMENT_TYPE[1].text}</span>;
          case PAYMENT_TYPE[2].value:
            return <span>{PAYMENT_TYPE[2].text}</span>;
          case PAYMENT_TYPE[3].value:
            return <span>{PAYMENT_TYPE[3].text}</span>;
          case PAYMENT_TYPE[4].value:
            return <span>{PAYMENT_TYPE[4].text}</span>;
          default:
            return <span />;
        }
      },
      filters: PAYMENT_TYPE,
      filteredValue: filteredInfo ? filteredInfo.name : null,
      onFilter: (value, record) => record.paymentStatus === value,
    },
    {
      title: "Trạng thái",
      dataIndex: "paymentStatus",
      render: (value, record, index) => {
        if (value) {
          return <span style={{ color: "green" }}>Đã thanh toán</span>;
        }
        return <span style={{ color: "red" }}>Chưa thanh toán</span>;
      },
      filters: [
        { text: "Đã thanh toán", value: true },
        { text: "Chưa thanh toán", value: false },
      ],
      filteredValue: filteredInfo ? filteredInfo.name : null,
      onFilter: (value, record) => record.paymentStatus === value,
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
  if (currentPage === PAGE.ORDER) {
    return <EditOrderPage handleReset={handleReset} />;
  }
  return (
    <div className="chooseContainer">
      <span className="titleTopic">Danh sách đơn hàng</span>
      <Table
        columns={orderColumns}
        dataSource={orderList}
        onChange={handleChange}
      />
    </div>
  );
}

export default OrderList;
