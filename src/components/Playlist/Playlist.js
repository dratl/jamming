import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist({ playlistTracks, playlistName, onRemove, onNameChange, onSave, isSaving = false }) {
  const handleNameChange = (e) => {
    // Limit to 50 characters
    const newName = e.target.value.slice(0, 50);
    onNameChange(newName);
  }

  const handleSave = () => {
    // Save playlist to Spotify
    onSave();
  }

  const buttonText = isSaving ? 'Saving...' : 'Save to Spotify';

  return (
    <div className={styles.Playlist}>
      <div className={styles.PlaylistHeader}>
        <input
          type="text"
          className={styles.PlaylistTitle}
          value={playlistName}
          onChange={handleNameChange}
          placeholder="New Playlist"
          aria-label="Playlist name"
          maxLength={50}
        />
        <span className={styles.CharCount}>
          {50 - (playlistName?.length || 0)} characters remaining
        </span>
      </div>
      <Tracklist
        tracks={playlistTracks}
        onRemove={onRemove}
        isRemoval={true}
      />
      <button 
        className={styles.PlaylistSave}
        onClick={handleSave}
        disabled={playlistTracks.length === 0 || !playlistName.trim() || isSaving}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Playlist;