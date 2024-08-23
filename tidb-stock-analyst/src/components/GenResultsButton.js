import React from "react";
import "./GenResultsButton.css";

const GenResultsButton = ({ setResult, setLoading, query }) => {
  const getRes = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/genResults?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      console.log(data);
      setResult(data || ["No output from server"]);
    } catch (error) {
      console.error("Error fetching scraped data: ", error);
      setResult(["Error fetching results"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gen-res-button">
      <button onClick={getRes}>Generate</button>
    </div>
  );
};

export default GenResultsButton;
