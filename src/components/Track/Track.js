import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
  const handleAction = () => {
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
        onClick={handleAction}
        aria-label={isRemoval ? 'Remove from playlist' : 'Add to playlist'}
      >
        {isRemoval ? '-' : '+'}
      </button>
    </div>
  );
}

export default Track;