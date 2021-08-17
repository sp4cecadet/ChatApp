import React from "react";
import PropTypes from "prop-types";

import cn from "classnames";

import { Time, IconReaded } from "components/";

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
                <IconReaded isMine={isMine} isReaded={isReaded} />
                {date && <Time date={new Date(date)} />}
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
  isMine: PropTypes.bool,
  isReaded: PropTypes.bool,
};

export default Message;
