const clientId = '0f955bc81a3f4398a0f3c033480e111f'; // Replace with your actual client ID
const clientSecret = 'dc76d78044874fa587ca12c95f8866f6'; // Replace with your actual client secret
const redirectUri = 'http://localhost:3000/callback'; // Must match your Spotify app settings

let accessToken = null; // Using let since this will change
let tokenExpirationTime = null;

const SpotifyAuth = {
  getAccessToken() {
    // Return existing token if it's still valid
    if (accessToken && Date.now() < tokenExpirationTime) {
      return Promise.resolve(accessToken);
    }

    // Check URL for token after redirect
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const newAccessToken = urlParams.get('access_token');
    const expiresIn = urlParams.get('expires_in');

    if (newAccessToken && expiresIn) {
      accessToken = newAccessToken;
      tokenExpirationTime = Date.now() + expiresIn * 1000;

      // Clear token from URL
      window.history.pushState({}, document.title, window.location.pathname);

      return Promise.resolve(accessToken);
    }

    // No token found - redirect to Spotify auth
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=playlist-modify-private playlist-modify-public`;
    window.location.href = authUrl;

    return Promise.reject(new Error('Redirecting to Spotify authentication'));
  },

  async checkTokenValidity() {
    if (!accessToken || Date.now() >= tokenExpirationTime) {
      return false;
    }

    // Make a lightweight API call to validate token
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  async makeRequest(url, method = 'GET', body = null) {
    try {
      const token = await this.getAccessToken();
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const options = {
        method,
        headers
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Spotify request failed:', error);
      throw error;
    }
  },

  async getProfile() {
    return this.makeRequest('https://api.spotify.com/v1/me');
  },

  // Helper to clear tokens (for logout)
  clearTokens() {
    accessToken = null;
    tokenExpirationTime = null;
  },

  // Helper to refresh token when it expires
  async refreshToken() {
    try {
      // This requires using Authorization Code flow instead of Implicit Grant
      // For Implicit Grant, you'll need to redirect to login again when token expires
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: localStorage.getItem('refresh_token')
        })
      });

      const data = await response.json();
      accessToken = data.access_token;
      tokenExpirationTime = Date.now() + data.expires_in * 1000;

      if (data.refresh_token) {
        localStorage.setItem('refresh_token', data.refresh_token);
      }

      return accessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      this.clearTokens();
      throw error;
    }
  },

  // Search method for tracks

  // In SpotifyAuth.js, modify the searchTracks method:
  async searchTracks(term) {
    try {
      const token = await this.getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw API preview URLs:', 
        data.tracks.items.map(t => ({
          name: t.name, 
          preview_url: t.preview_url,
          has_preview: !!t.preview_url
        }))
      );

      const processedTracks = (data?.tracks?.items || []).map(track => {
        const processed = {
          id: track.id,
          name: track.name,
          artist: track.artists?.[0]?.name || 'Unknown Artist',
          album: track.album?.name || 'Unknown Album',
          uri: track.uri,
          preview_url: track.preview_url || null, // Explicit null if not available
          album_cover: track.album?.images?.[0]?.url || null,
          duration_ms: track.duration_ms || 0
        };
        console.log('Processed track preview:', {
          name: processed.name,
          preview_url: processed.preview_url
        });
        return processed;
      });

      return processedTracks;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

};

export default SpotifyAuth;