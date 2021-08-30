import { axios } from "core/";

export default {
  getAllByDialogId: (id) => axios.get("/messages?dialog=" + id),
  send: (text, dialogId) =>
    axios.post("/message", {
      text: text,
      dialog_id: dialogId,
    }),
  removeById: (id) => axios.delete("/message?id=" + id),
};
