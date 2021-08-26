import { axios } from "core";

export default {
  signin: (postData) => axios.post("/signin", postData),
  getMe: () => axios.get("/user/me"),
};
