import React from "react";
import SearchIcon from "./search-icon.svg";
import "./search-bar.css";

type Props = {
  value: string;
  results: number;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, results, onChange }: Props) => (
  <div className="search-bar-container">
    <div className="search-bar">
      <img src={SearchIcon} alt="Search" />
      <input
        type="search"
        value={value}
        placeholder="Search a character..."
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
    <div className="search-bar-results">
      {results} {results === 1 ? "Result" : "Results"}
    </div>
  </div>
);

export default SearchBar;
