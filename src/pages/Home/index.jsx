import { Contacts, Message } from "components";

import {
  TeamOutlined,
  FormOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

import "./Home.scss";
import Status from "../../components/Status";

const Home = () => {
  return (
    <section className="home">
      <div className="chat">
        <div className="chat__contacts">
          <div className="chat__contacts-header">
            <div>
              <TeamOutlined />
              <span>Список диалогов</span>
            </div>
            <FormOutlined />
          </div>
          <div className="chat__contacts-search">
            <Input.Search placeholder="Поиск среди контактов" />
          </div>
          <div className="chat__contacts-list">
            <Contacts
              items={[
                {
                  _id: "611e6a38f66cf6bde2ac6f0b",
                  message: {
                    text: "Sunt consectetur adipisicing pariatur amet. Mollit laborum veniam labore elit do dolor ut. Mollit amet voluptate consequat duis veniam elit et.",
                    isReaded: false,
                    sent_at:
                      "Wed Sep 24 2003 09:38:38 GMT+0400 (Москва, летнее время)",
                  },
                  user: {
                    _id: "mtem",
                    fullname: "Pratt Obrien",
                    unreaded: 3,
                    avatar: null,
                    isOnline: true,
                  },
                },
                {
                  _id: "611e6a3837c4012e985ecd4e",
                  message: {
                    text: "Mollit fugiat non do aliquip ea Lorem nisi incididunt. Sint magna aliqua nulla quis. Aliquip incididunt proident qui exercitation est proident mollit.",
                    isReaded: false,
                    sent_at:
                      "Wed Oct 08 1997 00:20:12 GMT+0400 (Москва, летнее время)",
                  },
                  user: {
                    _id: "mtem",
                    fullname: "Bailey Berger",
                    unreaded: 1,
                    avatar: null,
                    isOnline: false,
                  },
                },
                {
                  _id: "611e6a38b32241880546fba4",
                  message: {
                    text: "Pariatur nostrud anim elit aliqua voluptate minim ad ipsum incididunt culpa nostrud id. Elit incididunt ex enim culpa. Qui esse sunt sunt officia veniam cupidatat est minim non ea do eiusmod voluptate.",
                    isReaded: false,
                    sent_at:
                      "Tue Aug 30 2016 23:40:57 GMT+0300 (Москва, стандартное время)",
                  },
                  user: {
                    _id: "sus",
                    fullname: "Garza Hunt",
                    unreaded: 3,
                    avatar: null,
                    isOnline: true,
                  },
                },

                {
                  _id: "611e6a38dc2f8af1f316211d",
                  message: {
                    text: "Commodo reprehenderit in irure mollit amet nostrud. Eu ullamco non proident aliqua Lorem occaecat exercitation culpa occaecat magna esse et incididunt. Nulla enim id adipisicing sit ex commodo sint ea eu cupidatat.",
                    isReaded: false,
                    sent_at:
                      "Mon Jun 15 2009 06:01:54 GMT+0400 (Москва, летнее время)",
                  },
                  user: {
                    _id: "sbhia",
                    fullname: "Elliott Davenport",
                    unreaded: 0,
                    avatar: null,
                    isOnline: true,
                  },
                },
                {
                  _id: "611e6a38998e0817fac88a1b",
                  message: {
                    text: "Occaecat ipsum reprehenderit ipsum nulla culpa culpa. Id in officia labore esse cillum adipisicing consectetur officia anim aliqua. Ex et cupidatat non dolor et mollit consectetur reprehenderit id minim veniam commodo commodo.",
                    isReaded: true,
                    sent_at:
                      "Sat Sep 19 1970 04:48:45 GMT+0300 (Москва, стандартное время)",
                  },
                  user: {
                    _id: "ass",
                    fullname: "Elisa Mccray",
                    unreaded: 3,
                    avatar: null,
                    isOnline: true,
                  },
                },
                {
                  _id: "611e6a38a612d956f1278bd9",
                  message: {
                    text: "Amet deserunt voluptate occaecat eu Lorem eiusmod consequat reprehenderit ipsum cillum. Adipisicing aliqua sit culpa incididunt magna magna voluptate excepteur amet qui. Occaecat labore Lorem excepteur elit laboris mollit exercitation qui esse voluptate minim.",
                    isReaded: false,
                    sent_at:
                      "Sun Feb 26 1995 03:41:47 GMT+0300 (Москва, стандартное время)",
                  },
                  user: {
                    _id: "mtem",
                    fullname: "Mcdaniel Hardin",
                    unreaded: 1,
                    avatar: null,
                    isOnline: true,
                  },
                },
                {
                  _id: "611e6a389baccaaf0c43baf5",
                  message: {
                    text: "Adipisicing ad mollit eiusmod dolore pariatur ullamco anim ad do voluptate anim commodo deserunt cupidatat. Ex cupidatat magna cillum eu qui sunt fugiat esse nisi. Sint sunt occaecat voluptate enim et proident fugiat anim.",
                    isReaded: false,
                    sent_at:
                      "Thu Nov 01 1984 23:56:01 GMT+0300 (Москва, стандартное время)",
                  },
                  user: {
                    _id: "mtem",
                    fullname: "Turner House",
                    unreaded: 3,
                    avatar: null,
                    isOnline: true,
                  },
                },
              ]}
            />
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
            <Message
              avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
              date="Mon Aug 02 2021 12:55:10"
              audio="https://zvukipro.com/uploads/files/2020-12/1608570485_36608-krik.mp3"
            />

            <Message
              avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
              date="Mon Aug 02 2021 12:55:10"
              isTyping
            />
            <Message
              avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
              date="Mon Aug 02 2021 12:55:10"
              isTyping
            />
            <Message
              avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
              date="Mon Aug 02 2021 12:55:10"
              isTyping
            />
            <Message
              avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
              date="Mon Aug 02 2021 12:55:10"
              isTyping
            />
            <Message
              avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
              date="Mon Aug 02 2021 12:55:10"
              isTyping
            />
            <Message
              avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
              date="Mon Aug 02 2021 12:55:10"
              isTyping
            />
            <Message
              avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
              date="Mon Aug 02 2021 12:55:10"
              isTyping
            />
            <Message
              avatar="https://cdn.icon-icons.com/icons2/193/PNG/256/R2D2_-_02_23245.png"
              date="Mon Aug 02 2021 12:55:10"
              isTyping
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
        </div>
      </div>
    </section>
  );
};

export default Home;
