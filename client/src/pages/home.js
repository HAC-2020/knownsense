import React, { Component } from "react";

export default class home extends Component {
  componentDidMount() {
    alert("Please add metamask extension to use this application");
  }
  render() {
    return (
      <div className="mt-4 text-center">
        <h1>
          Welcome to <strong>Vidco</strong>
        </h1>
      </div>
    );
  }
}
