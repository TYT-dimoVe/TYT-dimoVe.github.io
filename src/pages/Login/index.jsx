import React from "react";
import "./login.css";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Input } from "antd";
import axios from "axios";
import firebase from "firebase";
import moment from "moment";

function Login() {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label("Email")
      .email("Email hiện tại không hợp lệ")
      .required("* Vui lòng nhập email"),
    password: yup
      .string()
      .required("* Vui lòng nhập mật khẩu")
      .matches(/(?=.{8,})/, {
        message: "Mật khẩu phải gồm 8 kí tự",
      }),
  });

  const handleLogin = (values) => {
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(values.email, values.password)
    //   .then((res) => console.log(res))
    //   .catch((error) => {
    //     if (error.code === "auth/user-not-found")
    //       this.setState({ isNotHaveAccount: true });
    //     else if (error.code === "auth/wrong-password")
    //       this.setState({ isWrongPassword: true });
    //   });
    // firebase
    //   .database()
    //   .ref("trips")
    //   .once("value", (snapshot) => {
    //     if (!snapshot.exists()) {
    //       console.log("Trips donot exist");
    //       return;
    //     }
    //     var tripToGet = snapshot.val();
    //     const busOperator = {};
    //     const map = new Map();
    //     for (const item of tripToGet) {
    //       if (!map.has(item.busOperatorId)) {
    //         map.set(item.busOperatorId, true); // set any value to Map
    //         busOperator[item.busOperatorId] = {
    //           busOperatorId: item.busOperatorId,
    //           email: `${item.busOperatorId.toLowerCase()}@gmail.com`,
    //           name: item.busOperator,
    //           phoneNumber: "0912345678",
    //           contact: item.busOperator,
    //           address: "221 PHẠM NGŨ LÃO, QUẬN 1, TP.HCM",
    //           lat: 10.768,
    //           long: 106.69,
    //         };
    //       }
    //     }
    //     console.log(busOperator);
    //   })
    //   .catch((error) => console.log(error));
    // axios
    //   .request({
    //     url: "http://localhost:5001/dimo-3e6f7/us-central1/dimoApi/api/trips",
    //     timeout: 10000,
    //     headers: { "Access-Control-Allow-Origin": true },
    //     method: "POST",
    //     data: {
    //       from: "NHATRANG",
    //       to: "SAIGON",
    //       date: "21/06/2020",
    //       page: 1,
    //     },
    //   })
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));
  };

  return (
    <div id="loginBg">
      <span className="dimoName">dimo</span>
      <div id="loginBox">
        <span id="loginStyle">Đăng nhập</span>
        <Formik
          initialValues={{ email: "", password: "" }}
          isInitialValid={false}
          validationSchema={validationSchema}
          onSubmit={(values) => handleLogin(values)}
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
                <Input
                  id="inputBox"
                  value={values.email}
                  onChange={handleChange("email")}
                  onTouchStart={() => setFieldTouched("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Email"
                />
                {errors.email && <span id="errorStyle">{errors.email}</span>}
                <Input
                  id="inputBox"
                  type="password"
                  onChange={handleChange("password")}
                  onTouchStart={() => setFieldTouched("password")}
                  value={values.password}
                  onBlur={handleBlur("password")}
                  placeholder="Mật khẩu"
                />
                {errors.password && (
                  <span id="errorStyle">{errors.password}</span>
                )}
                <button
                  id="loginBtn"
                  type="submit"
                  disabled={!isValid}
                  onClick={handleSubmit}
                  size={"large"}
                >
                  Đăng nhập
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
