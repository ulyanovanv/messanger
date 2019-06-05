import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';

import images from "./../../helpers/images.js";

export default function ChatContacts(props) {
  let contacts = props.contacts;

  let chatContacts = contacts.map(obj =>
    <Fragment key={obj.name}>
      <img
        src={images[obj.image]}
        className="mx-2"
        title={obj.image}
      />
      <h6>{obj.name}</h6>
    </Fragment>
  );

  return (<div className="App__chats_contact d-flex flex-row justify-content-center align-items-end border-bottom py-2">
    {chatContacts}
  </div>);
}

ChatContacts.propTypes = {
  contacts: PropTypes.array
};
