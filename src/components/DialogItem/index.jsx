import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { format, isToday } from "date-fns";

import "./DialogItem.scss";
import { Avatar, IconReaded } from "components/";

const getMessageDate = (createdAt) => {
  const date = new Date(createdAt);
  if (isToday(date)) {
    return format(date, "HH:mm");
  } else {
    return format(date, "dd/MM/yyyy");
  }
};

const renderLastMessage = (message, userId) => {
  let text = "";
  if (!message.text && message.attachments.length) {
    text = "прикрепленный файл";
  } else {
    text = message.text;
  }

  return `${message.sender === userId ? "Вы: " : ""}${text}`;
};

const DialogItem = ({
  _id,
  isMine,
  author,
  partner,
  lastMessage,
  userId,
  currentDialogId,
}) => {
  return (
    <Link to={`/dialog/${_id}`}>
      <div
        className={cn("dialogs__item", {
          "dialogs__item--online":
            partner._id === userId ? author.isOnline : partner.isOnline,
          "dialogs__item--selected": currentDialogId === _id,
        })}
      >
        <div className="dialogs__item-avatar">
          <Avatar user={partner._id === userId ? author : partner} />
        </div>
        <div className="dialogs__item-info">
          <div className="dialogs__item-info-top">
            <b>{author._id === userId ? partner.fullname : author.fullname}</b>
            {lastMessage ? (
              <span>{getMessageDate(lastMessage.createdAt)}</span>
            ) : (
              ""
            )}
          </div>
          <div className="dialogs__item-info-bottom">
            {lastMessage ? (
              <p>{renderLastMessage(lastMessage, userId)}</p>
            ) : (
              <p>Начните диалог</p>
            )}
            {isMine && (
              <IconReaded isMine={isMine} isReaded={lastMessage.readed} />
            )}

            {/* {user.unreaded > 0 ? (
            <div className="dialogs__item-info-bottom-count">
              {user.unreaded > 9 ? "9+" : user.unreaded}
            </div>
          ) : (
          )} */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DialogItem;
