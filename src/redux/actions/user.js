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
        window.axios.defaults.headers.common["token"] = data.token;
        window.localStorage["token"] = data.token;
        dispatch(actions.fetchUserData());
      }
    });
  },
};

export default actions;
