import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SpotifyAuth from "../../spotify/SpotifyAuth";
import Callback from "../Callback/Callback";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import styles from "./App.module.css";

function App() {
  // State for authentication status and user profile
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  
  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await SpotifyAuth.getAccessToken();
        const profile = await SpotifyAuth.getProfile();
        setUserProfile(profile);
        setIsAuthenticated(true);
      } catch (error) {
        console.log('Authentication required');
      }
    };
    checkAuth();
  }, []);

  // Handle Login
  const handleLogin = () => {
    SpotifyAuth.getAccessToken().catch(() => {
      // Redirect happens automatically
    });
  };

  // Handle Logout
  const handleLogout = () => {
    SpotifyAuth.clearTokens();
    setIsAuthenticated(false);
    setUserProfile(null);
  };
  
  // State for playlist name
  const [playlistName, setPlaylistName] = useState('New Playlist');
  // State for saving playlist to Spotify
  // Removed unused isSaving state

  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
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
    if (name.trim() !== '') {
      setPlaylistName(name);
    }
  };

  // Save Playlist Functionality

  const savePlaylist = async () => {
    try {
      // Validate playlist
      if (!playlistName.trim() || playlistTracks.length === 0) {
        alert('Please name your playlist and add tracks before saving!');
        return;
      }
  
      // Get user ID and access token
      const token = await SpotifyAuth.getAccessToken();
      const userProfile = await SpotifyAuth.getProfile();
      const userId = userProfile.id;
  
      // Create new playlist
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: playlistName,
            description: 'Created with Jammming',
            public: false // Make playlist private
          })
        }
      );
  
      if (!playlistResponse.ok) {
        throw new Error('Failed to create playlist');
      }
  
      const playlist = await playlistResponse.json();
      const playlistId = playlist.id;
  
      // Add tracks to playlist
      const trackUris = playlistTracks.map(track => track.uri);
      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            uris: trackUris,
            position: 0
          })
        }
      );
  
      if (!addTracksResponse.ok) {
        throw new Error('Failed to add tracks to playlist');
      }
  
      // Reset after successful save
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      alert('Playlist saved successfully to Spotify!');
  
    } catch (error) {
      console.error('Playlist save error:', error);
      alert('Failed to save playlist. Please try again.');
    }
  };

  // Error Handling and Loading States
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async (results) => {
    try {
      setSearchError(null);
      const filteredResults = results.filter(
        track => !playlistTracks.some(playlistTrack => playlistTrack.id === track.id)
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Search processing error:', error);
      setSearchError('Failed to process search results');
      setSearchResults([]);
    }
  };
  // Render error message if searchError exists
  {searchError && (
    <div className={styles.ErrorMessage}>
      {searchError}
    </div>
  )}
  return (
    <Routes>
      <Route path="/callback" element={<Callback />} />
      <Route path="/" element={
        <div className={styles.App}>
          <header>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
            {isAuthenticated ? (
              <div className="user-info">
                <span>Welcome, {userProfile?.display_name}</span>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            ) : (
              <button onClick={handleLogin}>Log in with Spotify</button>
            )}
          </header>
          <SearchBar onSearch={handleSearch} />
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
            onSave={savePlaylist}
            />
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;
