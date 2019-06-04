import React, { Component } from "react"
import {inject, observer} from "mobx-react/index";
import shortId from "shortid";

import images from "./../../helpers/images.js";

@inject('store') @observer
export default class ContactSuggestion extends Component {
  constructor(props) {
    super(props);

    this.addContactToSearchLine = this.addContactToSearchLine.bind(this);
  }

  addContactToSearchLine(name) {
    this.props.store.addContactToNewChat(name);
    this.props.store.setSearchedContact('');
  }

  render() {
    if (!this.props.store.listOfSearchedContacts.length) return null;

    let listOfSearchedContacts = this.props.store.listOfSearchedContacts.map(el => {
      return <div
          className="App__new-chat_contact-suggetions_each d-flex flex-row align-items-end my-1"
          key={shortId.generate()}
          onClick={() => this.addContactToSearchLine(el.name)}
      >
        <img
          src={images[el.image]}
          className="mr-2"
          title={el.image}
        />
        <h6>{el.name}</h6>
      </div>
    });

    return <div className="App__new-chat_contact-suggetions d-flex flex-column">
      {listOfSearchedContacts}
    </div>
  }
}