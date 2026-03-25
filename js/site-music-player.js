(function() {
  var PLAYER_ID = 'site-music-player';
  var STORAGE_KEY = 'site-music-player-state-v2';
  var NAV_LOCK_CLASS = 'site-nav-loading';
  var state = window.__siteMusicPlayerState || (window.__siteMusicPlayerState = {});

  var playlist = [
    {
      name: 'Background Music',
      artist: 'Clearlight',
      url: '/music/background.mp3',
      cover: '/img/bg/index_bg.jpg',
      theme: '#cc874c'
    }
  ];

  function isMobileViewport() {
    return window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
  }

  function loadPersistedState() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  }

  function savePersistedState() {
    if (!state.aplayer || !state.aplayer.audio) {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        index: typeof state.aplayer.list.index === 'number' ? state.aplayer.list.index : 0,
        currentTime: state.aplayer.audio.currentTime || 0,
        volume: state.aplayer.audio.volume,
        paused: state.aplayer.audio.paused,
        muted: state.aplayer.audio.muted,
        collapsed: !!state.collapsed
      }));
    } catch (err) {
      return;
    }
  }

  function createPlayerHost() {
    var host = document.getElementById(PLAYER_ID);
    if (host) {
      return host;
    }

    host = document.createElement('aside');
    host.id = PLAYER_ID;
    host.className = 'site-music-player';
    host.innerHTML = [
      '<button class="site-music-player__toggle" type="button" aria-expanded="false" aria-label="Toggle music player">♪</button>',
      '<div class="site-music-player__shell">',
      '  <div class="site-music-player__badge">APlayer</div>',
      '  <div class="site-music-player__mount"></div>',
      '  <p class="site-music-player__hint">Start playback once, then internal navigation will keep it running.</p>',
      '</div>'
    ].join('');
    document.body.appendChild(host);
    return host;
  }

  function syncCollapsedUI() {
    if (!state.host) {
      return;
    }
    var collapsed = state.collapsed !== false;
    state.host.classList.toggle('is-collapsed', collapsed);
    var toggle = state.host.querySelector('.site-music-player__toggle');
    if (toggle) {
      toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      toggle.setAttribute('aria-label', collapsed ? 'Expand music player' : 'Collapse music player');
      toggle.textContent = collapsed ? '♪' : '×';
    }
  }

  function setCollapsed(nextValue) {
    state.collapsed = !!nextValue;
    syncCollapsedUI();
    savePersistedState();
  }

  function syncHint(message, isError) {
    if (!state.host) {
      return;
    }
    var hint = state.host.querySelector('.site-music-player__hint');
    if (!hint) {
      return;
    }
    hint.textContent = message;
    hint.classList.toggle('is-error', !!isError);
  }

  function getTrackCount() {
    return Array.isArray(playlist) ? playlist.length : 0;
  }

  function restoreAPlayerState() {
    if (!state.aplayer || !state.aplayer.audio) {
      return;
    }
    var persisted = loadPersistedState();
    var audio = state.aplayer.audio;
    var listIndex = typeof persisted.index === 'number' ? persisted.index : 0;
    state.collapsed = typeof persisted.collapsed === 'boolean' ? persisted.collapsed : true;

    if (state.aplayer.list && typeof state.aplayer.list.switch === 'function' && getTrackCount() > 1) {
      state.aplayer.list.switch(Math.max(0, Math.min(listIndex, getTrackCount() - 1)));
    }

    audio.volume = typeof persisted.volume === 'number' ? persisted.volume : 0.7;
    audio.muted = !!persisted.muted;

    if (typeof persisted.currentTime === 'number' && persisted.currentTime > 0) {
      audio.addEventListener('loadedmetadata', function onLoaded() {
        audio.removeEventListener('loadedmetadata', onLoaded);
        if (persisted.currentTime < audio.duration) {
          audio.currentTime = persisted.currentTime;
        }
      });
    }

    if (!playlist.length) {
      syncHint('Player is ready. Put your file at /source/music/background.mp3 to enable playback.', false);
      syncCollapsedUI();
      return;
    }

    syncHint('Start playback once, then internal navigation will keep it running.', false);
    syncCollapsedUI();
  }

  function bindAPlayerEvents() {
    if (!state.aplayer || state.host.getAttribute('data-player-bound') === '1') {
      return;
    }
    state.host.setAttribute('data-player-bound', '1');

    var audio = state.aplayer.audio;
    var toggle = state.host.querySelector('.site-music-player__toggle');
    if (toggle) {
      toggle.addEventListener('click', function() {
        setCollapsed(state.collapsed === false);
      });
    }
    state.aplayer.on('play', function() {
      syncHint('APlayer is active. Internal navigation will keep playback running.', false);
      savePersistedState();
    });
    state.aplayer.on('pause', savePersistedState);
    state.aplayer.on('loadstart', savePersistedState);
    state.aplayer.on('listswitch', savePersistedState);
    audio.addEventListener('timeupdate', function() {
      if (!state.lastSaveAt || Date.now() - state.lastSaveAt > 3000) {
        state.lastSaveAt = Date.now();
        savePersistedState();
      }
    });
    audio.addEventListener('volumechange', savePersistedState);
    audio.addEventListener('ended', savePersistedState);
    audio.addEventListener('error', function() {
      syncHint('Audio failed to load. Confirm that /source/music/background.mp3 exists.', true);
    });

    if (window.matchMedia) {
      var media = window.matchMedia('(max-width: 767px)');
      var onViewportChange = function(evt) {
        if (typeof loadPersistedState().collapsed !== 'boolean') {
          setCollapsed(evt.matches);
        }
      };
      if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', onViewportChange);
      } else if (typeof media.addListener === 'function') {
        media.addListener(onViewportChange);
      }
    }
  }

  function mountAPlayer() {
    if (state.aplayer || !window.APlayer) {
      return !!state.aplayer;
    }
    if (!getTrackCount()) {
      return false;
    }

    state.host = createPlayerHost();
    state.aplayer = new window.APlayer({
      container: state.host.querySelector('.site-music-player__mount'),
      fixed: false,
      mini: false,
      autoplay: false,
      theme: '#cc874c',
      loop: 'all',
      order: 'list',
      preload: 'metadata',
      volume: 0.7,
      mutex: false,
      listFolded: true,
      listMaxHeight: '220px',
      audio: playlist
    });

    restoreAPlayerState();
    bindAPlayerEvents();
    return true;
  }

  function waitForAPlayer() {
    state.host = createPlayerHost();
    state.collapsed = true;
    syncCollapsedUI();
    if (mountAPlayer()) {
      return;
    }

    syncHint('Loading APlayer resources...', false);
    if (state.aplayerWaiter) {
      window.clearTimeout(state.aplayerWaiter);
    }
    state.aplayerWaiter = window.setTimeout(function retry() {
      if (mountAPlayer()) {
        return;
      }
      syncHint('APlayer failed to load. Check CDN access or provide local APlayer assets.', true);
    }, 1200);
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

  function executeScriptsWithin(target) {
    if (!target) {
      return Promise.resolve();
    }
    var scripts = target.querySelectorAll('script');
    var chain = Promise.resolve();

    function cloneScript(source) {
      var script = document.createElement('script');
      var attrs = source.attributes;
      for (var i = 0; i < attrs.length; i++) {
        script.setAttribute(attrs[i].name, attrs[i].value);
      }
      script.text = source.text || source.textContent || '';
      return script;
    }

    for (var i = 0; i < scripts.length; i++) {
      (function(oldScript) {
        var parent = oldScript.parentNode;
        if (!parent) {
          return;
        }
        var newScript = cloneScript(oldScript);
        chain = chain.then(function() {
          return new Promise(function(resolve) {
            if (newScript.src) {
              newScript.onload = resolve;
              newScript.onerror = resolve;
            } else {
              resolve();
            }
            parent.replaceChild(newScript, oldScript);
            if (!newScript.src) {
              resolve();
            }
          });
        });
      })(scripts[i]);
    }

    return chain;
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

      return executeScriptsWithin(currentHeader).then(function() {
        return executeScriptsWithin(currentMain);
      }).then(function() {
        refreshPageScripts();
      });
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
    state.host = createPlayerHost();
    waitForAPlayer();
    bindNavigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
