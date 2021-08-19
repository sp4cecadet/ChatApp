import { React, useState } from "react";

import { Input, Button } from "antd";
import {
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  SendOutlined,
} from "@ant-design/icons";

import "./ChatInput.scss";

const ChatInput = () => {
  const [text, setText] = useState("");

  return (
    <div className="chat-input">
      <div className="chat-input__smile-btn">
        <Button type="ghost" shape="circle" icon={<SmileOutlined />} />
      </div>
      <Input
        size="large"
        placeholder="Введите текст сообщения..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="chat-input__actions">
        <Button type="ghost" shape="circle" icon={<CameraOutlined />} />
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
