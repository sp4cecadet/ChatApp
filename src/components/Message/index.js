import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Emoji } from "emoji-mart";

import { Time, IconReaded, Avatar } from "components/";
import waveSvg from "assets/img/wave.svg";
import playSvg from "assets/img/play.svg";
import pauseSvg from "assets/img/pause.svg";
import { convertCurrentTime } from "utils/helpers/";

import "./Message.scss";

import cn from "classnames";

const AudioMessage = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioElem = useRef(null);

  const togglePlay = () => {
    audioElem.current.volume = "0.05";

    if (!isPlaying) {
      setIsPlaying(true);
      audioElem.current.play();
    } else {
      setIsPlaying(false);
      audioElem.current.pause();
    }
  };

  useEffect(() => {
    audioElem.current.addEventListener("loadeddata", () => {
      setCurrentTime(audioElem.current.duration);
    });
    audioElem.current.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(audioElem.current.duration);
      setProgress(0);
    });
    audioElem.current.addEventListener("timeupdate", () => {
      const duration = (audioElem.current && audioElem.current.duration) || 0;
      setCurrentTime(duration - audioElem.current.currentTime);
      setProgress((audioElem.current.currentTime / duration) * 100);
    });
  }, []);

  return (
    <div className="message__audio">
      <audio ref={audioElem} src={audio} preload="auto" />
      <div
        className="message__audio-progress"
        style={{ width: progress + "%" }}
      ></div>
      <div className="message__audio-info">
        <div className="message__audio-btn">
          <button onClick={togglePlay} tabIndex="-1">
            <img src={isPlaying ? pauseSvg : playSvg} alt="Play-Pause button" />
          </button>
        </div>
        <div className="message__audio-wave">
          <img src={waveSvg} alt="Wave svg" />
        </div>
        <span className="message__audio-duration">
          {convertCurrentTime(currentTime)}
        </span>
      </div>
    </div>
  );
};

const Message = ({ sender, message, status, isMine, isTyping }) => {
  return (
    <div
      className={cn("message", {
        "message--mine": isMine,
        "message--is-typing": isTyping,
        "message--image":
          message.attachments && message.attachments.length === 1,
        "message--audio": message.audio,
      })}
    >
      <div className="message__avatar">
        <Avatar user={sender._id} />
      </div>
      <div className="message__content">
        <div className="message__info">
          {(message.audio || message.text || status.isTyping) && (
            <div className="message__bubble">
              {message.text && <p className="message__text">{message.text}</p>}
              {status.isTyping && (
                <div className="message__typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
              {message.audio && <AudioMessage audio={message.audio} />}
            </div>
          )}
          {message.attachments && (
            <div className="message__attachments">
              {message.attachments.map((item) => (
                <div key={item.filename} className="message__attachments-item">
                  <img src={item.url} alt={item.filename} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="message__status">
          {isMine && (
            <IconReaded isMine={status.isMine} isReaded={status.isReaded} />
          )}
          {message.createdAt && (
            <span className="message__date">
              {message.createdAt && <Time date={message.createdAt} />}
            </span>
          )}
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
  audio: PropTypes.string,
  isTyping: PropTypes.bool,
  isMine: PropTypes.bool,
  isReaded: PropTypes.bool,
};

export default Message;
