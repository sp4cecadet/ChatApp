import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Contacts } from "components/";
import { dialogsActions } from "redux/actions";

const Dialogs = ({
  fetchDialogs,
  currentDialogId,
  setCurrentDialogId,
  items,
  userId,
}) => {
  const [searchValue, setValue] = useState("");
  const [filtered, setFiltered] = useState(Array.from(items));

  const onChangeInput = (value) => {
    setFiltered(
      items.filter(
        (dialog) =>
          dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
      )
    );

    setValue(value);
  };

  useEffect(() => {
    if (!items.length) {
      fetchDialogs();
    } else {
      setFiltered(items);
    }
  }, [items]);

  return (
    <Contacts
      items={filtered}
      userId={userId}
      onSearch={onChangeInput}
      inputValue={searchValue}
      onSelectDialog={setCurrentDialogId}
      currentDialogId={currentDialogId}
    />
  );
};

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);
