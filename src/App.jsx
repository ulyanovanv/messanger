import React from 'react';
import { inject, observer } from 'mobx-react/index';
import PropTypes from 'prop-types';

import { contacts, chats } from './mocks';
import ContactsComponent from './components/ContactsComponent.jsx';
import ChatComponent from './components/ChatComponent.jsx';
import NewChatComponent from './components/NewChatComponent.jsx';
import { handlePromise, returnData } from './helpers/promise';

@inject('store') @observer
class App extends React.Component {
  componentDidMount() {
    const allContacts = contacts();
    const allChats = chats();

    const { setContactsList, setChats } = this.props.store;

    returnData(handlePromise(allContacts), setContactsList);
    returnData(handlePromise(allChats), setChats);
  }

  render() {
    const { isNewChat } = this.props.store;
    return (
      <div className="App container-fluid">
        <div className="row">
          <ContactsComponent />
          {!isNewChat && <ChatComponent />}
          {isNewChat && <NewChatComponent />}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  store: PropTypes.shape({
    isNewChat: PropTypes.bool,
    setContactsList: PropTypes.func.isRequired,
    setChats: PropTypes.func.isRequired,
  }),
};

export default App;
