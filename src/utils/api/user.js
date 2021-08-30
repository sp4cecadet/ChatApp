import { axios } from "core";

export default {
  signin: (postData) => axios.post("/signin", postData),
  signup: (postData) => axios.post("/signup", postData),
  verifyHash: (hash) => axios.get("/user/verify?hash=" + hash),
  getMe: () => axios.get("/user/me"),
  findUsers: (name) => axios.get("/user/find?query=" + name),
};
