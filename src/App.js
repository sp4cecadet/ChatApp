import React from "react";
import { connect } from "react-redux";
import { Auth, Home } from "./pages";
import { Route, Redirect } from "react-router-dom";

const App = (props) => {
  const { isAuth } = props;
  return (
    <div className="wrapper">
      <Route exact path={["/login", "/register"]}>
        <Auth />
      </Route>

      <Route exact path="/im">
        <Home />
      </Route>
      {isAuth ? <Redirect to="/im" /> : <Redirect to="/login" />}
    </div>
  );
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
