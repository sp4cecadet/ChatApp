import React from "react";
import PropTypes from "prop-types";
import { Empty, Spin, Modal } from "antd";

import { Message } from "components/";

import "./Messages.scss";

const Messages = ({
  onRemoveMessage,
  blockRef,
  isLoading,
  isTyping,
  userId,
  currentDialog,
  currentDialogId,
  items,
  partner,
  previewImage,
  setPreviewImage,
  blockHeight,
}) => {
  return (
    <div
      className="chat__dialog-messages"
      style={{ height: `calc(100% - ${blockHeight}px)` }}
    >
      <div ref={blockRef} className="messages">
        {isLoading ? (
          <div className="messages--loading">
            <Spin tip="Идет загрузка сообщений..." size="large" />
          </div>
        ) : items?.length > 0 && !isLoading ? (
          items.map((item) => {
            return (
              <Message
                key={item._id}
                sender={item.sender}
                isMine={item.sender._id === userId}
                attachments={item.attachments}
                onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                setPreviewImage={setPreviewImage}
                {...item}
              />
            );
          })
        ) : (
          currentDialogId && <Empty description="Начните диалог" />
        )}
        {isTyping && <Message isTyping={isTyping} sender={partner} />}
        <Modal
          visible={previewImage}
          onCancel={() => setPreviewImage(null)}
          footer={null}
        >
          <img src={previewImage} style={{ width: "100%" }} alt="Preview" />
        </Modal>
      </div>
    </div>
  );
};

Messages.propTypes = {
  items: PropTypes.array,
};

export default Messages;
