import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';
import PropTypes from 'prop-types';

function SearchResults({ searchResults, onAdd }) {
  return (
    <div className={styles.SearchResults}>
      <h2>Results</h2>
      {searchResults.length > 0 ? (
        <>
          <Tracklist 
            tracks={searchResults} 
            onAdd={onAdd}
            isRemoval={false}
          />
          <p className={styles.SearchNote}>
            Showing first {searchResults.length} results. Try more specific searches for better results.
          </p>
        </>
      ) : (
        <p className={styles.SearchNote}>
          No results found. Try a different search term.
        </p>
      )}
    </div>
  );
}
SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default SearchResults;