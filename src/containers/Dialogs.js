import React, { useState } from "react";

import { Contacts } from "components/";

const Dialogs = ({ items, userId }) => {
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

  return (
    <Contacts
      items={filtered}
      userId={userId}
      onSearch={onChangeInput}
      inputValue={searchValue}
    />
  );
};

export default Dialogs;
