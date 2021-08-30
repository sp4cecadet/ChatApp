import React, { useState } from "react";
import { Sidebar as BaseSidebar } from "components/";
import { connect } from "react-redux";

import { showNotification } from "utils/helpers";

import { userAPI, dialogsAPI } from "utils/api";

const Sidebar = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messageText, setMessagaText] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(false);

  const onClose = () => {
    setVisible(false);
  };

  const onShow = () => {
    setVisible(true);
  };

  const onSearch = (value) => {
    setIsLoading(true);
    userAPI
      .findUsers(value)
      .then(({ data }) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onAddDialog = () => {
    dialogsAPI
      .create({
        partner: selectedUserId,
        text: messageText,
      })
      .then(onClose)
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 403) {
          showNotification({
            title: "Ошибка",
            text: "Такой диалог уже есть",
            type: "error",
          });
        }
      });
  };

  const handleChangeInput = (value) => {
    setInputValue(value);
  };

  const onChangeTextArea = (e) => {
    setMessagaText(e.target.value);
  };

  const onSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <BaseSidebar
      user={user}
      inputValue={inputValue}
      visible={visible}
      isLoading={isLoading}
      onClose={onClose}
      onShow={onShow}
      onSearch={onSearch}
      onChangeInput={handleChangeInput}
      onSelectUser={onSelectUser}
      onModalOk={onAddDialog}
      onChangeTextArea={onChangeTextArea}
      messageText={messageText}
      selectedUserId={selectedUserId}
      users={users}
    />
  );
};

export default connect(({ user }) => ({ user: user.data }))(Sidebar);
