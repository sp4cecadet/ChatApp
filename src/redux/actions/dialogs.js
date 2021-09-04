import { dialogsAPI } from "utils/api";
import socket from "core/socket";

const actions = {
  setDialogs: (items) => ({
    type: "DIALOGS:SET_ITEMS",
    payload: items,
  }),

  setCurrentDialogId: (id) => (dispatch) => {
    socket.emit("DIALOGS:JOIN", id);
    dispatch({
      type: "DIALOGS:SET_CURRENT_DIALOG_ID",
      payload: id,
    });
  },

  fetchDialogs: () => (dispatch) => {
    dialogsAPI.getAll().then(({ data }) => {
      dispatch(actions.setDialogs(data));
    });
  },
};

export default actions;
