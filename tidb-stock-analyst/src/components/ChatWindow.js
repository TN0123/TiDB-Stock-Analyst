import React, { useState } from "react";
import "./ChatWindow.css";

function ChatWindow() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(message);
  };

  return (
    <div className="chat-window">
      <form className="chat-form" onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-box"
        />
        <input type="submit"></input>
      </form>
      <h1>AI's Report</h1>
      <p>response goes here</p>
    </div>
  );
}

export default ChatWindow;
