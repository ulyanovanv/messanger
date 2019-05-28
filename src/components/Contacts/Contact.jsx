import React, { Component } from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react/index";

@inject('store') @observer
export default class Contact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div
      className="App__contacts_item row border-top border-bottom border-light"
      onClick={() => this.props.store.toggleChartWindow()}
    >
      {this.props.name}
    </div>);
  }
};
