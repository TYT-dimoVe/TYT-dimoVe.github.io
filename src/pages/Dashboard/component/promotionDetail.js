import { LoadingOutlined } from "@ant-design/icons";
import { Breadcrumb, Spin } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import "../dashboard.css";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function PromotionDetailPage(props) {
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const promotionDetail = useSelector((state) => state.Dashboard.promotionDetail);

  const breadcrumbItem = (route, params, routes, paths) => {
    if (route === routes[0]) {
      return (
        <a
          className="titleTopic"
          style={{ textDecorationColor: COLOR.primary }}
          onClick={() => props.handleReset()}
        >
          Danh sách mã khuyến mãi
        </a>
      );
    }
    return <span className="titleTopic">{route.breadcrumbName}</span>;
  };

  if (isLoading || !promotionDetail) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }
  const routes = [
    { breadcrumbName: "Danh sách đơn hàng" },
    { breadcrumbName: promotionDetail.promotionCode },
  ];
  return (
    <div className="chooseContainer">
      <Breadcrumb itemRender={breadcrumbItem} style={{ marginBottom: 24 }} routes={routes} separator=">" />
      <div id="infoPromotion">
        <span className="infoTitle">Mã khuyến mãi:</span>
        <span className="infoContent" style={{ marginLeft: 4 }}>{promotionDetail.promotionCode}</span>
      </div>
      <div id="infoPromotion">
        <span className="infoTitle">Tên khuyến mãi:</span>
        <span className="infoContent" style={{ marginLeft: 4 }}>{promotionDetail.promotionName}</span>
      </div>
      <div id="infoPromotion">
        <span className="infoTitle">Phần trăm giảm giá:</span>
        <span className="infoContent" style={{ marginLeft: 4 }}>{promotionDetail.promotionPercent * 100}%</span>
      </div>
      <div id="infoPromotion">
        <span className="infoTitle">Số lượng còn lại:</span>
        <span className="infoContent" style={{ marginLeft: 4 }}>{promotionDetail.quantity}</span>
      </div>
      <div id="infoPromotion">
        <span className="infoTitle">Từ ngày:</span>
        <span className="infoContent" style={{ marginLeft: 4 }}>{promotionDetail.from}</span>
      </div>
      <div id="infoPromotion">
        <span className="infoTitle">Đến ngày:</span>
        <span className="infoContent" style={{ marginLeft: 4 }}>{promotionDetail.to}</span>
      </div>
      <div id="infoPromotion">
        <span className="infoTitle">Trạng thái hoạt động:</span>
        <span className="infoContent" style={{ marginLeft: 4 }}>{promotionDetail.active ? 'Đang hoạt động' : 'Ngừng hoạt động'}</span>
      </div>
      {promotionDetail.description && (
        <div id="infoPromotion" style={{ alignItems: 'flex-start' }}>
          <span className="infoTitle" style={{ minWidth: 44 }}>Mô tả:</span>
          <span className="infoContent" style={{ marginLeft: 4, textAlign: 'justify', width: 800 }}>{promotionDetail.description}</span>
        </div>
      )}
    </div>
  );
}

export default PromotionDetailPage;
