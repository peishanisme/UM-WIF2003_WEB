import React from "react";
import "../../../components-css/Community/SearchBar.css";

function SearchBar() {
  return (
    <div className="search-bar-container">
      <div className="search-bar-row">
        <input className="search-bar" type="text" placeholder="Search..." />
        <input className="search-bar" type="text" placeholder="Category" />
        <button type="button" className="btn-search">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
