import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/login";
import Reservations from "./components/reservations";

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/login">SignIn</Link>
        </li>
        <li>
          <Link to="/reservations">reservations</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/reservations">
          <Reservations />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
