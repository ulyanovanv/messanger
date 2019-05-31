import React, { Component } from "react"
import {inject, observer } from "mobx-react/index";
import { observable } from "mobx";

@inject('store') @observer
export default class NewMessage extends Component {
  @observable imageCounter = 0;
  @observable message = '';

  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  sendMessage() {
    this.props.store.addNewMessage(this.message);
    this.message = '';
  }

  uploadImage(e) {
    e.preventDefault();
    let file = e.target.files[0];

    if (file.size > 1048576) { //1 Mb
      alert("The image size should not exceed 1Mb");
      return;
    }

    let imageKey = "image_" + this.imageCounter;
    getBase64(file).then(file => {
      localStorage[imageKey] = file;
      this.imageCounter = this.imageCounter + 1;
      this.props.store.addNewMessage(imageKey);
    });
  }

  render() {
    return <div className="input-group p-2">
      <input type="text"
             className="form-control"
             placeholder="Enter message text"
             aria-describedby="button-addon4"
             value={this.message}
             onChange={(event) => this.message = event.target.value}
      />
        <div className="input-group-append" id="button-addon4">
          <div className="custom-file">
            <input
              className="btn btn-outline-secondary custom-file-input"
              id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={(e) => this.uploadImage(e)}
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
          </div>
          <input
            className="btn btn-outline-success"
            type="button"
            value="Send"
            onClick={() => this.sendMessage()}
          />
        </div>
    </div>
  }
}

const getBase64 = (file) => {
  return new Promise((resolve,reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};