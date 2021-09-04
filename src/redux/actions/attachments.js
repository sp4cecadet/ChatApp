import { filesAPI } from "utils/api";

const Actions = {
  setAttachments: (items) => ({
    type: "ATTACHMENTS:SET_ITEMS",
    payload: items,
  }),
  removeAttachment: (file) => ({
    type: "ATTACHMENTS:REMOVE_ITEM",
    payload: file,
  }),
  undoFileUpload: (file) => (dispatch) => {
    filesAPI.delete(file).then(() => {
      dispatch(Actions.removeAttachment(file));
    });
  },
};

export default Actions;
