import { LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Spin, Table } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import "../dashboard.css";
import { GetBusOperator } from "../redux/actions";
import { getColumnSearchProps } from "./searchInput";
import firebase from 'firebase'

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function BusOperator() {
  const busOperator = useSelector((state) => state.Dashboard.busOperator);
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchColumn] = useState("");
  const refInput = useRef();

  useEffect(() => {
    dispatch(GetBusOperator.get());
  }, []);

  const onAddNewBusOperator = () => {
  }

  const busOperatorColumns = [
    {
      ...getColumnSearchProps(
        "name",
        "Nhập tên nhà xe",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: "Nhà xe",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
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
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
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
      title: "Liên hệ",
      dataIndex: "contact",
      sorter: (a, b) => a.email.localeCompare(b.email),
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
      <span className="titleTopic">Danh sách nhà xe</span>
      <Button
        type='primary'
        icon={<PlusCircleOutlined />}
        style={{ width: 200, marginBottom: 32 }}
        onClick={() => onAddNewBusOperator()}
      >
        Thêm nhà xe mới
      </Button>
      <Table columns={busOperatorColumns} dataSource={busOperator} />
    </div>
  );
}

export default BusOperator;
