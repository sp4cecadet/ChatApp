import React, { useState, useEffect } from "react";

import { Input, Button } from "antd";
import {
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  SendOutlined,
} from "@ant-design/icons";

import { UploadField } from "@navjobs/upload";
import Picker from "emoji-picker-react";

import "./ChatInput.scss";

const ChatInput = (props) => {
  const [text, setText] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const { onSendMessage, currentDialogId } = props;

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };
  const handleKeyboardEvent = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    onSendMessage({ text: text, dialogId: currentDialogId });
    setText("");
  };

  const addEmoji = (event, emojiObject) => {
    setText(text + emojiObject.emoji);
  };

  const handleOutsideClick = (el, e) => {
    if (el && !el.contains(e.target)) {
      setEmojiPickerVisible(false);
    }
  };

  useEffect(() => {
    const el = document.querySelector(".chat-input__smile-btn");
    document.addEventListener("click", handleOutsideClick.bind(this, el));
    return () => {
      document.removeEventListener("click", handleOutsideClick.bind(this, el));
    };
  }, []);

  return (
    <div className="chat-input">
      <div className="chat-input__smile-btn">
        <div className="chat-input__emoji-picker">
          {emojiPickerVisible && (
            <Picker
              onEmojiClick={addEmoji}
              disableSkinTonePicker={true}
              pickerStyle={{ width: "400px", marginBottom: "5px" }}
            />
          )}
        </div>
        <Button
          onClick={toggleEmojiPicker}
          type="ghost"
          shape="circle"
          icon={<SmileOutlined />}
        />
      </div>
      <Input
        size="large"
        placeholder="Введите текст сообщения..."
        value={text}
        onKeyUp={(e) => {
          handleKeyboardEvent(e);
        }}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="chat-input__actions">
        <UploadField
          onFiles={(files) => console.log(files)}
          containerProps={{
            className: "chat-input__actions-upload-btn",
          }}
          uploadProps={{
            accept: ".jpg,.jpeg,.gif,.png,.bmp",
            multiple: true,
          }}
        >
          <Button type="ghost" shape="circle" icon={<CameraOutlined />} />
        </UploadField>

        <Button
          type="ghost"
          shape="circle"
          onClick={sendMessage}
          icon={text ? <SendOutlined /> : <AudioOutlined />}
        />
      </div>
    </div>
  );
};

export default ChatInput;
