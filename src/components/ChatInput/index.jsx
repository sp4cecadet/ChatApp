import React from "react";

import { Input, Button } from "antd";
import {
  SmileOutlined,
  UploadOutlined,
  AudioOutlined,
  SendOutlined,
  DeleteOutlined,
  LoadingOutlined,
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
    handleStartRecording,
    isRecording,
    isLoading,
    handleStopRecording,
  } = props;

  return (
    <div className="chat-input">
      <div className="chat-input__wrapper">
        {!isRecording && (
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
        )}
        {isRecording ? (
          <>
            <Button
              type="ghost"
              shape="circle"
              onClick={handleStopRecording}
              icon={<DeleteOutlined />}
            />
            <div className="chat-input__record-status">
              <i></i>
              Запись...
            </div>
          </>
        ) : (
          <Input
            size="large"
            placeholder="Введите текст сообщения..."
            value={text}
            onKeyDown={(e) => {
              handleKeyboardEvent(e);
            }}
            onChange={(e) => setText(e.target.value)}
          />
        )}
        <div className="chat-input__actions">
          {!isRecording && (
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
              <Button type="ghost" shape="circle" icon={<UploadOutlined />} />
            </UploadField>
          )}

          {isRecording || attachments.length || text ? (
            isLoading ? (
              <LoadingOutlined />
            ) : (
              <Button
                type="ghost"
                shape="circle"
                onClick={sendMessage}
                icon={<SendOutlined />}
              />
            )
          ) : isLoading ? (
            <LoadingOutlined />
          ) : (
            <div className="chat-input__record-btn">
              <Button
                type="ghost"
                shape="circle"
                onClick={handleStartRecording}
                icon={<AudioOutlined />}
              />
            </div>
          )}
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
