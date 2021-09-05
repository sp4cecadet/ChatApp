import React from "react";
import { Route } from "react-router-dom";

import { LoginForm, RegisterForm } from "modules";
import CheckValidationStatus from "./CheckValidationStatus";

import "./Auth.scss";

const Auth = () => {
  return (
    <section className="auth">
      <div className="auth__content">
        <Route exact path="/signin">
          <LoginForm />
        </Route>
        <Route exact path="/signup">
          <RegisterForm />
        </Route>
        <Route exact path="/user/verify">
          <CheckValidationStatus />
        </Route>
      </div>
    </section>
  );
};

export default Auth;
