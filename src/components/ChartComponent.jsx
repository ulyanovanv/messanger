import React, { Component } from "react"

import {inject, observer} from "mobx-react/index";
import ChartContacts from "./Chart/ChartContacts.jsx";
import Chart from "./Chart/Chart.jsx";
import NewMessage from "./Chart/NewMessage.jsx";
import images from "./../helpers/images.js";

@inject('store') @observer
export default class ChartComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let currentChart = this.props.store.openChart;
    if (!currentChart) return null;

    return <div className="App__charts col-8 d-flex flex-column p-0">
      <ChartContacts
        name={currentChart.name}
        image={images[currentChart.image]}
      />
      <Chart messangers={currentChart.messangers} id={currentChart.id}/>
      <NewMessage />
    </div>
  }
}