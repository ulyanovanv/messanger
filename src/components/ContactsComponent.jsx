import React, { Component } from "react";

import ContactsList from "./Contacts/ContactsList.jsx";

export default class ContactsComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="App__contacts col-4 d-flex flex-column p-0">
      <div className="d-flex flex-row justify-content-around align-items-baseline border-bottom py-2">
        <button className="invisible ">New</button>
        <h5 className="text-center">Messanger</h5>
        <button
          className="btn btn-outline-dark btn-sm font-weight-bold"
          onClick={() => this.props.openNewChart()}>
          +
        </button>
      </div>
      <ContactsList />
    </div>
  }
}