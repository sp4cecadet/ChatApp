import { userAPI } from "utils/api";

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
    return userAPI.signin(postData).then(({ data }) => {
      if (data.token) {
        window.localStorage["token"] = data.token;
        window.axios.defaults.headers.common["token"] =
          window.localStorage.token;
        dispatch(actions.fetchUserData());
      }
    });
  },

  fetchUserRegister: (postData) => (dispatch) => {
    return userAPI.signup(postData);
  },
};

export default actions;
