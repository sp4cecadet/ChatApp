import PropTypes from "prop-types";
import { Empty } from "antd";

import { Message } from "components/";

const Messages = ({ items }) => {
  return items ? (
    <div>
      <Message
        avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
        date="Mon Aug 02 2021 12:55:10"
        audio="https://zvukipro.com/uploads/files/2020-12/1608570485_36608-krik.mp3"
      />
      <Message
        avatar="https://vk.com/images/deactivated_100.png"
        text="Who are you?"
        date={"Mon Aug 11 2021 18:55:10"}
        isMine={true}
        isReaded={true}
      />

      <Message
        avatar="https://sun1.48276.userapi.com/s/v1/if2/vxcZ6TgfySSrYYBrc96klRvVf0xx6TEVu--76Zg10Xje_r3TSX8HPJ16huBP2lYCgRBwqeB3inDP559qu5kA4zA9.jpg?size=100x100&quality=96&crop=29,64,550,550&ava=1"
        attachments={[
          {
            filename: "image1.jpg",
            url: "https://source.unsplash.com/150x150/?random=1",
          },
          {
            filename: "image2.jpg",
            url: "https://source.unsplash.com/150x150/?random=2",
          },
          {
            filename: "image3.jpg",
            url: "https://source.unsplash.com/150x150/?random=3",
          },
        ]}
      />
    </div>
  ) : (
    <Empty description="Начните диалог" />
  );
};

Messages.propTypes = {
  items: PropTypes.array,
};

export default Messages;
