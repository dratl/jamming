import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist() {
  return (
    <div className={styles.Playlist}>
      <input defaultValue="New Playlist" />
      <Tracklist />
      <button>Save to Spotify</button>
    </div>
  );
}

export default Playlist;