import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';

function SearchResults() {
  return (
    <div className={styles.SearchResults}>
      <h2>Results</h2>
      <Tracklist />
    </div>
  );
}

export default SearchResults;