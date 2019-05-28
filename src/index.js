import ReactDOM from "react-dom";
import {Provider} from "mobx-react";
import './App.scss';
import React, { Component } from "react";

import App from "./App.jsx";
import MessangerStore from "./store/MessangerStore";

const store = new MessangerStore();
const wrapper = document.getElementById("react-application");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  wrapper
);
