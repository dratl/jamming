import React from 'react';
import PropTypes from 'prop-types';
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
Tracklist.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isRemoval: PropTypes.bool.isRequired,
};

export default Tracklist;