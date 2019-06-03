import React, { Component } from "react";
import {inject, observer} from "mobx-react/index";

import images from './../../helpers/images.js';

@inject('store') @observer
export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.openNewChat = this.openNewChat.bind(this);
    this.renderLastMessage = this.renderLastMessage.bind(this);
  }

  openNewChat(id) {
    if (this.props.store.isNewChat) {
      this.props.store.toggleChatWindow();
    }

    this.props.store.setIdOfOpenChart(id);
  }

  renderLastMessage() {
    return this.props.lastMessage.includes("image_") ?
      <img src={window.localStorage.getItem(this.props.lastMessage)} className="App__contacts_item_uploaded-image"/> :
      <p className="d-inline-block text-secondary">{this.props.lastMessage}</p>;
  }

  render() {
    return (<div
      className={"App__contacts_item d-flex align-items-center border-top border-bottom border-light px-2 "
      + (this.props.store.idOfOpenChart === this.props.id ? "bg-light" : "")}
      onClick={() => this.openNewChat(this.props.id)}
    >
      <img src={images[this.props.image]} className="App__contacts_item_contact-image mr-2"/>
      <div className="text-truncate">
        <h6 className="d-inline-block">{this.props.name}</h6><br/>
        {this.renderLastMessage()}
      </div>
      <div className="ml-auto text-secondary">
        {this.props.lastDate}
      </div>
    </div>);
  }
};
