import React, { useState } from "react";
import "./ChatWindow.css";
import GenResultsButton from "./GenResultsButton";

function ChatWindow() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      <h1>Apply Filters</h1>
      <form className="chat-form" onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-box"
        />
        <input type="submit"></input>
      </form>
      <h1>Latest stock articles</h1>
      <GenResultsButton
        setResult={setResult}
        setLoading={setLoading}
        query={message}
      />
      {loading ? (
        <p>Loading...</p> // Display loading message when loading is true
      ) : (
        <div className="chat-results">
          {result.map((line, index) => {
            const [headline, link] = line.split(",");
            return (
              <p key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {headline}
                </a>
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
