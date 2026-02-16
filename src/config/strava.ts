export const STRAVA_CONFIG = {
  clientId: import.meta.env.VITE_STRAVA_CLIENT_ID,
  redirectUri: import.meta.env.VITE_STRAVA_REDIRECT_URI || 'http://localhost:5173/callback',
  scope: 'read,activity:read_all,profile:read_all',
  authUrl: 'https://www.strava.com/oauth/authorize',
};

export const getStravaAuthUrl = (): string => {
  const params = new URLSearchParams({
    client_id: STRAVA_CONFIG.clientId,
    redirect_uri: STRAVA_CONFIG.redirectUri,
    response_type: 'code',
    scope: STRAVA_CONFIG.scope,
  });

  return `${STRAVA_CONFIG.authUrl}?${params.toString()}`;
};
