import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerMessage: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      customerMessage: e.target.value,
    });
  };

  handleClick = () => {
    this.props.handleSend(this.state.customerMessage);
    this.setState({
      customerMessage: '',
    });
  };

  render() {
    return (
      <footer className="ChatInput">
        <input
          type="text"
          onChange={(e) => this.handleChange(e)}
          value={this.state.customerMessage}
        />
        <button type="button" onClick={this.handleClick}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
