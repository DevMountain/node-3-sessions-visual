import React, { Component } from 'react';
import HistoryModal from './History/HistoryModal';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
      allMessages: [],
      messageInputDisabled: true,
      showHistory: false
    };
    this.closeHistoryModal = this.closeHistoryModal.bind(this);
  }

  componentDidMount() {
    axios.get('/api/messages').then((res) => {
      this.setState({ allMessages: res.data });
    });
  }

  saveUsername() {
    if (this.state.username) {
      this.setState({ messageInputDisabled: !this.state.messageInputDisabled });
    }
  }

  createMessage() {
    let { username, message } = this.state;
    if (!username || !message) return;
    axios
      .post('/api/messages', { username: username, message: message })
      .then((res) => {
        this.setState({ allMessages: res.data, message: '' });
      });
  }

  showHistoryModal() {
    this.setState({ showHistory: true });
  }
  closeHistoryModal() {
    this.setState({ showHistory: false });
  }

  render() {
    let {
      messageInputDisabled,
      message,
      username,
      showHistory,
      ipAddress
    } = this.state;

    let allMessages = this.state.allMessages
      .map((messageObj, i) => {
        return (
          <div className="message" key={i}>
            <span>{messageObj.username}</span>
            <span>{messageObj.message}</span>
          </div>
        );
      })
      .reverse();

    return (
      <div className="app">
        <div className="content">
          <div className="messages-wrapper">{allMessages}</div>
          <div className="input-wrapper">
            <input
              disabled={!messageInputDisabled}
              onChange={(e) => this.setState({ username: e.target.value })}
              value={username}
              type="text"
              className="input-username"
              placeholder="Type in username..."
            />
            <button
              className={
                messageInputDisabled
                  ? 'button-username'
                  : 'button-username button-disabled'
              }
              onClick={() => this.saveUsername()}>
              {messageInputDisabled ? 'save' : 'update'}
            </button>
            <input
              disabled={messageInputDisabled}
              onChange={(e) => this.setState({ message: e.target.value })}
              value={message}
              type="text"
              className="input-message"
              placeholder={
                messageInputDisabled
                  ? 'Create a username before you send a message'
                  : 'Type in message...'
              }
            />
            <button
              onClick={() => this.createMessage()}
              disabled={messageInputDisabled}
              className="button-message">
              send
            </button>
            <button onClick={() => this.showHistoryModal()}>history</button>
          </div>
        </div>

        {/* If this.state.showHistory === true, modal will be displayed */}
        {showHistory ? (
          <HistoryModal closeHistoryModal={this.closeHistoryModal} />
        ) : null}
      </div>
    );
  }
}

export default App;
