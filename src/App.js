import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login from 'pages/Login'
function App() {
  return (
    <Router>
      <div style={{ width: '100vw', maxWidth: '100%' }}>
        <Route exact path="/">
          <Login />
        </Route>
      </div>
    </Router>
  );
}

export default App;