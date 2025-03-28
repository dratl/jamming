import React, { useState } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist({ playlistTracks, playlistName, onRemove, onNameChange, onSave }) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.Playlist}>
      <input
        value={playlistName}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="New Playlist"
      />
      <Tracklist 
        tracks={playlistTracks}
        onRemove={onRemove}
        isRemoval={true}
      />
      <button 
        onClick={handleSave}
        disabled={isSaving || !playlistName.trim() || playlistTracks.length === 0}
        className={styles.PlaylistSave}
      >
        {isSaving ? 'Saving...' : 'SAVE TO SPOTIFY'}
      </button>
    </div>
  );
}

export default Playlist;