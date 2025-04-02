import React, { useState } from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
  const [audioError, setAudioError] = useState(false);
  // Create a safe track object with all required properties
  const safeTrack = {
    ...track,
    album_cover: track.album_cover || track.album?.images?.[0]?.url || null,
    preview_url: track.preview_url || null,
    name: track.name || 'Unknown Track',
    artist: track.artist || track.artists?.[0]?.name || 'Unknown Artist',
    album: track.album || track.album?.name || 'Unknown Album'
  };

  // Debug preview URL
  console.log('Track preview URL:', {
    name: safeTrack.name,
    preview_url: safeTrack.preview_url,
    has_preview: !!safeTrack.preview_url
  });

  // Use safeTrack everywhere in your component
  return (
    <div className={styles.Track}>
      <div className={styles.AlbumContainer}>
        {safeTrack.album_cover ? (
          <img 
            src={safeTrack.album_cover}
            alt={`${safeTrack.album} cover`}
            className={styles.AlbumCover}
          />
        ) : (
          <div className={styles.AlbumPlaceholder}>
            <span className={styles.MusicIcon}>🎵</span>
          </div>
        )}
      </div>

      <div className={styles.TrackInformation}>
        <h3>{safeTrack.name}</h3>
        <p>{safeTrack.artist} • {safeTrack.album}</p>
        
        {safeTrack.preview_url && !audioError ? (
          <audio
            controls
            onError={() => {
              console.warn('Preview failed to load:', safeTrack.preview_url);
              setAudioError(true);
            }}
            onCanPlay={() => setAudioError(false)}
          >
            <source src={safeTrack.preview_url} type="audio/mpeg" />
          </audio>
        ) : (
          <div>No preview available</div>
        )}
      </div>

      <button 
        className={styles.TrackAction}
        onClick={() => isRemoval ? onRemove(safeTrack) : onAdd(safeTrack)}
      >
        {isRemoval ? '−' : '+'}
      </button>
    </div>
  );
}

export default Track;