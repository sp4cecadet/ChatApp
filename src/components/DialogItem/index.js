import React from "react";
import cn from "classnames";

import { format, isToday } from "date-fns";

import "./DialogItem.scss";
import { IconReaded, Avatar } from "components/";

const getMessageDate = (sent_at) => {
  const date = new Date(sent_at);
  if (isToday(date)) {
    return format(date, "HH:mm");
  } else {
    return format(date, "dd/MM/yyyy");
  }
};

const DialogItem = ({ user, message, isMine }) => {
  return (
    <div
      className={cn("dialogs__item", {
        "dialogs__item--online": user.isOnline,
      })}
    >
      <div className="dialogs__item-avatar">
        <Avatar user={user} />
      </div>
      <div className="dialogs__item-info">
        <div className="dialogs__item-info-top">
          <b>{user.fullname}</b>
          <span>{getMessageDate(message.sent_at)}</span>
        </div>
        <div className="dialogs__item-info-bottom">
          <p>{message.text}</p>

          {user.unreaded > 0 ? (
            <div className="dialogs__item-info-bottom-count">
              {user.unreaded > 9 ? "9+" : user.unreaded}
            </div>
          ) : (
            isMine && <IconReaded isMine={isMine} isReaded={message.isReaded} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
