import React from "react";
import cn from "classnames";

import { format, isToday } from "date-fns";

import "./DialogItem.scss";
import { IconReaded } from "components/";

const getMessageDate = (sent_at) => {
  if (isToday(sent_at)) {
    return format(sent_at, "HH:mm");
  } else {
    return format(sent_at, "dd/MM/yyyy");
  }
};

const getAvatar = (avatar) => {
  if (avatar) {
    return <img src={avatar} alt=""></img>;
  } else {
    // generate avatar
  }
};

const DialogItem = ({ user, message, isMine }) => {
  return (
    <div
      className={cn("dialogs__item", {
        "dialogs__item--online": user.isOnline,
      })}
    >
      <div className="dialogs__item-avatar">{getAvatar(user.avatar)}</div>
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
