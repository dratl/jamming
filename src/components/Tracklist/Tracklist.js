import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

function Tracklist({ tracks, onAdd, onRemove, isRemoval }) {
  return (
    <div className={styles.TrackList} data-removal={isRemoval}>
      {tracks.map((track) => (
        <Track 
          key={track.id} 
          track={track} // Just pass the track as-is
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        /> 
      ))}
    </div>
  );
}

export default Tracklist;