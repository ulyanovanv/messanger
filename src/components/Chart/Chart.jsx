import React, { Component } from "react";
import {inject, observer} from "mobx-react/index";
import shortid from 'shortid';

import images from "./../../helpers/images.js";

@inject('store') @observer
export default class Chart extends Component {
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
    this.scrollRed.current.scrollTo(0, window.innerHeight);
  }

  renderAuthorImage(message) {
    let condition = message.user === this.props.id;
    let myImage = <div className="App__charts_message_my-image mr-2"> me </div>;

    return condition ? <img src={images[this.props.id]} className="App__charts_message_user-image mr-2"/> : myImage;
  }

  renderMessage(message) {
    let condition = message.user === this.props.id;

    let messageContent = message.message.includes("image_") ?
      <img src={window.localStorage.getItem(message.message)}
           className="App__charts_message_loaded-image rounded"
           id={message.message}
           onLoad={this.scrollDown}
      /> : message.message;

    return (
      <div className={"p-1 rounded " + (condition ? "bg-light text-dark" : "bg-secondary text-white")}>
        {messageContent} {" "}
        <span className={"App__charts_message_date "
          + (condition ? "text-secondary align-self-start" : "text-light align-self-end")}>
          {message.date}
        </span>
        <br/>
      </div>);
  }

  render() {
    let {messangers} = this.props;
    let prepaireMessangers = messangers.map(message => {
      let condition = message.user === this.props.id;

      return <div
        className={"App__charts_message_message-width d-flex flex-row align-content-center mb-1 "
        + (condition ? "mr-auto" : "ml-auto")}
        key={shortid.generate()}
      >
        {this.renderAuthorImage(message)}
        {this.renderMessage(message)}
      </div>
    });

    return <div className="App__charts_message d-flex flex-column m-2" ref={this.scrollRed}>
      {prepaireMessangers}
    </div>
  }
}
