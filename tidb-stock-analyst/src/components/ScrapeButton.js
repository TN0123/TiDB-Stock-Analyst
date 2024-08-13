import React from "react";

const ScrapeButton = () => {
  const handleScrape = async () => {
    try {
      const response = await fetch("http://localhost:5000/scrape");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching scraped data: ", error);
    }
  };

  return (
    <div>
      <button onClick={handleScrape}>ScrapeButton</button>
    </div>
  );
};

export default ScrapeButton;
