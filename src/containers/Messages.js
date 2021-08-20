import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { Messages as BaseMessages } from "components/";
import { messagesActions } from "redux/actions";

const Messages = ({ currentDialogId, fetchMessages, items, isLoading }) => {
  const messagesRef = useRef(null);

  useEffect(() => {
    currentDialogId && fetchMessages(currentDialogId);
  }, [currentDialogId]);

  useEffect(() => {
    messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
  }, [items]);

  return (
    <BaseMessages blockRef={messagesRef} items={items} isLoading={isLoading} />
  );
};

export default connect(
  ({ dialogs, messages }) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    isLoading: messages.isLoading,
  }),
  messagesActions
)(Messages);
