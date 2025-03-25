import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist({ playlistTracks }) {
  return (
    <div className={styles.Playlist}>
      <input className={styles.PlaylistTitle} defaultValue="New Playlist" />
      <Tracklist tracks={playlistTracks} />
      <button className={styles.PlaylistSave}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;