import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import supportEvent from '../../helpers/supportEvent.js';

export default
@inject('store')
@observer
class ContactSearchLine extends Component {
  constructor(props) {
    super(props);

    this.findContact = this.findContact.bind(this);
    this.addChosenContactToSearchLine = this.addChosenContactToSearchLine.bind(this);
    this.startNewChat = this.startNewChat.bind(this);
    this.shouldNewChatBeStarted = this.shouldNewChatBeStarted.bind(this);
    this.goToExistingChat = this.goToExistingChat.bind(this);
  }

  findContact(e) {
    const searchedString = e.target.value;
    const { setSearchedContact, contactsList } = this.props.store;

    setSearchedContact(searchedString);

    const foundedContacts = contactsList.filter((el) => {
      if (el.name.toLowerCase().includes(searchedString) || el.name.toUpperCase().includes(searchedString)) {
        return el.name;
      }

      return false;
    });

    this.props.updateListOfSearchedContacts(foundedContacts);
  }

  addChosenContactToSearchLine() {
    const listOfContacts = this.props.newChatWithContacts;
    if (!listOfContacts.length) return null;

    const chosenContacts = listOfContacts.map((el, index) => (
      <div
        className="d-block mr-1"
        key={shortid.generate()}
        onClick={() => this.props.deleteContactFromNewChat(index)}
        tabIndex="0"
        role="button"
        onKeyDown={event => supportEvent(event, this.props.deleteContactFromNewChat, index)}
      >
        <h6>
          {el}
          {(listOfContacts.length && index !== listOfContacts.length - 1) ? ', ' : ''}
        </h6>
      </div>
    ));

    return <div className="d-flex flex-wrap flex-row">{chosenContacts}</div>;
  }

  shouldNewChatBeStarted() {
    const { chats } = this.props.store;

    if (this.props.newChatWithContacts.length === 1) {
      const searchedName = this.props.newChatWithContacts[0];
      const arrayOfContacts = chats.map(el => el.contacts);

      for (let i = 0; i < arrayOfContacts.length; i += 1) {
        if (arrayOfContacts[i].length === 1 && arrayOfContacts[i][0].name === searchedName) {
          return false;
        }
      }
    }

    return true;
  }

  startNewChat() {
    if (!this.props.newChatWithContacts.length) {
      alert('No contact was chosen. Please, choose at least one to start a conversation.');
      return;
    }

    const shouldNewChatBeStarted = this.shouldNewChatBeStarted();

    if (shouldNewChatBeStarted) {
      this.props.store.startNewChat(this.props.newChatWithContacts);
    } else {
      this.goToExistingChat();
    }
  }

  goToExistingChat() {
    const { contactsList, setIdOfOpenChat, toggleChatWindow } = this.props.store;
    const idOfChat = contactsList.find(el => el.name === this.props.newChatWithContacts[0]).image;

    setIdOfOpenChat(idOfChat);
    toggleChatWindow();
  }

  render() {
    return (
      <div className="App__new-chat_add-chat d-flex flex-row align-items-end border-bottom py-2">
        <h6 className="d-block mx-2"> Chat to: </h6>
        {this.addChosenContactToSearchLine()}
        <input
          autoFocus
          className="btn flex-grow-1 text-black-50 text-left"
          type="text"
          placeholder="Enter the name/names"
          onChange={e => this.findContact(e)}
          value={this.props.store.searchedContactString}
        />
        <button
          className="ml-auto mr-2 btn btn-success btn-sm font-weight-bold"
          type="button"
          onClick={() => this.startNewChat()}
        >
          start chat
        </button>
      </div>
    );
  }
}

ContactSearchLine.propTypes = {
  store: PropTypes.shape({
    setSearchedContact: PropTypes.func,
    contactsList: PropTypes.arrayOf(PropTypes.object),
    chats: PropTypes.arrayOf(PropTypes.object),
    startNewChat: PropTypes.func,
    setIdOfOpenChat: PropTypes.func,
    toggleChatWindow: PropTypes.func,
    searchedContactString: PropTypes.func,
  }),
  updateListOfSearchedContacts: PropTypes.func,
  newChatWithContacts: PropTypes.arrayOf(PropTypes.string),
  deleteContactFromNewChat: PropTypes.func,
};
