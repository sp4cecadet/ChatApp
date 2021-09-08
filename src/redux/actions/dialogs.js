import { dialogsAPI } from "utils/api";
import socket from "core/socket";

import { messagesActions } from "./";

const actions = {
  setDialogs: (items) => ({
    type: "DIALOGS:SET_ITEMS",
    payload: items,
  }),

  updateReadedStatus:
    ({ dialogId }) =>
    (dispatch) => {
      dispatch(messagesActions.updateReadedStatus(dialogId));
      dispatch({
        type: "DIALOGS:LAST_MESSAGE_READED_STATUS",
        payload: {
          dialogId,
        },
      });
    },
  setCurrentDialogId: (userId, currentDialogId, newDialogId) => (dispatch) => {
    socket.emit("DIALOGS:JOIN", userId, currentDialogId, newDialogId);
    dispatch({
      type: "DIALOGS:SET_CURRENT_DIALOG_ID",
      payload: newDialogId,
    });
  },

  fetchDialogs: () => (dispatch) => {
    dialogsAPI.getAll().then(({ data }) => {
      dispatch(actions.setDialogs(data));
    });
  },
};

export default actions;
