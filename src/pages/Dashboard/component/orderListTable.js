import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { Space, Spin, Table, Button, Select, Breadcrumb } from "antd";
import "antd/dist/antd.css";
import moment from 'moment';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR, formatCurrency } from "ultis/functions";
import { PAYMENT_TYPE, PAYMENT_TITLE } from "../constant";
import "../dashboard.css";
import { GetOrderDetail, GetOrderList, EditOrderDetail } from "../redux/actions";
import { getColumnSearchProps } from "./searchInput";

const { Option } = Select;

const PAGE = {
  DEFAULT: 'default',
  ORDER: 'order'
}

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function OrderList() {
  const orderList = useSelector((state) => state.Dashboard.orderList);
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const accountType = useSelector((state) => state.Dashboard.accountType);
  const orderDetail = useSelector((state) => state.Dashboard.orderDetail);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchColumn] = useState("");
  const refInput = useRef();
  const [filteredInfo, setFilterInfo] = useState(null)
  const [currentPage, setCurrentPage] = useState(PAGE.DEFAULT)
  const [routes, setRoutes] = useState([{ breadcrumbName: 'Danh sách đơn hàng' }])

  const getOrderList = () => {
    if (accountType && accountType !== 'admin') {
      dispatch(GetOrderList.get({ busOperatorId: accountType }));
    } else {
      dispatch(GetOrderList.get());
    }
  }

  useEffect(() => {
    getOrderList()
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setFilterInfo(filters)
  };

  const handleEdit = (value, record) => {
    dispatch(GetOrderDetail.get({ search: record.ticketId, phoneNumber: record.phoneNumber }))
    setRoutes(routes.concat([{ breadcrumbName: record.ticketId }]))
    setCurrentPage(PAGE.ORDER)
  }

  const handleReset = () => {
    setRoutes([{ breadcrumbName: 'Danh sách đơn hàng' }])
    getOrderList()
    setCurrentPage(PAGE.DEFAULT)
  }

  const handleSubmitEdit = () => {
    dispatch(EditOrderDetail.get({ ticket: orderDetail }))
    handleReset()
  }

  const breadcrumbItem = (route, params, routes, paths) => {
    if (route === routes[0]) {
      return <a className="titleTopic" style={{ textDecorationColor: COLOR.primary }} onClick={() => handleReset()}>Danh sách đơn hàng</a>
    }
    return <span className="titleTopic">{route.breadcrumbName}</span>
  }

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
        return <span>{formatCurrency(value)}</span>
      }
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "paymentCode",
      render: (value, record, index) => {
        switch (value) {
          case PAYMENT_TYPE[0].value:
            return <span>{PAYMENT_TYPE[0].text}</span>
          case PAYMENT_TYPE[1].value:
            return <span>{PAYMENT_TYPE[1].text}</span>
          case PAYMENT_TYPE[2].value:
            return <span>{PAYMENT_TYPE[2].text}</span>
          case PAYMENT_TYPE[3].value:
            return <span>{PAYMENT_TYPE[3].text}</span>
          case PAYMENT_TYPE[4].value:
            return <span>{PAYMENT_TYPE[4].text}</span>
          default: return <span />
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
    {
      title: "Tác vụ",
      key: 'action',
      render: (value, record) => {
        return (
          <Space>
            <EditOutlined style={{ fontSize: 20 }} onClick={() => handleEdit(value, record)} />
          </Space>
        )
      }
    },
  ];

  if (isLoading) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }
  if (currentPage === PAGE.ORDER && orderDetail) {
    return (
      <div className="chooseContainer">
        <Breadcrumb itemRender={breadcrumbItem} routes={routes} separator='>' />
        <span className="titleInfo">Thông tin hành khách</span>
        <div id="infoCell">
          <span className='infoTitle'>Tên:</span>
          <span className='infoContent'>{orderDetail.customerName}</span>
        </div>
        <div id="infoCell">
          <span className='infoTitle'>Số điện thoại:</span>
          <span className='infoContent'>{orderDetail.phoneNumber}</span>
        </div>
        {orderDetail.customerEmail && <div id="infoCell">
          <span className='infoTitle'>Email:</span>
          <span className='infoContent'>{orderDetail.customerEmail}</span>
        </div>}
        <span className="titleInfo">Thông tin đơn hàng</span>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div id="infoCell">
              <span className='infoTitle'>Ngày tạo:</span>
              <span className='infoContent'>{moment(orderDetail.dateBooked).format('DD/MM/YYYY')}</span>
            </div>
            <div id="infoCell">
              <span className='infoTitle'>Số lượng chỗ:</span>
              <span className='infoContent'>{orderDetail.totalTicketAmount}</span>
            </div>
            <div id="infoCell">
              <span className='infoTitle'>Vị trí:</span>
              <span className='infoContent'>{orderDetail.seatId.join(', ')}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div id="infoBigCell">
              <span className='infoTitle'>Tổng tiền:</span>
              <span className='infoContent' style={{ color: COLOR.orange }}>{formatCurrency(orderDetail.totalPrice)}</span>
            </div>
            <div id="infoBigCell">
              <span className='infoTitle'>Phương thức thanh toán:</span>
              <span className='infoContent'>{PAYMENT_TITLE[orderDetail.paymentCode]}</span>
            </div>
            <div id="infoBigCell">
              <span className='infoTitle'>Trạng thái:</span>
              <Select defaultValue={orderDetail.paymentStatus} id='dropdown' onChange={(value) => { orderDetail.paymentStatus = value }}>
                <Option value={true}>Đã thanh toán</Option>
                <Option value={false}>Chưa thanh toán</Option>
              </Select>
            </div>
          </div>
        </div>
        <span className="titleInfo">Thông tin chuyến xe</span>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div id="infoCell">
              <span className='infoTitle'>Mã chuyến:</span>
              <span className='infoContent'>{orderDetail.tripId}</span>
            </div>
            <div id="infoCell">
              <span className='infoTitle'>Điểm khởi hành:</span>
              <span className='infoContent'>{orderDetail.from}</span>
            </div>
            <div id="infoCell">
              <span className='infoTitle'>Điểm đến:</span>
              <span className='infoContent'>{orderDetail.to}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div id="infoBigCell">
              <span className='infoTitle'>Nhà xe:</span>
              <span className='infoContent'>{orderDetail.busOperator}</span>
            </div>
            <div id="infoBigCell">
              <span className='infoTitle'>Giờ khởi hành:</span>
              <span className='infoContent'>{orderDetail.timeStart}</span>
            </div>
            <div id="infoBigCell">
              <span className='infoTitle'>Ngày khởi hành:</span>
              <span className='infoContent'>{orderDetail.departureDay}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <Button
            className="btnStyle"
            type="primary"
            style={{
              backgroundColor: '#EB5757',
              borderColor: "white",
            }}
            onClick={() => handleReset()}
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
    )
  }
  return (
    <div className="chooseContainer">
      <span className="titleTopic">Danh sách đơn hàng</span>
      <Table columns={orderColumns} dataSource={orderList} onChange={handleChange} />
    </div>
  );
}

export default OrderList;
