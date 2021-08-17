import React from "react";
import "./DialogItem.scss";

import cn from "classnames";

import { Time, IconReaded } from "components/";

const getAvatar = (avatar) => {
  if (avatar) {
    return <img src={avatar} alt=""></img>;
  } else {
    // generate avatar
  }
};

const DialogItem = ({ user, message, unreaded }) => {
  return (
    <div
      className={cn("dialogs__item", {
        "dialogs__item--online": user.isOnline,
      })}
    >
      <div className="dialogs__item-avatar">
        {/* <img src="user.avatar" alt={`${user.fullname} avatar`} /> */}
        {getAvatar("https://vk.com/images/deactivated_100.png")}
      </div>
      <div className="dialogs__item-info">
        <div className="dialogs__item-info-top">
          <b>{user.fullname}</b>
          {/* <Time date={new Date()} /> */}
          <span>12:28</span>
        </div>
        <div className="dialogs__item-info-bottom">
          <p>
            Weszła bardzo ostrożnie, cicho, stąpając bezszelestnie, płynąc przez
            komnatę jak widmo, jak zjawa, a jedyny dźwięk, jaki towarzyszył jej
            ruchom, wydawała opończa, ocierająca się o nagą skórę
          </p>

          {unreaded > 0 ? (
            <div className="dialogs__item-info-bottom-count">
              {unreaded > 9 ? "9+" : unreaded}
            </div>
          ) : (
            <IconReaded isMine={true} isReaded={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogItem;
