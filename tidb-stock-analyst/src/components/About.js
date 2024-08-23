import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 id="About">About</h1>
        <p>
          This project is designed to help users make informed stock investment
          decisions by providing AI-driven insights based on the latest news
          headlines. By continuously scraping relevant financial articles,
          processing them through advanced machine learning models, and storing
          the data in a vector database, the project allows users to query
          stock-related topics and receive actionable insights in real-time. The
          integration of a user-friendly web interface enables users to easily
          access the latest stock news and analysis, while the backend automates
          the data collection and processing, ensuring up-to-date and accurate
          information is always available. This tool is ideal for investors
          seeking to stay ahead of market trends and make better financial
          decisions backed by AI-driven data analysis.
        </p>
      </div>
    </div>
  );
}

export default About;
