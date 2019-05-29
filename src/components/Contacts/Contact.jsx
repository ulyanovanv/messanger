import React, { Component } from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react/index";
import images from './../../helpers/images.js';

@inject('store') @observer
export default class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.openNewChart = this.openNewChart.bind(this);
  }

  openNewChart(id) {
    if (this.props.store.isNewChart) {
      this.props.store.toggleChartWindow();
    }

    this.props.store.setIdNameOfOpenChart(id);
  }

  render() {
    return (<div
      className="App__contacts_item d-flex align-items-center border-top border-bottom border-light px-2"
      onClick={() => this.openNewChart(this.props.id)}
    >
      <img src={images[this.props.image]} className="img-fluid mr-2"/>
      <div className="text-truncate">
        <h6 className="d-inline-block">{this.props.name}</h6><br/>
        <p className="d-inline-block text-secondary">{this.props.lastMessage}</p>
      </div>
      <div className="ml-auto text-secondary">
        {this.props.lastDate}
      </div>
    </div>);
  }
};
