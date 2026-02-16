import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';
import type { StravaAthlete, StravaTokenResponse } from '../../types/strava';

const STRAVA_CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = import.meta.env.VITE_STRAVA_CLIENT_SECRET;

export const stravaApi = createApi({
  reducerPath: 'stravaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.strava.com/api/v3',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Exchange authorization code for access token
    exchangeToken: builder.mutation<StravaTokenResponse, string>({
      query: (code) => ({
        url: 'https://www.strava.com/oauth/token',
        method: 'POST',
        body: {
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
        },
      }),
    }),
    // Refresh access token
    refreshToken: builder.mutation<StravaTokenResponse, string>({
      query: (refreshToken) => ({
        url: 'https://www.strava.com/oauth/token',
        method: 'POST',
        body: {
          client_id: STRAVA_CLIENT_ID,
          client_secret: STRAVA_CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        },
      }),
    }),
    // Get authenticated athlete
    getAthlete: builder.query<StravaAthlete, void>({
      query: () => '/athlete',
    }),
  }),
});

export const {
  useExchangeTokenMutation,
  useRefreshTokenMutation,
  useGetAthleteQuery,
} = stravaApi;
