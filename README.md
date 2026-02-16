# Running Analytics

Een React applicatie om je Strava hardloopdata te analyseren.

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit (RTK Query)
- React Router DOM

## Setup

### 1. Strava API Configuratie

1. Ga naar [Strava API Settings](https://www.strava.com/settings/api)
2. Maak een nieuwe applicatie aan of gebruik een bestaande
3. Stel de **Authorization Callback Domain** in op `localhost`
4. Noteer je **Client ID** en **Client Secret**

### 2. Environment Variables

Kopieer het `.env.example` bestand naar `.env`:

```bash
cp .env.example .env
```

Vul de waarden in:

```env
VITE_STRAVA_CLIENT_ID=jouw_client_id
VITE_STRAVA_CLIENT_SECRET=jouw_client_secret
VITE_STRAVA_REDIRECT_URI=http://localhost:5173/callback
```

### 3. Installatie

```bash
pnpm install
```

### 4. Development

```bash
pnpm dev
```

De applicatie draait nu op [http://localhost:5173](http://localhost:5173)

## Hoe werkt de OAuth Flow?

1. Gebruiker klikt op "Verbind met Strava"
2. Gebruiker wordt doorgestuurd naar Strava voor authenticatie
3. Na goedkeuring wordt gebruiker teruggestuurd naar `/callback` met een authorization code
4. De applicatie wisselt de code om voor een access token via de Strava API
5. De tokens worden opgeslagen in localStorage en Redux store
6. Gebruiker krijgt toegang tot het dashboard

## Project Structuur

```
src/
├── components/          # React componenten
│   ├── Login.tsx        # Login pagina met Strava button
│   ├── Callback.tsx     # OAuth callback handler
│   ├── Dashboard.tsx    # Hoofd dashboard
│   └── ProtectedRoute.tsx # Route guard
├── config/
│   └── strava.ts        # Strava configuratie
├── store/
│   ├── index.ts         # Redux store configuratie
│   ├── hooks.ts         # Typed Redux hooks
│   ├── api/
│   │   └── stravaApi.ts # RTK Query API endpoints
│   └── slices/
│       └── authSlice.ts # Auth state management
└── types/
    └── strava.ts        # TypeScript types
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build voor productie
- `pnpm preview` - Preview productie build
- `pnpm lint` - Run ESLint
