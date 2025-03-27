import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import React from "react";
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

  // State for tracks in search results
  const [searchResults, setSearchResults] = useState([
    {
      id: '1',
      name: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      uri: 'spotify:track:2S3flt2KfOpG7JNmtteAAZ'
    },
    {
      id: '2',
      name: 'Save Your Tears',
      artist: 'The Weeknd',
      album: 'After Hours',
      uri: 'spotify:track:1S0B6NQeoaDO2vh2MEflkp'
    },
    {
      id: '3',
      name: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      uri: 'spotify:track:6825ujIyyrnHiXOzTVlWFG'
    },
    {
      id: '4',
      name: 'Don\'t Start Now',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia on the Past',
      uri: 'spotify:track:5pQ0ZiCd26Q9fNw8SCmsFO'
    },
    {
      id: '5',
      name: 'Watermelon Sugar',
      artist: 'Harry Styles',
      album: 'Fine Line',
      uri: 'spotify:track:6x367ass0NQZOc8j0z0eot'
    }
  ]);
  
  // State for tracks in playlist
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: '6',
      name: 'Dynamite',
      artist: 'BTS',
      album: 'Dynamite (Single)',
      uri: 'spotify:track:7zH7o0YuTjhaFNtaVBj7y2'
    }
  ]);
  
  // State for playlist name
  const [playlistName, setPlaylistName] = useState('New Playlist');

  // State for saving playlist to Spotify
  const [isSaving, setIsSaving] = useState(false);
  
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
      const token = await SpotifyAuth.getAccessToken();
      const userId = (await SpotifyAuth.getProfile()).id;
      
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: playlistName,
          description: 'Created with Jammming',
          public: false
        })
      });
  
      const playlist = await response.json();
      const trackUris = playlistTracks.map(track => track.uri);
  
      await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: trackUris
        })
      });
  
      // Reset after successful save
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
      alert('Playlist saved successfully to Spotify!');
    } catch (error) {
      console.error('Failed to save playlist:', error);
      alert('Failed to save playlist. Please try again.');
    }
  };

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
            onSave={savePlaylist}
            />
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;
