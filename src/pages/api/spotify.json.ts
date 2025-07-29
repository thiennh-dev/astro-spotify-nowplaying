import type { APIRoute } from 'astro';

// Type definition for the expected structure of Spotify's API response
interface SpotifyNowPlaying {
  is_playing: boolean;
  item?: {
    name: string;
    artists: { name: string }[];
    album: {
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
    duration_ms: number;
  };
  progress_ms?: number;
}

// Spotify API Endpoints
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// Your Spotify Credentials from Environment Variables
// These MUST be set in your Cloudflare Pages project settings
const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

// This function gets a fresh access token from Spotify using your refresh token
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    })
  });
  return response.json();
};

// This is the main API route handler for GET requests
export const GET: APIRoute = async () => {
  // 1. Get a fresh access token
  const { access_token } = await getAccessToken();

  // 2. Fetch the currently playing song from Spotify
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  // 3. Handle cases where nothing is playing (204 No Content) or other errors
  if (response.status === 204 || response.status > 400) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const song: SpotifyNowPlaying = await response.json();

  // 4. Extract the data we need from the Spotify response
  const data = {
    isPlaying: song.is_playing,
    title: song.item?.name,
    artist: song.item?.artists.map((artist) => artist.name).join(', '),
    albumImageUrl: song.item?.album.images[0].url,
    songUrl: song.item?.external_urls.spotify,
    timestamp: song.progress_ms,
    duration: song.item?.duration_ms,
  };

  // 5. Return the data with cache-control headers
  // THIS IS THE FIX FOR CLOUDFLARE CACHING:
  // It tells Cloudflare and the browser not to store a copy of this response.
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
};