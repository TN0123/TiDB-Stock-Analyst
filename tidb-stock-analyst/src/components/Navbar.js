import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <a className="navbar-title" href="/">
          StockDigestAI
        </a>
        <ul className="navbar-elems">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#About">About</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
