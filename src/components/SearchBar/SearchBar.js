import React from 'react';
import React, { useState } from 'react';
import SpotifyAuth from '../../spotify/SpotifyAuth';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    try {
      const results = await SpotifyAuth.searchTracks(searchTerm);
      onSearch(results);
    } catch (error) {
      alert('Search failed, please try again.');
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Enter a song, artist, or album"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={isSearching}
      />
      <button
        type="submit"
        disabled={isSearching || !searchTerm.trim()}
      >
        {isSearching ? 'Searching...' : 'Search'}
      </button>
    </form>>
  );
}

export default SearchBar;