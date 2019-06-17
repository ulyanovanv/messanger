import React from 'react';
import { inject, observer } from 'mobx-react/index';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import images from '../../helpers/images.js';
import supportEvent from '../../helpers/supportEvent.js';

export default
@inject('store')
@observer
class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.openNewChat = this.openNewChat.bind(this);
    this.renderLastMessage = this.renderLastMessage.bind(this);
    this.renderChatNames = this.renderChatNames.bind(this);
    this.renderChatImage = this.renderChatImage.bind(this);
  }

  openNewChat(id) {
    const { isNewChat, toggleChatWindow, setIdOfOpenChat } = this.props.store;

    if (isNewChat) {
      toggleChatWindow();
    }

    setIdOfOpenChat(id);
  }

  renderLastMessage() {
    const { lastMessage } = this.props;
    return lastMessage.includes('image_')
      ? (
        <img
          src={window.localStorage.getItem(lastMessage)}
          className="App__contacts_item_uploaded-image"
          alt="loaded from localSorage"
        />
      ) : <p className="d-inline-block text-secondary">{lastMessage}</p>;
  }

  renderChatNames() {
    const { contacts } = this.props;

    if (contacts.length > 1) {
      return contacts.map((obj, index) => `${obj.name}${(index !== contacts.length - 1) ? ', ' : ''}`);
    }
    return this.props.contacts[0].name;
  }

  renderChatImage() {
    const { contacts } = this.props;

    if (contacts.length > 1) {
      const arrayOfImages = [];
      for (let i = 0; i < 4; i += 1) { // only for 4 contacts even if there are more in chart
        if (this.props.contacts[i]) {
          arrayOfImages.push(images[this.props.contacts[i].image]);
        }
      }

      return (
        <div className="App__contacts_item_image-box d-flex flex-row flex-wrap mr-2">
          {arrayOfImages.map(src => (
            <img
              className="App__contacts_item_contact-image-small mr-1 mb-1"
              src={src}
              key={shortid.generate()}
              title="group of contacts"
              alt="group of contacts"
            />
          ))}
        </div>
      );
    }
    return (
      <img
        src={images[this.props.contacts[0].image]}
        title={this.props.contacts[0].image}
        className="App__contacts_item_contact-image mr-2"
        alt={this.props.contacts[0].name}
      />
    );
  }

  render() {
    const { id, lastDate } = this.props;

    return (
      <div
        className={`App__contacts_item d-flex align-items-center border-top border-bottom border-light px-2 ${
          this.props.store.idOfOpenChat === id ? 'bg-light' : ''}`}
        onClick={() => this.openNewChat(id)}
        tabIndex="0"
        role="button"
        onKeyDown={event => supportEvent(event, this.openNewChat, id)}
      >
        {this.renderChatImage()}
        <div className="text-truncate">
          <h6 className="d-inline-block">
            {this.renderChatNames()}
          </h6>
          <br />
          {this.renderLastMessage()}
        </div>
        <div className="ml-auto text-secondary">
          {lastDate}
        </div>
      </div>
    );
  }
}

Contact.propTypes = {
  store: PropTypes.shape({
    isNewChat: PropTypes.bool,
    idOfOpenChat: PropTypes.string,
    toggleChatWindow: PropTypes.func,
    setIdOfOpenChat: PropTypes.func,
  }),
  contacts: PropTypes.arrayOf(PropTypes.object),
  lastMessage: PropTypes.string,
  lastDate: PropTypes.string,
  id: PropTypes.string,
};
