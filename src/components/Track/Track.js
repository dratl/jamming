import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
  const handleAction = () => {
    isRemoval ? onRemove(track) : onAdd(track);
  };

  return (
    <div className={styles.Track}>
      {track.album_cover && (
        <img 
          src={track.album_cover} 
          alt={`${track.album} cover`} 
          className={styles.AlbumCover}
        />
      )}
      <div className={styles.TrackInformation}>
        <h3>{track.name}</h3>
        <p>
          {track.artist} • {track.album}
        </p>
        {track.preview_url && (
          <audio controls className={styles.PreviewPlayer}>
            <source src={track.preview_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      <button
        className={styles.TrackAction} 
        onClick={handleAction}
        aria-label={isRemoval ? 'Remove from playlist' : 'Add to playlist'}
      >
        {isRemoval ? '−' : '+'}
      </button>
    </div>
  );
}

export default Track;