import animationData from "assets/bus.json";
import React from "react";
import Lottie from "react-lottie";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { SetTypeAccount } from "pages/Dashboard/redux/actions";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Loading() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await firebase
          .database()
          .ref("users")
          .child(firebase.auth().currentUser.uid)
          .once("value", (snapshot) => {
            dispatch(SetTypeAccount.get(snapshot.val()));
          });
        history.push("/dashboard");
      } else {
        history.push("/login");
      }
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Lottie options={defaultOptions} width={400} />
    </div>
  );
}

export default Loading;
