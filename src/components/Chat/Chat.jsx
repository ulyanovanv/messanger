import React, { Component } from "react";
import {inject, observer} from "mobx-react/index";
import shortid from 'shortid';

import images from "./../../helpers/images.js";

@inject('store') @observer
export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.scrollRed = React.createRef();

    this.renderAuthorImage = this.renderAuthorImage.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  componentDidMount() {
    this.scrollDown();
  }

  componentDidUpdate() {
    this.scrollDown();
  }

  scrollDown() {
    let chartScrollHeight = document.getElementsByClassName("App__chats_message")[0].scrollHeight;
    this.scrollRed.current.scrollTo(0, chartScrollHeight);
  }

  renderAuthorImage(message) {
    let condition = message.user === this.props.id;
    let myImage = <div className="App__chats_message_my-image mr-2"> me </div>;
    let userImage = <img src={images[this.props.id]} className="App__chats_message_user-image mr-2"/>;

    return condition ? userImage : myImage;
  }

  renderMessage(message) {
    let condition = message.user === this.props.id;

    let messageContent = message.message.includes("image_") ?
      <img src={window.localStorage.getItem(message.message)}
           className="App__chats_message_loaded-image rounded"
           id={message.message}
           onLoad={this.scrollDown}
      /> : message.message;

    return (
      <div className={"p-1 rounded " + (condition ? "bg-light text-dark" : "bg-secondary text-white")}>
        {messageContent} {" "}
        <span className={"App__chats_message_date "
          + (condition ? "text-secondary align-self-start" : "text-light align-self-end")}>
          {message.date}
        </span>
        <br/>
      </div>);
  }

  render() {
    let {messages} = this.props;
    let prepairedMessages = messages.map(message => {
      let condition = message.user === this.props.id;

      return <div
        className={"App__chats_message_message-width d-flex flex-row align-content-center mb-1 "
        + (condition ? "mr-auto" : "ml-auto")}
        key={shortid.generate()}
      >
        {this.renderAuthorImage(message)}
        {this.renderMessage(message)}
      </div>
    });

    return <div className="App__chats_message d-flex flex-column m-2" ref={this.scrollRed}>
      {prepairedMessages}
    </div>
  }
}
