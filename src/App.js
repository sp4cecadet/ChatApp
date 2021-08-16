import React from "react";
import { Auth, Home } from "./pages";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <div className="wrapper">
      <Route exact path={["/", "/login", "/register"]}>
        <Auth />
      </Route>
      <Route exact path="/im">
        <Home />
      </Route>
    </div>
  );
};

export default App;
