import { axios } from "core/";

export default {
  getAllByDialogId: (id) => axios.get("/messages?dialog=" + id),
  send: (text, dialogId, attachments) =>
    axios.post("/message", {
      text,
      dialog_id: dialogId,
      attachments,
    }),
  removeById: (id) => axios.delete("/message?id=" + id),
};
