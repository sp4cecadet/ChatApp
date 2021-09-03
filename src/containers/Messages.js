import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import find from "lodash/find";
import { Messages as BaseMessages } from "components/";
import { messagesActions } from "redux/actions";
import socket from "core/socket";

const Messages = ({
  currentDialog,
  fetchMessages,
  items,
  addMessage,
  userId,
  user,
  isLoading,
  removeMessage,
  attachments,
}) => {
  const [blockHeight, setBlockHeight] = useState(135);
  const [previewImage, setPreviewImage] = useState(null);

  const messagesRef = useRef(null);

  const onNewMessage = (data) => {
    addMessage(data);
  };

  useEffect(() => {
    if (currentDialog) {
      fetchMessages(currentDialog._id);
    }
  }, [currentDialog?._id]);

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);

    socket.on("SERVER:NEW_MESSAGE", onNewMessage);

    return () => socket.removeListener("SERVER:NEW_MESSAGE", onNewMessage);
  }, [items]);

  useEffect(() => {
    if (attachments.length) {
      setBlockHeight(255);
    } else {
      setBlockHeight(135);
    }
  }, [attachments]);

  return (
    <BaseMessages
      blockRef={messagesRef}
      items={items}
      isLoading={isLoading}
      user={user}
      userId={userId}
      onRemoveMessage={removeMessage}
      currentDialogId={currentDialog?._id}
      blockHeight={blockHeight}
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
    />
  );
};

export default connect(
  ({ dialogs, messages, user, attachments }) => ({
    currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
    items: messages.items,
    isLoading: messages.isLoading,
    attachments: attachments.items,
    user: user.data,
  }),
  messagesActions
)(Messages);
