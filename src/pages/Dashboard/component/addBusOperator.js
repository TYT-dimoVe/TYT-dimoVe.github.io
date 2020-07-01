import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Select, Spin, Upload, Modal } from "antd";
import "antd/dist/antd.css";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COLOR, MAP_API_KEY } from "ultis/functions";
import * as yup from "yup";
import { PAGE } from "../constant";
import "../dashboard.css";
import { GetDistrictData, GetWardData, SetCurrentPage, AddBusOperator } from "../redux/actions";
import axios from 'axios';

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Chỉ được phép sử dụng JPG hoặc PNG!');
  }
  return isJpgOrPng;
}

const firstError = {
  address: '* Vui lòng nhập địa chỉ', operatorName: "* Vui lòng nhập tên nhà xe", phoneNumber: "* Vui lòng nhập số điện thoại", email: "* Vui lòng nhập email", contact: "* Vui lòng nhập người liên hệ"
}

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function AddBusOperatorPage(props) {
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const cityData = useSelector((state) => state.Dashboard.cityData);
  const districtData = useSelector((state) => state.Dashboard.districtData);
  const wardData = useSelector((state) => state.Dashboard.wardData);
  const dispatch = useDispatch();
  const [cityCode, setCityCode] = useState(null)
  const [districtCode, setDistrictCode] = useState(null)
  const [wardCode, setWardCode] = useState(null)
  const [isLoadingImage, setLoadingImage] = useState(false)

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label("Email")
      .email("Email hiện tại không hợp lệ")
      .required("* Vui lòng nhập email"),
    phoneNumber: yup
      .string()
      .required('* Vui lòng nhập số điện thoại')
      .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, {
        message: 'Số điện thoại không hợp lệ',
      }),
    operatorName: yup
      .string()
      .trim()
      .required('* Vui lòng nhập tên nhà xe')
      .matches(
        /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
        {
          message: 'Tên nhà xe không hợp lệ',
        },
      ),
    contact: yup
      .string()
      .trim()
      .required('* Vui lòng nhập người liên hệ')
      .matches(
        /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
        {
          message: 'Tên người liên hệ không hợp lệ',
        },
      ),
    address: yup
      .string()
      .required('* Vui lòng nhập địa chỉ'),
    ward: yup.string().required('* Vui lòng nhập địa chỉ')
  });

  const onChangeCity = (value) => {
    setCityCode(cityData[value])
    setDistrictCode(null)
    setWardCode(null)
    dispatch(GetDistrictData.get({ cityCode: cityData[value].code }))
  }

  const onChangeDistrict = (value) => {
    setDistrictCode(districtData[value])
    setWardCode(null)
    dispatch(GetWardData.get({ cityCode: cityCode.code, districtCode: districtData[value].code }))
  }

  const onChangeWard = (value, handleChange) => {
    setWardCode(wardData[value])
    handleChange('ward')(wardData[value].pathWithType)
  }

  const handleAdd = (values) => {
    axios.request({
      url: `https://api.tomtom.com/search/2/geocode/${values.address}, ${values.ward}.json`,
      timeout: 10000,
      params: {
        countrySet: 'VN',
        lat: 10,
        lon: 106,
        language: 'vi-VN',
        key: MAP_API_KEY
      },
      method: 'GET',
    }).then(res => {
      const { results } = res.data
      let data = {
        avatar: values.avatar,
        email: values.email,
        contact: values.contact,
        address: `${values.address}, ${values.ward}`,
        name: values.operatorName,
        phoneNumber: values.phoneNumber
      }
      if (results && results.length > 0) {
        data = {
          ...data,
          lat: results[0].position.lat,
          long: results[0].position.lon
        }
      }
      dispatch(AddBusOperator.get(data))
    }).catch(error => Modal.info({
      title: 'Lỗi',
      content: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
      onOk() { },
    }))
  }

  if (isLoading) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }

  const handleChangeAvatar = (info, handleChange) => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        handleChange('avatar')(imageUrl)
        setLoadingImage(false)
      });
    }
  };

  const uploadButton = (
    <div>
      {isLoadingImage ? <LoadingOutlined style={{ color: COLOR.primary }} /> : <PlusOutlined />}
      <div className="ant-upload-text" style={{ fontFamily: 'Source Sans Pro' }}>{isLoadingImage ? 'Đang tải lên' : 'Tải lên'}</div>
    </div>
  );

  return (
    <div className="chooseContainer">
      <span className="titleTopic">Thêm nhà xe</span>
      <Formik
        initialValues={{ avatar: null, operatorName: "", address: "", ward: '', phoneNumber: "", email: "", contact: "" }}
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
        }) => {
          return (
            <Form>
              <div className='rowAdd' style={{ alignItems: 'flex-start' }}>
                <span className='addTitle'>Ảnh đại diện:</span>
                <div style={{ display: 'flex', width: 100 }}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={info => handleChangeAvatar(info, handleChange)}
                  >
                    {values.avatar ? <img src={values.avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </div>
              </div>
              {errors.avatar && <span className="errorAdd">{errors.avatar}</span>}

              <div className='rowAdd'>
                <span className='addTitle'>Tên nhà xe:</span>
                <Input
                  className="addInput"
                  value={values.operatorName}
                  onChange={handleChange("operatorName")}
                  onTouchStart={() => setFieldTouched("operatorName")}
                  onBlur={handleBlur("operatorName")}
                  placeholder="Nhập tên nhà xe"
                />

              </div>
              {errors.operatorName && <span className="errorAdd">{errors.operatorName}</span>}
              <div className='rowAdd' style={{ alignItems: 'flex-start' }}>
                <span className='addTitle'>Địa chỉ:</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Select
                    placeholder='Chọn tỉnh/thành phố'
                    value={cityCode ? cityCode.nameWithType : undefined}
                    className='dropdownCity'
                    allowClear={false}
                    bordered
                    onChange={onChangeCity}
                  >
                    {cityData && cityData.map((item, index) => <Option value={index}>{item.nameWithType}</Option>)}
                  </Select>
                  <div id='rowDis'>
                    <Select
                      placeholder='Chọn quận/huyện'
                      value={districtCode ? districtCode.nameWithType : undefined}
                      className='dropdownNormal'
                      allowClear={false}
                      disabled={!(districtData && districtData.length > 0)}
                      onChange={onChangeDistrict}
                    >
                      {districtData && districtData.map((item, index) => <Option value={index}>{item.nameWithType}</Option>)}
                    </Select>
                    <Select
                      placeholder='Chọn phường/xã'
                      value={wardCode ? wardCode.nameWithType : undefined}
                      className='dropdownNormal'
                      allowClear={false}
                      disabled={!(wardData && wardData.length > 0)}
                      onChange={value => onChangeWard(value, handleChange)}
                    >
                      {wardData && wardData.map((item, index) => <Option value={index}>{item.nameWithType}</Option>)}
                    </Select>
                  </div>
                  <Input
                    className="addInput"
                    value={values.address}
                    onChange={handleChange("address")}
                    onTouchStart={() => setFieldTouched("address")}
                    onBlur={handleBlur("address")}
                    placeholder="Nhập địa chỉ"
                  />
                </div>
              </div>
              {(errors.address || errors.ward) && <span className="errorAdd">* Vui lòng nhập địa chỉ</span>}
              <div className='rowAdd'>
                <span className='addTitle'>Số điện thoại:</span>
                <Input
                  className="addInput"
                  value={values.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  onTouchStart={() => setFieldTouched("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  placeholder="Nhập số điện thoại"
                />

              </div>
              {errors.phoneNumber && <span className="errorAdd">{errors.phoneNumber}</span>}
              <div className='rowAdd'>
                <span className='addTitle'>Email:</span>
                <Input
                  className="addInput"
                  value={values.email}
                  onChange={handleChange("email")}
                  onTouchStart={() => setFieldTouched("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Nhập email"
                />

              </div>
              {errors.email && <span className="errorAdd">{errors.email}</span>}
              <div className='rowAdd'>
                <span className='addTitle'>Liên hệ:</span>
                <Input
                  className="addInput"
                  value={values.contact}
                  onChange={handleChange("contact")}
                  onTouchStart={() => setFieldTouched("contact")}
                  onBlur={handleBlur("contact")}
                  placeholder="Nhập tên người liên hệ"
                />

              </div>
              {errors.contact && <span className="errorAdd">{errors.contact}</span>}
              <div style={{ display: "flex" }}>
                <Button
                  className="btnStyle"
                  type="primary"
                  style={{
                    backgroundColor: "#EB5757",
                    borderColor: "white",
                  }}
                  onClick={() => dispatch(SetCurrentPage.get({ currentPage: PAGE.BUS_OPERATOR }))}
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

export default AddBusOperatorPage;
