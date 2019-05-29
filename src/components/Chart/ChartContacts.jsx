import React, { Component } from "react"

export default function ChartContacts(props) {
  return (<div className="App__charts_contact d-flex flex-row justify-content-center align-items-end border-bottom py-2">
    <img src={props.image} className="mr-2"/>
    <h6>{props.name}</h6>
  </div>);
}