import { LoadingOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Switch, message, Spin, InputNumber } from "antd";
import "antd/dist/antd.css";
import { Form, Formik } from "formik";
import moment from 'moment';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "ultis/functions";
import * as yup from "yup";
import { PAGE } from "../constant";
import "../dashboard.css";
import { SetCurrentPage, CreateNewPromotion } from "../redux/actions";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const firstError = {
  promotionCode: "* Vui lòng nhập mã khuyến mãi", promotionName: "* Vui lòng nhập tên khuyến mãi", quantity: "* Vui lòng nhập số lượt sử dụng khuyến mãi", promotionPercent: "* Vui lòng nhập phần trăm giảm giá"
}

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function AddPromotionPage(props) {
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    promotionCode: yup
      .string()
      .trim()
      .required('* Vui lòng nhập mã khuyến mãi')
      .matches(
        /^[A-Z0-9]+$/,
        {
          message: 'Mã khuyến mãi chỉ được chứa kí tự hoa và chữ số',
        },
      ),
    promotionName: yup
      .string()
      .trim()
      .required('* Vui lòng nhập tên khuyến mãi')
      .matches(
        /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
        {
          message: 'Tên khuyến mãi không hợp lệ',
        },
      ),
    quantity: yup
      .number()
      .min(1, 'Số lượt sử dụng ít nhất là 1 lượt')
      .max(1000, 'Số lượt sử dụng nhiều nhất là 1000 lượt')
      .required('* Vui lòng nhập số lượt sử dụng khuyến mãi'),
    promotionPercent: yup
      .number()
      .min(1, 'Phần trăm giảm giá ít nhất 1%')
      .max(100, 'Phần trăm giảm giá nhiều nhất 100%')
      .required('* Vui lòng nhập số lượt sử dụng khuyến mãi')
  });

  const handleAdd = (values) => {
    const data = {
      ...values,
      promotionPercent: Number(values.promotionPercent) / 100
    }
    dispatch(CreateNewPromotion.get(data))
  }

  if (isLoading) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }

  const handleChangeRange = (dateStr, handleChange) => {
    handleChange('from')(dateStr[0])
    handleChange('to')(dateStr[1])
  }

  return (
    <div className="chooseContainer">
      <span className="titleTopic">Thêm khuyến mãi</span>
      <Formik
        initialValues={{ promotionCode: '', promotionName: '', quantity: 0, from: moment(new Date()).format('DD/MM/YYYY'), to: moment(new Date()).add(1, 'days').format('DD/MM/YYYY'), description: '', promotionPercent: 1, active: true }}
        initialErrors={firstError}
        validationSchema={validationSchema}
        onSubmit={(values) => handleAdd(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
          setFieldTouched,
          setFieldValue
        }) => {
          return (
            <Form>
              <div className='rowAdd'>
                <span className='addTitle'>Mã khuyến mãi:</span>
                <Input
                  className="addInput"
                  value={values.promotionCode}
                  onChange={e => {
                    handleChange("promotionCode")(e.target.value.toUpperCase())
                  }}
                  onTouchStart={() => setFieldTouched("promotionCode")}
                  onBlur={handleBlur("promotionCode")}
                  placeholder="HEVUI20,..."
                />
              </div>
              {errors.promotionCode && <span className="errorAdd">{errors.promotionCode}</span>}

              <div className='rowAdd'>
                <span className='addTitle'>Tên khuyến mãi:</span>
                <Input
                  className="addInput"
                  value={values.promotionName}
                  onChange={handleChange("promotionName")}
                  onTouchStart={() => setFieldTouched("promotionName")}
                  onBlur={handleBlur("promotionName")}
                  placeholder="Nhập tên khuyến mãi"
                />
              </div>
              {errors.promotionName && <span className="errorAdd">{errors.promotionName}</span>}

              <div className='rowAdd'>
                <span className='addTitle'>Thời gian khuyến mãi:</span>
                <RangePicker style={{ width: 250 }} disabledDate={d => !d || d.isBefore(moment(new Date()))} onChange={(value, dateStr) => handleChangeRange(dateStr, handleChange)} format='DD/MM/YYYY' allowClear={false} value={[moment(values.from, 'DD/MM/YYYY'), moment(values.to, 'DD/MM/YYYY')]} />
                <span className='addTitle' style={{ width: 'auto', marginLeft: 24, marginRight: 24 }}>Hoạt động:</span>
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  checked={values.active || false}
                  onChange={(act, e) => {
                    setFieldValue('active', act)
                  }}
                />
              </div>
              {errors.from && <span className="errorAdd">{errors.from}</span>}

              <div className='rowAdd'>
                <span className='addTitle'>Phần trăm giảm giá:</span>
                <Input
                  className="addInput"
                  value={values.promotionPercent}
                  onChange={handleChange("promotionPercent")}
                  onTouchStart={() => setFieldTouched("promotionPercent")}
                  onBlur={handleBlur("promotionPercent")}
                  placeholder="Nhập phần trăm giảm giá"
                  type='number'
                />
              </div>
              {errors.promotionPercent && <span className="errorAdd">{errors.promotionPercent}</span>}

              <div className='rowAdd'>
                <span className='addTitle'>Số lượt khuyến mãi:</span>
                <Input
                  className="addInput"
                  value={values.quantity}
                  onChange={handleChange("quantity")}
                  onTouchStart={() => setFieldTouched("quantity")}
                  onBlur={handleBlur("quantity")}
                  placeholder="Nhập số lượt khuyến mãi"
                  type='number'
                />
              </div>
              {errors.quantity && <span className="errorAdd">{errors.quantity}</span>}

              <div className='rowAdd'>
                <span className='addTitle'>Mô tả khuyến mãi:</span>
                <TextArea
                  className="addInput"
                  value={values.description}
                  onChange={handleChange("description")}
                  onTouchStart={() => setFieldTouched("description")}
                  onBlur={handleBlur("description")}
                  placeholder="Nhập mô tả khuyến mãi"
                  rows={4}
                />
              </div>



              <div style={{ display: "flex" }}>
                <Button
                  className="btnStyle"
                  type="primary"
                  style={{
                    backgroundColor: "#EB5757",
                    borderColor: "white",
                  }}
                  onClick={() => dispatch(SetCurrentPage.get({ currentPage: PAGE.PROMOTIONS }))}
                >
                  Hủy
                  </Button>
                <Button
                  disabled={!isValid}
                  className="btnStyle"
                  type="primary"
                  style={{
                    backgroundColor: isValid ? COLOR.primary : 'gray',
                    borderColor: "white",
                    color: 'white'
                  }}
                  onClick={handleSubmit}
                >
                  Lưu
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddPromotionPage;
