import {
  TeamOutlined,
  FormOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import "./Home.scss";
import { Dialogs, Messages, ChatInput, Status } from "containers/";

import { dialogsActions } from "redux/actions";

const Home = (props) => {
  const { currentDialogId, setCurrentDialogId, user } = props;

  useEffect(() => {
    const { pathname } = props.location;
    const dialogId = pathname.split("/").pop();
    setCurrentDialogId(dialogId);
  }, [props.location.pathname]);

  return (
    <section className="home">
      <div className="chat">
        <div className="chat__contacts">
          <div className="chat__contacts-header">
            <div>
              <TeamOutlined />
              <span>Список диалогов</span>
            </div>
            <Button type="ghost" shape="circle" icon={<FormOutlined />} />
          </div>

          <div className="chat__contacts-list">
            <Dialogs userId={user._id} />
          </div>
        </div>
        <div className="chat__dialog">
          <Status />
          <div className="chat__dialog-messages">
            <Messages userId={user._id} />
          </div>
          <div className="chat__dialog-input">
            <ChatInput />
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(
  connect(({ user }) => ({ user: user.data }), dialogsActions)(Home)
);
