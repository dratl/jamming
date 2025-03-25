import React from 'react';
import styles from './Track.module.css';

function Track({ track }) {
  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button className={styles.TrackAction}>
        {track.isRemoval ? '-' : '+'}
      </button>
    </div>
  );
}

export default Track;