import React, { Component } from "react"
import {inject, observer} from "mobx-react/index";
import shortId from "shortid";

import images from "./../../helpers/images.js";
import PropTypes from "prop-types";

@inject('store') @observer
export default class ContactSuggestion extends Component {
  constructor(props) {
    super(props);

    this.addContactToSearchLine = this.addContactToSearchLine.bind(this);
  }

  addContactToSearchLine(name) {
    this.props.updateNewChatWithContacts(name);

    this.props.store.setSearchedContact('');
  }

  render() {
    if (!this.props.listOfSearchedContacts.length) return null;

    let listOfSearchedContacts = this.props.listOfSearchedContacts.map(el => {
      return <div
          className="App__new-chat_contact-suggetions_each d-flex flex-row align-items-end my-1"
          key={shortId.generate()}
          onClick={() => this.addContactToSearchLine(el.name)}
      >
        <img
          src={images[el.image]}
          className="mx-2"
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

ContactSuggestion.propTypes = {
  updateListOfSearchedContacts: PropTypes.array
};