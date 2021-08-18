import React from "react";
import { Contacts, Message } from "components";

import "./Home.scss";

const Home = () => {
  return (
    <section className="home">
      <Contacts
        items={[
          {
            _id: Math.random(),
            text: `Блажен, кто с молоду был молод,
			  Блажен, кто во-время созрел,
			  Кто постепенно жизни холод
			  С летами вытерпеть умел;
			  Кто странным снам не предавался,
			  Кто черни светской не чуждался,
			  Кто в двадцать лет был франт иль хват,
			  А в тридцать выгодно женат;
			  Кто в пятьдесят освободился
			  От частных и других долгов,
			  Кто славы, денег и чинов
			  Спокойно в очередь добился,
			  О ком твердили целый век:
			  N. N. прекрасный человек.`,
            isReaded: false,
            sent_at: new Date(),
            unreaded: 0,
            user: {
              _id: 1,
              fullname: "Александр Пушкин",
              avatar:
                "https://globalmsk.ru/usr/person/big-person-15629077401.jpg",
              isOnline: true,
            },
          },

          {
            _id: Math.random(),
            text: `Ну типа привет`,
            isReaded: false,
            sent_at: new Date() - 10000,
            unreaded: 5,
            user: {
              _id: 3,
              fullname: "Энгель Югенс",
              avatar: "",
              isOnline: false,
            },
          },
        ]}
      />
      {/* <Message
        avatar="https://sun1.48276.userapi.com/s/v1/if2/vxcZ6TgfySSrYYBrc96klRvVf0xx6TEVu--76Zg10Xje_r3TSX8HPJ16huBP2lYCgRBwqeB3inDP559qu5kA4zA9.jpg?size=100x100&quality=96&crop=29,64,550,550&ava=1"
        text="Fucking moron, screw you!"
        date={"Mon Aug 02 2021 12:55:10"}
        attachments={[
          {
            filename: "image.jpg",
            url: "https://source.unsplash.com/100x100/?random=1",
          },
          {
            filename: "image.jpg",
            url: "https://source.unsplash.com/100x100/?random=2",
          },
          {
            filename: "image.jpg",
            url: "https://source.unsplash.com/100x100/?random=3",
          },
        ]}
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
        isTyping
      />
      <Message
        avatar="https://sun1.48276.userapi.com/s/v1/if2/vxcZ6TgfySSrYYBrc96klRvVf0xx6TEVu--76Zg10Xje_r3TSX8HPJ16huBP2lYCgRBwqeB3inDP559qu5kA4zA9.jpg?size=100x100&quality=96&crop=29,64,550,550&ava=1"
        attachments={[
          {
            filename: "image.jpg",
            url: "https://source.unsplash.com/150x150/?random=4",
          },
        ]}
      /> */}
    </section>
  );
};

export default Home;
