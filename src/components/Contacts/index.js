import React from "react";

import { orderBy } from "lodash-es";
import { isToday } from "date-fns";

import "./Contacts.scss";
import { DialogItem } from "components/";

const Contacts = ({ items, userId = 1 }) => {
  return (
    <div className="contacts">
      {orderBy(items, ["sent_at"], ["desc"]).map((item) => (
        <DialogItem
          key={item._id}
          user={item.user}
          message={item}
          unreaded={item.unreaded}
          isMine={item.user._id === userId}
        />
      ))}
    </div>
  );
};

export default Contacts;
