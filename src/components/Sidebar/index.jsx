import React from "react";

import { UserOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Modal, Select, Input, Form } from "antd";
import { UploadField } from "@navjobs/upload";

import "./Sidebar.scss";
import { Dialogs } from "containers/";
import { Avatar } from "components/";

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({
  user,
  visible,
  inputValue,
  messageText,
  selectedUserId,
  isLoading,
  users,
  onShow,
  onClose,
  onSearch,
  onChangeInput,
  onSelectUser,
  onChangeTextArea,
  onModalOk,
  userProfileOpened,
  switchProfileModalState,
  uploadAvatar,
  handleUsernameChange,
  updateProfile,
}) => {
  const options = users.map((user) => (
    <Option key={user._id}>{user.fullname}</Option>
  ));

  return (
    <div className="chat__contacts">
      <div className="chat__contacts-header">
        <div>
          <Button
            onClick={switchProfileModalState}
            type="link"
            shape="circle"
            icon={<UserOutlined />}
          />
        </div>
        <span>Список диалогов</span>
        <Button
          onClick={onShow}
          type="link"
          shape="circle"
          icon={<FormOutlined />}
        />
      </div>

      <div className="chat__contacts-dialogs">
        <Dialogs userId={user && user._id} />
      </div>
      <Modal
        title="Создать диалог"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Закрыть
          </Button>,
          <Button
            disabled={!messageText}
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={onModalOk}
          >
            Создать
          </Button>,
        ]}
      >
        <Form className="add-dialog-form">
          <Form.Item label="Введите имя пользователя">
            <Select
              value={inputValue}
              onSearch={onSearch}
              onChange={onChangeInput}
              onSelect={onSelectUser}
              notFoundContent={null}
              style={{ width: "100%" }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              placeholder="Введите имя пользователя"
              showSearch
            >
              {options}
            </Select>
          </Form.Item>
          {selectedUserId && (
            <Form.Item label="Введите текст сообщения">
              <TextArea
                autosize={{ minRows: 3, maxRows: 10 }}
                onChange={onChangeTextArea}
                value={messageText}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>

      <Modal
        title="Ваш профиль"
        visible={userProfileOpened}
        onCancel={switchProfileModalState}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={updateProfile}
          >
            Сохранить изменения
          </Button>,
        ]}
      >
        <Form className="profile__modal">
          <div className="profile__avatar--container">
            <UploadField
              onFiles={uploadAvatar}
              containerProps={{
                className: "chat-input__actions-upload-btn",
              }}
              uploadProps={{
                accept: ".jpg,.jpeg,.gif,.png,.bmp",
                multiple: false,
              }}
            >
              <Avatar className="profile__avatar--container" user={user} />
            </UploadField>
          </div>

          <Form.Item label="Ваш e-mail">
            <Input
              size="medium"
              placeholder="Ваш e-mail"
              value={user?.email}
              disabled
            />
          </Form.Item>

          <Form.Item label="Ваше имя">
            <Input
              size="medium"
              placeholder="Ваше имя"
              value={user?.fullname}
              onChange={handleUsernameChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

Sidebar.defaultProps = {
  users: [],
};

export default Sidebar;
