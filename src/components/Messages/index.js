import PropTypes from "prop-types";
import { Empty, Spin } from "antd";

import { Message } from "components/";

import "./Messages.scss";

const Messages = ({
  onRemoveMessage,
  blockRef,
  isLoading,
  userId,
  sender,
  items,
}) => {
  return (
    <div ref={blockRef} className="messages">
      {isLoading ? (
        <div className="messages--loading">
          <Spin tip="Идет загрузка сообщений..." size="large" />
        </div>
      ) : items?.length > 0 && !isLoading ? (
        items.map((item) => {
          return (
            <Message
              key={item._id}
              isMine={item.sender._id === userId}
              onRemoveMessage={onRemoveMessage.bind(this, item._id)}
              {...item}
            />
          );
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
