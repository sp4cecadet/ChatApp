import React, { useState, useEffect } from "react";
import { ChatInput as BaseChatInput } from "components/";
import { connect } from "react-redux";

import { messagesActions, attachmentsActions } from "redux/actions";
import { filesAPI } from "utils/api";
import socket from "core/socket";

const ChatInput = ({
  fetchSendMessage,
  currentDialogId,
  attachments,
  setAttachments,
  undoFileUpload,
  user,
}) => {
  window.navigator.getUserMedia =
    window.navigator.getUserMedia ||
    window.navigator.mozGetUserMedia ||
    window.navigator.msGetUserMedia ||
    window.navigator.webkitGetUserMedia;
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const onRecord = () => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, onRecording, onError);
    }
  };

  const onRecording = (stream) => {
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();

    recorder.onstart = () => {
      setIsRecording(true);
    };

    recorder.onstop = () => {
      setIsRecording(false);
    };

    recorder.ondataavailable = (e) => {
      const file = new File([e.data], "audio.webm");
      setLoading(true);
      filesAPI.upload(file).then(({ data }) => {
        sendAudio(data.file._id).then(() => {
          setLoading(false);
        });
      });
    };
  };

  const sendAudio = (audioId) => {
    return fetchSendMessage({
      text: null,
      dialogId: currentDialogId,
      attachments: [audioId],
    });
  };

  const onError = (err) => {
    console.log("Error: " + err);
  };

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
    setLoading(true);
    if (isRecording) {
      mediaRecorder.stop();
    }
    if (text.length || attachments.length) {
      fetchSendMessage({
        text,
        attachments: attachments.map((file) => file.uid),
        dialogId: currentDialogId,
      });
      setText("");
      setAttachments([]);
      setLoading(false);
    }
  };

  const handleKeyboardEvent = (e) => {
    if (String.fromCharCode(e.keyCode).match(/(\w|\s|\d)/g)) {
      socket.emit("KEYBOARD:KEY_PRESSED", {
        dialogId: currentDialogId,
      });
    }
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      sendMessage();
    }
  };

  const onUploadFiles = async (files) => {
    setLoading(true);

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
    setLoading(false);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
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
      handleStartRecording={onRecord}
      handleStopRecording={handleStopRecording}
      isRecording={isRecording}
      removeAttachment={undoFileUpload}
      isLoading={isLoading}
    />
  );
};

export default connect(
  ({ dialogs, attachments, user }) => ({
    dialogs: dialogs.items,
    currentDialogId: dialogs.currentDialogId,
    attachments: attachments.items,
    user: user.data,
  }),
  { ...messagesActions, ...attachmentsActions }
)(ChatInput);
