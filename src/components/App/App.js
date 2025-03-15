import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import styles from "./App.module.css";

function App() {
  return (
    <div className="App">
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar />
        <SearchResults />
        <Playlist />
    </div>
  );
}

export default App;