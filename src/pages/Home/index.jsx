import { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Empty } from "antd";

import "./Home.scss";
import { Messages, ChatInput, Status, Sidebar } from "containers/";
import socket from "core/socket";

import { dialogsActions } from "redux/actions";

const Home = (props) => {
  const { currentDialogId, setCurrentDialogId, user, dialogs, messages } =
    props;

  const currentDialogObj = dialogs.filter(
    (dialog) => dialog._id === currentDialogId
  )[0];

  useEffect(() => {
    const { pathname } = props.location;
    const dialogId = pathname.split("/").pop();
    user?._id && setCurrentDialogId(user._id, currentDialogId, dialogId);
  }, [props.location.pathname]);

  useEffect(() => {
    user?._id &&
      currentDialogId &&
      socket.emit("MESSAGES:FETCHED", {
        userId: user._id,
        dialogId: currentDialogId,
      });
  }, [messages.length]);

  return (
    <section className="home">
      <div className="chat">
        <Sidebar />
        <div className="chat__dialog">
          {currentDialogObj ? (
            <>
              <Status />

              {user && <Messages userId={user._id} />}

              <div className="chat__dialog-input">
                {currentDialogId && <ChatInput />}
              </div>
            </>
          ) : (
            <Empty
              className="chat__no-dialog"
              description="Выберите существующий или начните новый диалог"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default withRouter(
  connect(
    ({ user, dialogs, messages }) => ({
      messages: messages.items,
      dialogs: dialogs.items,
      user: user.data,
      currentDialogId: dialogs.currentDialogId,
    }),
    dialogsActions
  )(Home)
);
