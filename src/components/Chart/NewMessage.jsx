import React, { Component } from "react"

import {inject, observer} from "mobx-react/index";

@inject('store') @observer
export default class NewMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>NewMessage</div>
  }
}