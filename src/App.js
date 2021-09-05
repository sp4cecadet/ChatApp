import React from "react";
import { connect } from "react-redux";
import { Auth, Home } from "./pages";
import { Route, Redirect, Switch } from "react-router-dom";

const App = (props) => {
  const { isAuth } = props;

  return (
    <div className="wrapper">
      <Switch>
        <Route
          exact
          path={["/signin", "/signup", "/user/verify"]}
          component={Auth}
        />
        <Route
          path={["/", "/dialog/:id"]}
          render={() => (isAuth ? <Home /> : <Redirect to="/signin" />)}
        />
      </Switch>
    </div>
  );
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
