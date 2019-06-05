import React, { Component } from "react";
import {inject, observer} from "mobx-react/index";
import PropTypes from "prop-types";
import {action} from "mobx/lib/mobx";

@inject('store') @observer
export default class ContactSearchLine extends Component {
  constructor(props) {
    super(props);

    this.findContact = this.findContact.bind(this);
    this.addChosenContactToSearchLine = this.addChosenContactToSearchLine.bind(this);
    this.startNewChat = this.startNewChat.bind(this);
    this.shouldNewChatBeStarted = this.shouldNewChatBeStarted.bind(this);
    this.goToExistingChat = this.goToExistingChat.bind(this);
  }

  findContact(e) {
    let searchedString = e.target.value;

    this.props.store.setSearchedContact(searchedString);

    let foundedContacts = this.props.store.contactsList.filter(el => {
      if (el.name.toLowerCase().includes(searchedString) || el.name.toUpperCase().includes(searchedString)) {
        return el.name;
      }
    });

    this.props.updateListOfSearchedContacts(foundedContacts);
  }

  addChosenContactToSearchLine() {
    let listOfContacts = this.props.newChatWithContacts;
    if (!listOfContacts.length) return null;

    let chosenContacts = listOfContacts.map((el, index) =>
      <h6
        className="d-block mr-1"
        key={el + index}
        onClick={() => this.props.deleteContactFromNewChat(index)}
      >
          {el}
          {(listOfContacts.length && index !== listOfContacts.length - 1) ? ", " : ""}
      </h6>
    );

    return <div className="d-flex flex-wrap flex-row">{chosenContacts}</div>;
  }

  shouldNewChatBeStarted() {
    let chats = this.props.store.chats;

    if (this.props.newChatWithContacts.length === 1) {
      let searchedName = this.props.newChatWithContacts[0];

      for (let i in chats) {
        let chatContacts = chats[i].contacts;

        if (chatContacts.length === 1 && chatContacts[0].name === searchedName) {
          return false;
        }
      }
    }

    return true;
  }

  startNewChat() {
    if (!this.props.newChatWithContacts.length) {
      alert("No contact was chosen. Please, choose at least one to start a conversation.");
      return;
    }

    let shouldNewChatBeStarted = this.shouldNewChatBeStarted();

    if (shouldNewChatBeStarted) {
      this.props.store.startNewChat(this.props.newChatWithContacts);
    } else {
      this.goToExistingChat();
    }
  }

  goToExistingChat() {
    let idOfChat = this.props.store.contactsList.find(el => el.name === this.props.newChatWithContacts[0]).image;

    this.props.store.setIdOfOpenChat(idOfChat);
    this.props.store.toggleChatWindow();
  }

  render() {
    return (
      <div className="App__new-chat_add-chat d-flex flex-row align-items-end border-bottom py-2">
        <h6 className="d-block mx-2"> Chat to: </h6>
        {this.addChosenContactToSearchLine()}
        <input
          autoFocus={true}
          className="btn flex-grow-1 text-black-50 text-left"
          type="text"
          placeholder="Enter the name/names"
          onChange={(e) => this.findContact(e)}
          value={this.props.store.searchedContactString}
        />
        <button
          className="ml-auto mr-2 btn btn-success btn-sm font-weight-bold"
          type="button"
          onClick={() => this.startNewChat()}
        >
          start chat
        </button>
      </div>);
  }
}

ContactSearchLine.propTypes = {
  updateListOfSearchedContacts: PropTypes.func
};