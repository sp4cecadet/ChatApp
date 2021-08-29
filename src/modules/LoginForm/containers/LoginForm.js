import { withFormik } from "formik";
import validateFunc from "utils/validate";
import { withRouter } from "react-router";

import { showNotification } from "utils/helpers";
import LoginForm from "../components/LoginForm";
import { userActions } from "redux/actions";
import store from "redux/store";

const LoginFormContainer = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),
  validate: (values) => {
    let errors = {};

    validateFunc({ isAuth: true, values, errors });

    return errors;
  },

  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    store
      .dispatch(userActions.fetchUserLogin(values))
      .then(() => {
        showNotification({
          title: "Авторизация выполнена",
          text: "Добро пожаловать!",
          type: "success",
        });
        setTimeout(() => props.history.push("/"), 300);
      })
      .catch(() => {
        setSubmitting(false);
        resetForm();
        showNotification({
          title: "Ошибка авторизации",
          text: "Неверные e-mail и/или пароль",
          type: "error",
        });
      });
  },

  displayName: "LoginForm", // helps with React DevTools
})(LoginForm);

export default withRouter(LoginFormContainer);
