import { Input, Modal } from "antd";
import firebase from "firebase";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import "./login.css";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
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
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => history.push("/"))
      .catch((error) => {
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
