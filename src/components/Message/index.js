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
  isTyping,
  attachments,
}) => {
  return (
    <div
      className={cn("message", {
        "message--mine": isMine,
        "message--is-typing": isTyping,
        "message--image": attachments && attachments.length === 1,
      })}
    >
      <div className="message__avatar">
        <img src={avatar} alt={`Avatar ${user.fullname}`} />
      </div>
      <div>
        <div className="message__content">
          <div className="message__info">
            {!text && !isTyping ? (
              <></>
            ) : (
              <div className="message__bubble">
                {text && <p className="message__text">{text}</p>}
                {isTyping && (
                  <div className="message__typing">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>
            )}
            <div className="message__attachments">
              {attachments &&
                attachments.map((item) => (
                  <div className="message__attachments-item">
                    <img src={item.url} alt={item.filename} />
                  </div>
                ))}
            </div>
            {date && (
              <span className="message__date">
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
                {date &&
                  formatDistanceToNow(new Date(date), {
                    addSuffix: true,
                    locale: ruLocale,
                  })}
              </span>
            )}
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
  isTyping: PropTypes.bool,
};

export default Message;
