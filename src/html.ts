export function renderAppHtml(clientConfig: { defaultClientId?: string }): string {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spotify Playlist Composer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-base: #0c0d0e;
      --bg-surface: #141619;
      --bg-card: #1a1d22;
      --bg-card-hover: #22262d;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-focus: #1db954;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --text-subtle: #6b7280;
      --spotify-green: #1db954;
      --spotify-green-hover: #1ed760;
      --spotify-dark: #121212;
      --danger: #ef4444;
      --warning: #f59e0b;
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-full: 9999px;
      --shadow-lg: 0 16px 40px -8px rgba(0, 0, 0, 0.6);
      --font-main: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-base);
      color: var(--text-main);
      font-family: var(--font-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
      line-height: 1.5;
    }

    /* Ambient glow */
    .ambient-glow {
      position: fixed;
      top: -150px;
      left: 50%;
      transform: translateX(-50%);
      width: 700px;
      height: 400px;
      background: radial-gradient(circle, rgba(29, 185, 84, 0.15) 0%, rgba(29, 185, 84, 0) 70%);
      pointer-events: none;
      z-index: 0;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 40;
      background: rgba(12, 13, 14, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-subtle);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: var(--text-main);
    }

    .spotify-icon {
      width: 32px;
      height: 32px;
      fill: var(--spotify-green);
    }

    .logo-title {
      font-weight: 800;
      font-size: 1.15rem;
      letter-spacing: -0.02em;
    }

    .logo-subtitle {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: -2px;
    }

    .user-profile-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 6px 14px 6px 8px;
      border-radius: var(--radius-full);
    }

    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: var(--radius-full);
      object-fit: cover;
      background: var(--bg-card);
    }

    .user-name {
      font-size: 0.88rem;
      font-weight: 600;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: inherit;
      font-weight: 600;
      font-size: 0.92rem;
      padding: 10px 20px;
      border-radius: var(--radius-full);
      border: none;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      text-decoration: none;
    }

    .btn-spotify {
      background: var(--spotify-green);
      color: #000;
    }

    .btn-spotify:hover {
      background: var(--spotify-green-hover);
      transform: translateY(-1px);
      box-shadow: 0 8px 24px -4px rgba(29, 185, 84, 0.4);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-main);
      border: 1px solid var(--border-subtle);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.14);
      color: #fff;
    }

    .btn-sm {
      padding: 6px 14px;
      font-size: 0.8rem;
    }

    main {
      position: relative;
      z-index: 10;
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 32px 24px 64px;
    }

    /* Landing / Login View */
    .landing-card {
      max-width: 540px;
      margin: 60px auto 0;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: 44px 36px;
      text-align: center;
      box-shadow: var(--shadow-lg);
    }

    .landing-icon-wrap {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(29, 185, 84, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }

    .landing-title {
      font-size: 1.8rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 12px;
    }

    .landing-desc {
      color: var(--text-muted);
      font-size: 0.98rem;
      margin-bottom: 32px;
      line-height: 1.6;
    }

    .config-card {
      margin-top: 28px;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 18px;
      text-align: left;
    }

    .config-label {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
    }

    .config-input {
      width: 100%;
      padding: 10px 14px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: #fff;
      font-family: var(--font-mono);
      font-size: 0.85rem;
    }

    .config-input:focus {
      outline: none;
      border-color: var(--border-focus);
    }

    .config-help {
      margin-top: 10px;
      font-size: 0.76rem;
      color: var(--text-subtle);
      line-height: 1.5;
    }

    .config-help a {
      color: var(--spotify-green);
      text-decoration: underline;
    }

    /* Dashboard Header */
    .dashboard-hero {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 36px;
      padding-bottom: 28px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .hero-title-group h1 {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
    }

    .hero-title-group p {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-top: 4px;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    /* Filter & Controls */
    .section-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 24px;
    }

    .section-heading {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .count-pill {
      font-size: 0.75rem;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      padding: 2px 10px;
      border-radius: var(--radius-full);
      color: var(--text-muted);
    }

    .search-input-wrap {
      position: relative;
      min-width: 260px;
    }

    .search-input {
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      padding: 8px 16px 8px 36px;
      color: #fff;
      font-size: 0.85rem;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--border-focus);
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      fill: var(--text-subtle);
    }

    /* Playlists Grid */
    .playlists-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .playlist-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      text-decoration: none;
      color: inherit;
    }

    .playlist-card:hover {
      background: var(--bg-card-hover);
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.16);
      box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.4);
    }

    .playlist-cover-wrap {
      position: relative;
      width: 100%;
      padding-top: 100%;
      border-radius: var(--radius-sm);
      overflow: hidden;
      background: #111;
    }

    .playlist-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .playlist-cover-fallback {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1e2229 0%, #111317 100%);
      color: var(--text-subtle);
    }

    .playlist-info {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
    }

    .playlist-title {
      font-size: 1rem;
      font-weight: 700;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .playlist-desc {
      font-size: 0.78rem;
      color: var(--text-muted);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.4;
      min-height: 2.2em;
    }

    .playlist-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 8px;
      padding-top: 10px;
      border-top: 1px solid var(--border-subtle);
      font-size: 0.78rem;
      color: var(--text-subtle);
    }

    .badge-status {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 8px;
      border-radius: var(--radius-full);
      font-size: 0.7rem;
      font-weight: 600;
    }

    .badge-public {
      background: rgba(34, 197, 94, 0.15);
      color: #4ade80;
    }

    .badge-private {
      background: rgba(148, 163, 184, 0.15);
      color: #cbd5e1;
    }

    .playlist-date {
      font-size: 0.75rem;
      color: var(--text-subtle);
    }

    /* Modal / Drawer for Playlist Composer */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }

    .modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .modal-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      width: 100%;
      max-width: 680px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-lg);
      transform: scale(0.95);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }

    .modal-overlay.open .modal-card {
      transform: scale(1);
    }

    .modal-header {
      padding: 22px 28px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      font-size: 1.35rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 1.4rem;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }

    .modal-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }

    .modal-body {
      padding: 24px 28px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .form-input {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 10px 14px;
      color: #fff;
      font-family: inherit;
      font-size: 0.92rem;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--border-focus);
    }

    .textarea-mono {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      line-height: 1.6;
      min-height: 190px;
      resize: vertical;
      white-space: pre;
    }

    .form-row-visibility {
      display: flex;
      gap: 12px;
      margin-top: 4px;
    }

    .visibility-chip {
      flex: 1;
      padding: 10px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-subtle);
      background: var(--bg-card);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.86rem;
      font-weight: 600;
      color: var(--text-muted);
      transition: all 0.15s;
    }

    .visibility-chip.selected {
      border-color: var(--spotify-green);
      background: rgba(29, 185, 84, 0.1);
      color: #fff;
    }

    .modal-footer {
      padding: 18px 28px;
      border-top: 1px solid var(--border-subtle);
      background: var(--bg-surface);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Live Progress Stage */
    .progress-box {
      margin-top: 12px;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 16px;
    }

    .progress-bar-track {
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-full);
      overflow: hidden;
      margin-bottom: 12px;
    }

    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: var(--spotify-green);
      transition: width 0.2s ease;
    }

    .progress-status-text {
      font-size: 0.82rem;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
    }

    .live-track-log {
      max-height: 180px;
      overflow-y: auto;
      margin-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
    }

    .log-item {
      padding: 6px 10px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.03);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .log-item.found {
      color: #86efac;
    }

    .log-item.not-found {
      color: #fca5a5;
    }

    .log-item.searching {
      color: #93c5fd;
    }

    /* Success Result State */
    .success-panel {
      text-align: center;
      padding: 24px 0;
    }

    .success-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(29, 185, 84, 0.2);
      color: var(--spotify-green);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 18px;
      font-size: 2rem;
    }

    .empty-state {
      text-align: center;
      padding: 64px 24px;
      color: var(--text-muted);
      background: var(--bg-surface);
      border: 1px dashed var(--border-subtle);
      border-radius: var(--radius-md);
      grid-column: 1 / -1;
    }

    footer {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
      text-align: center;
      color: var(--text-subtle);
      font-size: 0.8rem;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .header-content {
        padding: 12px 16px;
      }
      main {
        padding: 20px 16px 40px;
      }
      .landing-card {
        padding: 28px 20px;
      }
      .dashboard-hero {
        flex-direction: column;
        align-items: flex-start;
      }
      .hero-actions {
        width: 100%;
      }
      .hero-actions .btn {
        flex: 1;
      }
    }
  </style>
