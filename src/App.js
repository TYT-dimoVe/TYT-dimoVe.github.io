import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'
import Loading from "pages/Loading";
function App() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <Loading />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </div>
    </Router>
  );
}

export default App;