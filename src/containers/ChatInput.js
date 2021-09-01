import React, { useState, useEffect } from "react";
import { ChatInput as BaseChatInput } from "components/";
import { connect } from "react-redux";

import { messagesActions } from "redux/actions";
import { filesAPI } from "utils/api";

const ChatInput = ({ fetchSendMessage, currentDialogId }) => {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };

  const handleOutsideClick = (el, e) => {
    if (el && !el.contains(e.target)) {
      setEmojiPickerVisible(false);
    }
  };

  const addEmoji = (event, emojiObject) => {
    setText(text + emojiObject.emoji);
  };

  const sendMessage = () => {
    fetchSendMessage({ text: text, dialogId: currentDialogId });
    setText("");
  };

  const handleKeyboardEvent = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      sendMessage();
    }
  };

  const onUploadFiles = async (files) => {
    let uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uid = Math.round(Math.random() * 1000);
      uploaded = [
        ...uploaded,
        {
          uid,
          name: file.name,
        },
      ];
      setAttachments(uploaded);
      // eslint-disable-next-line no-loop-func
      await filesAPI.upload(file).then(({ data }) => {
        uploaded = uploaded.map((item) => {
          if (item.uid === uid) {
            return {
              status: "done",
              uid: data.file._id,
              name: data.file.filename,
              url: data.file.url,
            };
          }
          return item;
        });
      });
    }
    setAttachments(uploaded);
  };

  useEffect(() => {
    const el = document.querySelector(".chat-input__smile-btn");
    document.addEventListener("click", handleOutsideClick.bind(this, el));
    return () => {
      document.removeEventListener("click", handleOutsideClick.bind(this, el));
    };
  }, []);

  return (
    <BaseChatInput
      text={text}
      setText={setText}
      emojiPickerVisible={emojiPickerVisible}
      setEmojiPickerVisible={setEmojiPickerVisible}
      currentDialogId={currentDialogId}
      toggleEmojiPicker={toggleEmojiPicker}
      handleOutsideClick={handleOutsideClick}
      addEmoji={addEmoji}
      sendMessage={sendMessage}
      handleKeyboardEvent={handleKeyboardEvent}
      attachments={attachments}
      onUploadFiles={onUploadFiles}
    />
  );
};

export default connect(
  ({ dialogs }) => ({
    dialogs: dialogs.items,
    currentDialogId: dialogs.currentDialogId,
  }),
  messagesActions
)(ChatInput);
