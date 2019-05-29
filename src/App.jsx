import React, { Component, Fragment } from "react";
import {inject, observer} from "mobx-react/index";

import {contacts, charts} from "./mocks.js";
import ContactsComponent from "./components/ContactsComponent.jsx";
import ChartComponent from "./components/ChartComponent.jsx";
import NewChartComponent from "./components/NewChartComponent.jsx";
import handlePromise from "./helpers/promise.js";


@inject('store') @observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let allContacts = contacts();
    let allCharts = charts();

    handlePromise(allContacts, this.props.store.setContactsList);
    handlePromise(allCharts, this.props.store.setCharts);
  }

  render() {
    return (
      <div className="App container-fluid">
         <div className="row">
          <ContactsComponent />
          {!this.props.store.isNewChart && <ChartComponent />}
          {this.props.store.isNewChart && <NewChartComponent />}
        </div>
      </div>
    );
  }
}