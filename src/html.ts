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
      --bg-base: #121212;
      --bg-surface: #181818;
      --bg-card: #202020;
      --bg-card-hover: #282828;
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-focus: #1db954;
      --text-main: #ffffff;
      --text-muted: #b3b3b3;
      --text-subtle: #727272;
      --spotify-green: #1db954;
      --spotify-green-hover: #1ed760;
      --spotify-dark: #121212;
      --danger: #ef4444;
      --warning: #f59e0b;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
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
      background: radial-gradient(circle, rgba(29, 185, 84, 0.12) 0%, rgba(29, 185, 84, 0) 70%);
      pointer-events: none;
      z-index: 0;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 40;
      background: rgba(18, 18, 18, 0.9);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-subtle);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text-main);
    }

    .spotify-icon {
      width: 28px;
      height: 28px;
      fill: var(--spotify-green);
    }

    .logo-title {
      font-weight: 800;
      font-size: 1.05rem;
      letter-spacing: -0.02em;
    }

    .logo-subtitle {
      font-size: 0.68rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: -2px;
    }

    .user-profile-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      padding: 4px 12px 4px 6px;
      border-radius: var(--radius-full);
    }

    .user-avatar {
      width: 26px;
      height: 26px;
      border-radius: var(--radius-full);
      object-fit: cover;
      background: var(--bg-card);
    }

    .user-name {
      font-size: 0.82rem;
      font-weight: 600;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-family: inherit;
      font-weight: 600;
      font-size: 0.86rem;
      padding: 8px 18px;
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
      box-shadow: 0 6px 20px -4px rgba(29, 185, 84, 0.4);
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
      padding: 5px 12px;
      font-size: 0.78rem;
    }

    main {
      position: relative;
      z-index: 10;
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 16px 20px 48px;
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

    /* Ultra-minimalist Spotify Toolbar */
    .spotify-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .toolbar-title {
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #fff;
    }

    .toolbar-user-greeting {
      font-size: 0.75rem;
      color: var(--text-subtle);
    }

    .toolbar-center {
      flex: 1;
      max-width: 380px;
      min-width: 200px;
    }

    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .count-pill {
      font-size: 0.7rem;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border-subtle);
      padding: 1px 8px;
      border-radius: var(--radius-full);
      color: var(--text-muted);
      font-weight: 600;
    }

    .btn-icon-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.15s ease;
    }

    .btn-icon-circle:hover {
      background: var(--bg-card-hover);
      color: #fff;
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* Compact Search Input */
    .search-input-wrap {
      position: relative;
      width: 100%;
    }

    .search-input {
      width: 100%;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      padding: 7px 14px 7px 32px;
      color: #fff;
      font-size: 0.82rem;
      transition: border-color 0.15s;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--border-focus);
    }

    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 14px;
      height: 14px;
      fill: var(--text-subtle);
    }

    /* View Switcher Segmented Control */
    .view-toggle-group {
      display: inline-flex;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-full);
      padding: 2px;
      gap: 2px;
    }

    .view-toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 5px 10px;
      border-radius: var(--radius-full);
      font-size: 0.78rem;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .view-toggle-btn:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
    }

    .view-toggle-btn.active {
      background: rgba(255, 255, 255, 0.14);
      color: #fff;
    }

    /* ===================================================
       PLAYLIST VIEW MODES (AUTHENTIC SPOTIFY STYLE)
       =================================================== */

    /* View Mode 1: Grid Cards (Max Space Efficiency) */
    .playlists-container.view-mode-large {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
    }

    .playlist-card {
      background: var(--bg-surface);
      border-radius: var(--radius-sm);
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: background 0.2s ease, transform 0.2s ease;
      position: relative;
      cursor: pointer;
      border: 1px solid transparent;
      user-select: none;
    }

    .playlist-card:hover {
      background: var(--bg-card-hover);
      transform: translateY(-2px);
    }

    .playlist-cover-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 4px;
      overflow: hidden;
      background: #282828;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    }

    .playlist-cover {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .playlist-cover-fallback {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #282828;
      color: var(--text-subtle);
    }

    /* Direct On-Cover Mini Badges & Actions (Large cards) */
    .cover-warning-badge {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.82);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(245, 158, 11, 0.65);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.72rem;
      z-index: 4;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
      pointer-events: none;
    }

    .cover-actions-overlay {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      z-index: 5;
      opacity: 0.88;
      transition: opacity 0.15s ease, transform 0.15s ease;
    }

    .playlist-card:hover .cover-actions-overlay {
      opacity: 1;
      transform: translateX(-50%) translateY(-2px);
    }

    .cover-action-btn {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      cursor: pointer;
      transition: all 0.15s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      text-decoration: none;
    }

    .cover-action-btn:hover {
      background: var(--spotify-green);
      color: #000;
      border-color: var(--spotify-green);
      transform: scale(1.12);
    }

    .cover-action-btn.btn-danger:hover {
      background: var(--danger);
      color: #fff;
      border-color: var(--danger);
    }

    .playlist-info {
      display: flex;
      flex-direction: column;
      gap: 3px;
      overflow: hidden;
    }

    .playlist-title {
      font-size: 0.88rem;
      font-weight: 700;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .playlist-meta-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .playlist-dot {
      color: var(--text-subtle);
    }

    /* View Mode 2: Compact iPhone App Icons */
    .playlists-container.view-mode-compact {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(78px, 1fr));
      gap: 16px 10px;
    }

    .compact-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: inherit;
      position: relative;
      cursor: pointer;
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .compact-item:hover {
      transform: translateY(-2px);
    }

    .compact-cover-wrap {
      position: relative;
      width: 68px;
      height: 68px;
      border-radius: 16px;
      overflow: hidden;
      background: #282828;
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .compact-cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .compact-privacy-badge {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      z-index: 4;
      pointer-events: none;
    }

    .compact-actions-overlay {
      position: absolute;
      top: 4px;
      right: 4px;
      display: flex;
      gap: 2px;
      z-index: 5;
      opacity: 0.85;
      transition: opacity 0.15s ease;
    }

    .compact-item:hover .compact-actions-overlay {
      opacity: 1;
    }

    .compact-btn-edit {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.6rem;
      transition: all 0.15s;
    }

    .compact-btn-edit:hover {
      background: var(--spotify-green);
      color: #000;
    }

    .compact-btn-edit.btn-danger:hover {
      background: var(--danger);
      color: #fff;
    }

    .compact-title {
      font-size: 0.74rem;
      font-weight: 600;
      color: #fff;
      text-align: center;
      margin-top: 5px;
      line-height: 1.25;
      max-width: 78px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-word;
    }

    .compact-tracks-count {
      font-size: 0.65rem;
      color: var(--text-subtle);
      margin-top: 1px;
    }

    /* View Mode 3: List View */
    .playlists-container.view-mode-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .list-row-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      background: var(--bg-surface);
      border-radius: 4px;
      padding: 6px 12px;
      transition: background 0.15s ease;
    }

    .list-row-item:hover {
      background: var(--bg-card-hover);
    }

    .list-row-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
      overflow: hidden;
      cursor: pointer;
    }

    .list-cover-wrap {
      position: relative;
      width: 36px;
      height: 36px;
      border-radius: 4px;
      overflow: hidden;
      flex-shrink: 0;
      background: #282828;
    }

    .list-row-cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .list-row-center-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      background: rgba(245, 158, 11, 0.12);
      border: 1px solid rgba(245, 158, 11, 0.28);
      border-radius: 20px;
      padding: 3px 10px;
    }

    .list-row-center-spacer {
      flex: 0;
    }

    .warning-circle-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: rgba(245, 158, 11, 0.25);
      font-size: 0.68rem;
      line-height: 1;
    }

    .warning-author-text {
      font-size: 0.74rem;
      font-weight: 500;
      color: #fbbf24;
      white-space: nowrap;
    }

    .btn-copy-inline {
      padding: 3px 10px;
      font-size: 0.72rem;
      font-weight: 600;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #fff;
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn-copy-inline:hover {
      background: var(--spotify-green);
      border-color: var(--spotify-green);
      color: #000;
    }

    .list-row-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
      flex: 1;
    }

    .list-row-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .list-row-sub {
      font-size: 0.72rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .list-row-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    /* ===================================================
       EDITOR MODAL ULTRA-MINIMALIST SPOTIFY STYLING
       =================================================== */
    .editor-modal-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow: hidden;
      flex: 1;
    }

    .editor-header-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 320px;
    }

    .editor-header-badge {
      font-size: 0.7rem;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      font-weight: 600;
      white-space: nowrap;
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-muted);
    }

    .editor-header-badge.badge-pub {
      background: rgba(34, 197, 94, 0.15);
      color: #4ade80;
    }

    .editor-header-badge.badge-priv {
      background: rgba(255, 255, 255, 0.08);
      color: #cbd5e1;
    }

    .editor-header-grid {
      display: grid;
      grid-template-columns: 88px 1fr;
      gap: 14px;
      align-items: stretch;
    }

    .editor-cover-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .editor-cover-wrap {
      width: 88px;
      height: 88px;
      border-radius: 6px;
      overflow: hidden;
      background: #282828;
      position: relative;
      border: 1px solid var(--border-subtle);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
      flex-shrink: 0;
    }

    .editor-cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .editor-cover-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #282828;
      color: var(--text-subtle);
    }

    /* Floating Mini On-Cover Action Icons in Editor */
    .editor-cover-icon-btn {
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(18, 18, 18, 0.88);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.68rem;
      cursor: pointer;
      transition: all 0.15s ease;
      z-index: 6;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    }

    .editor-cover-icon-btn:hover {
      background: var(--spotify-green);
      color: #000;
      border-color: var(--spotify-green);
      transform: scale(1.12);
    }

    .editor-cover-btn-privacy {
      top: 4px;
      left: 4px;
    }

    .editor-cover-btn-generate {
      top: 4px;
      right: 4px;
    }

    .editor-cover-btn-upload {
      bottom: 4px;
      right: 4px;
    }

    .editor-meta-fields {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 88px;
      gap: 8px;
    }

    .editor-field-row {
      display: flex;
      align-items: center;
      gap: 10px;
      height: 40px;
    }

    .editor-field-label {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      width: 70px;
      flex-shrink: 0;
    }

    .editor-field-input {
      flex: 1;
      height: 40px;
      padding: 0 12px;
      font-size: 0.85rem;
      border-radius: 4px;
    }

    .editor-search-bar-wrap {
      display: flex;
      gap: 8px;
    }

    .editor-search-results {
      max-height: 180px;
      overflow-y: auto;
      margin-top: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .editor-search-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 6px 10px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
    }

    .editor-tracks-container {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      padding: 12px;
    }

    .editor-tracks-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.82rem;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .editor-tracks-list {
      max-height: 240px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-right: 4px;
    }

    .editor-track-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 4px;
      cursor: grab;
      user-select: none;
      transition: background 0.15s;
      font-size: 0.82rem;
    }

    .editor-track-row:active {
      cursor: grabbing;
    }

    .editor-track-row:hover {
      background: rgba(255, 255, 255, 0.06);
    }

    .editor-track-row.dragging {
      opacity: 0.35;
      border: 1px dashed var(--spotify-green);
    }

    .editor-track-row.drag-over {
      border-color: var(--spotify-green);
      background: rgba(29, 185, 84, 0.12);
      transform: scale(1.01);
    }

    .drag-handle {
      cursor: grab;
      color: var(--text-subtle);
      font-size: 0.95rem;
      padding: 2px;
    }

    .drag-handle:hover {
      color: #fff;
    }

    .track-num {
      font-size: 0.74rem;
      color: var(--text-subtle);
      width: 18px;
      text-align: right;
    }

    .editor-track-thumb {
      width: 28px;
      height: 28px;
      border-radius: 3px;
      object-fit: cover;
      background: #282828;
      flex-shrink: 0;
    }

    .editor-track-info {
      flex: 1;
      overflow: hidden;
    }

    .editor-track-title {
      font-size: 0.82rem;
      font-weight: 600;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .editor-track-artist {
      font-size: 0.72rem;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .editor-track-duration {
      font-size: 0.72rem;
      color: var(--text-subtle);
      font-family: var(--font-mono);
    }

    .editor-track-moves {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .btn-move {
      background: rgba(255, 255, 255, 0.05);
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.6rem;
      padding: 1px 3px;
      border-radius: 2px;
      line-height: 1;
    }

    .btn-move:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
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
      max-width: 780px;
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

    /* Review Stage */
    .review-summary-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      font-size: 0.88rem;
    }

    .review-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 4px;
    }

    @media (max-width: 700px) {
      .review-grid {
        grid-template-columns: 1fr;
      }
    }

    .review-column {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 14px;
      min-height: 280px;
    }

    .review-col-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 700;
      font-size: 0.88rem;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .review-items-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 320px;
      overflow-y: auto;
      padding-right: 4px;
    }

    .track-card-found {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: var(--bg-surface);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: var(--radius-sm);
      padding: 8px 10px;
    }

    .track-thumb {
      width: 36px;
      height: 36px;
      border-radius: 4px;
      object-fit: cover;
      background: #111;
      flex-shrink: 0;
    }

    .track-found-meta {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      flex: 1;
    }

    .track-found-name {
      font-size: 0.84rem;
      font-weight: 600;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .track-found-artist {
      font-size: 0.74rem;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .track-not-found-card {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: rgba(239, 68, 68, 0.06);
      border: 1px solid rgba(239, 68, 68, 0.25);
      border-radius: var(--radius-sm);
      padding: 10px;
    }

    .track-not-found-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .query-edit-input {
      flex: 1;
      background: var(--bg-surface);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: var(--radius-sm);
      padding: 6px 10px;
      color: #fff;
      font-size: 0.82rem;
      font-family: inherit;
    }

    .query-edit-input:focus {
      outline: none;
      border-color: var(--border-focus);
    }

    .btn-icon {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      cursor: pointer;
      padding: 6px 10px;
      border-radius: var(--radius-sm);
      font-size: 0.8rem;
      transition: all 0.15s;
    }

    .btn-icon:hover {
      background: rgba(255, 255, 255, 0.14);
      color: #fff;
    }

    .btn-icon-danger:hover {
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.4);
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
      <!-- Single Compact Spotify Toolbar -->
      <div class="spotify-toolbar">
        <div class="toolbar-left">
          <div class="toolbar-title">
            Медиатека
            <span id="playlists-count-badge" class="count-pill">0</span>
          </div>
          <span id="dashboard-user-greeting" class="toolbar-user-greeting"></span>
        </div>

        <div class="toolbar-center">
          <div class="search-input-wrap">
            <svg class="search-icon" viewBox="0 0 24 24">
              <path d="M10 2a8 8 0 015.292 13.999l5.354 5.355a1 1 0 01-1.414 1.414l-5.355-5.354A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"/>
            </svg>
            <input type="text" id="playlist-search-input" class="search-input" placeholder="Поиск в медиатеке...">
          </div>
        </div>

        <div class="toolbar-right">
          <!-- 3-mode View Switcher -->
          <div class="view-toggle-group" id="view-toggle-group">
            <button type="button" class="view-toggle-btn" data-mode="list" id="btn-view-list" title="Список">☰</button>
            <button type="button" class="view-toggle-btn" data-mode="compact" id="btn-view-compact" title="Небольшие иконки">▦</button>
            <button type="button" class="view-toggle-btn active" data-mode="large" id="btn-view-large" title="Большие карточки">⊞</button>
          </div>

          <button id="btn-refresh" class="btn-icon-circle" title="Обновить плейлисты">
            🔄
          </button>

          <button id="btn-open-composer" class="btn btn-spotify btn-sm" style="font-weight: 700; padding: 6px 14px;">
            ＋ Создать
          </button>
        </div>
      </div>

      <!-- Playlists Container -->
      <div id="playlists-container" class="playlists-container view-mode-large">
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

      <!-- Stage 3: Review View (Добавлено & Не найдено) -->
      <div class="modal-body" id="modal-review-view" style="display: none;">
        <div class="review-summary-banner">
          <div>
            <strong id="review-playlist-title-display">Название плейлиста</strong>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
              Проверьте результаты поиска перед добавлением в Spotify
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <span id="badge-found-count" class="badge-status badge-public">0 найдено</span>
            <span id="badge-notfound-count" class="badge-status badge-private">0 не найдено</span>
          </div>
        </div>

        <div class="review-grid">
          <!-- Col 1: Добавлено (найдено) -->
          <div class="review-column">
            <div class="review-col-header">
              <span style="color: #4ade80;">✅ Добавлено (<span id="col-found-count">0</span>)</span>
              <button type="button" id="btn-clear-all-found" class="btn btn-secondary btn-sm" style="font-size: 0.7rem; padding: 2px 8px;">
                Очистить
              </button>
            </div>
            <div id="review-found-list" class="review-items-list">
              <!-- Found items dynamically rendered here -->
            </div>
          </div>

          <!-- Col 2: Не найдено -->
          <div class="review-column">
            <div class="review-col-header">
              <span style="color: #f87171;">❌ Не найдено (<span id="col-notfound-count">0</span>)</span>
              <button type="button" id="btn-delete-all-notfound" class="btn btn-secondary btn-sm" style="font-size: 0.7rem; padding: 2px 8px; color: #f87171;">
                Удалить все
              </button>
            </div>
            <div id="review-notfound-list" class="review-items-list">
              <!-- Not found items dynamically rendered here with inputs and search buttons -->
            </div>
          </div>
        </div>
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
        <button id="btn-back-to-form" class="btn btn-secondary btn-sm" style="display: none;">⬅️ Назад к тексту</button>
        <button id="btn-find-tracks" class="btn btn-spotify">
          🔍 Найти треки в Spotify
        </button>
        <button id="btn-commit-playlist" class="btn btn-spotify" style="display: none;">
          🚀 Создать плейлист в Spotify
        </button>
      </div>
    </div>
  </div>

  <!-- Modal: Playlist Editor -->
  <div id="editor-modal" class="modal-overlay">
    <div class="modal-card" style="max-width: 680px;">
      <div class="modal-header" style="padding: 12px 20px;">
        <div class="editor-modal-header-left">
          <span id="editor-header-title" class="editor-header-title">Плейлист</span>
          <span id="editor-header-count" class="editor-header-badge">0 треков</span>
          <span id="editor-header-vis" class="editor-header-badge badge-priv">🔒 Закрытый</span>
        </div>
        <button id="btn-close-editor-modal" class="modal-close">&times;</button>
      </div>

      <div class="modal-body" style="gap: 14px; padding: 16px 20px;">
        <!-- Top: Cover Block and Name/Description Block (equal height: 88px) -->
        <div class="editor-header-grid">
          <div class="editor-cover-section">
            <div class="editor-cover-wrap" id="editor-cover-preview-wrap">
              <img id="editor-cover-preview" class="editor-cover-img" src="" alt="Cover" style="display: none;">
              <div id="editor-cover-placeholder" class="editor-cover-placeholder">
                <svg style="width: 32px; height: 32px; fill: currentColor;" viewBox="0 0 24 24">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>
              </div>

              <!-- On-Cover Floating Mini Action Icons -->
              <button type="button" id="editor-vis-toggle" class="editor-cover-icon-btn editor-cover-btn-privacy" title="Нажмите для переключения (🔒 Закрытый / 🌐 Публичный)">
                <span id="editor-vis-icon">🔒</span>
              </button>

              <button type="button" id="btn-generate-cover" class="editor-cover-icon-btn editor-cover-btn-generate" title="🎨 Сгенерировать обложку по названию">
                🎨
              </button>

              <button type="button" id="btn-upload-cover" class="editor-cover-icon-btn editor-cover-btn-upload" title="📷 Выбрать фото с устройства">
                📷
              </button>
            </div>

            <input type="file" id="editor-file-input" accept="image/jpeg,image/png,image/webp" style="display: none;">
            <div id="editor-cover-status" style="font-size: 0.65rem; color: var(--spotify-green); text-align: center; min-height: 10px; max-width: 88px; line-height: 1.1;"></div>
            <canvas id="cover-canvas" width="640" height="640" style="display: none;"></canvas>
          </div>

          <div class="editor-meta-fields">
            <div class="editor-field-row">
              <label class="editor-field-label" for="editor-name-input">Название</label>
              <input type="text" id="editor-name-input" class="form-input editor-field-input" placeholder="Название плейлиста">
            </div>

            <div class="editor-field-row">
              <label class="editor-field-label" for="editor-desc-input">Описание</label>
              <input type="text" id="editor-desc-input" class="form-input editor-field-input" placeholder="Введите описание плейлиста">
            </div>

            <!-- Hidden compatibility elements for existing event queries -->
            <div style="display: none;">
              <div id="editor-vis-private"></div>
              <div id="editor-vis-public"></div>
              <span id="editor-vis-label-badge"></span>
            </div>
          </div>
        </div>

        <!-- Add Track Inline Search -->
        <div class="editor-search-bar-wrap">
          <input type="text" id="editor-track-search-input" class="form-input" style="flex: 1; padding: 7px 12px; font-size: 0.82rem;" placeholder="🔍 Поиск трека для добавления в плейлист...">
          <button type="button" id="btn-editor-search-track" class="btn btn-secondary btn-sm" style="padding: 6px 14px;">
            Искать
          </button>
        </div>
        <div id="editor-search-results" class="editor-search-results" style="display: none;"></div>

        <!-- Tracklist with Drag & Drop Reordering -->
        <div class="editor-tracks-container">
          <div class="editor-tracks-header">
            <span>Треки (<span id="editor-tracks-count">0</span>)</span>
            <span style="font-size: 0.7rem; color: var(--text-subtle);">Драг&дроп мышкой или стрелки ▲/▼</span>
          </div>

          <div id="editor-tracks-list" class="editor-tracks-list">
            <!-- Dynamically populated rows -->
          </div>
        </div>
      </div>

      <div class="modal-footer" style="padding: 12px 20px;">
        <button type="button" id="btn-delete-playlist-trigger" class="btn btn-secondary btn-sm" style="color: #f87171; border-color: rgba(239, 68, 68, 0.3);">
          Удалить
        </button>
        <div style="display: flex; gap: 8px;">
          <button type="button" id="btn-cancel-editor" class="btn btn-secondary btn-sm">Отмена</button>
          <button type="button" id="btn-copy-editor" class="btn btn-spotify btn-sm" style="display: none;">
            Создать копию
          </button>
          <button type="button" id="btn-save-editor" class="btn btn-spotify btn-sm">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal: Delete Confirmation -->
  <div id="delete-modal" class="modal-overlay">
    <div class="modal-card" style="max-width: 440px;">
      <div class="modal-header">
        <div class="modal-title" style="color: #f87171;">Удаление плейлиста</div>
        <button id="btn-close-delete-modal" class="modal-close">&times;</button>
      </div>
      <div class="modal-body" style="padding: 24px;">
        <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5;">
          Вы действительно хотите удалить плейлист <strong id="delete-playlist-name" style="color: #fff;"></strong> из медиатеки?
        </p>
        <p style="font-size: 0.78rem; color: var(--text-subtle); margin-top: 8px;">
          Он будет отписан и удален из вашего профиля Spotify.
        </p>
      </div>
      <div class="modal-footer">
        <button id="btn-cancel-delete" class="btn btn-secondary btn-sm">Отмена</button>
        <button id="btn-confirm-delete" class="btn btn-spotify btn-sm" style="background: #ef4444; color: #fff;">
          Удалить
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
      'user-read-email',
      'ugc-image-upload'
    ].join(' ');

    let currentToken = null;
    let currentUser = null;
    let cachedPlaylists = [];
    let isPublicSelection = false;
    let currentViewMode = localStorage.getItem('sp_view_mode') || 'large';
    let playlistToDeleteId = null;

    // Composer review state
    let reviewState = {
      playlistName: '',
      playlistDesc: '',
      isPublic: false,
      foundTracks: [],
      notFoundTracks: []
    };

    // Editor state
    let editingState = {
      id: null,
      name: '',
      description: '',
      isPublic: false,
      coverUrl: null,
      newCoverBase64: null,
      tracks: [],
      paletteIndex: 0
    };
    let draggedTrackIndex = null;

    // Elements - Common & Views
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
    const playlistsContainer = document.getElementById('playlists-container');
    const playlistSearchInput = document.getElementById('playlist-search-input');
    const playlistsCountBadge = document.getElementById('playlists-count-badge');
    const dashboardUserGreeting = document.getElementById('dashboard-user-greeting');

    // View Switcher Elements
    const btnViewList = document.getElementById('btn-view-list');
    const btnViewCompact = document.getElementById('btn-view-compact');
    const btnViewLarge = document.getElementById('btn-view-large');

    // Composer Modal Elements
    const composerModal = document.getElementById('composer-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCancelModal = document.getElementById('btn-cancel-modal');
    const modalFormView = document.getElementById('modal-form-view');
    const modalProgressView = document.getElementById('modal-progress-view');
    const modalReviewView = document.getElementById('modal-review-view');
    const modalSuccessView = document.getElementById('modal-success-view');
    const modalFooter = document.getElementById('modal-footer');
    const btnBackToForm = document.getElementById('btn-back-to-form');
    const btnFindTracks = document.getElementById('btn-find-tracks');
    const btnCommitPlaylist = document.getElementById('btn-commit-playlist');
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
    const reviewPlaylistTitleDisplay = document.getElementById('review-playlist-title-display');
    const badgeFoundCount = document.getElementById('badge-found-count');
    const badgeNotfoundCount = document.getElementById('badge-notfound-count');
    const colFoundCount = document.getElementById('col-found-count');
    const colNotfoundCount = document.getElementById('col-notfound-count');
    const reviewFoundList = document.getElementById('review-found-list');
    const reviewNotfoundList = document.getElementById('review-notfound-list');
    const btnClearAllFound = document.getElementById('btn-clear-all-found');
    const btnDeleteAllNotfound = document.getElementById('btn-delete-all-notfound');
    const successSummaryText = document.getElementById('success-summary-text');
    const btnOpenSpotifyLink = document.getElementById('btn-open-spotify-link');
    const btnCreateAnother = document.getElementById('btn-create-another');

    // Editor Modal Elements
    const editorModal = document.getElementById('editor-modal');
    const btnCloseEditorModal = document.getElementById('btn-close-editor-modal');
    const btnCancelEditor = document.getElementById('btn-cancel-editor');
    const btnSaveEditor = document.getElementById('btn-save-editor');
    const btnCopyEditor = document.getElementById('btn-copy-editor');
    const btnDeletePlaylistTrigger = document.getElementById('btn-delete-playlist-trigger');
    const editorCoverPreview = document.getElementById('editor-cover-preview');
    const editorCoverPlaceholder = document.getElementById('editor-cover-placeholder');
    const editorFileInput = document.getElementById('editor-file-input');
    const btnUploadCover = document.getElementById('btn-upload-cover');
    const btnGenerateCover = document.getElementById('btn-generate-cover');
    const editorCoverStatus = document.getElementById('editor-cover-status');
    const coverCanvas = document.getElementById('cover-canvas');
    const editorNameInput = document.getElementById('editor-name-input');
    const editorDescInput = document.getElementById('editor-desc-input');
    const editorVisPrivate = document.getElementById('editor-vis-private');
    const editorVisPublic = document.getElementById('editor-vis-public');
    const editorTrackSearchInput = document.getElementById('editor-track-search-input');
    const btnEditorSearchTrack = document.getElementById('btn-editor-search-track');
    const editorSearchResults = document.getElementById('editor-search-results');
    const editorTracksCount = document.getElementById('editor-tracks-count');
    const editorTracksList = document.getElementById('editor-tracks-list');

    // Delete Modal Elements
    const deleteModal = document.getElementById('delete-modal');
    const btnCloseDeleteModal = document.getElementById('btn-close-delete-modal');
    const btnCancelDelete = document.getElementById('btn-cancel-delete');
    const btnConfirmDelete = document.getElementById('btn-confirm-delete');
    const deletePlaylistName = document.getElementById('delete-playlist-name');

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

      // View mode toggles
      setViewMode(currentViewMode, false);
      btnViewList.addEventListener('click', () => setViewMode('list'));
      btnViewCompact.addEventListener('click', () => setViewMode('compact'));
      btnViewLarge.addEventListener('click', () => setViewMode('large'));

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

    // View Mode Switching
    function setViewMode(mode, doRender = true) {
      currentViewMode = mode;
      localStorage.setItem('sp_view_mode', mode);

      [btnViewList, btnViewCompact, btnViewLarge].forEach(btn => {
        if (btn) btn.classList.toggle('active', btn.dataset.mode === mode);
      });

      if (playlistsContainer) {
        playlistsContainer.className = 'playlists-container view-mode-' + mode;
      }

      if (doRender && cachedPlaylists.length) {
        renderPlaylists(getFilteredPlaylists());
      }
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

    async function spotifyApi(path, options = {}, retryCount = 0) {
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
            return spotifyApi(path, options, retryCount);
          }
        }
        logout();
        throw new Error('Session expired');
      }

      // Handle 429 Too Many Requests with backoff & Retry-After header
      if (res.status === 429 && retryCount < 3) {
        const retryHeader = res.headers.get('Retry-After');
        const waitSec = retryHeader ? parseInt(retryHeader, 10) : (retryCount + 1) * 2;
        const waitMs = Math.min(Math.max(waitSec, 1) * 1000, 6000);
        console.warn(\`Spotify 429 rate limit hit on \${path}. Waiting \${waitMs}ms before retry #\${retryCount + 1}...\`);
        await new Promise(r => setTimeout(r, waitMs));
        return spotifyApi(path, options, retryCount + 1);
      }

      const text = await res.text();

      if (!res.ok) {
        let errMsg = 'Spotify API error ' + res.status;
        try {
          const errJson = JSON.parse(text);
          if (errJson?.error?.message) errMsg = errJson.error.message;
        } catch (_) {}
        throw new Error(errMsg);
      }

      if (!text || !text.trim() || res.status === 204) return null;

      try {
        return JSON.parse(text);
      } catch (_) {
        return null;
      }
    }

    function isUserPlaylistOwner(pl) {
      if (!pl || !pl.owner) return true;
      if (!currentUser || !currentUser.id) return true;
      return pl.owner.id === currentUser.id;
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

    function getPlaylistTrackCount(pl) {
      if (!pl) return 0;
      if (typeof pl.tracksCount === 'number') return pl.tracksCount;
      if (pl.tracks && typeof pl.tracks.total === 'number') return pl.tracks.total;
      if (pl.items && typeof pl.items.total === 'number') return pl.items.total;
      if (typeof pl.total === 'number') return pl.total;
      if (typeof pl.total_tracks === 'number') return pl.total_tracks;
      if (Array.isArray(pl.tracks)) return pl.tracks.length;
      if (Array.isArray(pl.items)) return pl.items.length;
      return 0;
    }

    function getCleanDesc(desc) {
      if (!desc || desc === 'null' || desc === 'undefined') return '';
      return String(desc).trim();
    }

    async function loadPlaylists() {
      playlistsContainer.innerHTML = '<div class="empty-state">Загрузка плейлистов...</div>';
      try {
        const data = await spotifyApi('/me/playlists?limit=50');
        cachedPlaylists = data.items || [];
        cachedPlaylists.forEach(pl => {
          pl.tracksCount = getPlaylistTrackCount(pl);
        });
        playlistsCountBadge.textContent = cachedPlaylists.length;
        renderPlaylists(getFilteredPlaylists());
        enrichPlaylistDates();
      } catch (err) {
        playlistsContainer.innerHTML = \`<div class="empty-state" style="color: var(--danger);">Ошибка загрузки: \${escapeHtml(err.message)}</div>\`;
      }
    }

    async function enrichPlaylistDates() {
      // Gentle background enrichment for dates (batch of 2 with 250ms sleep to avoid 429 rate limit)
      const batchSize = 2;
      for (let i = 0; i < cachedPlaylists.length; i += batchSize) {
        const batch = cachedPlaylists.slice(i, i + batchSize);
        let stopDueToError = false;
        await Promise.all(batch.map(async pl => {
          try {
            const tracksData = await spotifyApi(\`/playlists/\${pl.id}/items?limit=1&fields=total,items(added_at)\`);
            const count = tracksData?.total ?? tracksData?.items?.length;
            if (typeof count === 'number' && typeof pl.tracksCount !== 'number') {
              pl.tracksCount = count;
              const noun = getTrackNoun(count);
              document.querySelectorAll(\`.tracks-count-\${pl.id}\`).forEach(el => {
                el.textContent = \`\${count} \${noun}\`;
              });
            }

            if (tracksData?.items?.[0]?.added_at) {
              const dateStr = formatDate(tracksData.items[0].added_at);
              document.querySelectorAll(\`.date-\${pl.id}\`).forEach(el => {
                el.textContent = dateStr;
              });
            }
          } catch (e) {
            stopDueToError = true;
          }
        }));
        if (stopDueToError) {
          // If 429 or network errors occur, preserve user quota and stop background enrich
          break;
        }
        await new Promise(r => setTimeout(r, 250));
      }
    }

    function getFilteredPlaylists() {
      const q = (playlistSearchInput.value || '').toLowerCase().trim();
      if (!q) return cachedPlaylists;
      return cachedPlaylists.filter(pl =>
        (pl.name && pl.name.toLowerCase().includes(q)) ||
        (pl.description && pl.description.toLowerCase().includes(q))
      );
    }

    function renderPlaylists(playlists) {
      if (!playlists.length) {
        playlistsContainer.innerHTML = '<div class="empty-state">Плейлистов не найдено. Нажмите «Создать плейлист», чтобы добавить новый!</div>';
        return;
      }

      if (currentViewMode === 'compact') {
        renderCompactPlaylists(playlists);
      } else if (currentViewMode === 'list') {
        renderListPlaylists(playlists);
      } else {
        renderLargePlaylists(playlists);
      }
    }

    // View Mode 1: Large Cards (Ultra-Minimalist Spotify Style)
    function renderLargePlaylists(playlists) {
      playlistsContainer.innerHTML = playlists.map(pl => {
        const cover = pl.images?.[0]?.url;
        const coverHtml = cover
          ? \`<img class="playlist-cover" src="\${escapeHtml(cover)}" loading="lazy" alt="Cover">\`
          : \`<div class="playlist-cover-fallback">
              <svg style="width: 36px; height: 36px; fill: currentColor;" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
             </div>\`;

        const isOwner = isUserPlaylistOwner(pl);
        const totalTracks = getPlaylistTrackCount(pl);
        const trackNoun = getTrackNoun(totalTracks);
        const spotifyUrl = pl.external_urls?.spotify || '#';

        return \`
          <div class="playlist-card" onclick="openEditorModal('\${pl.id}')" title="\${escapeHtml(pl.name)}">
            <div class="playlist-cover-wrap">
              \${coverHtml}
              <!-- Mini Warning Indicator On Cover If Not Owned By User -->
              \${!isOwner ? \`
                <div class="cover-warning-badge" title="⚠️ Плейлист другого автора (\${escapeHtml(pl.owner?.display_name || 'Spotify')})">
                  ⚠️
                </div>
              \` : ''}
              <!-- Action Icons In Bottom Center Of Cover -->
              <div class="cover-actions-overlay" onclick="event.stopPropagation();">
                <button type="button" class="cover-action-btn" onclick="openEditorModal('\${pl.id}')" title="Редактировать">✏️</button>
                <button type="button" class="cover-action-btn btn-danger" onclick="promptDeletePlaylist('\${pl.id}', '\${escapeJsString(pl.name)}')" title="Удалить">🗑️</button>
                <a href="\${escapeHtml(spotifyUrl)}" target="_blank" rel="noopener" class="cover-action-btn" title="В Spotify">↗</a>
              </div>
            </div>
            <div class="playlist-info">
              <div class="playlist-title">\${escapeHtml(pl.name)}</div>
              <div class="playlist-meta-row">
                <span class="tracks-count-\${pl.id}">\${totalTracks} \${trackNoun}</span>
                <span class="playlist-dot">•</span>
                <span class="date-\${pl.id}">Плейлист</span>
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    // View Mode 2: Compact iPhone-style App Icons (Clean with no overlay icons)
    function renderCompactPlaylists(playlists) {
      playlistsContainer.innerHTML = playlists.map(pl => {
        const cover = pl.images?.[0]?.url;
        const coverHtml = cover
          ? \`<img class="compact-cover-img" src="\${escapeHtml(cover)}" loading="lazy" alt="Cover">\`
          : \`<div class="playlist-cover-fallback" style="width: 100%; height: 100%;">
              <svg style="width: 24px; height: 24px; fill: currentColor;" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
             </div>\`;

        const totalTracks = getPlaylistTrackCount(pl);
        const trackNoun = getTrackNoun(totalTracks);

        return \`
          <div class="compact-item" onclick="openEditorModal('\${pl.id}')" title="\${escapeHtml(pl.name)} (\${totalTracks} \${trackNoun})">
            <div class="compact-cover-wrap">
              \${coverHtml}
            </div>
            <div class="compact-title">\${escapeHtml(pl.name)}</div>
            <div class="compact-tracks-count tracks-count-\${pl.id}">\${totalTracks} \${trackNoun}</div>
          </div>
        \`;
      }).join('');
    }

    // View Mode 3: List View
    function renderListPlaylists(playlists) {
      playlistsContainer.innerHTML = playlists.map(pl => {
        const cover = pl.images?.[0]?.url;
        const coverHtml = cover
          ? \`<img class="list-row-cover" src="\${escapeHtml(cover)}" loading="lazy" alt="Cover">\`
          : \`<div class="playlist-cover-fallback" style="width: 36px; height: 36px; border-radius: 4px;">
              <svg style="width: 18px; height: 18px; fill: currentColor;" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
             </div>\`;

        const isOwner = isUserPlaylistOwner(pl);
        const totalTracks = getPlaylistTrackCount(pl);
        const trackNoun = getTrackNoun(totalTracks);
        const spotifyUrl = pl.external_urls?.spotify || '#';

        const authorNotice = !isOwner ? \`
          <div class="list-row-center-badge" onclick="event.stopPropagation();">
            <span class="warning-circle-badge">⚠️</span>
            <span class="warning-author-text">⚠️ Плейлист другого автора (\${escapeHtml(pl.owner?.display_name || 'Spotify')})</span>
            <button type="button" class="btn-copy-inline" onclick="copyPlaylist('\${pl.id}')">Создать копию</button>
          </div>
        \` : '<div class="list-row-center-spacer"></div>';

        return \`
          <div class="list-row-item">
            <div class="list-row-left" onclick="openEditorModal('\${pl.id}')" title="\${escapeHtml(pl.name)}">
              <div class="list-cover-wrap">
                \${coverHtml}
              </div>
              <div class="list-row-info">
                <div class="list-row-title">\${escapeHtml(pl.name)}</div>
                <div class="list-row-sub">
                  <span class="tracks-count-\${pl.id}">\${totalTracks} \${trackNoun}</span>
                  <span class="playlist-dot">•</span>
                  <span class="date-\${pl.id}">Плейлист</span>
                </div>
              </div>
            </div>
            \${authorNotice}
            <div class="list-row-actions" onclick="event.stopPropagation();">
              <button type="button" class="cover-action-btn" onclick="openEditorModal('\${pl.id}')" title="Редактировать">✏️</button>
              <button type="button" class="cover-action-btn btn-danger" onclick="promptDeletePlaylist('\${pl.id}', '\${escapeJsString(pl.name)}')" title="Удалить">🗑️</button>
              <a href="\${escapeHtml(spotifyUrl)}" target="_blank" rel="noopener" class="cover-action-btn" title="В Spotify">↗</a>
            </div>
          </div>
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

    function formatDuration(ms) {
      if (!ms) return '0:00';
      const totalSec = Math.floor(ms / 1000);
      const min = Math.floor(totalSec / 60);
      const sec = totalSec % 60;
      return min + ':' + (sec < 10 ? '0' : '') + sec;
    }

    // Search filter
    playlistSearchInput.addEventListener('input', () => {
      renderPlaylists(getFilteredPlaylists());
    });

    btnRefresh.addEventListener('click', loadPlaylists);

    // ==========================================
    // PLAYLIST EDITOR MODAL LOGIC
    // ==========================================

    // Robust Playlist Track Fetcher (Supports official API + Worker Proxy for external playlists)
    async function fetchPlaylistTracks(playlistId, plData = null) {
      // 1. Check if plData already has track items
      if (plData?.tracks?.items && Array.isArray(plData.tracks.items) && plData.tracks.items.length > 0) {
        return plData.tracks.items
          .filter(item => item && (item.track || item.item))
          .map(item => {
            const tr = item.track || item.item;
            const artists = tr.artists?.map(a => a.name).join(', ') || 'Неизвестный исполнитель';
            const img = tr.album?.images?.[tr.album.images.length - 1]?.url || tr.album?.images?.[0]?.url || '';
            return {
              id: tr.id || ('tr_' + Math.random().toString(36).substring(2, 9)),
              uri: tr.uri,
              name: tr.name,
              artists: artists,
              durationMs: tr.duration_ms,
              image: img
            };
          });
      }

      // 2. Try official Spotify API /items
      try {
        const res = await spotifyApi('/playlists/' + playlistId + '/items?limit=100');
        const raw = res?.items || [];
        if (raw.length > 0) {
          return raw
            .filter(item => item && (item.track || item.item))
            .map(item => {
              const tr = item.track || item.item;
              const artists = tr.artists?.map(a => a.name).join(', ') || 'Неизвестный исполнитель';
              const img = tr.album?.images?.[tr.album.images.length - 1]?.url || tr.album?.images?.[0]?.url || '';
              return {
                id: tr.id || ('tr_' + Math.random().toString(36).substring(2, 9)),
                uri: tr.uri,
                name: tr.name,
                artists: artists,
                durationMs: tr.duration_ms,
                image: img
              };
            });
        }
      } catch (eItems) {
        console.warn('/playlists/.../items failed:', eItems);
      }

      // 3. Try legacy endpoint /tracks
      try {
        const res = await spotifyApi('/playlists/' + playlistId + '/tracks?limit=100');
        const raw = res?.items || [];
        if (raw.length > 0) {
          return raw
            .filter(item => item && (item.track || item.item))
            .map(item => {
              const tr = item.track || item.item;
              const artists = tr.artists?.map(a => a.name).join(', ') || 'Неизвестный исполнитель';
              const img = tr.album?.images?.[tr.album.images.length - 1]?.url || tr.album?.images?.[0]?.url || '';
              return {
                id: tr.id || ('tr_' + Math.random().toString(36).substring(2, 9)),
                uri: tr.uri,
                name: tr.name,
                artists: artists,
                durationMs: tr.duration_ms,
                image: img
              };
            });
        }
      } catch (eTracks) {
        console.warn('/playlists/.../tracks failed:', eTracks);
      }

      // 4. Fallback for external/non-owned playlists: Worker proxy /api/public-playlist
      try {
        const proxyRes = await fetch('/api/public-playlist?id=' + encodeURIComponent(playlistId));
        if (proxyRes.ok) {
          const data = await proxyRes.json();
          if (data?.ok && Array.isArray(data.tracks) && data.tracks.length > 0) {
            return data.tracks;
          }
        }
      } catch (eProxy) {
        console.warn('/api/public-playlist proxy failed:', eProxy);
      }

      return [];
    }

    window.openEditorModal = async function(playlistId) {
      editorModal.classList.add('open');
      editorCoverPreview.style.display = 'none';
      editorCoverPlaceholder.style.display = 'flex';
      editorCoverStatus.textContent = '';
      editorSearchResults.style.display = 'none';
      editorSearchResults.innerHTML = '';
      editorTrackSearchInput.value = '';

      // 1. Immediately read from cached playlists so modal opens instantly with all info!
      const cached = cachedPlaylists.find(p => p.id === playlistId) || {};
      const isOwner = !currentUser || !cached.owner || (currentUser.id && cached.owner.id === currentUser.id);

      const initialTracksCount = getPlaylistTrackCount(cached);
      const cleanDesc = getCleanDesc(cached.description);

      editingState = {
        id: playlistId,
        name: cached.name || '',
        description: cleanDesc,
        isPublic: cached.public !== false,
        coverUrl: cached.images?.[0]?.url || null,
        newCoverBase64: null,
        tracks: [],
        tracksModified: false,
        paletteIndex: 0,
        isOwner: isOwner
      };

      editorNameInput.value = editingState.name;
      editorDescInput.value = editingState.description;
      editorTracksCount.textContent = initialTracksCount;
      editorTracksList.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 24px;">Загрузка треков...</div>';

      const headerTitle = document.getElementById('editor-header-title');
      const headerCount = document.getElementById('editor-header-count');
      if (headerTitle) headerTitle.textContent = editingState.name || 'Плейлист';
      if (headerCount) headerCount.textContent = \`\${initialTracksCount} \${getTrackNoun(initialTracksCount)}\`;

      // Header title remains intact until save is clicked (per user requirements)
      editorNameInput.oninput = null;

      updateEditorVisChips(editingState.isPublic);

      if (editingState.coverUrl) {
        editorCoverPreview.src = editingState.coverUrl;
        editorCoverPreview.style.display = 'block';
        editorCoverPlaceholder.style.display = 'none';
      }

      // If user does not own this playlist, adjust controls and show notice + Copy button
      const visToggle = document.getElementById('editor-vis-toggle');
      if (!isOwner) {
        btnSaveEditor.style.display = 'none';
        if (btnCopyEditor) btnCopyEditor.style.display = 'inline-flex';
        if (btnUploadCover) btnUploadCover.style.display = 'none';
        if (btnGenerateCover) btnGenerateCover.style.display = 'none';
        if (visToggle) visToggle.style.display = 'none';
        editorCoverStatus.innerHTML = '<span style="color: var(--warning);">⚠️ Плейлист другого автора (' + escapeHtml(cached.owner?.display_name || 'Spotify') + ')</span>';
      } else {
        btnSaveEditor.style.display = 'inline-flex';
        if (btnCopyEditor) btnCopyEditor.style.display = 'none';
        if (btnUploadCover) btnUploadCover.style.display = 'flex';
        if (btnGenerateCover) btnGenerateCover.style.display = 'flex';
        if (visToggle) visToggle.style.display = 'flex';
      }

      // 2. Fetch fresh metadata gracefully (if permitted by Spotify)
      let plData = null;
      try {
        plData = await spotifyApi('/playlists/' + playlistId);
        if (plData) {
          editingState.name = plData.name || editingState.name;
          editingState.description = getCleanDesc(plData.description ?? editingState.description);
          editingState.isPublic = plData.public !== false;
          if (plData.images?.[0]?.url) {
            editingState.coverUrl = plData.images[0].url;
            editorCoverPreview.src = editingState.coverUrl;
            editorCoverPreview.style.display = 'block';
            editorCoverPlaceholder.style.display = 'none';
          }
          editorNameInput.value = editingState.name;
          editorDescInput.value = editingState.description;
          if (headerTitle) headerTitle.textContent = editingState.name || 'Плейлист';
          updateEditorVisChips(editingState.isPublic);
        }
      } catch (eMeta) {
        console.warn('Playlist metadata fetch:', eMeta);
      }

      // 3. Fetch tracks using fetchPlaylistTracks (robust against 403 Forbidden)
      const tracks = await fetchPlaylistTracks(playlistId, plData);
      if (tracks && tracks.length > 0) {
        editingState.tracks = tracks;
        renderEditorTracks();
      } else {
        editorTracksList.innerHTML = '<div style="color: var(--warning); text-align: center; padding: 24px; font-size: 0.85rem; line-height: 1.5;">В этом плейлисте нет доступных треков для отображения.</div>';
      }
    };

    function updateEditorVisChips(isPublic) {
      editingState.isPublic = isPublic;
      const visIcon = document.getElementById('editor-vis-icon');
      const visBadge = document.getElementById('editor-vis-label-badge');
      const headerVis = document.getElementById('editor-header-vis');
      if (visIcon) visIcon.textContent = isPublic ? '🌐' : '🔒';
      if (visBadge) {
        visBadge.textContent = isPublic ? '🌐 Публичный' : '🔒 Закрытый';
        visBadge.className = 'mini-vis-badge ' + (isPublic ? 'badge-pub' : 'badge-priv');
      }
      if (headerVis) {
        headerVis.textContent = isPublic ? '🌐 Публичный' : '🔒 Закрытый';
        headerVis.className = 'editor-header-badge ' + (isPublic ? 'badge-pub' : 'badge-priv');
      }
      if (editorVisPublic) editorVisPublic.classList.toggle('selected', isPublic);
      if (editorVisPrivate) editorVisPrivate.classList.toggle('selected', !isPublic);
    }

    const editorVisToggle = document.getElementById('editor-vis-toggle');
    if (editorVisToggle) {
      editorVisToggle.addEventListener('click', () => {
        updateEditorVisChips(!editingState.isPublic);
      });
    }

    if (editorVisPrivate) editorVisPrivate.addEventListener('click', () => updateEditorVisChips(false));
    if (editorVisPublic) editorVisPublic.addEventListener('click', () => updateEditorVisChips(true));

    function closeEditorModal() {
      editorModal.classList.remove('open');
    }

    btnCloseEditorModal.addEventListener('click', closeEditorModal);
    btnCancelEditor.addEventListener('click', closeEditorModal);

    function renderEditorTracks() {
      const count = editingState.tracks.length;
      editorTracksCount.textContent = count;
      const headerCount = document.getElementById('editor-header-count');
      if (headerCount) {
        headerCount.textContent = \`\${count} \${getTrackNoun(count)}\`;
      }

      if (!editingState.tracks.length) {
        editorTracksList.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 24px;">В этом плейлисте нет треков. Найдите и добавьте треки выше!</div>';
        return;
      }

      editorTracksList.innerHTML = editingState.tracks.map((t, idx) => \`
        <div class="editor-track-row" draggable="true" data-index="\${idx}">
          <div class="drag-handle" title="Перетащите, чтобы изменить порядок">☰</div>
          <div class="track-num">\${idx + 1}</div>
          \${t.image ? \`<img src="\${escapeHtml(t.image)}" class="editor-track-thumb" alt="Thumb">\` : '<div class="editor-track-thumb"></div>'}
          <div class="editor-track-info">
            <div class="editor-track-title" title="\${escapeHtml(t.name)}">\${escapeHtml(t.name)}</div>
            <div class="editor-track-artist" title="\${escapeHtml(t.artists)}">\${escapeHtml(t.artists)}</div>
          </div>
          <div class="editor-track-duration">\${formatDuration(t.durationMs)}</div>
          <div class="editor-track-moves">
            <button type="button" class="btn-move" title="Переместить вверх" onclick="moveEditorTrack(\${idx}, -1)" \${idx === 0 ? 'disabled' : ''}>▲</button>
            <button type="button" class="btn-move" title="Переместить вниз" onclick="moveEditorTrack(\${idx}, 1)" \${idx === editingState.tracks.length - 1 ? 'disabled' : ''}>▼</button>
          </div>
          <button type="button" class="btn-icon btn-icon-danger" title="Удалить из плейлиста" style="padding: 4px 8px; font-size: 0.75rem;" onclick="removeEditorTrack(\${idx})">✕</button>
        </div>
      \`).join('');

      const rows = editorTracksList.querySelectorAll('.editor-track-row');
      rows.forEach(row => {
        row.addEventListener('dragstart', (e) => {
          draggedTrackIndex = parseInt(row.dataset.index);
          row.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
        });

        row.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          row.classList.add('drag-over');
        });

        row.addEventListener('dragleave', () => {
          row.classList.remove('drag-over');
        });

        row.addEventListener('drop', (e) => {
          e.preventDefault();
          row.classList.remove('drag-over');
          const targetIndex = parseInt(row.dataset.index);
          if (draggedTrackIndex !== null && draggedTrackIndex !== targetIndex) {
            reorderEditorTracks(draggedTrackIndex, targetIndex);
          }
        });

        row.addEventListener('dragend', () => {
          row.classList.remove('dragging');
          rows.forEach(r => r.classList.remove('drag-over'));
          draggedTrackIndex = null;
        });
      });
    }

    window.moveEditorTrack = function(idx, delta) {
      const target = idx + delta;
      if (target >= 0 && target < editingState.tracks.length) {
        reorderEditorTracks(idx, target);
      }
    };

    window.removeEditorTrack = function(idx) {
      editingState.tracks.splice(idx, 1);
      editingState.tracksModified = true;
      renderEditorTracks();
    };

    function reorderEditorTracks(fromIdx, toIdx) {
      if (fromIdx === null || toIdx === null || fromIdx === toIdx) return;
      const [item] = editingState.tracks.splice(fromIdx, 1);
      editingState.tracks.splice(toIdx, 0, item);
      editingState.tracksModified = true;
      draggedTrackIndex = null;
      renderEditorTracks();
    }

    // Inline Search & Add Track in Editor
    async function searchEditorTrack() {
      const q = editorTrackSearchInput.value.trim();
      if (!q) return;

      btnEditorSearchTrack.disabled = true;
      btnEditorSearchTrack.textContent = '⏳';

      try {
        const res = await spotifyApi('/search?q=' + encodeURIComponent(q) + '&type=track&limit=5');
        const items = res?.tracks?.items || [];
        if (!items.length) {
          editorSearchResults.innerHTML = '<div style="color: var(--text-muted); font-size: 0.8rem; padding: 8px;">Ничего не найдено</div>';
          editorSearchResults.style.display = 'block';
          return;
        }

        window._editorSearchMatches = items;
        editorSearchResults.innerHTML = items.map((t, idx) => {
          const artists = t.artists?.map(a => a.name).join(', ') || 'Неизвестный исполнитель';
          const img = t.album?.images?.[t.album.images.length - 1]?.url || '';
          return \`
            <div class="editor-search-item">
              <div style="display: flex; align-items: center; gap: 8px; overflow: hidden; flex: 1;">
                \${img ? \`<img src="\${escapeHtml(img)}" style="width: 28px; height: 28px; border-radius: 4px; object-fit: cover;">\` : ''}
                <div style="overflow: hidden;">
                  <div style="font-size: 0.82rem; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\${escapeHtml(t.name)}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\${escapeHtml(artists)}</div>
                </div>
              </div>
              <button type="button" class="btn btn-secondary btn-sm" style="font-size: 0.72rem; padding: 3px 8px;" onclick="addTrackToEditor(\${idx})">
                ＋ Добавить
              </button>
            </div>
          \`;
        }).join('');
        editorSearchResults.style.display = 'flex';
      } catch (err) {
        editorSearchResults.innerHTML = \`<div style="color: #f87171; font-size: 0.8rem; padding: 8px;">Ошибка поиска: \${escapeHtml(err.message)}</div>\`;
        editorSearchResults.style.display = 'block';
      } finally {
        btnEditorSearchTrack.disabled = false;
        btnEditorSearchTrack.textContent = '🔍 Искать';
      }
    }

    btnEditorSearchTrack.addEventListener('click', searchEditorTrack);
    editorTrackSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchEditorTrack();
      }
    });

    window.addTrackToEditor = function(matchIdx) {
      const match = window._editorSearchMatches?.[matchIdx];
      if (!match) return;

      const artists = match.artists?.map(a => a.name).join(', ') || 'Неизвестный исполнитель';
      const img = match.album?.images?.[match.album.images.length - 1]?.url || '';

      editingState.tracks.push({
        id: match.id || ('tr_' + Math.random().toString(36).substring(2, 9)),
        uri: match.uri,
        name: match.name,
        artists: artists,
        durationMs: match.duration_ms,
        image: img
      });

      editingState.tracksModified = true;
      renderEditorTracks();
      editorSearchResults.style.display = 'none';
      editorTrackSearchInput.value = '';
    };

    // Custom Photo Upload via File Input
    btnUploadCover.addEventListener('click', () => editorFileInput.click());

    editorFileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const ctx = coverCanvas.getContext('2d');
          coverCanvas.width = 640;
          coverCanvas.height = 640;

          // Square center crop
          const minSide = Math.min(img.width, img.height);
          const sx = (img.width - minSide) / 2;
          const sy = (img.height - minSide) / 2;
          ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, 640, 640);

          const dataUrl = coverCanvas.toDataURL('image/jpeg', 0.82);
          const base64 = dataUrl.split(',')[1] || dataUrl;
          editingState.newCoverBase64 = base64;

          editorCoverPreview.src = dataUrl;
          editorCoverPreview.style.display = 'block';
          editorCoverPlaceholder.style.display = 'none';
          editorCoverStatus.textContent = '✅ Фото готово к сохранению';
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });

    // Procedural Cover Generator
    const COVER_PALETTES = [
      { bg1: '#0f0c29', bg2: '#302b63', bg3: '#24243e', accent: '#00ff87', text: '#ffffff', motif: 'vinyl' },
      { bg1: '#ff416c', bg2: '#ff4b2b', bg3: '#8a2387', accent: '#ffe600', text: '#ffffff', motif: 'waves' },
      { bg1: '#111827', bg2: '#1f2937', bg3: '#10b981', accent: '#10b981', text: '#ffffff', motif: 'equalizer' },
      { bg1: '#1a102f', bg2: '#4a154b', bg3: '#6b11ff', accent: '#00f2fe', text: '#ffffff', motif: 'geometry' },
      { bg1: '#093028', bg2: '#1e4d2b', bg3: '#237a57', accent: '#d4af37', text: '#ffffff', motif: 'abstract' },
      { bg1: '#141e30', bg2: '#243b55', bg3: '#00c6ff', accent: '#ff758c', text: '#ffffff', motif: 'circles' }
    ];

    btnGenerateCover.addEventListener('click', () => {
      const palette = COVER_PALETTES[editingState.paletteIndex % COVER_PALETTES.length];
      editingState.paletteIndex++;

      const ctx = coverCanvas.getContext('2d');
      coverCanvas.width = 640;
      coverCanvas.height = 640;

      // 1. Dynamic Angular Gradient
      const grad = ctx.createLinearGradient(0, 0, 640, 640);
      grad.addColorStop(0, palette.bg1);
      grad.addColorStop(0.5, palette.bg2);
      grad.addColorStop(1, palette.bg3);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 640, 640);

      // 2. Artistic Motif
      ctx.save();
      if (palette.motif === 'vinyl') {
        for (let r = 80; r <= 280; r += 32) {
          ctx.beginPath();
          ctx.arc(320, 260, r, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(320, 260, 48, 0, Math.PI * 2);
        ctx.fillStyle = palette.accent;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(320, 260, 14, 0, Math.PI * 2);
        ctx.fillStyle = palette.bg1;
        ctx.fill();
      } else if (palette.motif === 'waves' || palette.motif === 'equalizer') {
        const bars = 22;
        const barWidth = 14;
        const gap = 10;
        const totalW = bars * (barWidth + gap);
        const startX = (640 - totalW) / 2;
        for (let b = 0; b < bars; b++) {
          const h = Math.abs(Math.sin((b / bars) * Math.PI * 3 + editingState.paletteIndex)) * 140 + 24;
          ctx.fillStyle = b % 2 === 0 ? palette.accent : 'rgba(255, 255, 255, 0.35)';
          ctx.beginPath();
          ctx.rect(startX + b * (barWidth + gap), 280 - h / 2, barWidth, h);
          ctx.fill();
        }
      } else {
        const g1 = ctx.createRadialGradient(220, 220, 20, 220, 220, 280);
        g1.addColorStop(0, palette.accent);
        g1.addColorStop(1, 'transparent');
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = g1;
        ctx.beginPath();
        ctx.arc(220, 220, 280, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.restore();

      // 3. Dark gradient overlay for text readability
      const textBackdrop = ctx.createLinearGradient(0, 340, 0, 640);
      textBackdrop.addColorStop(0, 'rgba(0,0,0,0)');
      textBackdrop.addColorStop(0.5, 'rgba(0,0,0,0.65)');
      textBackdrop.addColorStop(1, 'rgba(0,0,0,0.92)');
      ctx.fillStyle = textBackdrop;
      ctx.fillRect(0, 340, 640, 300);

      // 4. Typography
      const title = editorNameInput.value.trim() || 'Playlist';
      ctx.fillStyle = palette.text;
      ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

      const words = title.split(' ');
      let lines = [];
      let currentLine = words[0] || '';
      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        if (ctx.measureText(testLine).width < 540) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = words[i];
          if (lines.length >= 2) break;
        }
      }
      lines.push(currentLine);

      let textY = 490 - (lines.length - 1) * 24;
      for (const line of lines) {
        ctx.fillText(line, 48, textY);
        textY += 50;
      }

      ctx.fillStyle = palette.accent;
      ctx.font = '600 20px -apple-system, BlinkMacSystemFont, sans-serif';
      const trackCount = editingState.tracks.length;
      ctx.fillText(trackCount + ' ' + getTrackNoun(trackCount) + ' • Spotify Mix', 48, textY + 8);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '700 13px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('COMPOSER EDITION', 48, 64);

      // Export to base64 JPEG
      const dataUrl = coverCanvas.toDataURL('image/jpeg', 0.85);
      const base64 = dataUrl.split(',')[1] || dataUrl;
      editingState.newCoverBase64 = base64;

      editorCoverPreview.src = dataUrl;
      editorCoverPreview.style.display = 'block';
      editorCoverPlaceholder.style.display = 'none';
      editorCoverStatus.textContent = '🎨 Обложка создана! (нажмите еще для другого стиля)';
    });

    // Save Playlist
    btnSaveEditor.addEventListener('click', async () => {
      const name = editorNameInput.value.trim();
      if (!name) {
        alert('Пожалуйста, укажите название плейлиста');
        editorNameInput.focus();
        return;
      }

      btnSaveEditor.disabled = true;
      btnSaveEditor.textContent = 'Сохранение...';

      try {
        const id = editingState.id;
        const description = editorDescInput.value.trim();
        const isPublic = editingState.isPublic;

        // 1. Update metadata
        await spotifyApi('/playlists/' + id, {
          method: 'PUT',
          body: JSON.stringify({
            name: name,
            description: description,
            public: isPublic
          })
        });

        // 2. Update track order atomically ONLY if tracks were actually modified
        if (editingState.tracksModified) {
          const uris = editingState.tracks.map(t => t.uri).filter(Boolean);
          try {
            await spotifyApi('/playlists/' + id + '/items', {
              method: 'PUT',
              body: JSON.stringify({ uris: uris.slice(0, 100) })
            });
          } catch (eItems) {
            await spotifyApi('/playlists/' + id + '/tracks', {
              method: 'PUT',
              body: JSON.stringify({ uris: uris.slice(0, 100) })
            });
          }
          editingState.tracksModified = false;
        }

        // 3. Update cover image if newly generated or uploaded
        if (editingState.newCoverBase64) {
          try {
            await fetch('https://api.spotify.com/v1/playlists/' + id + '/images', {
              method: 'PUT',
              headers: {
                'Authorization': 'Bearer ' + currentToken,
                'Content-Type': 'image/jpeg'
              },
              body: editingState.newCoverBase64
            });
            editingState.newCoverBase64 = null;
          } catch (imgErr) {
            console.warn('Cover upload issue:', imgErr);
            alert('Плейлист обновлен! Обложку не удалось загрузить: для загрузки обложек требуется перелогиниться в аккаунт через кнопку «Выйти», чтобы обновить права доступа Spotify.');
          }
        }

        // 4. Update header title upon successful save
        const headerTitle = document.getElementById('editor-header-title');
        if (headerTitle) headerTitle.textContent = name;
        editingState.name = name;
        editingState.description = description;

        closeEditorModal();
        await loadPlaylists();
      } catch (err) {
        console.error('Save editor error:', err);
        alert('Ошибка при сохранении изменений: ' + err.message);
      } finally {
        btnSaveEditor.disabled = false;
        btnSaveEditor.textContent = 'Сохранить';
      }
    });

    // Copy Other Author Playlist to User Library
    window.copyPlaylist = async function(playlistId) {
      const pl = cachedPlaylists.find(p => p.id === playlistId) || {};
      const targetName = (editingState && editingState.id === playlistId && editorNameInput.value.trim())
        ? editorNameInput.value.trim() + ' (Копия)'
        : ((pl.name || 'Плейлист') + ' (Копия)');
      const targetDesc = (editingState && editingState.id === playlistId && editorDescInput)
        ? editorDescInput.value.trim()
        : (pl.description || '');

      const btnCopyEditor = document.getElementById('btn-copy-editor');
      if (btnCopyEditor) {
        btnCopyEditor.disabled = true;
        btnCopyEditor.textContent = 'Копирование...';
      }

      try {
        // 1. Gather track URIs
        let trackUris = [];
        if (editingState && editingState.id === playlistId && editingState.tracks && editingState.tracks.length > 0) {
          trackUris = editingState.tracks.map(t => t.uri).filter(Boolean);
        }

        if (trackUris.length === 0) {
          const fetched = await fetchPlaylistTracks(playlistId);
          trackUris = fetched.map(t => t.uri).filter(Boolean);
        }

        if (trackUris.length === 0) {
          throw new Error('Не удалось получить список треков из оригинального плейлиста для копирования.');
        }

        // 2. Create new playlist for current user
        let newPl = null;
        try {
          newPl = await spotifyApi('/me/playlists', {
            method: 'POST',
            body: JSON.stringify({
              name: targetName,
              description: targetDesc,
              public: false
            })
          });
        } catch (eMe) {
          if (currentUser?.id) {
            newPl = await spotifyApi('/users/' + encodeURIComponent(currentUser.id) + '/playlists', {
              method: 'POST',
              body: JSON.stringify({
                name: targetName,
                description: targetDesc,
                public: false
              })
            });
          } else {
            throw eMe;
          }
        }

        if (!newPl || !newPl.id) {
          throw new Error('Spotify не создал новый плейлист');
        }

        // 3. Add tracks in batches of 100
        for (let i = 0; i < trackUris.length; i += 100) {
          const batch = trackUris.slice(i, i + 100);
          try {
            await spotifyApi('/playlists/' + newPl.id + '/items', {
              method: 'POST',
              body: JSON.stringify({ uris: batch })
            });
          } catch (_) {
            await spotifyApi('/playlists/' + newPl.id + '/tracks', {
              method: 'POST',
              body: JSON.stringify({ uris: batch })
            });
          }
        }

        // 4. Reload user playlists so copy is included
        await loadPlaylists();

        // 5. Open new playlist in editor
        await openEditorModal(newPl.id);
        alert(\`Создана копия плейлиста «\${targetName}» (\${trackUris.length} \${getTrackNoun(trackUris.length)})! Все треки успешно скопированы в вашу медиатеку.\`);
      } catch (err) {
        console.error('Copy playlist error:', err);
        alert('Ошибка при создании копии плейлиста: ' + err.message);
      } finally {
        if (btnCopyEditor) {
          btnCopyEditor.disabled = false;
          btnCopyEditor.textContent = 'Создать копию';
        }
      }
    };

    if (btnCopyEditor) {
      btnCopyEditor.addEventListener('click', () => {
        if (editingState.id) {
          copyPlaylist(editingState.id);
        }
      });
    }

    // ==========================================
    // DELETE PLAYLIST MODAL
    // ==========================================

    window.promptDeletePlaylist = function(id, name) {
      playlistToDeleteId = id;
      deletePlaylistName.textContent = '«' + (name || 'Плейлист') + '»';
      deleteModal.classList.add('open');
    };

    btnDeletePlaylistTrigger.addEventListener('click', () => {
      if (!editingState.id) return;
      promptDeletePlaylist(editingState.id, editorNameInput.value);
    });

    btnCancelDelete.addEventListener('click', () => {
      deleteModal.classList.remove('open');
      playlistToDeleteId = null;
    });

    btnCloseDeleteModal.addEventListener('click', () => {
      deleteModal.classList.remove('open');
      playlistToDeleteId = null;
    });

    btnConfirmDelete.addEventListener('click', async () => {
      if (!playlistToDeleteId) return;
      btnConfirmDelete.disabled = true;
      btnConfirmDelete.textContent = 'Удаление...';

      try {
        await spotifyApi('/playlists/' + playlistToDeleteId + '/followers', {
          method: 'DELETE'
        });

        cachedPlaylists = cachedPlaylists.filter(p => p.id !== playlistToDeleteId);
        playlistsCountBadge.textContent = cachedPlaylists.length;
        renderPlaylists(getFilteredPlaylists());

        deleteModal.classList.remove('open');
        editorModal.classList.remove('open');
      } catch (err) {
        alert('Ошибка удаления: ' + err.message);
      } finally {
        btnConfirmDelete.disabled = false;
        btnConfirmDelete.textContent = 'Удалить';
        playlistToDeleteId = null;
      }
    });

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
      modalReviewView.style.display = 'none';
      modalSuccessView.style.display = 'none';
      modalFooter.style.display = 'flex';
      btnBackToForm.style.display = 'none';
      btnFindTracks.style.display = 'inline-flex';
      btnCommitPlaylist.style.display = 'none';
      btnFindTracks.disabled = false;
      progressBarFill.style.width = '0%';
      liveTrackLog.innerHTML = '';
      reviewState.foundTracks = [];
      reviewState.notFoundTracks = [];
    }

    // Step 1: Click "Найти треки в Spotify"
    btnFindTracks.addEventListener('click', async () => {
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

      reviewState.playlistName = name;
      reviewState.playlistDesc = playlistDescInput.value.trim();
      reviewState.isPublic = isPublicSelection;
      reviewState.foundTracks = [];
      reviewState.notFoundTracks = [];

      // Switch to progress view
      modalFormView.style.display = 'none';
      modalProgressView.style.display = 'block';
      modalReviewView.style.display = 'none';
      modalFooter.style.display = 'none';

      liveTrackLog.innerHTML = '';
      progressStatusLabel.textContent = 'Начинаем поиск треков в Spotify...';
      progressBarFill.style.width = '0%';
      progressStatusPercentage.textContent = '0%';

      const total = trackLines.length;

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
            const artists = track.artists?.map(a => a.name).join(', ') || 'Неизвестный исполнитель';
            const img = track.album?.images?.[track.album.images.length - 1]?.url || track.album?.images?.[0]?.url || '';
            reviewState.foundTracks.push({
              id: 'f_' + Math.random().toString(36).substring(2, 9),
              query: query,
              uri: track.uri,
              name: track.name,
              artists: artists,
              image: img
            });
            logItem.className = 'log-item found';
            logItem.textContent = \`✅ Найдено: \${artists} — \${track.name}\`;
          } else {
            reviewState.notFoundTracks.push({
              id: 'nf_' + Math.random().toString(36).substring(2, 9),
              query: query
            });
            logItem.className = 'log-item not-found';
            logItem.textContent = \`❌ Не найдено: \${query}\`;
          }
        } catch (err) {
          reviewState.notFoundTracks.push({
            id: 'nf_' + Math.random().toString(36).substring(2, 9),
            query: query
          });
          logItem.className = 'log-item not-found';
          logItem.textContent = \`⚠️ Ошибка поиска: \${query}\`;
        }

        const pct = Math.round(((i + 1) / total) * 100);
        progressBarFill.style.width = pct + '%';
        progressStatusPercentage.textContent = pct + '%';
        progressStatusLabel.textContent = \`Обработано \${i + 1} из \${total}\`;

        if (i < total - 1) {
          await new Promise(r => setTimeout(r, 50));
        }
      }

      // Transition to Review Stage
      showReviewStage();
    });

    function showReviewStage() {
      modalProgressView.style.display = 'none';
      modalFormView.style.display = 'none';
      modalReviewView.style.display = 'flex';
      modalFooter.style.display = 'flex';
      btnFindTracks.style.display = 'none';
      btnBackToForm.style.display = 'inline-flex';
      btnCommitPlaylist.style.display = 'inline-flex';

      reviewPlaylistTitleDisplay.textContent = reviewState.playlistName || 'Новый плейлист';
      renderReviewLists();
    }

    function renderReviewLists() {
      const foundCount = reviewState.foundTracks.length;
      const notFoundCount = reviewState.notFoundTracks.length;

      badgeFoundCount.textContent = \`\${foundCount} найдено\`;
      colFoundCount.textContent = foundCount;

      badgeNotfoundCount.textContent = \`\${notFoundCount} не найдено\`;
      colNotfoundCount.textContent = notFoundCount;

      btnCommitPlaylist.textContent = \`🚀 Создать плейлист (\${foundCount} треков)\`;
      btnCommitPlaylist.disabled = foundCount === 0;

      // Render Found List
      if (foundCount === 0) {
        reviewFoundList.innerHTML = '<div style="color: var(--text-muted); font-size: 0.8rem; text-align: center; padding: 24px 8px;">Нет найденных треков. Отредактируйте не найденные или вернитесь назад.</div>';
      } else {
        reviewFoundList.innerHTML = reviewState.foundTracks.map(item => \`
          <div class="track-card-found" id="item-\${item.id}">
            <div class="found-info">
              \${item.image ? \`<img src="\${escapeHtml(item.image)}" class="track-thumb" alt="Cover">\` : '<div class="track-thumb"></div>'}
              <div class="track-found-meta">
                <div class="track-found-name" title="\${escapeHtml(item.name)}">\${escapeHtml(item.name)}</div>
                <div class="track-found-artist" title="\${escapeHtml(item.artists)}">\${escapeHtml(item.artists)}</div>
              </div>
            </div>
            <button type="button" class="btn-remove-track" title="Удалить из добавленных" onclick="removeFoundTrack('\${item.id}')">✕</button>
          </div>
        \`).join('');
      }

      // Render Not Found List
      if (notFoundCount === 0) {
        reviewNotfoundList.innerHTML = '<div style="color: #4ade80; font-size: 0.82rem; text-align: center; padding: 24px 8px;">🎉 Все треки успешно найдены в Spotify!</div>';
      } else {
        reviewNotfoundList.innerHTML = reviewState.notFoundTracks.map(item => \`
          <div class="track-not-found-card" id="item-\${item.id}">
            <div class="track-not-found-row">
              <input type="text" class="query-edit-input" id="input-\${item.id}" value="\${escapeHtml(item.query)}" placeholder="Введите название...">
              <button type="button" class="btn-icon" title="Искать снова" onclick="retrySingleTrack('\${item.id}')">🔍 Искать</button>
              <button type="button" class="btn-icon btn-icon-danger" title="Удалить" onclick="removeNotFoundTrack('\${item.id}')">✕</button>
            </div>
            <div id="status-\${item.id}" style="font-size: 0.72rem; color: #fca5a5;"></div>
          </div>
        \`).join('');

        // Attach Enter key listener to all retry inputs
        reviewState.notFoundTracks.forEach(item => {
          const inp = document.getElementById(\`input-\${item.id}\`);
          if (inp) {
            inp.addEventListener('keydown', (e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                retrySingleTrack(item.id);
              }
            });
          }
        });
      }
    }

    // Window global handlers for onclick
    window.removeFoundTrack = function(id) {
      reviewState.foundTracks = reviewState.foundTracks.filter(t => t.id !== id);
      renderReviewLists();
    };

    window.removeNotFoundTrack = function(id) {
      reviewState.notFoundTracks = reviewState.notFoundTracks.filter(t => t.id !== id);
      renderReviewLists();
    };

    window.retrySingleTrack = async function(id) {
      const inp = document.getElementById(\`input-\${id}\`);
      const statusElem = document.getElementById(\`status-\${id}\`);
      if (!inp) return;
      const query = inp.value.trim();
      if (!query) {
        removeNotFoundTrack(id);
        return;
      }

      if (statusElem) statusElem.textContent = '🔍 Ищем...';
      try {
        const searchRes = await spotifyApi(\`/search?q=\${encodeURIComponent(query)}&type=track&limit=1\`);
        const track = searchRes?.tracks?.items?.[0];

        if (track) {
          const artists = track.artists?.map(a => a.name).join(', ') || 'Неизвестный исполнитель';
          const img = track.album?.images?.[track.album.images.length - 1]?.url || track.album?.images?.[0]?.url || '';

          // Remove from notFoundTracks
          reviewState.notFoundTracks = reviewState.notFoundTracks.filter(t => t.id !== id);

          // Add to foundTracks
          reviewState.foundTracks.push({
            id: 'f_' + Math.random().toString(36).substring(2, 9),
            query: query,
            uri: track.uri,
            name: track.name,
            artists: artists,
            image: img
          });

          renderReviewLists();
        } else {
          if (statusElem) statusElem.textContent = 'По-прежнему не найдено. Попробуйте изменить название.';
        }
      } catch (err) {
        if (statusElem) statusElem.textContent = 'Ошибка поиска: ' + err.message;
      }
    };

    btnClearAllFound.addEventListener('click', () => {
      reviewState.foundTracks = [];
      renderReviewLists();
    });

    btnDeleteAllNotfound.addEventListener('click', () => {
      reviewState.notFoundTracks = [];
      renderReviewLists();
    });

    btnBackToForm.addEventListener('click', () => {
      modalReviewView.style.display = 'none';
      modalFormView.style.display = 'flex';
      btnBackToForm.style.display = 'none';
      btnCommitPlaylist.style.display = 'none';
      btnFindTracks.style.display = 'inline-flex';

      // Update textarea with remaining queries
      const remainingQueries = [
        ...reviewState.foundTracks.map(t => t.query),
        ...reviewState.notFoundTracks.map(t => t.query)
      ];
      if (remainingQueries.length) {
        tracksTextarea.value = remainingQueries.join('\\n');
        updateTracksCount();
      }
    });

    // Step 2: Commit Playlist to Spotify
    btnCommitPlaylist.addEventListener('click', async () => {
      if (!reviewState.foundTracks.length) {
        alert('Нет найденных треков для добавления в плейлист.');
        return;
      }

      btnCommitPlaylist.disabled = true;
      btnCommitPlaylist.textContent = '⏳ Создаем плейлист в Spotify...';

      try {
        // Ensure currentUser is loaded with valid id
        if (!currentUser || !currentUser.id) {
          currentUser = await spotifyApi('/me');
        }

        const userId = currentUser.id;
        const name = reviewState.playlistName || 'Мой плейлист';
        const desc = reviewState.playlistDesc || 'Создано через Spotify Playlist Composer';

        // Spotify Web API creates playlists at /me/playlists or /users/{user_id}/playlists
        let createRes = null;
        try {
          createRes = await spotifyApi('/me/playlists', {
            method: 'POST',
            body: JSON.stringify({
              name: name,
              description: desc,
              public: reviewState.isPublic
            })
          });
        } catch (eMe) {
          createRes = await spotifyApi(\`/users/\${encodeURIComponent(userId)}/playlists\`, {
            method: 'POST',
            body: JSON.stringify({
              name: name,
              description: desc,
              public: reviewState.isPublic
            })
          });
        }

        const newPlaylistId = createRes.id;
        const newPlaylistUrl = createRes.external_urls?.spotify;
        const uris = reviewState.foundTracks.map(t => t.uri);

        // Add tracks in batches of 100
        for (let b = 0; b < uris.length; b += 100) {
          const batch = uris.slice(b, b + 100);
          try {
            await spotifyApi(\`/playlists/\${newPlaylistId}/items\`, {
              method: 'POST',
              body: JSON.stringify({ uris: batch })
            });
          } catch (eItems) {
            await spotifyApi(\`/playlists/\${newPlaylistId}/tracks\`, {
              method: 'POST',
              body: JSON.stringify({ uris: batch })
            });
          }
        }

        // Show Success
        modalReviewView.style.display = 'none';
        modalFooter.style.display = 'none';
        modalSuccessView.style.display = 'block';

        successSummaryText.innerHTML = \`
          Плейлист <strong>«\${escapeHtml(name)}»</strong> успешно создан!<br>
          В него добавлено <strong>\${uris.length}</strong> треков.
          \${reviewState.notFoundTracks.length ? \`<br><span style="color: var(--warning); font-size: 0.82rem;">(Пропущено \${reviewState.notFoundTracks.length} не найденных)</span>\` : ''}
        \`;
        btnOpenSpotifyLink.href = newPlaylistUrl;

        // Refresh dashboard library
        await loadPlaylists();
      } catch (err) {
        console.error('Playlist creation error:', err);
        let errorMsg = err.message || 'Unknown error';
        if (errorMsg.includes('Forbidden') || errorMsg.includes('403')) {
          errorMsg = 'Forbidden (403). Скорее всего, токен авторизации не содержит прав на создание плейлистов. Пожалуйста, выйдите из профиля (кнопка «Выйти» вверху) и авторизуйтесь заново, чтобы обновить права доступа.';
        }
        alert('Ошибка при создании плейлиста: ' + errorMsg);
        btnCommitPlaylist.disabled = false;
        btnCommitPlaylist.textContent = \`🚀 Создать плейлист (\${reviewState.foundTracks.length} треков)\`;
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

    function escapeJsString(str) {
      if (!str) return '';
      return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')
        .replaceAll('\\n', ' ')
        .replaceAll('\\r', '');
    }
  </script>
</body>
</html>`;
}
