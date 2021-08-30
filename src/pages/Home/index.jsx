import { useEffect } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import "./Home.scss";
import { Messages, ChatInput, Status, Sidebar } from "containers/";

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
        <Sidebar />
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
