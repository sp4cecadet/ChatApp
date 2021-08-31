import React, { useEffect, useRef } from "react";
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
}) => {
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

  return (
    <BaseMessages
      blockRef={messagesRef}
      items={items}
      isLoading={isLoading}
      user={user}
      userId={userId}
      onRemoveMessage={removeMessage}
      currentDialogId={currentDialog?._id}
    />
  );
};

export default connect(
  ({ dialogs, messages, user }) => ({
    currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
    items: messages.items,
    isLoading: messages.isLoading,
    user: user.data,
  }),
  messagesActions
)(Messages);
