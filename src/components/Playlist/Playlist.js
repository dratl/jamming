import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

function Playlist() {
  const mockPlaylistTracks = [
    { id: 1, name: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across The Water' },
    { id: 2, name: 'Tiny Dancer', artist: 'Tim McGraw', album: 'Love Story' },
    { id: 3, name: 'Tiny Dancer', artist: 'Rockabye Baby!', album: 'Lullaby Renditions of Elton John' }
  ];

  return (
    <div className={styles.Playlist}>
      <input className={styles.PlaylistTitle} defaultValue="New Playlist" />
      <Tracklist tracks={mockPlaylistTracks} />
      <button className={styles.PlaylistSave}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;