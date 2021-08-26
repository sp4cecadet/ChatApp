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
  onSelectDialog,
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
        orderBy(items, ["sent_at"], ["desc"]).map((item) => (
          <DialogItem
            onSelect={onSelectDialog}
            key={item._id}
            isMine={item.author._id === userId}
            selectedDialog={currentDialogId}
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
