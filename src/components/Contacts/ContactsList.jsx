import React, { Component } from "react";
import Contact from "./Contact.jsx";
import {inject, observer} from "mobx-react/index";

@inject('store') @observer
export default class ContactsList extends React.Component {
  constructor(props) {
    super(props);

    this.renderContacts = this.renderContacts.bind(this);
  }

  renderContacts() {
    return this.props.store.contactsOverview.map(el => {
      return <Contact
               name={el.name}
               image={el.image}
               lastMessage={el.lastMessage}
               lastDate={el.lastDate}
               key={el.id}
               id={el.id}
      />
    });
  }

  render() {
    return <div className="App__contacts_list">
      {this.renderContacts()}
    </div>;
  }
}