</head>
<body>
  <div class="ambient-glow"></div>

  <!-- Header -->
  <header>
    <div class="header-content">
      <a href="/" class="logo-badge">
        <svg class="spotify-icon" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <div>
          <div class="logo-title">Playlist Composer</div>
          <div class="logo-subtitle">Spotify Web App</div>
        </div>
      </a>

      <div id="header-user-zone"></div>
    </div>
  </header>

  <main>
    <!-- View 1: Landing / Login -->
    <div id="view-landing" style="display: none;">
      <div class="landing-card">
        <div class="landing-icon-wrap">
          <svg class="spotify-icon" style="width: 42px; height: 42px;" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
        <h1 class="landing-title">Создание плейлистов из списка треков</h1>
        <p class="landing-desc">
          Войдите через свой аккаунт Spotify, чтобы просматривать ваши плейлисты и мгновенно собирать новые, просто вставив список названий песен.
        </p>

        <button id="btn-login" class="btn btn-spotify" style="width: 100%; padding: 14px 28px; font-size: 1rem;">
          <svg style="width: 20px; height: 20px; fill: currentColor;" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Войти через Spotify
        </button>

        <div class="config-card">
          <div class="config-label">
            <span>Spotify Client ID:</span>
            <span id="config-source-label" style="color: var(--spotify-green);"></span>
          </div>
          <input type="text" id="input-client-id" class="config-input" placeholder="Вставьте Client ID из Spotify Dashboard...">

          <div class="config-label" style="margin-top: 14px;">
            <span>Redirect URI для Spotify Dashboard:</span>
            <span id="copy-status-label" style="color: var(--spotify-green); font-size: 0.75rem;"></span>
          </div>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="input-redirect-uri" class="config-input" style="flex: 1;" readonly>
            <button id="btn-copy-redirect" class="btn btn-secondary btn-sm" type="button" style="white-space: nowrap;">
              📋 Скопировать
            </button>
          </div>

          <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
            <button type="button" class="btn btn-secondary btn-sm" id="btn-uri-slash" style="font-size: 0.72rem; padding: 4px 10px;">
              с косой чертой ( / )
            </button>
            <button type="button" class="btn btn-secondary btn-sm" id="btn-uri-noslash" style="font-size: 0.72rem; padding: 4px 10px;">
              без слеша
            </button>
            <button type="button" class="btn btn-secondary btn-sm" id="btn-uri-callback" style="font-size: 0.72rem; padding: 4px 10px;">
              /callback
            </button>
          </div>

          <div class="config-help">
            💡 <strong>Как исправить ошибку «redirect_uri: Not matching configuration»:</strong><br>
            1. В <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener">Spotify Developer Dashboard</a> откройте ваше приложение и нажмите <strong>Settings</strong>.<br>
            2. В секции <strong>Redirect URIs</strong> скопируйте и добавьте адрес выше (рекомендуется добавить сразу все три варианта).<br>
            3. Обязательно нажмите кнопку <strong>Add</strong>, а затем внизу страницы нажмите зеленую кнопку <strong>Save</strong>!
          </div>
        </div>
      </div>
    </div>

    <!-- View 2: Dashboard (Playlists & Actions) -->
    <div id="view-dashboard" style="display: none;">
      <div class="dashboard-hero">
        <div class="hero-title-group">
          <h1>Ваша медиатека</h1>
          <p id="dashboard-user-greeting">Загрузка плейлистов...</p>
        </div>
        <div class="hero-actions">
          <button id="btn-refresh" class="btn btn-secondary btn-sm" title="Обновить список">
            🔄 Обновить
          </button>
          <button id="btn-open-composer" class="btn btn-spotify">
            ✨ Создать плейлист
          </button>
        </div>
      </div>

      <div class="section-bar">
        <div class="section-heading">
          Плейлисты
          <span id="playlists-count-badge" class="count-pill">0</span>
        </div>
        <div class="search-input-wrap">
          <svg class="search-icon" viewBox="0 0 24 24">
            <path d="M10 2a8 8 0 015.292 13.999l5.354 5.355a1 1 0 01-1.414 1.414l-5.355-5.354A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"/>
          </svg>
          <input type="text" id="playlist-search-input" class="search-input" placeholder="Поиск по названию...">
        </div>
      </div>

      <!-- Playlists Container -->
      <div id="playlists-grid" class="playlists-grid">
        <div class="empty-state">
          Загрузка ваших плейлистов из Spotify...
        </div>
      </div>
    </div>
  </main>

  <!-- Modal: Playlist Composer -->
  <div id="composer-modal" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-title">✨ Создать новый плейлист</div>
        <button id="btn-close-modal" class="modal-close">&times;</button>
      </div>

      <div class="modal-body" id="modal-form-view">
        <div class="form-group">
          <label class="form-label" for="playlist-name-input">
            <span>Название плейлиста</span>
            <span style="font-size: 0.75rem; color: var(--text-subtle);">Обязательно</span>
          </label>
          <input type="text" id="playlist-name-input" class="form-input" placeholder="Например: Любимые треки осени">
        </div>

        <div class="form-group">
          <label class="form-label" for="playlist-desc-input">
            <span>Описание</span>
            <span style="font-size: 0.75rem; color: var(--text-subtle);">Необязательно</span>
          </label>
          <input type="text" id="playlist-desc-input" class="form-input" placeholder="Краткое описание плейлиста...">
        </div>

        <div class="form-group">
          <label class="form-label">Тип доступа</label>
          <div class="form-row-visibility">
            <div class="visibility-chip selected" id="vis-private" data-public="false">
              🔒 Закрытый (Private)
            </div>
            <div class="visibility-chip" id="vis-public" data-public="true">
              🌐 Публичный (Public)
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="form-label">
            <span>Список треков (по одному на строку)</span>
            <div style="display: flex; gap: 8px;">
              <button type="button" id="btn-insert-sample" class="btn btn-secondary btn-sm" style="padding: 2px 8px; font-size: 0.72rem;">
                📋 Пример
              </button>
              <button type="button" id="btn-clear-tracks" class="btn btn-secondary btn-sm" style="padding: 2px 8px; font-size: 0.72rem;">
                Очистить
              </button>
            </div>
          </div>
          <textarea id="tracks-textarea" class="form-input textarea-mono" placeholder="Вставьте названия треков, например:
