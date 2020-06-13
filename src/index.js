import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase";
import { Provider } from 'react-redux'
import { store } from 'core/store';
import { ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import { IconContext } from "react-icons"

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={viVN}>
        <IconContext.Provider value={{ className: "react-icon-clasname", style: { verticalAlign: 'middle' } }}>
          <App />
        </IconContext.Provider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
