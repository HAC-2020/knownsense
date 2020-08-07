import React, { Component } from 'react'
import io from "socket.io-client";
import Peer from 'peerjs';

export class videocall extends Component {

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

        socket.on('user-connected', userId => {
          connectToNewUser(userId, stream);
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

  render() {
    return (
      <div>
        <p>A Video Call Page</p>
        <p>Meeting Id - {this.props.match.params.id}</p>
        <small>Share this meeting ID to join other people this meeting</small>
        <div id="video-grid" className="mt-5"></div>
      </div>
    )
  }
}

export default videocall
