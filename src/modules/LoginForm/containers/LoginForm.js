import { withFormik } from "formik";
import validateFunc from "utils/validate";

import LoginForm from "../components/LoginForm";
import { showNotification } from "utils/helpers";
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

  handleSubmit: (values, { setSubmitting, props }) => {
    store
      .dispatch(userActions.fetchUserLogin(values))
      .then(() => {
        showNotification({
          title: "Авторизация выполнена",
          text: "Добро пожаловать!",
          type: "success",
        });
        setSubmitting(false);
      })
      .catch(() => {
        showNotification({
          title: "Ошибка авторизации",
          text: "Неверные e-mail и/или пароль",
          type: "error",
        });
        setSubmitting(false);
      });
  },

  displayName: "LoginForm", // helps with React DevTools
})(LoginForm);

export default LoginFormContainer;
