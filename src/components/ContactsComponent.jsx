import React, { Component } from "react";

import ContactsList from "./Contacts/ContactsList.jsx";
import {inject, observer} from "mobx-react/index";

@inject('store') @observer
export default class ContactsComponent extends Component {
  constructor(props) {
    super(props);

    this.openNewChart = this.openNewChart.bind(this);
  }

  openNewChart() {
    if (!this.props.store.isNewChart) {
      this.props.store.toggleChartWindow();
    }
  }


  render() {
    return <div className="App__contacts col-4 d-flex flex-column p-0">
      <div className="d-flex flex-row justify-content-around align-items-baseline border-bottom py-2">
        <button className="invisible ">add chart</button>
        <h5 className="text-center">Messanger</h5>
        <button
          className="btn btn-success btn-sm font-weight-bold"
          onClick={() => this.openNewChart()}>
          add chart
        </button>
      </div>
      <ContactsList />
    </div>
  }
}