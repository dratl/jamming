import { useState } from "react";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import styles from "./App.module.css";

function App() {
  // Mock data for initial state
  const mockSearchResults = [
    { id: '1', name: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours' },
    { id: '2', name: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours' },
    { id: '3', name: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia' },
    { id: '4', name: 'Don\'t Start Now', artist: 'Dua Lipa', album: 'Future Nostalgia' },
    { id: '5', name: 'Watermelon Sugar', artist: 'The Kid LAROI, Justin Bieber', album: 'Fine Line' },
  ];
  const mockPlaylistTracks = [
    { id: '6', name: 'Dynamite', artist: 'BTS', album: 'Dynamite (Single)' },
    { id: '7', name: 'Stay', artist: 'The Kid LAROI, Justin Bieber', album: 'F*CK LOVE 3: OVER YOU' },
  ];
  // State for tracks in search results
  const [searchResults, setSearchResults] = useState(mockSearchResults);
  // State for tracks in playlist
  const [playlistTracks, setPlaylistTracks] = useState(mockPlaylistTracks);

  return (
    <div className={styles.App}>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar />
      <div className={styles.AppPlaylist}>
        <SearchResults searchResults={searchResults} />
        <Playlist playlistTracks={playlistTracks} />
      </div>
    </div>
  );
}

export default App;