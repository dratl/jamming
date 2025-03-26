import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist({ playlistTracks, playlistName, onRemove, onNameChange }) {
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  }
  return (
    <div className={styles.Playlist}>
      <input
        type="text"
        className={styles.PlaylistTitle}
        value={playlistName}
        onChange={handleNameChange}
        placeholder="New Playlist"
        aria-label="Playlist name"
      />
      <Tracklist
        tracks={playlistTracks}
        onRemove={onRemove}
        isRemoval={true}
      />
      <button className={styles.PlaylistSave}>Save playlist to your Spotify account</button>
    </div>
  );
}

export default Playlist;