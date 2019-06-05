import React, { Component } from "react";
import {inject, observer} from "mobx-react/index";
import shortid from 'shortid';
import PropTypes from 'prop-types';

import images from './../../helpers/images.js';

@inject('store') @observer
export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.openNewChat = this.openNewChat.bind(this);
    this.renderLastMessage = this.renderLastMessage.bind(this);
    this.renderChatNames = this.renderChatNames.bind(this);
    this.renderChatImage = this.renderChatImage.bind(this);
  }

  openNewChat(id) {
    if (this.props.store.isNewChat) {
      this.props.store.toggleChatWindow();
    }

    this.props.store.setIdOfOpenChat(id);
  }

  renderLastMessage() {
    return this.props.lastMessage.includes("image_") ?
      <img
        src={window.localStorage.getItem(this.props.lastMessage)}
        className="App__contacts_item_uploaded-image"
      /> : <p className="d-inline-block text-secondary">{this.props.lastMessage}</p>;
  }

  renderChatNames() {
    let contacts = this.props.contacts;

    if (contacts.length > 1) {
      return contacts.map((obj, index) => `${obj.name}${(index !== contacts.length - 1) ? ", " : ""}`);
    } else {
      return this.props.contacts[0].name;
    }
  }

  renderChatImage() {
    let contacts = this.props.contacts;
    if (contacts.length > 1) {
      let arrayOfImages = [];
      for (let i = 0; i < 4; i++) { //only for 4 contacts even if there are more in chart
        if(this.props.contacts[i]) {
          arrayOfImages.push(images[this.props.contacts[i].image]);
        }
      }

      return (
        <div className="App__contacts_item_image-box d-flex flex-row flex-wrap mr-2">
          {arrayOfImages.map(src =>
            <img
              className="App__contacts_item_contact-image-small mr-1 mb-1"
              src={src}
              key={shortid.generate()}
              title="group of contacts"
            />
          )}
        </div>
      );
    } else {
      return <img
        src={images[this.props.contacts[0].image]}
        title={this.props.contacts[0].image}
        className="App__contacts_item_contact-image mr-2"
      />;
    }
  }

  render() {
    return (<div
      className={"App__contacts_item d-flex align-items-center border-top border-bottom border-light px-2 "
      + (this.props.store.idOfOpenChat === this.props.id ? "bg-light" : "")}
      onClick={() => this.openNewChat(this.props.id)}
    >
      {this.renderChatImage()}
      <div className="text-truncate">
        <h6 className="d-inline-block">
          {this.renderChatNames()}
        </h6><br/>
        {this.renderLastMessage()}
      </div>
      <div className="ml-auto text-secondary">
        {this.props.lastDate}
      </div>
    </div>);
  }
};

Contact.propTypes = {
  contacts: PropTypes.array,
  lastMessage: PropTypes.string,
  lastDate: PropTypes.string,
  lastUser: PropTypes.string,
  id: PropTypes.string
};
