import RegisterForm from "../components/RegisterForm";

import { withFormik } from "formik";

export default withFormik({
  validate: (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Введите e-mail";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Неправильный адрес электронной почты";
    }

    if (!values.password) {
      errors.password = "Введите пароль";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(values.password)
    ) {
      errors.password = "Слишком простой пароль";
    }
    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: "RegisterForm", // helps with React DevTools
})(RegisterForm);
