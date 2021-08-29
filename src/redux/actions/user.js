import { userAPI } from "utils/api";

const actions = {
  setUserData: (data) => ({
    type: "USER:SET_DATA",
    payload: data,
  }),

  fetchUserData: () => (dispatch) => {
    userAPI.getMe().then(({ data }) => {
      dispatch(actions.setUserData(data));
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
