import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {
  return (
    <div className={styles.SearchBar}>
      <input placeholder="Enter a song, artist, or album" />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;