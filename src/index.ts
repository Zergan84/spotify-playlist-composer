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

    // Public playlist scraper endpoint (for external/non-owned playlists where Spotify API returns 403)
    if (url.pathname === '/api/public-playlist' && request.method === 'GET') {
      let playlistId = url.searchParams.get('id') || '';
      playlistId = playlistId.replace('spotify:playlist:', '').split('?')[0].trim();
      if (!playlistId) {
        return new Response(JSON.stringify({ error: 'Missing playlist id' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      try {
        const embedRes = await fetch(`https://open.spotify.com/embed/playlist/${encodeURIComponent(playlistId)}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });

        if (!embedRes.ok) {
          return new Response(JSON.stringify({ error: `Spotify embed returned ${embedRes.status}` }), {
            status: embedRes.status,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }

        const html = await embedRes.text();
        const scriptMatch = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
        if (!scriptMatch) {
          return new Response(JSON.stringify({ error: 'Playlist data not found in embed' }), {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }

        const data: any = JSON.parse(scriptMatch[1]);
        const entity = data.props?.pageProps?.state?.data?.entity;
        const name = entity?.name || entity?.title || 'Плейлист';
        const rawTracks = entity?.trackList || [];

        const tracks = rawTracks.map((rawItem: any, idx: number) => {
          const item = rawItem.track || rawItem;
          const uri = item.uri || (item.id ? `spotify:track:${item.id}` : null);
          const id = uri ? uri.split(':').pop() : (item.id || `tr_${idx}`);
          const title = item.title || item.name || 'Без названия';
          const artists = item.subtitle || item.artists || (Array.isArray(item.artists) ? item.artists.map((a: any) => a.name).join(', ') : 'Неизвестный исполнитель');
          const duration = item.duration || item.durationMs || item.duration_ms || 0;

          return {
            id: id,
            uri: uri,
            name: title,
            artists: typeof artists === 'string' ? artists : 'Неизвестный исполнитель',
            durationMs: duration,
            image: '',
          };
        }).filter((t: any) => t.uri);

        return new Response(JSON.stringify({
          ok: true,
          name: name,
          tracks: tracks,
          total: tracks.length,
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message || 'Failed to fetch playlist' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
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
