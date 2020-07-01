import { CheckOutlined, CloseOutlined, DeleteOutlined, EyeOutlined, LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Spin, Switch, Table } from "antd";
import "antd/dist/antd.css";
import moment from 'moment';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import { PAGE } from "../constant";
import "../dashboard.css";
import { ActivatePromotion, DeletePromotion, GetDetailPromotion, GetPromotion, SetCurrentPage } from "../redux/actions";
import AddPromotionPage from "./addPromotion";
import PromotionDetailPage from "./promotionDetail";
import { getColumnSearchProps } from "./searchInput";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function PromotionList() {
  const promotions = useSelector((state) => state.Dashboard.promotions);
  const detailPage = useSelector((state) => state.Dashboard.detailPage);
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchColumn] = useState("");
  const refInput = useRef();

  useEffect(() => {
    dispatch(GetPromotion.get());
  }, []);

  const onAddNewPromotion = () => {
    dispatch(SetCurrentPage.get({ currentPage: PAGE.PROMOTIONS, detailPage: PAGE.ADD_PROMOTION }))
  }

  const handleEdit = (value, record) => {
    dispatch(GetDetailPromotion.get({ promotionCode: record.promotionCode }))
  }

  const handleReset = () => {
    dispatch(GetPromotion.get());
    dispatch(SetCurrentPage.get({ currentPage: PAGE.PROMOTIONS }))
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Xác nhận',
      icon: <DeleteOutlined style={{ color: COLOR.primary }} />,
      content: 'Bạn xác nhận xóa mã khuyến mãi này?',
      okText: 'Đồng ý',
      cancelText: 'Hủy bỏ',
      centered: true,
      okButtonProps: { style: { backgroundColor: COLOR.primary } },
      onOk: () => {
        dispatch(DeletePromotion.get({ promotionCode: record.promotionCode }))
        Modal.destroyAll()
      }
    });
  }

  const promotionColumns = [
    {
      ...getColumnSearchProps(
        "promotionCode",
        "Nhập mã khuyến mãi",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: "Mã khuyến mãi",
      dataIndex: "promotionCode",
      key: "promotionCode",
      sorter: (a, b) => a.promotionCode.localeCompare(b.promotionCode),
    },
    {
      ...getColumnSearchProps(
        "promotionName",
        "Nhập tên khuyến mãi",
        searchText,
        setSearchText,
        searchedColumn,
        setSearchColumn,
        refInput
      ),
      title: "Tên khuyến mãi",
      dataIndex: "promotionName",
      key: "promotionName",
      sorter: (a, b) => a.promotionName.localeCompare(b.promotionName),
    },
    {
      title: "Phần trăm giảm giá",
      dataIndex: "promotionPercent",
      key: "promotionPercent",
      sorter: (a, b) => a.promotionPercent - b.promotionPercent,
      render: (value, record, index) => {
        return <span>{Number(value) * 100}%</span>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Từ ngày",
      dataIndex: "from",
      sorter: (a, b) => moment(a.from, 'DD/MM/YYYY').diff(moment(b.from, 'DD/MM/YYYY'), 'days'),
    },
    {
      title: "Đến ngày",
      dataIndex: "to",
      sorter: (a, b) => moment(a.to, 'DD/MM/YYYY').diff(moment(b.to, 'DD/MM/YYYY'), 'days'),
    },
    {
      title: "Hoạt động",
      dataIndex: "active",
      render: (value, record) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={value || false}
            onChange={(active, e) => dispatch(ActivatePromotion.get({ promotionCode: record.promotionCode, active }))}
          />
        );
      },
    },
    {
      title: "Tác vụ",
      key: "action",
      render: (value, record) => {
        return (
          <Space>
            <EyeOutlined
              style={{ fontSize: 20 }}
              onClick={() => handleEdit(value, record)}
            />
            <DeleteOutlined
              style={{ fontSize: 20, color: "#FF0000" }}
              onClick={() => handleDelete(record)}
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

  if (detailPage === PAGE.ADD_PROMOTION) {
    return (
      <AddPromotionPage />
    );
  }

  if (detailPage === PAGE.DETAIL_PROMOTION) {
    return (
      <PromotionDetailPage handleReset={handleReset} />
    )
  }

  return (
    <div className="chooseContainer">
      <span className="titleTopic">Danh sách mã khuyến mãi</span>
      <Button
        type='primary'
        icon={<PlusCircleOutlined />}
        style={{ width: 230, marginBottom: 32 }}
        onClick={() => onAddNewPromotion()}
      >
        Thêm mã khuyến mãi mới
      </Button>
      <Table columns={promotionColumns} dataSource={promotions} />
    </div>
  );
}

export default PromotionList;
