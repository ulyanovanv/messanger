import React, { Component, Fragment } from "react";
import {inject, observer} from "mobx-react/index";

import {contacts, chats} from "./mocks.js";
import ContactsComponent from "./components/ContactsComponent.jsx";
import ChatComponent from "./components/ChatComponent.jsx";
import NewChatComponent from "./components/NewChatComponent.jsx";
import {handlePromise, returnData} from "./helpers/promise.js";

@inject('store') @observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let allContacts = contacts();
    let allChats = chats();

    returnData(handlePromise(allContacts), this.props.store.setContactsList);
    returnData( handlePromise(allChats), this.props.store.setChats);
  }

  render() {
    return (
      <div className="App container-fluid">
         <div className="row">
          <ContactsComponent />
          {!this.props.store.isNewChat && <ChatComponent />}
          {this.props.store.isNewChat && <NewChatComponent />}
        </div>
      </div>
    );
  }
}