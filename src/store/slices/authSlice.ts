import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StravaAthlete, StravaTokenResponse } from '../../types/strava';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  athlete: StravaAthlete | null;
  isAuthenticated: boolean;
}

const loadStoredAuth = (): Partial<AuthState> => {
  try {
    const stored = localStorage.getItem('strava_auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Check if token is expired
      if (parsed.expiresAt && parsed.expiresAt * 1000 > Date.now()) {
        return parsed;
      }
    }
  } catch {
    // Invalid stored data
  }
  return {};
};

const storedAuth = loadStoredAuth();

const initialState: AuthState = {
  accessToken: storedAuth.accessToken ?? null,
  refreshToken: storedAuth.refreshToken ?? null,
  expiresAt: storedAuth.expiresAt ?? null,
  athlete: storedAuth.athlete ?? null,
  isAuthenticated: !!storedAuth.accessToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<StravaTokenResponse>) => {
      const { access_token, refresh_token, expires_at, athlete } = action.payload;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.expiresAt = expires_at;
      state.athlete = athlete;
      state.isAuthenticated = true;

      // Store in localStorage
      localStorage.setItem('strava_auth', JSON.stringify({
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: expires_at,
        athlete,
      }));
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresAt = null;
      state.athlete = null;
      state.isAuthenticated = false;
      localStorage.removeItem('strava_auth');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
