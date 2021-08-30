import { React, useState } from "react";

import { Input, Button } from "antd";
import {
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  SendOutlined,
} from "@ant-design/icons";

import { UploadField } from "@navjobs/upload";
import { Picker } from "emoji-mart";

import "./ChatInput.scss";

const ChatInput = (props) => {
  const [text, setText] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const { onSendMessage, currentDialogId } = props;

  const toggleEmojiPicker = () => {
    setEmojiPickerVisible(!emojiPickerVisible);
  };
  const handleSendMessage = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      console.log("Sending...");
      onSendMessage({ text: text, dialogId: currentDialogId });
      setText("");
    }
  };

  return (
    <div className="chat-input">
      <div className="chat-input__smile-btn">
        {emojiPickerVisible && (
          <div className="chat-input__emoji-picker">
            <Picker set="apple" />
          </div>
        )}
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
          handleSendMessage(e);
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
          icon={text ? <SendOutlined /> : <AudioOutlined />}
        />
      </div>
    </div>
  );
};

export default ChatInput;
