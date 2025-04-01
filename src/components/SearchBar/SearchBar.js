import React, { useState } from 'react';
import SpotifyAuth from '../../spotify/SpotifyAuth';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e, term) => {
        if (e) e.preventDefault();
        const searchTerm = term || searchTerm;
        if (!searchTerm.trim()) return;

        setIsSearching(true);
        setError(null);

        try {
            // First check if we're authenticated
            try {
                await SpotifyAuth.getAccessToken();
            } catch (authError) {
                setError('Please log in to search');
                return;
            }

            const results = await SpotifyAuth.searchTracks(searchTerm);
            onSearch(results.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artist,
                album: track.album,
                uri: track.uri,
                preview_url: track.preview_url,
                album_cover: track.album.images,
            })));
        } catch (error) {
            console.error('Search failed:', error);
            setError(error.message || 'Search failed. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        try {
            const results = await SpotifyAuth.searchTracks(searchTerm);
            onSearch(results); // Pass the processed results directly
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    return (
        <div className={styles.SearchBar}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a song, artist, or album"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={isSearching}
                />
                <button 
                    type="submit"
                    className={styles.SearchButton}
                    disabled={isSearching || !searchTerm.trim()}
                >
                    {isSearching ? 'Searching...' : 'SEARCH'}
                </button>
            </form>
            {error && <div className={styles.Error}>{error}</div>}
        </div>
    );
}

export default SearchBar;