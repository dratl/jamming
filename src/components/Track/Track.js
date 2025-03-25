import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
  const handleTrackAction = () => {
    isRemoval ? onRemove(track) : onAdd(track);
  };

  return (
    <div className={styles.Track}>
      <div className={styles.TrackInformation}>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button
        className={styles.TrackAction}
        onClick={handleTrackAction}
      >
        {track.isRemoval ? '-' : '+'}
      </button>
    </div>
  );
}

export default Track;