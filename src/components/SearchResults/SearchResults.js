import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';

function SearchResults({ searchResults }) {
  return (
    <div className={styles.SearchResults}>
      <h2>Results</h2>
      <Tracklist tracks={searchResults} />
    </div>
  );
}

export default SearchResults;