import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  sendMessage = (sendMessage) => {
    if (sendMessage === '') {
      return;
    }
    const customerMessage = {
      text: sendMessage,
      role: 'CUSTOMER',
    };
    const messageList = this.state.messages.concat(customerMessage);
    setTimeout(() => {
      this.setState(
        {
          messages: messageList,
        },
        () => this.acceptMessage(customerMessage)
      );
    }, 10);
  };

  acceptMessage = (message) => {
    const acceptMessage = answersData.find((answer) =>
      answer.tags.some((tag) => message.text.includes(tag))
    );
    if (acceptMessage) {
      const messageList = this.state.messages.concat(acceptMessage);
      setTimeout(() => {
        this.setState({
          messages: messageList,
        });
      }, 10);
    }
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput handleSend={this.sendMessage} />
      </main>
    );
  }
}

export default Chat;
