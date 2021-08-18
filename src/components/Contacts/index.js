import React from "react";

import { orderBy } from "lodash-es";

import "./Contacts.scss";
import { DialogItem } from "components/";

const Contacts = ({ items, userId = 1 }) => {
  return (
    <div className="contacts">
      {orderBy(items, ["sent_at"], ["desc"]).map((item) => (
        <DialogItem
          key={item._id}
          isMine={item.user._id === userId}
          {...item}
        />
      ))}
    </div>
  );
};

export default Contacts;
