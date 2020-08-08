import React, { Component } from 'react'
import io from "socket.io-client";
import Peer from 'peerjs';
import { Button } from 'semantic-ui-react';

export class videocall extends Component {
  state = {
    time: Date.now(),
    temp: 60,
    total: 60,
  }
  componentDidMount() {
    const socket = io("http://127.0.0.1:5000");
    const videoGrid = document.getElementById('video-grid');
    const myPeer = new Peer(undefined, {
      host: '/',
      port: '3001'
    })
    const myVideo = document.createElement('video');
    myVideo.muted = true;
    const Peers = {};
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        addVideoStream(myVideo, stream);

        myPeer.on('call', call => {
          call.answer(stream);
          const video = document.createElement('video');
          call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
          })
        })
        setInterval(() => updatetimer(stream), 60000);

        socket.on('user-connected', userId => {
          connectToNewUser(userId, stream);
        })

        document.getElementById('closebut').addEventListener('click', () => {
          //Before Closing Meeting logic here .... This.state.temp has current call time...



          stream.getTracks().forEach(function (track) {
            track.stop();
          });
          this.props.history.push('/');
        })
      })

    socket.on('user-disconnected', userId => {
      if (Peers[userId]) {
        Peers[userId].close();
      }
    })

    myPeer.on('open', id => {
      socket.emit('join-room', this.props.match.params.id, id);
    })

    const updatetimer = (stream) => {
      console.log('afdqw');
      const now = Number(Date.now()) - this.state.time;
      this.setState({
        temp: this.state.total - Math.floor(Number(now / 60000))
      })
      console.log(this.state.temp);
      if (this.state.temp === 0) {
        alert('Your call duration in now finished! Redirecting to home page...')
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        this.props.history.push('/');
      }
    }

    function connectToNewUser(userId, stream) {
      const call = myPeer.call(userId, stream);
      const video = document.createElement('video');
      call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      })
      call.on('close', () => {
        video.remove()
      })
      Peers[userId] = call;
    }

    function addVideoStream(video, stream) {
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
      videoGrid.append(video);
    }
  }

  extend = () => {
    //Extened Call Duration logic here ...



    //After Successfull extention run bellow code ...
    const currtime = this.state.temp;
    this.setState({
      total: currtime + 60,
      temp: currtime + 60
    })
  }

  render() {
    return (
      <div>
        <p>A Video Call Page <span style={{ float: 'right', marginRight: '50px' }}>Time Remaining - {this.state.temp} Mins</span></p>
        <p>Meeting Id - {this.props.match.params.id}</p>
        <small>Share this meeting ID to join other people this meeting</small>

        <div id="video-grid" className="mt-5"></div>
        <div style={{ margin: '50px' }}>
          <Button id="closebut" floated="right" basic color="red">
            Leave
        </Button>
          <Button onClick={this.extend} floated="right" basic color="blue">
            Extend Time
        </Button>
        </div>
      </div>
    )
  }
}

export default videocall
