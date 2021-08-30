import { withFormik } from "formik";
import validateFunc from "utils/validate";
import { withRouter } from "react-router";

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

  handleSubmit: async (values, { setSubmitting, resetForm, props }) => {
    store
      .dispatch(await userActions.fetchUserLogin(values))
      .then(({ status }) => {
        if (status === "success") {
          props.history.push("/");
        }
      })
      .catch(() => {
        setSubmitting(false);
        resetForm();
      });
  },

  displayName: "LoginForm", // helps with React DevTools
})(LoginForm);

export default withRouter(LoginFormContainer);
