import React, { Component } from "react";
import {inject, observer} from "mobx-react/index";
import shortid from 'shortid';

import Contact from "./Contact.jsx";

@inject('store') @observer
export default class ContactsList extends React.Component {
  constructor(props) {
    super(props);

    this.renderContacts = this.renderContacts.bind(this);
  }

  renderContacts() {
    return this.props.store.contactsOverview.map(el => {

      return <Contact
               contacts={el.contacts}
               lastMessage={el.lastMessage}
               lastDate={el.lastDate}
               lastUser={el.lastUser}
               key={shortid.generate()}
               id={el.idOfChart}
      />
    });
  }

  render() {
    return <div className="App__contacts_list">
      {this.renderContacts()}
    </div>;
  }
}