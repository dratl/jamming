import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist({ tracks }) {
  return (
    <div className={styles.TrackList}>
      {tracks.map((track) => (
        <Track key={track.id} track={track} /> 
      ))}
    </div>
  );
}

export default Tracklist;