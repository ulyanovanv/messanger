import React, { Component } from "react"

import ContactSearchLine from "./NewChat/ContactSearchLine.jsx";
import ContactSuggestion from "./NewChat/ContactSuggestion.jsx";

export default class NewChatComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="App__new-chat col-8 d-flex flex-column p-0">
      <ContactSearchLine />
      <ContactSuggestion />
    </div>
  }
}