import { userAPI } from "utils/api";

import { showNotification } from "utils/helpers";

const actions = {
  setUserData: (data) => ({
    type: "USER:SET_DATA",
    payload: data,
  }),

  setIsAuth: (bool) => ({
    type: "USER:SET_IS_AUTH",
    payload: bool,
  }),

  fetchUserData: () => (dispatch) => {
    userAPI
      .getMe()
      .then(({ data }) => {
        dispatch(actions.setUserData(data));
      })
      .catch((err) => {
        if (err.response.status === 403) {
          dispatch(actions.setIsAuth(false));
          delete window.localStorage.token;
        }
      });
  },

  fetchUserLogin: (postData) => (dispatch) => {
    return userAPI
      .signin(postData)
      .then(({ data }) => {
        const { token } = data;
        showNotification({
          title: "Авторизация выполнена",
          text: "Добро пожаловать!",
          type: "success",
        });
        window.axios.defaults.headers.common["token"] = token;
        window.localStorage["token"] = token;
        dispatch(actions.fetchUserData());
        dispatch(actions.setIsAuth(true));
        return data;
      })
      .catch(({ response }) => {
        showNotification({
          title: "Ошибка при авторизации",
          text: "Неверный логин или пароль",
          type: "error",
        });
      });
  },

  fetchUserRegister: (postData) => (dispatch) => {
    return userAPI.signup(postData);
  },
};

export default actions;
