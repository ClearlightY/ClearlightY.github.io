(function() {
  var PLAYER_ID = 'site-music-player';
  var STORAGE_KEY = 'site-music-player-state-v1';
  var NAV_LOCK_CLASS = 'site-nav-loading';
  var state = window.__siteMusicPlayerState || (window.__siteMusicPlayerState = {});

  var playlist = [
    {
      title: 'Background Music',
      artist: 'Clearlight',
      src: '/music/background.mp3'
    }
  ];

  function loadPersistedState() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  }

  function savePersistedState() {
    if (!state.audio) {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        trackIndex: state.trackIndex || 0,
        currentTime: state.audio.currentTime || 0,
        paused: state.audio.paused,
        volume: state.audio.volume,
        muted: state.audio.muted
      }));
    } catch (err) {
      return;
    }
  }

  function getCurrentTrack() {
    return playlist[state.trackIndex || 0] || null;
  }

  function formatTime(value) {
    if (!isFinite(value) || value < 0) {
      return '--:--';
    }
    var total = Math.floor(value);
    var minutes = Math.floor(total / 60);
    var seconds = total % 60;
    return minutes + ':' + String(seconds).padStart(2, '0');
  }

  function createPlayer() {
    var host = document.getElementById(PLAYER_ID);
    if (host) {
      return host;
    }

    host = document.createElement('aside');
    host.id = PLAYER_ID;
    host.className = 'site-music-player';
    host.innerHTML = [
      '<div class="site-music-player__panel">',
      '  <button class="site-music-player__toggle" type="button" aria-label="Toggle music player">&#9835;</button>',
      '  <div class="site-music-player__body">',
      '    <div class="site-music-player__meta">',
      '      <p class="site-music-player__eyebrow">Music</p>',
      '      <strong class="site-music-player__title">Background Music</strong>',
      '      <span class="site-music-player__artist">Clearlight</span>',
      '    </div>',
      '    <div class="site-music-player__controls">',
      '      <button class="site-music-player__button" type="button" data-action="play">Play</button>',
      '      <button class="site-music-player__button is-secondary" type="button" data-action="mute">Mute</button>',
      '    </div>',
      '    <label class="site-music-player__volume">',
      '      <span>Volume</span>',
      '      <input class="site-music-player__slider" type="range" min="0" max="1" step="0.01" value="0.7" aria-label="Music volume">',
      '    </label>',
      '    <div class="site-music-player__progress">',
      '      <span class="site-music-player__time" data-role="current">0:00</span>',
      '      <input class="site-music-player__seek" type="range" min="0" max="100" step="0.1" value="0" aria-label="Music progress">',
      '      <span class="site-music-player__time" data-role="duration">--:--</span>',
      '    </div>',
      '    <p class="site-music-player__hint">Start playback once, then internal navigation will keep it running.</p>',
      '  </div>',
      '</div>'
    ].join('');

    document.body.appendChild(host);
    return host;
  }

  function syncPlayerUI() {
    if (!state.host || !state.audio) {
      return;
    }
    var track = getCurrentTrack();
    var playBtn = state.host.querySelector('[data-action="play"]');
    var muteBtn = state.host.querySelector('[data-action="mute"]');
    var title = state.host.querySelector('.site-music-player__title');
    var artist = state.host.querySelector('.site-music-player__artist');
    var current = state.host.querySelector('[data-role="current"]');
    var duration = state.host.querySelector('[data-role="duration"]');
    var seek = state.host.querySelector('.site-music-player__seek');
    var volume = state.host.querySelector('.site-music-player__slider');
    var hint = state.host.querySelector('.site-music-player__hint');

    if (title) {
      title.textContent = track ? track.title : 'No Track Configured';
    }
    if (artist) {
      artist.textContent = track ? (track.artist || '') : 'Add an audio file under /source/music/';
    }
    if (playBtn) {
      playBtn.textContent = state.audio.paused ? 'Play' : 'Pause';
      playBtn.disabled = !track;
    }
    if (muteBtn) {
      muteBtn.textContent = state.audio.muted ? 'Unmute' : 'Mute';
      muteBtn.disabled = !track;
    }
    if (current) {
      current.textContent = formatTime(state.audio.currentTime || 0);
    }
    if (duration) {
      duration.textContent = formatTime(state.audio.duration || 0);
    }
    if (seek) {
      var progress = state.audio.duration ? (state.audio.currentTime / state.audio.duration) * 100 : 0;
      seek.value = String(progress || 0);
      seek.disabled = !track;
    }
    if (volume) {
      volume.value = String(state.audio.volume);
      volume.disabled = !track;
    }
    if (hint) {
      if (!track) {
        hint.textContent = 'Player is ready. Put your file at /source/music/background.mp3 to enable playback.';
      } else if (state.loadError) {
        hint.textContent = 'Audio failed to load. Confirm that /source/music/background.mp3 exists.';
      } else {
        hint.textContent = 'Start playback once, then internal navigation will keep it running.';
      }
    }
    state.host.classList.toggle('is-playing', !state.audio.paused);
    state.host.classList.toggle('is-muted', !!state.audio.muted);
    state.host.classList.toggle('is-empty', !track);
    state.host.classList.toggle('is-collapsed', state.collapsed !== false);
  }

  function applyTrack(index) {
    var track = playlist[index] || null;
    state.trackIndex = index;
    state.loadError = false;
    if (!state.audio) {
      return;
    }
    if (!track) {
      state.audio.removeAttribute('src');
      state.audio.load();
      syncPlayerUI();
      savePersistedState();
      return;
    }
    if (state.audio.getAttribute('src') !== track.src) {
      state.audio.src = track.src;
      state.audio.load();
    }
    syncPlayerUI();
    savePersistedState();
  }

  function restoreAudioState() {
    var persisted = loadPersistedState();
    state.trackIndex = typeof persisted.trackIndex === 'number' ? persisted.trackIndex : 0;
    state.collapsed = true;
    state.audio.volume = typeof persisted.volume === 'number' ? persisted.volume : 0.7;
    state.audio.muted = !!persisted.muted;
    applyTrack(state.trackIndex);

    var seekTo = typeof persisted.currentTime === 'number' ? persisted.currentTime : 0;
    if (seekTo > 0) {
      state.audio.addEventListener('loadedmetadata', function onLoaded() {
        state.audio.removeEventListener('loadedmetadata', onLoaded);
        if (seekTo < state.audio.duration) {
          state.audio.currentTime = seekTo;
          syncPlayerUI();
        }
      });
    }
  }

  function togglePlay() {
    if (!getCurrentTrack()) {
      syncPlayerUI();
      return;
    }
    if (state.audio.paused) {
      state.audio.play().then(function() {
        state.loadError = false;
        syncPlayerUI();
        savePersistedState();
      }).catch(function() {
        syncPlayerUI();
      });
      return;
    }
    state.audio.pause();
    syncPlayerUI();
    savePersistedState();
  }

  function toggleMute() {
    if (!getCurrentTrack()) {
      return;
    }
    state.audio.muted = !state.audio.muted;
    syncPlayerUI();
    savePersistedState();
  }

  function bindPlayerEvents() {
    if (!state.host || state.host.getAttribute('data-bound') === '1') {
      return;
    }
    state.host.setAttribute('data-bound', '1');

    state.host.addEventListener('click', function(e) {
      var button = e.target.closest ? e.target.closest('button') : null;
      if (!button || !state.host.contains(button)) {
        return;
      }
      var action = button.getAttribute('data-action');
      if (action === 'play') {
        togglePlay();
        return;
      }
      if (action === 'mute') {
        toggleMute();
        return;
      }
      if (button.classList.contains('site-music-player__toggle')) {
        state.collapsed = !state.host.classList.contains('is-collapsed');
        syncPlayerUI();
      }
    });

    var volume = state.host.querySelector('.site-music-player__slider');
    if (volume) {
      volume.addEventListener('input', function() {
        state.audio.volume = Number(volume.value || 0.7);
        if (state.audio.volume > 0 && state.audio.muted) {
          state.audio.muted = false;
        }
        syncPlayerUI();
        savePersistedState();
      });
    }

    var seek = state.host.querySelector('.site-music-player__seek');
    if (seek) {
      seek.addEventListener('input', function() {
        if (!state.audio.duration) {
          return;
        }
        state.audio.currentTime = (Number(seek.value || 0) / 100) * state.audio.duration;
        syncPlayerUI();
      });
      seek.addEventListener('change', savePersistedState);
    }

    state.audio.addEventListener('timeupdate', function() {
      syncPlayerUI();
      if (!state.lastSaveAt || Date.now() - state.lastSaveAt > 3000) {
        state.lastSaveAt = Date.now();
        savePersistedState();
      }
    });
    state.audio.addEventListener('loadedmetadata', syncPlayerUI);
    state.audio.addEventListener('play', syncPlayerUI);
    state.audio.addEventListener('pause', syncPlayerUI);
    state.audio.addEventListener('volumechange', syncPlayerUI);
    state.audio.addEventListener('error', function() {
      state.loadError = true;
      syncPlayerUI();
    });
    state.audio.addEventListener('ended', function() {
      state.audio.currentTime = 0;
      syncPlayerUI();
      savePersistedState();
    });
  }

  function shouldHandleLink(link, event) {
    if (!link || event.defaultPrevented) {
      return false;
    }
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return false;
    }
    if (link.target && link.target !== '_self') {
      return false;
    }
    if (link.hasAttribute('download')) {
      return false;
    }
    var href = link.getAttribute('href') || '';
    if (!href || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('javascript:') === 0) {
      return false;
    }
    if (href.charAt(0) === '#') {
      return false;
    }
    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (err) {
      return false;
    }
    if (url.origin !== window.location.origin) {
      return false;
    }
    if (/\.(?:xml|json|txt|pdf|zip|rar|7z|png|jpe?g|gif|webp|svg|ico|mp3|wav|ogg|m4a|mp4|mov)$/i.test(url.pathname)) {
      return false;
    }
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) {
      return false;
    }
    return true;
  }

  function replaceNode(target, incoming, selector) {
    if (!target || !incoming) {
      return;
    }
    target.innerHTML = incoming.innerHTML;
    if (selector) {
      target.setAttribute('data-page-source', selector);
    }
  }

  function syncDocumentSettings(nextDoc) {
    document.title = nextDoc.title;
    var nextHtml = nextDoc.documentElement;
    if (nextHtml) {
      var currentHtml = document.documentElement;
      var lang = nextHtml.getAttribute('lang');
      if (lang) {
        currentHtml.setAttribute('lang', lang);
      }
      var schema = nextHtml.getAttribute('data-default-color-scheme');
      if (schema) {
        currentHtml.setAttribute('data-default-color-scheme', schema);
      } else {
        currentHtml.removeAttribute('data-default-color-scheme');
      }
    }
  }

  function refreshPageScripts() {
    if (window.Fluid && window.Fluid.boot) {
      if (typeof window.Fluid.boot.registerEvents === 'function') {
        window.Fluid.boot.registerEvents();
      }
      if (typeof window.Fluid.boot.refresh === 'function') {
        window.Fluid.boot.refresh();
      }
    }
    document.dispatchEvent(new CustomEvent('site:page-loaded', {
      detail: {
        url: window.location.href
      }
    }));
  }

  function navigate(url, options) {
    var nextUrl = typeof url === 'string' ? new URL(url, window.location.href) : url;
    if (state.navigating) {
      return Promise.resolve();
    }
    state.navigating = true;
    document.documentElement.classList.add(NAV_LOCK_CLASS);

    return window.fetch(nextUrl.href, {
      credentials: 'same-origin'
    }).then(function(res) {
      if (!res.ok) {
        throw new Error('Failed to load page');
      }
      return res.text();
    }).then(function(html) {
      var parser = new DOMParser();
      var nextDoc = parser.parseFromString(html, 'text/html');
      var nextHeader = nextDoc.querySelector('header');
      var nextMain = nextDoc.querySelector('main');
      var currentHeader = document.querySelector('header');
      var currentMain = document.querySelector('main');
      if (!nextHeader || !nextMain || !currentHeader || !currentMain) {
        window.location.href = nextUrl.href;
        return;
      }

      syncDocumentSettings(nextDoc);
      replaceNode(currentHeader, nextHeader, 'header');
      replaceNode(currentMain, nextMain, 'main');

      if (options && options.push) {
        window.history.pushState({ url: nextUrl.href }, '', nextUrl.href);
      }

      if (nextUrl.hash) {
        var hashTarget = document.getElementById(nextUrl.hash.slice(1));
        if (hashTarget) {
          hashTarget.scrollIntoView();
        }
      } else {
        window.scrollTo(0, 0);
      }

      refreshPageScripts();
    }).catch(function() {
      window.location.href = nextUrl.href;
    }).finally(function() {
      state.navigating = false;
      document.documentElement.classList.remove(NAV_LOCK_CLASS);
    });
  }

  function bindNavigation() {
    if (document.documentElement.getAttribute('data-site-nav-bound') === '1') {
      return;
    }
    document.documentElement.setAttribute('data-site-nav-bound', '1');

    document.addEventListener('click', function(event) {
      var link = event.target && event.target.closest ? event.target.closest('a') : null;
      if (!shouldHandleLink(link, event)) {
        return;
      }
      event.preventDefault();
      navigate(link.href, { push: true });
    });

    window.addEventListener('popstate', function() {
      navigate(window.location.href, { push: false });
    });
  }

  function init() {
    state.host = createPlayer();
    if (!state.audio) {
      state.audio = document.createElement('audio');
      state.audio.preload = 'metadata';
      state.audio.setAttribute('aria-hidden', 'true');
    }
    restoreAudioState();
    bindPlayerEvents();
    bindNavigation();
    syncPlayerUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
