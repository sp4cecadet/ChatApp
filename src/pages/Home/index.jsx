import {
  TeamOutlined,
  FormOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

import "./Home.scss";
import { Status, ChatInput } from "components/";
import { Dialogs, Messages } from "containers/";

const Home = (props) => {
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
            <Dialogs />
          </div>
        </div>
        <div className="chat__dialog">
          <div className="chat__dialog-header">
            <div />
            <div className="chat__dialog-header--centered">
              <b className="chat__dialog-header-username">Александр Пушкин</b>
              <div className="chat__dialog-header-status">
                <Status online />
              </div>
            </div>
            <EllipsisOutlined style={{ fontSize: 24 }} />
          </div>
          <div className="chat__dialog-messages">
            <Messages />
          </div>
          <div className="chat__dialog-input">
            <ChatInput />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
