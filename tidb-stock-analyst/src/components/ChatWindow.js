import React, { useState } from "react";
import "./ChatWindow.css";

function ChatWindow() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.stdout || "No response from server");
      console.log(response);
    } catch (error) {
      console.error("Error sending message:", error);
      setResponse("Error sending message");
    }
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
