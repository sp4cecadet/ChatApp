import React from "react";
import PropTypes from "prop-types";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import * as cn from "classnames";
import ReadedSvg from "assets/img/readed.svg";
import SentSvg from "assets/img/sent.svg";

import "./Message.scss";

const Message = ({
  avatar,
  user,
  text,
  date,
  isMine,
  isReaded,
  attachments,
}) => {
  return (
    <div className={cn("message", { "message--mine": isMine })}>
      <div className="message__avatar">
        <img src={avatar} alt={`Avatar ${user.fullname}`} />
      </div>
      <div>
        <div className="message__content">
          {isMine &&
            (isReaded ? (
              <img
                className="message__status__icon"
                src={ReadedSvg}
                alt="Message readed"
              />
            ) : (
              <img
                className="message__status__icon"
                src={SentSvg}
                alt="Message sent"
              />
            ))}
          <div className="message__info">
            <div className="message__bubble">
              <p className="message__text">{text}</p>
            </div>
            <div className="message__attachments">
              {attachments &&
                attachments.map((item) => (
                  <div key={Date.now()} className="message__attachments-item">
                    <img src={item.url} alt={item.filename} />
                  </div>
                ))}
            </div>
            <span className="message__date">
              {formatDistanceToNow(new Date(date), {
                addSuffix: true,
                locale: ruLocale,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

Message.defaultProps = {
  user: { fullname: "" },
};

Message.propTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  attachments: PropTypes.array,
};

export default Message;
