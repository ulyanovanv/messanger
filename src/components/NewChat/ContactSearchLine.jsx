import React, { Component } from "react"
import {inject, observer} from "mobx-react/index";

@inject('store') @observer
export default class ContactSearchLine extends Component {
  constructor(props) {
    super(props);

    this.findContact = this.findContact.bind(this);
    this.addChosenContactToSearchLine = this.addChosenContactToSearchLine.bind(this);
    this.startNewChat = this.startNewChat.bind(this);
  }

  findContact(e) {
    let searchedString = e.target.value;

    this.props.store.setSearchedContact(searchedString);

    let foundedContacts = this.props.store.contactsList.filter(el => {
      if (el.name.toLowerCase().includes(searchedString)) {
        return el.name;
      }
    });

    this.props.store.setListOfSearchedContacts(foundedContacts);
  }

  addChosenContactToSearchLine() {
    let listOfContacts = this.props.store.newChartWithContacts;
    if (!listOfContacts.length) return null;

    let chosenContacts = listOfContacts.map((el, index) =>
      <h6
        className="d-block mr-1"
        key={el + index}
        onClick={() => this.props.store.deleteContactFromNewChat(index)}
      >
          {el}
          {(listOfContacts.length && index !== listOfContacts.length - 1) ? ", " : ""}
      </h6>
    );

    return <div className="d-flex flex-wrap flex-row">{chosenContacts}</div>;
  }

  startNewChat() {
    if (!this.props.store.newChartWithContacts.length) {
      alert("No contact was chosen. Please, choose at least one to start a conversation.");
      return;
    }

    let shouldNewChatBeStarted = this.props.store.shouldNewChatBeStarted();

    if (shouldNewChatBeStarted) {
      this.props.store.startNewChat();
    } else {
      this.props.store.goToExistingChat();
    }
  }

  render() {
    return (
      <div className="App__new-chat_add-chat d-flex flex-row align-items-end border-bottom py-2">
        <h6 className="d-block mx-2"> Chat to: </h6>
        {this.addChosenContactToSearchLine()}
        <input
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