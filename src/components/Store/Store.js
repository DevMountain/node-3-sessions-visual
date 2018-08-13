import React, { Component } from 'react';
import axios from 'axios';
import './Store.css';

export default class Store extends Component {
  state = {
    sessions: [],
    showInstructions: true
  };
  componentDidMount() {
    setInterval(() => {
      axios.get('/api/sessions').then((res) => {
        this.setState({ sessions: res.data });
      });
    }, 1000);
  }
  render() {
    let sessionData = this.state.sessions.map((session, index) => {
      let id = Object.keys(session)[0];
      return (
        <div key={index} className="session-container">
          <p>
            Username:{' '}
            <span className="span-text">
              {session[id].history[session[id].history.length - 1].username}
            </span>
          </p>
          <p>
            Session ID (SID): <span className="span-text">{id}</span>
          </p>
          <p>
            Messages:{' '}
            <span className="span-text">
              {JSON.stringify(
                session[id].history.map((message) => message.message)
              )}
            </span>
          </p>
          <hr className="line" />
        </div>
      );
    });
    return (
      <div className="store-container">
        <h1>Session Store</h1>
        {sessionData}
      </div>
    );
  }
}
