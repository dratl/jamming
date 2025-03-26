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

  const savePlaylist = () => {
    // Check if playlist has tracks and a name
    if (playlistTracks.length === 0 || !playlistName.trim()) {
      alert ('Please add tracks to the playlist and give it a name!');
      return;
    }

    setIsSaving(true);

    // Simulate API call delay
    setTimeout(() => {
      const trackURIs = playlistTracks.map(track => track.uri);
      console.log('Saving playlist', { name: playlistName, tracks: trackURIs });
      alert(`Playlist "${playlistName}" saved to your Spotify account!`);
      // Reset playlist
      setPlaylistTracks([]);
      setPlaylistName('New Playlist');
      setIsSaving(false);
    }, 1500);
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
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;