import React, { Component } from "react"
import {inject, observer} from "mobx-react/index";

import ChatContacts from "./Chat/ChatContacts.jsx";
import Chat from "./Chat/Chat.jsx";
import NewMessage from "./Chat/NewMessage.jsx";

@inject('store') @observer
export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let currentChat = this.props.store.openChat;
    if (!currentChat) return null;

    return <div className="App__chats col-8 d-flex flex-column p-0">
      <ChatContacts
        contacts={currentChat.contacts}
      />
      <Chat
        messages={currentChat.messages}
      />
      <NewMessage />
    </div>
  }
}