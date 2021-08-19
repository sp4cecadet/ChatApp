import React from "react";

import { Contacts, Message } from "components";

import "./Home.scss";

const Home = () => {
  return (
    <section className="home">
      <Contacts
        items={[
          {
            _id: "Math.random()",
            message: {
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
            },
            user: {
              _id: "asd6g13hh8g10",
              fullname: "Александр Пушкин",
              unreaded: 1,
              avatar:
                "https://globalmsk.ru/usr/person/big-person-15629077401.jpg",
              isOnline: true,
            },
          },

          {
            _id: Math.random(),
            message: {
              text: `Ну типа привет`,
              isReaded: true,
              sent_at: new Date() - 10000,
            },
            user: {
              _id: "n8cxas8",
              unreaded: 0,
              fullname: "Фьюри",
              isOnline: false,
            },
          },
        ]}
      />
      {
        <Message
          avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
          date="Mon Aug 02 2021 12:55:10"
          audio="https://zvukipro.com/uploads/files/2020-12/1608570485_36608-krik.mp3"
        />
        /*
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
      /> */
      }
    </section>
  );
};

export default Home;
