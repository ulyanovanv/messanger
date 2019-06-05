import React, { Component } from "react"

import ContactSearchLine from "./NewChat/ContactSearchLine.jsx";
import ContactSuggestion from "./NewChat/ContactSuggestion.jsx";
import {action} from "mobx/lib/mobx";

export default class NewChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfSearchedContacts: [],
      newChatWithContacts: []
    };

    this.updateListOfSearchedContacts = this.updateListOfSearchedContacts.bind(this);
    this.updateNewChatWithContacts = this.updateNewChatWithContacts.bind(this);
    this.deleteContactFromNewChat = this.deleteContactFromNewChat.bind(this);
  }

  updateListOfSearchedContacts(contacts) {
    this.setState({listOfSearchedContacts: contacts});
  }

  updateNewChatWithContacts(name) {
    if (!this.state.newChatWithContacts.includes(name)) {
      let newChatWithContacts = this.state.newChatWithContacts.slice();
      newChatWithContacts.push(name);

      this.setState({newChatWithContacts: newChatWithContacts});
    }
  }

  deleteContactFromNewChat(index) {
    if (this.state.newChatWithContacts.length) {
      let newChatWithContacts = this.state.newChatWithContacts.slice();
      newChatWithContacts.splice(index, 1);

      this.setState({newChatWithContacts: newChatWithContacts});
    }
  }

  render() {
    return <div className="App__new-chat col-8 d-flex flex-column p-0">
      <ContactSearchLine
        updateListOfSearchedContacts={this.updateListOfSearchedContacts}
        updateNewChatWithContacts={this.updateNewChatWithContacts}
        newChatWithContacts={this.state.newChatWithContacts}
        deleteContactFromNewChat = {this.deleteContactFromNewChat}
      />
      <ContactSuggestion
        listOfSearchedContacts={this.state.listOfSearchedContacts}
        updateNewChatWithContacts={this.updateNewChatWithContacts}
      />
    </div>
  }
}