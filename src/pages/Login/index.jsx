import { Input, Modal, Button } from "antd";
import firebase from "firebase";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import "./login.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { COLOR } from "ultis/functions";

function Login() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/user-not-found") {
          Modal.error({
            title: "Không tìm thấy",
            content: "Không tìm thấy người dùng này.",
          });
        } else if (error.code === "auth/wrong-password") {
          Modal.error({
            title: "Sai mật khẩu",
            content: "Bạn đã nhập sai mật khẩu.",
          });
        }
      });
  };

  const handleKeyPress = (isValid, event, values) => {
    if (isValid && event.key === "Enter") {
      handleLogin(values);
    }
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
                  onKeyPress={(event) => handleKeyPress(isValid, event, values)}
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
                  onKeyPress={(event) => handleKeyPress(isValid, event, values)}
                />
                {errors.password && (
                  <span id="errorStyle">{errors.password}</span>
                )}
                <Button
                  id="loginBtn"
                  disabled={!isValid}
                  style={{ backgroundColor: isValid ? COLOR.primary : "gray" }}
                  onClick={handleSubmit}
                  size={"large"}
                  loading={loading}
                >
                  Đăng nhập
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
