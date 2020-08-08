
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default class home extends Component {
  render() {
    const handleJoin = () => {
      var idinput = document.getElementById('meetid').value;
      this.props.history.push(`/joincall/${idinput}`);
    }
    return (
      <div className="mt-4 text-center">
        <p>Welcome to <strong>Vidco</strong></p>

        <div className="mt-4">
          <a className="btn btn-primary" href={'/joincall/' + uuidv4()}>Create new Meeting</a>
        </div>
        <div className="mt-4">
          <input type="text" id="meetid" className="form-control" placeholder="Enter Meeting ID" style={{width: "350px", margin: "0 auto",}}  />
          <button onClick={handleJoin} className="btn btn-primary">Join Meeting</button>
        </div>
      </div >
    )
  }
}