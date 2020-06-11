import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'
function App() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/dashboard">
          <Login />
        </Route>
      </div>
    </Router>
  );
}

export default App;