import PropTypes from "prop-types";
import { Empty, Spin } from "antd";

import { Message } from "components/";

import "./Messages.scss";

const Messages = ({ blockRef, isLoading, items }) => {
  return (
    <div ref={blockRef} className="messages">
      {isLoading ? (
        <div className="messages--loading">
          <Spin tip="Идет загрузка сообщений..." size="large" />
        </div>
      ) : items?.length > 0 && !isLoading ? (
        items.map((item) => {
          return <Message key={item._id} {...item} />;
        })
      ) : (
        <Empty description="Начните диалог" />
      )}
    </div>
  );
};

Messages.propTypes = {
  items: PropTypes.array,
};

export default Messages;
