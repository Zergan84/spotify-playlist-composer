import { renderAppHtml } from './html';

export interface Env {
  SPOTIFY_CLIENT_ID?: string;
  SPOTIFY_CLIENT_SECRET?: string;
  APP_NAME?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // API Config endpoint
    if (url.pathname === '/api/config') {
      return new Response(
        JSON.stringify({
          appName: env.APP_NAME || 'Spotify Playlist Composer',
          hasServerClientId: Boolean(env.SPOTIFY_CLIENT_ID),
          clientId: env.SPOTIFY_CLIENT_ID || null,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Token proxy endpoint (optional helper for OAuth token exchange/refresh)
    if (url.pathname === '/api/auth/token' && request.method === 'POST') {
      try {
        const bodyText = await request.text();
        const incomingParams = new URLSearchParams(bodyText);

        // Inject server credentials if configured and not passed by client
        if (env.SPOTIFY_CLIENT_ID && !incomingParams.has('client_id')) {
          incomingParams.set('client_id', env.SPOTIFY_CLIENT_ID);
        }

        const headers: Record<string, string> = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };

        if (env.SPOTIFY_CLIENT_ID && env.SPOTIFY_CLIENT_SECRET) {
          const basic = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);
          headers['Authorization'] = `Basic ${basic}`;
        }

        const spotifyRes = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers,
          body: incomingParams.toString(),
        });

        const data = await spotifyRes.text();
        return new Response(data, {
          status: spotifyRes.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: err.message || 'Failed to exchange token' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
    }

    // Default: render frontend
    const html = renderAppHtml({
      defaultClientId: env.SPOTIFY_CLIENT_ID,
    });

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  },
};
