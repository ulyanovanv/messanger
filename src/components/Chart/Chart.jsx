import React, { Component } from "react"

import {inject, observer} from "mobx-react/index";

@inject('store') @observer
export default class Chart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {messangers} = this.props;
    let prepaireMessangers = messangers.map(message => {
      let condition = message.user === this.props.id;

      return <div className={"App__charts_message_message-width d-flex flex-column align-content-center mb-1 p-1 rounded "
      + (condition ? "mr-auto bg-light text-dark" : "ml-auto bg-secondary text-white")}>
          <span>
            {message.message} {" "}
            <span
              className={"App__charts_message_date "
              + (condition ? "text-secondary align-self-start" : "text-light align-self-end")}>
              {message.date}
            </span>
            <br/>
          </span>
      </div>
    });

    return <div className="App__charts_message d-flex flex-column m-2">{prepaireMessangers}</div>
  }
}