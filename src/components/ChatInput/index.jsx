import React from "react";

import { Input, Button } from "antd";
import {
  SmileOutlined,
  PictureOutlined,
  AudioOutlined,
  SendOutlined,
} from "@ant-design/icons";

import { UploadField } from "@navjobs/upload";
import Picker from "emoji-picker-react";

import { UploadFiles } from "components";

import "./ChatInput.scss";

const ChatInput = (props) => {
  const {
    attachments,
    removeAttachment,
    text,
    setText,
    emojiPickerVisible,
    toggleEmojiPicker,
    addEmoji,
    sendMessage,
    handleKeyboardEvent,
    onUploadFiles,
  } = props;

  return (
    <div className="chat-input">
      <div className="chat-input__wrapper">
        <div className="chat-input__smile-btn">
          <div className="chat-input__emoji-picker">
            {emojiPickerVisible && (
              <Picker
                onFiles={onUploadFiles}
                onEmojiClick={addEmoji}
                disableSkinTonePicker={true}
                pickerStyle={{
                  width: "320px",
                  height: "520px",
                }}
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
            onFiles={onUploadFiles}
            containerProps={{
              className: "chat-input__actions-upload-btn",
            }}
            uploadProps={{
              accept: ".jpg,.jpeg,.gif,.png,.bmp",
              multiple: true,
            }}
          >
            <Button type="ghost" shape="circle" icon={<PictureOutlined />} />
          </UploadField>

          <Button
            type="ghost"
            shape="circle"
            onClick={sendMessage}
            icon={text ? <SendOutlined /> : <AudioOutlined />}
          />
        </div>
      </div>
      {attachments.length > 0 && (
        <div className="chat-input__attachments">
          <UploadFiles
            removeAttachment={removeAttachment}
            attachments={attachments}
          />
        </div>
      )}
    </div>
  );
};

export default ChatInput;
