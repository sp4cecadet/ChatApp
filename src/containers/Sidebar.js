import React, { useState } from "react";
import { Sidebar as BaseSidebar } from "components/";
import { connect } from "react-redux";
import store from "redux/store";

import { showNotification } from "utils/helpers";
import { userAPI, dialogsAPI, filesAPI } from "utils/api";
import { userActions } from "redux/actions";

const Sidebar = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messageText, setMessagaText] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(false);
  const [userProfileOpened, setUserProfileOpened] = useState(false);

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

  const switchProfileModalState = () => {
    setUserProfileOpened(!userProfileOpened);
  };

  const uploadAvatar = async (files) => {
    let newAvatar = [];
    const file = files[0];
    const uid = Math.round(Math.random() * 1000);
    newAvatar = [
      ...newAvatar,
      {
        uid,
        name: file.name,
      },
    ];
    // eslint-disable-next-line no-loop-func
    await filesAPI.upload(file).then(({ data }) => {
      newAvatar = data.file;
    });
    store.dispatch(
      userActions.setUserData({
        ...user,
        avatar: newAvatar,
      })
    );
  };

  const handleUsernameChange = (e) => {
    store.dispatch(
      userActions.setUserData({
        ...user,
        fullname: e.target.value,
      })
    );
  };

  const updateProfile = () => {
    const newData = {
      avatar: user?.avatar?._id,
      fullname: user?.fullname,
    };
    userAPI.update(newData).then(({ data }) => {
      store.dispatch(userActions.setUserData(user));
      setUserProfileOpened(false);
    });
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
      userProfileOpened={userProfileOpened}
      switchProfileModalState={switchProfileModalState}
      uploadAvatar={uploadAvatar}
      handleUsernameChange={handleUsernameChange}
      updateProfile={updateProfile}
    />
  );
};

export default connect(({ user }) => ({ user: user.data }))(Sidebar);
