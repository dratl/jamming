const clientId = '0f955bc81a3f4398a0f3c033480e111f'; // Replace with your actual client ID
const clientSecret = 'dc76d78044874fa587ca12c95f8866f6'; // Replace with your actual client secret
const redirectUri = 'http://localhost:3000/callback'; // Must match your Spotify app settings
let accessToken;
let tokenExpirationTime;

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
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=playlist-modify-public playlist-modify-private`;
    window.location.href = authUrl;
    
    return Promise.reject(new Error('Redirecting to Spotify authentication'));
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
  }
};

// Helper to refresh token when it expires

const refreshToken = async () => {
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
};

// Search method for tracks

async searchTracks(term) {
  const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;
  const response = await this.makeRequest(url);
  
  if (!response.tracks) {
    return [];
  }

  return response.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    uri: track.uri,
    preview_url: track.preview_url,
    album_cover: track.album.images.length > 0 ? track.album.images[0].url : null
  }));
}

export default SpotifyAuth;