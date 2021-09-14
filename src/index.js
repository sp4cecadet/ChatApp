import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { userActions } from "redux/actions";
import store from "redux/store";
import { createBrowserHistory } from "history";

import "./styles/index.scss";

const browserHistory = createBrowserHistory();

if (localStorage.token) {
  store.dispatch(userActions.setUserData(localStorage.token));
  store.dispatch(userActions.fetchUserData());
}

if (window.performance) {
  if (performance.getEntriesByType("navigation")[0].type === "reload") {
    window.location.href = "/";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/" history={browserHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
