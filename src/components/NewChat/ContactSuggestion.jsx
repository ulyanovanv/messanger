import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import shortId from 'shortid';

import PropTypes from 'prop-types';
import images from '../../helpers/images.js';
import supportEvent from '../../helpers/supportEvent.js';

export default
@inject('store')
@observer
class ContactSuggestion extends Component {
  constructor(props) {
    super(props);

    this.addContactToSearchLine = this.addContactToSearchLine.bind(this);
  }

  addContactToSearchLine(name) {
    this.props.updateNewChatWithContacts(name);

    this.props.store.setSearchedContact('');
  }

  render() {
    const { listOfSearchedContacts } = this.props;
    if (!listOfSearchedContacts.length) return null;

    const listOfSearchedContactsJSX = listOfSearchedContacts.map(el => (
      <div
        className="App__new-chat_contact-suggetions_each d-flex flex-row align-items-end my-1"
        key={shortId.generate()}
        onClick={() => this.addContactToSearchLine(el.name)}
        role="button"
        tabIndex="0"
        onKeyDown={event => supportEvent(event, this.addContactToSearchLine, el.name)}
      >
        <img
          src={images[el.image]}
          className="mx-2"
          title={el.image}
          alt={el.image}
        />
        <h6>{el.name}</h6>
      </div>
    ));

    return (
      <div className="App__new-chat_contact-suggetions d-flex flex-column">
        {listOfSearchedContactsJSX}
      </div>
    );
  }
}

ContactSuggestion.propTypes = {
  store: PropTypes.shape({
    setSearchedContact: PropTypes.func,
  }),
  listOfSearchedContacts: PropTypes.arrayOf(PropTypes.object),
  updateNewChatWithContacts: PropTypes.func,
};
