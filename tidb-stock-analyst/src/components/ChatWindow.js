import React, { useState, useEffect } from "react";
import "./ChatWindow.css";
import GenResultsButton from "./GenResultsButton";

function ChatWindow() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResultsOnLoad = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/genResults");
        const data = await response.json();
        setResult(data || ["No output from server"]);
      } catch (error) {
        console.error("Error fetching scraped data: ", error);
        setResult(["Error fetching results"]);
      } finally {
        setLoading(false);
      }
    };

    fetchResultsOnLoad(); // Call the function when the component mounts
  }, []);

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
    <div className="chat-window-container">
      <div className="chat-window">
        <h1>The Most Relevant Real-Time Stock Headlines</h1>
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
        <h2>Apply Filters</h2>
        <form className="chat-form" onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-box"
          />
        </form>
        <GenResultsButton
          setResult={setResult}
          setLoading={setLoading}
          query={message}
        />
      </div>
    </div>
  );
}

export default ChatWindow;
