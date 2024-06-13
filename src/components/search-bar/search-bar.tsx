import React from "react";
import SearchIcon from "./search-icon.svg";
import "./search-bar.css";

type Props = {
  value: string;
  results: number;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, results, onChange }: Props) => (
  <div className="search-bar">
    <div className="search-bar__input">
      <img src={SearchIcon} alt="Search" />
      <input
        type="search"
        value={value}
        placeholder="Search a character..."
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
    <div className="search-bar__results">
      {results} {results === 1 ? "Result" : "Results"}
    </div>
  </div>
);

export default SearchBar;
