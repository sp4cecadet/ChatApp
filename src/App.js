import React from "react";
import { connect } from "react-redux";
import { Auth, Home } from "./pages";
import { Route, Redirect, Switch } from "react-router-dom";

const App = (props) => {
  const { isAuth } = props;

  //   if (localStorage.token) {
  //     store.dispatch(setUser(localStorage.token));
  //   }

  return (
    <div className="wrapper">
      <Switch>
        <Route
          exact
          path={["/signin", "/signup", "/signup/verify"]}
          component={Auth}
        />
        <Route
          path="/"
          render={() => (isAuth ? <Home /> : <Redirect to="/signin" />)}
        />
      </Switch>
    </div>
  );
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
