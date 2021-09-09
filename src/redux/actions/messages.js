import { messagesAPI } from "utils/api";

const actions = {
  setMessages: (items) => ({
    type: "MESSAGES:SET_ITEMS",
    payload: items,
  }),
  addMessage: (message) => (dispatch, getState) => {
    const { dialogs } = getState();
    const { currentDialogId } = dialogs;

    if (currentDialogId === message.dialog) {
      dispatch({
        type: "MESSAGES:ADD_MESSAGE",
        payload: message,
      });
    }
  },
  setIsLoading: (bool) => ({
    type: "MESSAGES:SET_IS_LOADING",
    payload: bool,
  }),

  updateReadedStatus: (dialogId) => (dispatch) => {
    dispatch({ type: "MESSAGES:MESSAGES_READED", payload: dialogId });
  },

  removeMessage: (id) => (dispatch) => {
    messagesAPI
      .removeById(id)
      .then(({ data }) => {
        dispatch({ type: "MESSAGES:REMOVE_MESSAGE", payload: id });
      })
      .catch(() => {
        dispatch(actions.setIsLoading(false));
      });
  },

  fetchSendMessage:
    ({ text, dialogId, attachments }) =>
    (dispatch) => {
      return messagesAPI.send(text, dialogId, attachments);
    },

  fetchMessages: (dialogId) => (dispatch) => {
    dispatch(actions.setIsLoading(true));
    messagesAPI
      .getAllByDialogId(dialogId)
      .then(({ data }) => {
        dispatch(actions.setMessages(data));
      })
      .catch(() => {
        dispatch(actions.setIsLoading(false));
      });
  },
};

export default actions;
