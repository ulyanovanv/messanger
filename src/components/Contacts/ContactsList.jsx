import React from 'react';
import { inject, observer } from 'mobx-react/index';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import Contact from './Contact.jsx';


export default
@inject('store')
@observer
class ContactsList extends React.Component {
  constructor(props) {
    super(props);

    this.renderContacts = this.renderContacts.bind(this);
  }

  renderContacts() {
    return this.props.store.contactsOverview.map(el => (
      <Contact
        contacts={el.contacts}
        lastMessage={el.lastMessage}
        lastDate={el.lastDate}
        lastUser={el.lastUser}
        key={shortid.generate()}
        id={el.idOfChart}
      />
    ));
  }

  render() {
    return (
      <div className="App__contacts_list">
        {this.renderContacts()}
      </div>
    );
  }
}

ContactsList.propTypes = {
  store: PropTypes.shape({
    contactsOverview: PropTypes.arrayOf(PropTypes.object),
  }),
};
