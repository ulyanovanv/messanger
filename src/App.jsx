import React, { Component, Fragment } from "react";

import contacts from "./mocks.js";
import ContactsComponent from "./components/ContactsComponent.jsx";
import ChartComponent from "./components/ChartComponent.jsx";
import NewChartComponent from "./components/NewChartComponent.jsx";
import {inject, observer} from "mobx-react/index";

@inject('store') @observer
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.openNewChart = this.openNewChart.bind(this);
  }

  componentDidMount() {
    let allContacts = contacts();

    let prom = new Promise((resolve, reject) => {
      if (allContacts.length > 0){
        resolve(allContacts);
      } else {
        reject("No data available");
      }
    });

    prom
      .then(data => {
        this.props.store.setContacts(data);
      })
      .catch(error =>
        console.log(error)
      );
  }

  openNewChart() {
    if (!this.props.store.isNewChart) {
      this.props.store.toggleChartWindow();
    }
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="row">
          <ContactsComponent openNewChart={this.openNewChart}/>
          {!this.props.store.isNewChart && <ChartComponent />}
          {this.props.store.isNewChart && <NewChartComponent />}
        </div>
      </div>
    );
  }
}