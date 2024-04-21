// ChatPage.jsx

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const socket = io('http://localhost:5173'); // Replace 'localhost' with your server URL

  useEffect(() => {
    // Connect to socket server
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for incoming messages
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
      // Scroll to the bottom of the chat window
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [messages, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return; // Prevent sending empty messages
    socket.emit('chat message', inputValue);
    setInputValue('');
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <ul id="messages">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
