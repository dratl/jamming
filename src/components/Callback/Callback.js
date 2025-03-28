import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpotifyAuth from '../../spotify/SpotifyAuth';
import styles from './Callback.module.css';

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = async () => {
      try {
        await SpotifyAuth.getAccessToken();
        navigate('/');
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate.push('/');
      }
    };

    authenticate();
  }, [navigate]);

  return (
    <div className="callback-container">
      <h2>Connecting to Spotify...</h2>
    </div>
  );
}

export default Callback;