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

function Home() {
  const isLoading = useSelector((state) => state.Dashboard.isLoading);

  if (isLoading) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }
  return (
    <div className="chooseContainer">
      <span>Trang chủ chưa có gì nè</span>
    </div>
  );
}

export default Home;