Queen - Bohemian Rhapsody
The Weeknd - Blinding Lights
Daft Punk - Get Lucky
Nirvana - Smells Like Teen Spirit
Depeche Mode - Enjoy the Silence"></textarea>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-subtle); margin-top: 4px;">
            <span id="tracks-count-info">Треков: 0</span>
            <span>Формат: "Исполнитель - Трек" или просто название</span>
          </div>
        </div>
      </div>

      <!-- Live Creation & Progress View -->
      <div class="modal-body" id="modal-progress-view" style="display: none;">
        <div class="progress-box">
          <div class="progress-bar-track">
            <div id="progress-bar-fill" class="progress-bar-fill"></div>
          </div>
          <div class="progress-status-text">
            <span id="progress-status-label">Поиск треков в Spotify...</span>
            <span id="progress-status-percentage">0%</span>
          </div>
        </div>

        <div class="form-label" style="margin-top: 10px;">Ход выполнения:</div>
        <div id="live-track-log" class="live-track-log"></div>
      </div>

      <!-- Success View -->
      <div class="modal-body" id="modal-success-view" style="display: none;">
        <div class="success-panel">
          <div class="success-icon">✓</div>
          <h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 8px;">Плейлист успешно создан!</h2>
          <p id="success-summary-text" style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 24px;"></p>

          <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
            <a id="btn-open-spotify-link" href="#" target="_blank" rel="noopener" class="btn btn-spotify" style="padding: 12px 24px;">
              🎵 Открыть в Spotify
            </a>
            <button id="btn-create-another" class="btn btn-secondary" style="padding: 12px 20px;">
              Создать ещё один
            </button>
          </div>
        </div>
      </div>

      <div class="modal-footer" id="modal-footer">
        <button id="btn-cancel-modal" class="btn btn-secondary btn-sm">Отмена</button>
        <button id="btn-start-composition" class="btn btn-spotify">
          🚀 Найти треки и создать
        </button>
      </div>
    </div>
  </div>

  <footer>
    Spotify Playlist Composer &bull; Cloudflare Workers &bull; Powered by Spotify Web API
  </footer>

  <script>
    // Configuration & State
    const SERVER_DEFAULT_CLIENT_ID = ${JSON.stringify(clientConfig.defaultClientId || "")};
    const REDIRECT_URI = window.location.origin + window.location.pathname;
    const SPOTIFY_SCOPES = [
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-read-private',
      'user-read-email'
    ].join(' ');

    let currentToken = null;
    let currentUser = null;
    let cachedPlaylists = [];
    let isPublicSelection = false;

    // Elements
    const viewLanding = document.getElementById('view-landing');
    const viewDashboard = document.getElementById('view-dashboard');
    const headerUserZone = document.getElementById('header-user-zone');
    const inputClientId = document.getElementById('input-client-id');
    const inputRedirectUri = document.getElementById('input-redirect-uri');
    const btnCopyRedirect = document.getElementById('btn-copy-redirect');
    const copyStatusLabel = document.getElementById('copy-status-label');
    const btnUriSlash = document.getElementById('btn-uri-slash');
    const btnUriNoslash = document.getElementById('btn-uri-noslash');
    const btnUriCallback = document.getElementById('btn-uri-callback');
    const configSourceLabel = document.getElementById('config-source-label');
    const btnLogin = document.getElementById('btn-login');
    const btnRefresh = document.getElementById('btn-refresh');
    const btnOpenComposer = document.getElementById('btn-open-composer');
    const playlistsGrid = document.getElementById('playlists-grid');
    const playlistSearchInput = document.getElementById('playlist-search-input');
    const playlistsCountBadge = document.getElementById('playlists-count-badge');
    const dashboardUserGreeting = document.getElementById('dashboard-user-greeting');

    // Modal elements
    const composerModal = document.getElementById('composer-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCancelModal = document.getElementById('btn-cancel-modal');
    const modalFormView = document.getElementById('modal-form-view');
    const modalProgressView = document.getElementById('modal-progress-view');
    const modalSuccessView = document.getElementById('modal-success-view');
    const modalFooter = document.getElementById('modal-footer');
    const btnStartComposition = document.getElementById('btn-start-composition');
    const playlistNameInput = document.getElementById('playlist-name-input');
    const playlistDescInput = document.getElementById('playlist-desc-input');
    const visPrivate = document.getElementById('vis-private');
    const visPublic = document.getElementById('vis-public');
    const tracksTextarea = document.getElementById('tracks-textarea');
    const tracksCountInfo = document.getElementById('tracks-count-info');
    const btnInsertSample = document.getElementById('btn-insert-sample');
    const btnClearTracks = document.getElementById('btn-clear-tracks');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressStatusLabel = document.getElementById('progress-status-label');
    const progressStatusPercentage = document.getElementById('progress-status-percentage');
    const liveTrackLog = document.getElementById('live-track-log');
    const successSummaryText = document.getElementById('success-summary-text');
    const btnOpenSpotifyLink = document.getElementById('btn-open-spotify-link');
    const btnCreateAnother = document.getElementById('btn-create-another');

    function getActiveRedirectUri() {
      return localStorage.getItem('sp_redirect_uri') || (window.location.origin + '/');
    }

    function setActiveRedirectUri(uri) {
      localStorage.setItem('sp_redirect_uri', uri);
      if (inputRedirectUri) inputRedirectUri.value = uri;
    }

    function getStoredClientId() {
      return localStorage.getItem('sp_client_id') || SERVER_DEFAULT_CLIENT_ID;
    }

    function setStoredClientId(id) {
      if (id) localStorage.setItem('sp_client_id', id.trim());
    }

    // Initialize UI on load
    window.addEventListener('DOMContentLoaded', async () => {
      const activeClientId = getStoredClientId();
      inputClientId.value = activeClientId;
      if (SERVER_DEFAULT_CLIENT_ID) {
        configSourceLabel.textContent = 'Установлен с сервера';
      }

      inputClientId.addEventListener('input', (e) => {
        setStoredClientId(e.target.value);
      });

      // Redirect URI controls
      const activeUri = getActiveRedirectUri();
      setActiveRedirectUri(activeUri);

      btnUriSlash.addEventListener('click', () => {
        setActiveRedirectUri(window.location.origin + '/');
        flashCopyStatus('Выбран вариант со слешем ( / )');
      });

      btnUriNoslash.addEventListener('click', () => {
        setActiveRedirectUri(window.location.origin);
        flashCopyStatus('Выбран вариант без слеша');
      });

      btnUriCallback.addEventListener('click', () => {
        setActiveRedirectUri(window.location.origin + '/callback');
        flashCopyStatus('Выбран вариант /callback');
      });

      btnCopyRedirect.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(inputRedirectUri.value);
          flashCopyStatus('✅ Скопировано в буфер!');
        } catch {
          inputRedirectUri.select();
          document.execCommand('copy');
          flashCopyStatus('✅ Скопировано!');
        }
      });

      // Handle OAuth Redirect Callback (?code=... or error)
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        alert('Ошибка авторизации Spotify: ' + error);
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (code) {
        await handleAuthCallback(code);
        return;
      }

      // Check stored token
      const tokenData = getStoredToken();
      if (tokenData && tokenData.expires_at > Date.now()) {
        currentToken = tokenData.access_token;
        await initializeDashboard();
      } else if (tokenData && tokenData.refresh_token) {
        const refreshed = await refreshToken(tokenData.refresh_token);
        if (refreshed) {
          await initializeDashboard();
        } else {
          showLanding();
        }
      } else {
        showLanding();
      }
    });

    function flashCopyStatus(text) {
      if (!copyStatusLabel) return;
      copyStatusLabel.textContent = text;
      setTimeout(() => {
        if (copyStatusLabel.textContent === text) {
          copyStatusLabel.textContent = '';
        }
      }, 3000);
    }

    // PKCE Helper Functions
    function generateRandomString(length) {
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
      const values = crypto.getRandomValues(new Uint8Array(length));
      return values.reduce((acc, x) => acc + possible[x % possible.length], '');
    }

    async function sha256(plain) {
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      return window.crypto.subtle.digest('SHA-256', data);
    }

    function base64encode(input) {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\\+/g, '-')
        .replace(/\\//g, '_');
    }

    async function generateCodeChallenge(verifier) {
      const hashed = await sha256(verifier);
      return base64encode(hashed);
    }

    // Login Action
    btnLogin.addEventListener('click', async () => {
      const clientId = getStoredClientId();
      if (!clientId) {
        alert('Пожалуйста, укажите Spotify Client ID перед авторизацией.');
        inputClientId.focus();
        return;
      }
      setStoredClientId(clientId);

      const redirectUri = getActiveRedirectUri();
      localStorage.setItem('sp_active_redirect_uri', redirectUri);

      const codeVerifier = generateRandomString(64);
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      localStorage.setItem('sp_code_verifier', codeVerifier);

      const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUri,
        scope: SPOTIFY_SCOPES,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });

      window.location.href = 'https://accounts.spotify.com/authorize?' + params.toString();
    });

    async function handleAuthCallback(code) {
      const clientId = getStoredClientId();
      const codeVerifier = localStorage.getItem('sp_code_verifier');
      const redirectUri = localStorage.getItem('sp_active_redirect_uri') || getActiveRedirectUri();

      if (!codeVerifier) {
        alert('Ошибка проверки сессии авторизации (отсутствует code_verifier). Попробуйте снова.');
        window.history.replaceState({}, document.title, window.location.pathname);
        showLanding();
        return;
      }

      try {
        const body = new URLSearchParams({
          client_id: clientId,
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier
        });

        // Request token directly or through proxy fallback
        let res;
        try {
          res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString()
          });
        } catch {
          res = await fetch('/api/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString()
          });
        }

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error_description || data.error);
        }

        saveToken(data);
        localStorage.removeItem('sp_code_verifier');
        localStorage.removeItem('sp_active_redirect_uri');
        window.history.replaceState({}, document.title, window.location.pathname);
        currentToken = data.access_token;
        await initializeDashboard();
      } catch (err) {
        console.error('Token error:', err);
        alert('Не удалось получить токен: ' + err.message);
        window.history.replaceState({}, document.title, window.location.pathname);
        showLanding();
      }
    }

    async function refreshToken(refreshToken) {
      const clientId = getStoredClientId();
      if (!clientId) return false;

      try {
        const body = new URLSearchParams({
          client_id: clientId,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        });

        const res = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString()
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        saveToken(data);
        currentToken = data.access_token;
        return true;
      } catch (err) {
        console.warn('Failed to refresh token:', err);
        localStorage.removeItem('sp_token_data');
        return false;
      }
    }

    function saveToken(data) {
      const tokenData = {
        access_token: data.access_token,
        refresh_token: data.refresh_token || (getStoredToken()?.refresh_token),
        expires_at: Date.now() + (data.expires_in * 1000) - 30000
      };
      localStorage.setItem('sp_token_data', JSON.stringify(tokenData));
    }

    function getStoredToken() {
      try {
        return JSON.parse(localStorage.getItem('sp_token_data'));
      } catch {
        return null;
      }
    }

    function logout() {
      localStorage.removeItem('sp_token_data');
      currentToken = null;
      currentUser = null;
      showLanding();
    }

    function showLanding() {
      viewLanding.style.display = 'block';
      viewDashboard.style.display = 'none';
      headerUserZone.innerHTML = '';
    }

    async function spotifyApi(path, options = {}) {
      if (!currentToken) throw new Error('Not authenticated');
      let res = await fetch('https://api.spotify.com/v1' + path, {
        ...options,
        headers: {
          'Authorization': 'Bearer ' + currentToken,
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });

      if (res.status === 401) {
        const tokenData = getStoredToken();
        if (tokenData && tokenData.refresh_token) {
          const ok = await refreshToken(tokenData.refresh_token);
          if (ok) {
            return spotifyApi(path, options);
          }
        }
        logout();
        throw new Error('Session expired');
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error?.message || 'Spotify API error ' + res.status);
      }

      if (res.status === 204) return null;
      return res.json();
    }

    async function initializeDashboard() {
      viewLanding.style.display = 'none';
      viewDashboard.style.display = 'block';

      try {
        currentUser = await spotifyApi('/me');
        renderHeaderUser();
        dashboardUserGreeting.textContent = \`Привет, \${currentUser.display_name}! Вот ваши сохраненные плейлисты.\`;
        await loadPlaylists();
      } catch (err) {
        console.error('Init error:', err);
      }
    }

    function renderHeaderUser() {
      const avatarUrl = currentUser.images?.[0]?.url || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="%236b7280" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
      headerUserZone.innerHTML = \`
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="user-profile-badge">
            <img src="\${avatarUrl}" class="user-avatar" alt="Avatar">
            <span class="user-name">\${escapeHtml(currentUser.display_name || 'Пользователь')}</span>
          </div>
          <button id="btn-logout" class="btn btn-secondary btn-sm">Выйти</button>
        </div>
      \`;
      document.getElementById('btn-logout').addEventListener('click', logout);
    }

    async function loadPlaylists() {
      playlistsGrid.innerHTML = '<div class="empty-state">Загрузка плейлистов...</div>';
      try {
        const data = await spotifyApi('/me/playlists?limit=50');
        cachedPlaylists = data.items || [];
        playlistsCountBadge.textContent = cachedPlaylists.length;
        renderPlaylists(cachedPlaylists);
        // Fetch track dates asynchronously to enrich cards with creation/oldest track dates
        enrichPlaylistDates();
      } catch (err) {
        playlistsGrid.innerHTML = \`<div class="empty-state" style="color: var(--danger);">Ошибка загрузки: \${escapeHtml(err.message)}</div>\`;
      }
    }

    async function enrichPlaylistDates() {
      for (const pl of cachedPlaylists) {
        try {
          const tracksData = await spotifyApi(\`/playlists/\${pl.id}/tracks?limit=1&fields=items(added_at)\`);
          if (tracksData?.items?.[0]?.added_at) {
            const dateStr = formatDate(tracksData.items[0].added_at);
            const dateElem = document.getElementById(\`date-\${pl.id}\`);
            if (dateElem) dateElem.textContent = dateStr;
          }
        } catch (e) {
          // ignore background date fetch error
        }
      }
    }

    function renderPlaylists(playlists) {
      if (!playlists.length) {
        playlistsGrid.innerHTML = '<div class="empty-state">Плейлистов пока нет. Нажмите «Создать плейлист», чтобы добавить первый!</div>';
        return;
      }

      playlistsGrid.innerHTML = playlists.map(pl => {
        const cover = pl.images?.[0]?.url;
        const coverHtml = cover
          ? \`<img class="playlist-cover" src="\${escapeHtml(cover)}" loading="lazy" alt="Cover">\`
          : \`<div class="playlist-cover-fallback">
              <svg style="width: 44px; height: 44px; fill: currentColor;" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
             </div>\`;

        const isPublic = pl.public !== false;
        const totalTracks = pl.tracks?.total || 0;
        const trackNoun = getTrackNoun(totalTracks);
        const spotifyUrl = pl.external_urls?.spotify || '#';

        return \`
          <a class="playlist-card" href="\${escapeHtml(spotifyUrl)}" target="_blank" rel="noopener">
            <div class="playlist-cover-wrap">
              \${coverHtml}
            </div>
            <div class="playlist-info">
              <div class="playlist-title" title="\${escapeHtml(pl.name)}">\${escapeHtml(pl.name)}</div>
              <div class="playlist-desc">\${escapeHtml(pl.description || 'Без описания')}</div>
            </div>
            <div class="playlist-meta">
              <span class="badge-status \${isPublic ? 'badge-public' : 'badge-private'}">
                \${isPublic ? '🌐 Публичный' : '🔒 Закрытый'}
              </span>
              <span>\${totalTracks} \${trackNoun}</span>
              <span class="playlist-date" id="date-\${pl.id}">Плейлист</span>
            </div>
          </a>
        \`;
      }).join('');
    }

    function getTrackNoun(count) {
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod100 >= 11 && mod100 <= 19) return 'треков';
      if (mod10 === 1) return 'трек';
      if (mod10 >= 2 && mod10 <= 4) return 'трека';
      return 'треков';
    }

    function formatDate(isoStr) {
      if (!isoStr) return '';
      const d = new Date(isoStr);
      return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    // Search filter
    playlistSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = cachedPlaylists.filter(pl =>
        (pl.name && pl.name.toLowerCase().includes(q)) ||
        (pl.description && pl.description.toLowerCase().includes(q))
      );
      renderPlaylists(filtered);
    });

    btnRefresh.addEventListener('click', loadPlaylists);

    // Modal Controls
    btnOpenComposer.addEventListener('click', () => {
      resetComposerModal();
      const today = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
      playlistNameInput.value = \`Новый плейлист — \${today}\`;
      composerModal.classList.add('open');
      playlistNameInput.focus();
    });

    function closeModal() {
      composerModal.classList.remove('open');
    }

    btnCloseModal.addEventListener('click', closeModal);
    btnCancelModal.addEventListener('click', closeModal);

    visPrivate.addEventListener('click', () => {
      isPublicSelection = false;
      visPrivate.classList.add('selected');
      visPublic.classList.remove('selected');
    });

    visPublic.addEventListener('click', () => {
      isPublicSelection = true;
      visPublic.classList.add('selected');
      visPrivate.classList.remove('selected');
    });

    tracksTextarea.addEventListener('input', updateTracksCount);

    function updateTracksCount() {
      const lines = getCleanTrackLines();
      tracksCountInfo.textContent = \`Треков: \${lines.length}\`;
    }

    function getCleanTrackLines() {
      return tracksTextarea.value
        .split('\\n')
        .map(l => l.trim())
        .filter(l => l.length > 0 && !l.startsWith('#'));
    }

    btnInsertSample.addEventListener('click', () => {
      tracksTextarea.value = [
        'Queen - Bohemian Rhapsody',
        'Daft Punk - Get Lucky',
        'The Weeknd - Blinding Lights',
        'Radiohead - Creep',
        'Depeche Mode - Enjoy the Silence'
      ].join('\\n');
      updateTracksCount();
    });

    btnClearTracks.addEventListener('click', () => {
      tracksTextarea.value = '';
      updateTracksCount();
    });

    function resetComposerModal() {
      modalFormView.style.display = 'flex';
      modalProgressView.style.display = 'none';
      modalSuccessView.style.display = 'none';
      modalFooter.style.display = 'flex';
      btnStartComposition.disabled = false;
      progressBarFill.style.width = '0%';
      liveTrackLog.innerHTML = '';
    }

    // Composer Execution: Search tracks & create playlist
    btnStartComposition.addEventListener('click', async () => {
      const name = playlistNameInput.value.trim();
      if (!name) {
        alert('Пожалуйста, укажите название плейлиста');
        playlistNameInput.focus();
        return;
      }

      const trackLines = getCleanTrackLines();
      if (!trackLines.length) {
        alert('Пожалуйста, вставьте названия треков в текстовое поле.');
        tracksTextarea.focus();
        return;
      }

      // Switch to progress view
      modalFormView.style.display = 'none';
      modalProgressView.style.display = 'block';
      modalFooter.style.display = 'none';

      liveTrackLog.innerHTML = '';
      progressStatusLabel.textContent = 'Начинаем поиск треков...';
      progressBarFill.style.width = '0%';
      progressStatusPercentage.textContent = '0%';

      const foundTrackUris = [];
      const notFoundTracks = [];
      const total = trackLines.length;

      // 1. Search tracks
      for (let i = 0; i < total; i++) {
        const query = trackLines[i];
        const logItem = document.createElement('div');
        logItem.className = 'log-item searching';
        logItem.textContent = \`🔍 Поиск: \${query}\`;
        liveTrackLog.appendChild(logItem);
        liveTrackLog.scrollTop = liveTrackLog.scrollHeight;

        try {
          const searchRes = await spotifyApi(\`/search?q=\${encodeURIComponent(query)}&type=track&limit=1\`);
          const track = searchRes?.tracks?.items?.[0];

          if (track) {
            foundTrackUris.push(track.uri);
            const artist = track.artists?.map(a => a.name).join(', ') || '';
            logItem.className = 'log-item found';
            logItem.textContent = \`✅ Найдено: \${artist} — \${track.name}\`;
          } else {
            notFoundTracks.push(query);
            logItem.className = 'log-item not-found';
            logItem.textContent = \`❌ Не найдено: \${query}\`;
          }
        } catch (err) {
          notFoundTracks.push(query);
          logItem.className = 'log-item not-found';
          logItem.textContent = \`⚠️ Ошибка поиска: \${query}\`;
        }

        const pct = Math.round(((i + 1) / total) * 100);
        progressBarFill.style.width = pct + '%';
        progressStatusPercentage.textContent = pct + '%';
        progressStatusLabel.textContent = \`Обработано \${i + 1} из \${total}\`;

        // Small throttle to avoid hitting strict rate limits
        if (i < total - 1) {
          await new Promise(r => setTimeout(r, 60));
        }
      }

      if (!foundTrackUris.length) {
        progressStatusLabel.textContent = 'Не найдено ни одного трека из списка.';
        alert('К сожалению, ни один трек из указанного списка не был найден в Spotify.');
        resetComposerModal();
        return;
      }

      // 2. Create Playlist on user account
      progressStatusLabel.textContent = 'Создаем плейлист в Spotify...';
      try {
        const createRes = await spotifyApi('/me/playlists', {
          method: 'POST',
          body: JSON.stringify({
            name: name,
            description: playlistDescInput.value.trim() || 'Создано через Spotify Playlist Composer',
            public: isPublicSelection
          })
        });

        const newPlaylistId = createRes.id;
        const newPlaylistUrl = createRes.external_urls?.spotify;

        // 3. Add tracks in batches of 100
        progressStatusLabel.textContent = 'Добавляем найденные треки в плейлист...';
        for (let b = 0; b < foundTrackUris.length; b += 100) {
          const batch = foundTrackUris.slice(b, b + 100);
          await spotifyApi(\`/playlists/\${newPlaylistId}/tracks\`, {
            method: 'POST',
            body: JSON.stringify({ uris: batch })
          });
        }

        // Show Success
        modalProgressView.style.display = 'none';
        modalSuccessView.style.display = 'block';
        successSummaryText.innerHTML = \`
          Плейлист <strong>«\${escapeHtml(name)}»</strong> готов!<br>
          Добавлено треков: <strong>\${foundTrackUris.length} из \${total}</strong>.
          \${notFoundTracks.length ? \`<br><span style="color: var(--warning); font-size: 0.8rem;">(Пропущено \${notFoundTracks.length} не найденных)</span>\` : ''}
        \`;
        btnOpenSpotifyLink.href = newPlaylistUrl;

        // Refresh main library list
        await loadPlaylists();
      } catch (err) {
        alert('Ошибка при создании плейлиста: ' + err.message);
        resetComposerModal();
      }
    });

    btnCreateAnother.addEventListener('click', () => {
      resetComposerModal();
      tracksTextarea.value = '';
      updateTracksCount();
      modalFormView.style.display = 'flex';
      modalSuccessView.style.display = 'none';
      modalFooter.style.display = 'flex';
      playlistNameInput.focus();
    });

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  </script>
</body>
</html>`;
}
