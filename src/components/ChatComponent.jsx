import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import PropTypes from 'prop-types';

import ChatContacts from './Chat/ChatContacts.jsx';
import Chat from './Chat/Chat.jsx';
import NewMessage from './Chat/NewMessage.jsx';

export default
@inject('store')
@observer
class ChatComponent extends Component {
  render() {
    const { openChat } = this.props.store;
    if (!openChat) return null;

    return (
      <div className="App__chats col-8 d-flex flex-column p-0">
        <ChatContacts
          contacts={openChat.contacts}
        />
        <Chat
          messages={openChat.messages}
        />
        <NewMessage />
      </div>
    );
  }
}

ChatComponent.propTypes = {
  store: PropTypes.shape({
    openChat: PropTypes.object.isRequired,
  }),
};
