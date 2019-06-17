import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/index';
import { observable } from 'mobx';
import PropTypes from 'prop-types';
import getBase64 from '../../helpers/imageLoader.js';

export default
@inject('store')
@observer
class NewMessage extends Component {
  @observable imageCounter = 0;

  @observable message = '';

  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    const keyCode = e.keyCode || e.which;

    if (keyCode === 13) {
      e.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage() {
    if (!this.message) return;

    this.props.store.addNewMessage(this.message);
    this.message = '';
  }

  uploadImage(e) {
    e.preventDefault();
    const fileUploaded = e.target.files[0];

    if (fileUploaded.size > 1048576) { // 1 Mb
      alert('The image size should not exceed 1Mb');
      return;
    }

    const imageKey = `image_${this.imageCounter}`;
    getBase64(fileUploaded).then((file) => {
      localStorage[imageKey] = file;
      this.imageCounter = this.imageCounter + 1;
      this.props.store.addNewMessage(imageKey);
    });
  }

  render() {
    return (
      <div className="input-group p-2 App__chats_new-message">
        <textarea
          className="form-control"
          placeholder="Enter message text"
          aria-describedby="button-addon4"
          value={this.message}
          onChange={(event) => { this.message = event.target.value; }}
          onKeyDown={e => this.handleKeyDown(e)}
        />
        <div className="input-group-append" id="button-addon4">
          <label className="btn btn-outline-secondary btn-file mb-0" htmlFor="fileLoader">
          Add image
            <input
              type="file"
              id="fileLoader"
              value=""
              accept="image/x-png,image/gif,image/jpeg"
              onChange={e => this.uploadImage(e)}
            />
          </label>
          <input
            className="btn btn-outline-success"
            type="button"
            value="Send message"
            onClick={() => this.sendMessage()}
          />
        </div>
      </div>
    );
  }
}

NewMessage.propTypes = {
  store: PropTypes.shape({
    addNewMessage: PropTypes.func,
  }),
};
