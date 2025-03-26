import { useState } from "react";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import styles from "./App.module.css";

function App() {
  // State for tracks in search results
  const [searchResults, setSearchResults] = useState([
    {
      id: '1',
      name: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours'
    },
    {
      id: '2',
      name: 'Save Your Tears',
      artist: 'The Weeknd',
      album: 'After Hours'
    },
    {
      id: '3',
      name: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia'
    }
  ]);
  
  // State for tracks in playlist
  const [playlistTracks, setPlaylistTracks] = useState([]);
  
  // State for playlist name
  const [playlistName, setPlaylistName] = useState('New Playlist');
  
  // Add track to playlist
  const addTrack = (track) => {
    // Check if track already exists in playlist
    const existingTrack = playlistTracks.find(t => t.id === track.id);
    // If track is not in playlist, add it
    if (!existingTrack) {
      setPlaylistTracks([...playlistTracks, track]);
    }
    // Remove from search results
    setSearchResults(searchResults.filter(t => t.id !== track.id));
  };

  // Remove track from playlist
  const removeTrack = (track) => {
    setPlaylistTracks(playlistTracks.filter(t => t.id !== track.id));
    // Add back to search results if not already there
    const existingTrack = searchResults.find(t => t.id === track.id);
    if (!searchResults.some(resultTrack => resultTrack.id === track.id)) {
      setSearchResults([...searchResults, track]);
    };
  }
  // Update playlist name
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  return (
    <div className={styles.App}>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar />
      <div className={styles.AppPlaylist}>
        <SearchResults
          searchResults={searchResults}
          onAdd={addTrack}
        />
        <Playlist
          playlistTracks={playlistTracks}
          playlistName={playlistName}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
        />
      </div>
    </div>
  );
}

export default App;