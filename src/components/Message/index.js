import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { Time, IconReaded } from "components/";
import waveSvg from "assets/img/wave.svg";
import playSvg from "assets/img/play.svg";
import pauseSvg from "assets/img/pause.svg";
import { convertCurrentTime } from "utils/helpers/";

import "./Message.scss";

import cn from "classnames";

const Message = ({
  avatar,
  user,
  text,
  date,
  audio,
  isMine,
  isReaded,
  isTyping,
  attachments,
}) => {
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
      setProgress(0);
    });
    audioElem.current.addEventListener("timeupdate", () => {
      const duration = (audioElem.current && audioElem.current.duration) || 0;
      setCurrentTime(audioElem.current.currentTime);
      setProgress((audioElem.current.currentTime / duration) * 100);
    });
  }, []);

  return (
    <div
      className={cn("message", {
        "message--mine": isMine,
        "message--is-typing": isTyping,
        "message--image": attachments && attachments.length === 1,
        "message--audio": audio,
      })}
    >
      <div className="message__avatar">
        <img src={avatar} alt={`Avatar ${user.fullname}`} />
      </div>
      <div>
        <div className="message__content">
          <div className="message__info">
            {(audio || text || isTyping) && (
              <div className="message__bubble">
                {text && <p className="message__text">{text}</p>}
                {isTyping && (
                  <div className="message__typing">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
                {audio && (
                  <div className="message__audio">
                    <audio ref={audioElem} src={audio} preload="auto" />
                    <div
                      className="message__audio-progress"
                      style={{ width: progress + "%" }}
                    ></div>
                    <div className="message__audio-info">
                      <div className="message__audio-btn">
                        <button onClick={togglePlay}>
                          <img
                            src={isPlaying ? pauseSvg : playSvg}
                            alt="Play-Pause button"
                          />
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
                )}
              </div>
            )}
            {attachments && (
              <div className="message__attachments">
                {attachments.map((item) => (
                  <div className="message__attachments-item">
                    <img src={item.url} alt={item.filename} />
                  </div>
                ))}
              </div>
            )}

            {date && (
              <span className="message__date">
                {isMine && <IconReaded isMine={isMine} isReaded={isReaded} />}
                {date && <Time date={date} />}
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
  audio: PropTypes.string,
  isTyping: PropTypes.bool,
  isMine: PropTypes.bool,
  isReaded: PropTypes.bool,
};

export default Message;
