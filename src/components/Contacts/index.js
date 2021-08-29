import React from "react";

import { orderBy } from "lodash-es";
import { Input, Empty } from "antd";

import "./Contacts.scss";
import { DialogItem } from "components/";

const Contacts = ({
  items,
  userId,
  onSearch,
  searchValue,
  currentDialogId,
}) => {
  return (
    <div className="contacts">
      <div className="chat__contacts-search">
        <Input.Search
          placeholder="Поиск среди контактов"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {items.length > 0 ? (
        orderBy(items, ["created_at"], ["desc"]).map((item) => (
          <DialogItem
            key={item._id}
            userId={userId}
            isMine={item?.lastMessage?.sender === userId || false}
            currentDialogId={currentDialogId}
            {...item}
          />
        ))
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Ничего не найдено"
        />
      )}
    </div>
  );
};

export default Contacts;
