import { LoadingOutlined } from "@ant-design/icons";
import { DatePicker, Spin } from "antd";
import "antd/dist/antd.css";
import moment from 'moment';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartesianGrid, Label, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { COLOR, formatCurrency } from "ultis/functions";
import "../dashboard.css";
import { GetStatistic, GetStatisticAmount } from "../redux/actions";

const { RangePicker } = DatePicker;

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function Home() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const accountType = useSelector((state) => state.Dashboard.accountType);
  const accountDetail = useSelector((state) => state.Dashboard.accountDetail);
  const stastic = useSelector((state) => state.Dashboard.stastic);
  const statisticData = useSelector((state) => state.Dashboard.statisticData);

  useEffect(() => {
    dispatch(GetStatistic.get({ busOperatorId: accountType }))
  }, [])

  const handleChangeRange = (value) => {
    dispatch(GetStatisticAmount.get({ busOperatorId: accountType, from: value[0], to: value[1] }))
  }

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
      <div id='boxStatistic'>
        <div style={{ display: 'flex', flex: 3, flexDirection: 'column' }}>
          <RangePicker style={{ marginBottom: 16, width: 300 }} onChange={(value, dateStr) => handleChangeRange(dateStr)} format='DD/MM/YYYY' allowClear={false} value={[moment(statisticData.from, 'DD/MM/YYYY'), moment(statisticData.to, 'DD/MM/YYYY')]} />
          <LineChart width={700} height={400} data={statisticData.statisticData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type='monotone' dataKey="amount" stroke={COLOR.primary} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis height={50} dataKey="name">
              <Label value={statisticData.xtype} offset={0} position="insideBottom" />
            </XAxis>
            <YAxis label={{ value: 'Doanh thu', angle: -90, position: 'insideLeft' }} width={110} tickFormatter={number => { return formatCurrency(number) }} />
            <Tooltip formatter={(value, name, props) => { return [formatCurrency(value), "Doanh thu"] }} />
          </LineChart>
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <div className='boxCloneStyle'>
            <span className='titleBox'>Tổng doanh thu</span>
            <span className='amountStyle'>{formatCurrency(statisticData.totalAmount)}</span>
          </div>
          <div className='boxCloneStyle'>
            <span className='titleBox'>Tổng đơn hàng</span>
            <span className='amountStyle'>{statisticData.totalTicket}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
