import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import PropTypes from 'prop-types';

import ContactsList from './Contacts/ContactsList.jsx';

export default
@inject('store')
@observer
class ContactsComponent extends Component {
  constructor(props) {
    super(props);

    this.openNewChat = this.openNewChat.bind(this);
  }

  openNewChat() {
    const { isNewChat, toggleChatWindow } = this.props.store;

    if (!isNewChat) {
      toggleChatWindow();
    }
  }

  render() {
    return (
      <div className="App__contacts col-4 d-flex flex-column p-0">
        <div className="App__contacts_title d-flex flex-row justify-content-around align-items-baseline border-bottom py-2">
          <button className="invisible" type="button">add chart</button>
          <h5 className="text-center">Messanger</h5>
          <button
            className="btn btn-success btn-sm font-weight-bold"
            onClick={() => this.openNewChat()}
            type="button"
          >
          add chart
          </button>
        </div>
        <ContactsList />
      </div>
    );
  }
}

ContactsComponent.propTypes = {
  store: PropTypes.shape({
    isNewChat: PropTypes.bool,
    toggleChatWindow: PropTypes.func,
  }),
};
