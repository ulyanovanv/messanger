import React, { Component } from 'react';

import { inject, observer } from 'mobx-react/index';
import PropTypes from 'prop-types';
import ContactSearchLine from './NewChat/ContactSearchLine.jsx';
import ContactSuggestion from './NewChat/ContactSuggestion.jsx';

export default
@inject('store')
@observer
class NewChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfSearchedContacts: [],
      newChatWithContacts: [],
    };

    this.updateListOfSearchedContacts = this.updateListOfSearchedContacts.bind(this);
    this.updateNewChatWithContacts = this.updateNewChatWithContacts.bind(this);
    this.deleteContactFromNewChat = this.deleteContactFromNewChat.bind(this);
  }

  componentDidMount() {
    const contacts = this.props.store.contactsList;

    this.setState({ listOfSearchedContacts: contacts });
  }

  updateListOfSearchedContacts(contacts) {
    this.setState({ listOfSearchedContacts: contacts });
  }

  updateNewChatWithContacts(name) {
    const newChatWithContacts = this.state.newChatWithContacts.slice();

    if (!newChatWithContacts.includes(name)) {
      newChatWithContacts.push(name);

      this.setState({ newChatWithContacts });
    }
  }

  deleteContactFromNewChat(index) {
    const newChatWithContacts = this.state.newChatWithContacts.slice();

    if (newChatWithContacts.length) {
      newChatWithContacts.splice(index, 1);

      this.setState({ newChatWithContacts });
    }
  }

  render() {
    return (
      <div className="App__new-chat col-8 d-flex flex-column p-0">
        <ContactSearchLine
          updateListOfSearchedContacts={this.updateListOfSearchedContacts}
          updateNewChatWithContacts={this.updateNewChatWithContacts}
          newChatWithContacts={this.state.newChatWithContacts}
          deleteContactFromNewChat={this.deleteContactFromNewChat}
        />
        <ContactSuggestion
          listOfSearchedContacts={this.state.listOfSearchedContacts}
          updateNewChatWithContacts={this.updateNewChatWithContacts}
        />
      </div>
    );
  }
}

NewChatComponent.propTypes = {
  store: PropTypes.shape({
    contactsList: PropTypes.arrayOf(PropTypes.object),
  }),
};
