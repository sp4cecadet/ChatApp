import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Contacts } from "components/";
import { dialogsActions } from "redux/actions";
import socket from "core/socket";

const Dialogs = ({
  fetchDialogs,
  updateReadedStatus,
  currentDialogId,
  items,
  userId,
}) => {
  const [searchValue, setValue] = useState("");
  const [filtered, setFiltered] = useState(Array.from(items));

  const onChangeInput = (value = "") => {
    setFiltered(
      items.filter(
        (dialog) =>
          dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >=
            0 ||
          dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >=
            0
      )
    );

    setValue(value);
  };

  useEffect(() => {
    if (items.length) {
      onChangeInput();
    }
  }, [items]);

  useEffect(() => {
    fetchDialogs();

    socket.on("SERVER:DIALOG_CREATED", fetchDialogs);
    socket.on("SERVER:NEW_MESSAGE", fetchDialogs);
    socket.on("SERVER:MESSAGE_REMOVED", fetchDialogs);
    socket.on("SERVER:MESSAGES_READED", updateReadedStatus);

    return () => {
      socket.removeListener("SERVER:DIALOG_CREATED", fetchDialogs);
      socket.removeListener("SERVER:NEW_MESSAGE", fetchDialogs);
      socket.removeListener("SERVER:MESSAGE_REMOVED", fetchDialogs);
      socket.removeListener("SERVER:MESSAGES_READED", updateReadedStatus);
    };
  }, []);

  return (
    <Contacts
      items={filtered}
      userId={userId}
      onSearch={onChangeInput}
      inputValue={searchValue}
      currentDialogId={currentDialogId}
    />
  );
};

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);
