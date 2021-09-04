import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Popover, Button } from "antd";

import { Time, IconReaded, Avatar } from "components/";
import { ReactComponent as WaveComponent } from "assets/img/wave.svg";
import playSvg from "assets/img/play.svg";
import pauseSvg from "assets/img/pause.svg";
import { isAudio } from "utils/helpers/";

import "./Message.scss";

import cn from "classnames";

const AudioMessage = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioElem = useRef(null);

  const togglePlay = () => {
    audioElem.current.volume = "0.5";

    if (!isPlaying) {
      setIsPlaying(true);
      audioElem.current.play();
    } else {
      setIsPlaying(false);
      audioElem.current.pause();
    }
  };

  useEffect(() => {
    audioElem.current.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
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
      <audio ref={audioElem} src={audio.url} preload="auto" />
      <div
        className="message__audio-progress"
        style={{ width: progress + "%" }}
      />
      <div className="message__audio-info">
        <div className="message__audio-btn">
          <button onClick={togglePlay} tabIndex="-1">
            <img src={isPlaying ? pauseSvg : playSvg} alt="Play-Pause button" />
          </button>
        </div>
        <div className="message__audio-wave">
          <WaveComponent />
        </div>
        <div />
      </div>
    </div>
  );
};

const Message = ({
  text,
  readed,
  sender,
  userId,
  attachments,
  isMine,
  createdAt,
  onRemoveMessage,
  setPreviewImage,
}) => {
  const renderAttachment = (item) => {
    if (item.ext !== "webm") {
      return (
        <div
          className="message__attachments-item"
          key={item._id}
          onClick={() => setPreviewImage(item.url)}
        >
          <img src={item.url} alt={item.filename} />
        </div>
      );
    }
  };

  return (
    <div
      className={cn("message", {
        "message--mine": isMine,
        // "message--is-typing": isTyping,
        "message--image":
          attachments && !isAudio(attachments) && attachments.length === 1,
        "message--audio": isAudio(attachments),
      })}
    >
      <div className="message__avatar">
        <Avatar user={sender} />
      </div>
      <div className="message__content">
        <div className="message__info">
          {(text || isAudio(attachments)) && (
            <div className="message__bubble">
              {text && <p className="message__text">{text}</p>}

              {!text && isAudio(attachments) && (
                <AudioMessage audio={attachments[0]} />
              )}

              {/* {status.isTyping && (
                <div className="message__typing">
                  <span />
                  <span />
                  <span />
                </div>
              )} */}
            </div>
          )}
          {attachments && (
            <div className="message__attachments">
              {attachments.map((item) => renderAttachment(item))}
            </div>
          )}
        </div>
        <Popover
          content={
            isMine && (
              <div>
                <Button className="message__action" onClick={onRemoveMessage}>
                  Удалить сообщение
                </Button>
              </div>
            )
          }
          title="Действия над сообщением"
          trigger="click"
        >
          <div className="message__status">
            <IconReaded isMine={isMine} isReaded={readed} />
            {createdAt && (
              <span className="message__date">
                {createdAt && <Time date={createdAt} />}
              </span>
            )}
          </div>
        </Popover>
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
