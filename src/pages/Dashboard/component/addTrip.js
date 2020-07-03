import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Select, Spin, Upload } from "antd";
import "antd/dist/antd.css";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from 'react-time-picker';
import { COLOR } from "ultis/functions";
import * as yup from "yup";
import { PAGE } from "../constant";
import "../dashboard.css";
import {
  GetWardData,
  SetCurrentPage
} from "../redux/actions";

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Chỉ được phép sử dụng JPG hoặc PNG!");
  }
  return isJpgOrPng;
}

const firstError = {
  // address: "* Vui lòng nhập địa chỉ",
  // operatorName: "* Vui lòng nhập tên nhà xe",
  // phoneNumber: "* Vui lòng nhập số điện thoại",
  // email: "* Vui lòng nhập email",
  // contact: "* Vui lòng nhập người liên hệ",
};

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 30, color: COLOR.primary }} spin />
);

function AddTripPage(props) {
  const isLoading = useSelector((state) => state.Dashboard.isLoading);
  const citiesTrip = useSelector((state) => state.Dashboard.citiesTrip);
  const busType = useSelector((state) => state.Dashboard.busType);
  const districtData = useSelector((state) => state.Dashboard.districtData);
  const wardData = useSelector((state) => state.Dashboard.wardData);
  const dispatch = useDispatch();
  const [cityCode, setCityCode] = useState(null);
  const [cityCodeTo, setCityCodeTo] = useState(null);
  const [districtCode, setDistrictCode] = useState(null);
  const [wardCode, setWardCode] = useState(null);
  const [isLoadingImage, setLoadingImage] = useState(false);

  const validationSchema = yup.object().shape({
    // email: yup
    //   .string()
    //   .label("Email")
    //   .email("Email hiện tại không hợp lệ")
    //   .required("* Vui lòng nhập email"),
    // phoneNumber: yup
    //   .string()
    //   .required("* Vui lòng nhập số điện thoại")
    //   .matches(/((09|03|07|08|05)+([0-9]{8})\b)/, {
    //     message: "Số điện thoại không hợp lệ",
    //   }),
    // operatorName: yup
    //   .string()
    //   .trim()
    //   .required("* Vui lòng nhập tên nhà xe")
    //   .matches(
    //     /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
    //     {
    //       message: "Tên nhà xe không hợp lệ",
    //     }
    //   ),
    // contact: yup
    //   .string()
    //   .trim()
    //   .required("* Vui lòng nhập người liên hệ")
    //   .matches(
    //     /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
    //     {
    //       message: "Tên người liên hệ không hợp lệ",
    //     }
    //   ),
    price: yup
      .number()
      .min(50000, "Số tiền phải lớn hơn 50.000đ")
      .required("* Vui lòng nhập đơn giá"),
    from: yup
      .object()
      .shape({ type: yup.string(), busTypeTitle: yup.string() }),
    to: yup.object().shape({ type: yup.string(), busTypeTitle: yup.string() }),
  });

  const onChangeCityFrom = (value, handleChange) => {
    handleChange("from", citiesTrip[value]);
  };

  const onChangeCityTo = (value, handleChange) => {
    handleChange("to", citiesTrip[value]);
  };

  const onChangeBusType = (value, handleChange) => {
    handleChange("busType")(busType[value].type);
    handleChange("busTypeTitle")(busType[value].busTypeTitle);
  };

  const onChangeDistrict = (value) => {
    setDistrictCode(districtData[value]);
    setWardCode(null);
    dispatch(
      GetWardData.get({
        cityCode: cityCode.code,
        districtCode: districtData[value].code,
      })
    );
  };

  const onChangeWard = (value, handleChange) => {
    setWardCode(wardData[value]);
    handleChange("ward")(wardData[value].pathWithType);
  };

  const handleAdd = (values) => {
    // axios
    //   .request({
    //     url: `https://api.tomtom.com/search/2/geocode/${values.address}, ${values.ward}.json`,
    //     timeout: 10000,
    //     params: {
    //       countrySet: "VN",
    //       lat: 10,
    //       lon: 106,
    //       language: "vi-VN",
    //       key: MAP_API_KEY,
    //     },
    //     method: "GET",
    //   })
    //   .then((res) => {
    //     const { results } = res.data;
    //     let data = {
    //       avatar: values.avatar,
    //       email: values.email,
    //       contact: values.contact,
    //       address: `${values.address}, ${values.ward}`,
    //       name: values.operatorName,
    //       phoneNumber: values.phoneNumber,
    //     };
    //     if (results && results.length > 0) {
    //       data = {
    //         ...data,
    //         lat: results[0].position.lat,
    //         long: results[0].position.lon,
    //       };
    //     }
    //     dispatch(AddBusOperator.get(data));
    //   })
    //   .catch((error) =>
    //     Modal.info({
    //       title: "Lỗi",
    //       content: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
    //       onOk() {},
    //     })
    //   );
  };

  if (isLoading) {
    return (
      <div className="chooseContainer">
        <Spin indicator={loadingIcon} />
      </div>
    );
  }

  const handleChangeAvatar = (info, handleChange) => {
    if (info.file.status === "uploading") {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        handleChange("thumbnail")(imageUrl);
        setLoadingImage(false);
      });
    }
  };

  const uploadButton = (
    <div>
      {isLoadingImage ? (
        <LoadingOutlined style={{ color: COLOR.primary }} />
      ) : (
          <PlusOutlined />
        )}
      <div
        className="ant-upload-text"
        style={{ fontFamily: "Source Sans Pro" }}
      >
        {isLoadingImage ? "Đang tải lên" : "Tải lên"}
      </div>
    </div>
  );

  return (
    <div className="chooseContainer">
      <span className="titleTopic">Thêm chuyến xe</span>
      <Formik
        initialValues={{
          thumbnail: null,
          from: undefined,
          to: undefined,
          dropOff: "",
          pickUp: "",
          price: 0,
          timeEnd: "",
          timeStart: "",
          busType: "",
          busTypeTitle: undefined,
        }}
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
              <div className="rowAdd" style={{ alignItems: "flex-start" }}>
                <span className="addTitle">Thêm ảnh:</span>
                <div style={{ display: "flex", width: 100 }}>
                  <Upload
                    name="thumbnail"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={(info) => handleChangeAvatar(info, handleChange)}
                  >
                    {values.thumbnail ? (
                      <img
                        src={values.thumbnail}
                        alt="thumbnail"
                        style={{ width: "100%" }}
                      />
                    ) : (
                        uploadButton
                      )}
                  </Upload>
                </div>
              </div>
              <div className="rowAdd">
                <span className="addTitle">Điểm khởi hành:</span>
                <Select
                  placeholder="Chọn thành phố"
                  value={values.from?.cityTitle}
                  className="dropdownNormal"
                  allowClear={false}
                  bordered
                  onChange={onChangeCityFrom}
                >
                  {citiesTrip &&
                    citiesTrip.map((item, index) => (
                      <Option value={index}>{item.cityTitle}</Option>
                    ))}
                </Select>
                <span className="addTitle" style={{ width: 120, marginLeft: 20, marginRight: 12 }}>Điểm đến:</span>
                <Select
                  placeholder="Chọn thành phố"
                  value={values.to?.cityTitle}
                  className="dropdownNormal"
                  allowClear={false}
                  onChange={onChangeCityTo}
                >
                  {citiesTrip &&
                    citiesTrip.map((item, index) => (
                      <Option value={index}>{item.cityTitle}</Option>
                    ))}
                </Select>
              </div>
              <div className="rowAdd">
                <span className="addTitle">Thời gian khởi hành:</span>
                <TimePicker onChange={handleChange('timeStart')} value={values.timeStart} format='HH:mm' clearIcon={null} clockClassName='timePicker' className='timePicker' />
                <span className="addTitle" style={{ width: 120, marginLeft: 20, marginRight: 12 }}>Thời gian đến:</span>
                <TimePicker onChange={handleChange('timeEnd')} value={values.timeEnd} format='HH:mm' clearIcon={null} clockClassName='timePicker' className='timePicker' />
              </div>
              <div className="rowAdd">
                <span className="addTitle">Loại xe:</span>
                <Select
                  placeholder="Chọn loại xe"
                  value={values.busTypeTitle}
                  className="dropdownNormal"
                  allowClear={false}
                  onChange={onChangeBusType}
                >
                  {busType &&
                    busType.map((item, index) => (
                      <Option value={index}>{item.busTypeTitle}</Option>
                    ))}
                </Select>
              </div>
              {errors.busTypeTitle && (
                <span className="errorAdd">{errors.busTypeTitle}</span>
              )}
              <div className="rowAdd">
                <span className="addTitle">Đơn giá:</span>
                <Input
                  className="addInput"
                  value={values.price}
                  onChange={handleChange("price")}
                  onTouchStart={() => setFieldTouched("price")}
                  onBlur={handleBlur("price")}
                  placeholder="Nhập đơn giá"
                />
              </div>
              {errors.price && <span className="errorAdd">{errors.price}</span>}
              <div style={{ display: "flex" }}>
                <Button
                  className="btnStyle"
                  type="primary"
                  style={{
                    backgroundColor: "#EB5757",
                    borderColor: "white",
                  }}
                  onClick={() =>
                    dispatch(
                      SetCurrentPage.get({ currentPage: PAGE.TRIP_LIST })
                    )
                  }
                >
                  Hủy
                </Button>
                <Button
                  disabled={!isValid}
                  className="btnStyle"
                  type="primary"
                  style={{
                    backgroundColor: isValid ? COLOR.primary : "gray",
                    borderColor: "white",
                    color: "white",
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

export default AddTripPage;
