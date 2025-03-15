import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist() {
  return (
    <div className={styles.Tracklist}>
      {/* Map through tracks and render Track components */}
      <Track />
      <Track />
      <Track />
    </div>
  );
}

export default Tracklist;