import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Table } from "antd";
import "antd/dist/antd.css";
import moment from 'moment';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR, formatCurrency } from "ultis/functions";
import "../dashboard.css";
import { GetOrderList, GetStatistic } from "../redux/actions";
import { getColumnSearchProps } from "./searchInput";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function Home() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const accountType = useSelector((state) => state.Dashboard.accountType);
  const accountDetail = useSelector((state) => state.Dashboard.accountDetail);
  const stastic = useSelector((state) => state.Dashboard.stastic);

  useEffect(() => {
    dispatch(GetStatistic.get({ busOperatorId: accountType }))
  }, [])

  const renderBox = (title, amount, type) => (
    <div>
      <span>{title}</span>
      {type === 0 ? <span>{amount}</span> : <span>{formatCurrency(amount)}</span>}
    </div>
  )

  if (isLoading || !stastic || !accountType) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }
  return (
    <div className="chooseContainer">
      <span className="titleTopic">Xin chào {accountType !== 'admin' ? accountDetail.name : 'Admin'},</span>
      <div id='statisticWrap'>
        <div className='boxStyle'>
          <span className='titleBox'>Tổng đơn hàng</span>
          <span className='amountStyle'>{stastic.totalTicket}</span>
        </div>
        <div className='boxStyle'>
          <span className='titleBox' style={{ color: 'green' }}>Đã thanh toán</span>
          <span className='amountStyle'>{stastic.totalPaid}</span>
        </div>
        <div className='boxStyle'>
          <span className='titleBox' style={{ color: 'red' }}>Chưa thanh toán</span>
          <span className='amountStyle'>{stastic.totalNotPaid}</span>
        </div>
        <div className='boxStyle'>
          <span className='titleBox'>Doanh thu</span>
          <span className='amountStyle'>{formatCurrency(stastic.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
