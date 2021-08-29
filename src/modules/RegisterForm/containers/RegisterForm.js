import RegisterForm from "../components/RegisterForm";
import { withFormik } from "formik";

import { showNotification } from "utils/helpers";
import validateFunc from "utils/validate";
import { userActions } from "redux/actions";
import store from "redux/store";

const RegisterFormContainer = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    email: "",
    fullname: "",
    password: "",
    password2: "",
  }),
  validate: (values) => {
    let errors = {};

    validateFunc({ isAuth: false, values, errors });

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    store
      .dispatch(userActions.fetchUserRegister(values))
      .then(({ data }) => {
        if (data.status === "exists") {
          showNotification({
            title: "Ошибка при регистрации",
            text: data.message,
            type: "error",
          });
        } else {
          showNotification({
            title: "Регистрация выполнена",
            text: "Подтвердите свой аккаунт перейдя по ссылке в письме которое было отправлено на указанный адрес электронной почты",
            type: "success",
            duration: 0,
          });
          setSubmitting(false);
        }
      })
      .catch(() => {
        setSubmitting(false);
      });
  },

  displayName: "RegisterForm", // helps with React DevTools
})(RegisterForm);

export default RegisterFormContainer;
