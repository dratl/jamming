import React from 'react';
import styles from './Track.module.css';

function Track() {
  return (
    <div className={styles.Track}>
      <div className={styles.TrackInfo}>
        <h3>Track Name</h3>
        <p>Artist | Album</p>
      </div>
      <button>+</button>
    </div>
  );
}

export default Track;