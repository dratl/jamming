import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';

function SearchResults() {
  const mockSearchResults = [
    { id: 1, name: 'Tiny Dancer', artist: 'Elton John', album: 'Madman Across The Water' },
    { id: 2, name: 'Tiny Dancer', artist: 'Tim McGraw', album: 'Love Story' },
    { id: 3, name: 'Tiny Dancer', artist: 'Rockabye Baby!', album: 'Lullaby Renditions of Elton John' }
  ];
  
  return (
    <div className={styles.SearchResults}>
      <h2>Results</h2>
      <Tracklist tracks={mockSearchResults} />
    </div>
  );
}

export default SearchResults;