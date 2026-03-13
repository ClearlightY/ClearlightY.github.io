(function() {
  var state = {
    compareMode: false,
    dayCache: {}
  };

  function isDesktop() {
    return window.matchMedia && window.matchMedia('(min-width: 768px)').matches;
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function escId(s) {
    if (window.CSS && typeof window.CSS.escape === 'function') {
      return window.CSS.escape(s);
    }
    return String(s).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
  }

  function getVisibleCount() {
    return state.compareMode && isDesktop() ? 2 : 1;
  }

  function setActionPressed(root) {
    var btn = root.querySelector('.toplist-action[data-action="toggle-compare"]');
    if (!btn) return;
    btn.setAttribute('aria-pressed', state.compareMode ? 'true' : 'false');
    btn.textContent = state.compareMode ? '退出双列对比' : '桌面双列对比';
  }

  function setActiveButton(hours, btn) {
    var buttons = hours.querySelectorAll('.toplist-hour-btn');
    for (var i = 0; i < buttons.length; i++) {
      var current = buttons[i] === btn;
      buttons[i].classList.toggle('is-active', current);
      buttons[i].setAttribute('aria-selected', current ? 'true' : 'false');
      buttons[i].setAttribute('tabindex', current ? '0' : '-1');
    }
  }

  function animatePanel(panel) {
    if (!panel || prefersReducedMotion()) {
      return;
    }
    var items = panel.querySelectorAll('.toplist-entry__content li');
    if (!items.length) {
      return;
    }
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove('toplist-animated');
      items[i].style.animationDelay = '';
    }
    panel.offsetHeight;
    for (var j = 0; j < items.length; j++) {
      items[j].style.animationDelay = Math.min(j, 24) * 16 + 'ms';
      items[j].classList.add('toplist-animated');
    }
  }

  function showPanels(hours, startIndex, count, updateHash, hashId) {
    var panels = hours.querySelectorAll('.toplist-hour-panel');
    var visibleCount = 0;
    for (var i = 0; i < panels.length; i++) {
      panels[i].hidden = true;
      panels[i].setAttribute('aria-hidden', 'true');
    }
    for (var j = startIndex; j < panels.length && visibleCount < count; j++) {
      panels[j].hidden = false;
      panels[j].setAttribute('aria-hidden', 'false');
      animatePanel(panels[j]);
      visibleCount++;
    }
    var panelsWrap = hours.querySelector('.toplist-hours__panels');
    if (panelsWrap) {
      panelsWrap.setAttribute('data-cols', String(visibleCount || 1));
    }
    var id = hashId || (panels[startIndex] ? panels[startIndex].id : '');
    if (updateHash && id && history && history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  function activateHour(hours, btn, updateHash) {
    if (!hours || !btn) {
      return;
    }
    var targetId = btn.getAttribute('data-target');
    if (!targetId) {
      return;
    }
    setActiveButton(hours, btn);
    var buttons = hours.querySelectorAll('.toplist-hour-btn');
    var idx = 0;
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i] === btn) {
        idx = i;
        break;
      }
    }
    var panels = hours.querySelectorAll('.toplist-hour-panel');
    var remaining = panels.length - idx;
    var visible = remaining > 0 ? Math.min(getVisibleCount(), remaining) : 1;
    showPanels(hours, idx, visible, updateHash !== false, targetId);
  }

  function buildHoursFromPayload(doc, payload) {
    var panels = payload && payload.panels ? payload.panels : [];
    var hours = doc.createElement('div');
    hours.className = 'toplist-hours is-lazy';

    var nav = doc.createElement('div');
    nav.className = 'toplist-hours__nav';
    nav.setAttribute('role', 'tablist');
    nav.setAttribute('aria-label', '小时选择');

    var panelsWrap = doc.createElement('div');
    panelsWrap.className = 'toplist-hours__panels';
    panelsWrap.setAttribute('data-cols', '1');

    for (var i = 0; i < panels.length; i++) {
      var item = panels[i];
      var tabId = item.panelId + '-tab';

      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.id = tabId;
      btn.className = 'toplist-hour-btn' + (i === 0 ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('tabindex', i === 0 ? '0' : '-1');
      btn.setAttribute('data-target', item.panelId);
      btn.setAttribute('data-idx', String(i));
      btn.setAttribute('aria-controls', item.panelId);
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      if (item.updatedAt) {
        btn.title = item.updatedAt;
      }
      btn.textContent = item.hourLabel || '--';
      nav.appendChild(btn);

      var panel = doc.createElement('section');
      panel.className = 'toplist-hour-panel';
      panel.id = item.panelId;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabId);
      panel.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
      panel.setAttribute('data-idx', String(i));
      if (i !== 0) {
        panel.hidden = true;
      }

      var meta = doc.createElement('div');
      meta.className = 'toplist-hour-panel__meta';

      var time = doc.createElement('span');
      time.className = 'toplist-hour-panel__time';
      time.textContent = item.hourLabel || '--';
      meta.appendChild(time);

      if (item.updatedAt) {
        var updated = doc.createElement('span');
        updated.className = 'toplist-hour-panel__updated';
        updated.textContent = item.updatedAt;
        meta.appendChild(updated);
      }

      var summary = doc.createElement('p');
      summary.className = 'toplist-hour-panel__summary';
      summary.textContent = '共 ' + (item.total || (item.entries ? item.entries.length : 0)) + ' 条，含相对上一小时变化';

      var entry = doc.createElement('div');
      entry.className = 'toplist-entry';

      var content = doc.createElement('div');
      content.className = 'toplist-entry__content';

      var list = doc.createElement('ol');
      var entries = item.entries || [];
      for (var j = 0; j < entries.length; j++) {
        var li = doc.createElement('li');
        var direction = entries[j].trend && entries[j].trend.direction ? entries[j].trend.direction : 'same';
        li.setAttribute('data-trend', direction);

        var a = doc.createElement('a');
        a.target = '_blank';
        a.rel = 'noopener';
        a.href = entries[j].url || '#';
        a.textContent = entries[j].title || '--';

        var metaWrap = doc.createElement('span');
        metaWrap.className = 'toplist-entry__meta';

        var trend = entries[j].trend;
        if (trend) {
          var trendTag = doc.createElement('span');
          trendTag.className = 'toplist-entry__trend toplist-entry__trend--' + direction;
          trendTag.title = trend.longLabel || '';
          trendTag.textContent = trend.shortLabel || '-';
          metaWrap.appendChild(trendTag);
        }

        if (entries[j].heat) {
          var heat = doc.createElement('span');
          heat.className = 'toplist-entry__heat';
          heat.title = '热度';
          heat.textContent = entries[j].heat;
          metaWrap.appendChild(heat);
        }

        li.appendChild(a);
        li.appendChild(metaWrap);
        list.appendChild(li);
      }

      content.appendChild(list);
      entry.appendChild(content);
      panel.appendChild(meta);
      panel.appendChild(summary);
      panel.appendChild(entry);
      panelsWrap.appendChild(panel);
    }

    hours.appendChild(nav);
    hours.appendChild(panelsWrap);
    return hours;
  }

  function setLazyState(day, stateName, text) {
    var lazy = day ? day.querySelector('.toplist-day__lazy') : null;
    if (!lazy) {
      return;
    }
    lazy.setAttribute('data-state', stateName || 'idle');
    lazy.classList.remove('is-fading', 'is-hidden');
    var textEl = lazy.querySelector('.toplist-day__lazy-text');
    if (text && textEl) {
      textEl.textContent = text;
    }
    var retry = lazy.querySelector('.toplist-day__retry');
    if (retry) {
      retry.hidden = stateName !== 'error';
    }
  }

  function fadeOutLazy(day) {
    var lazy = day ? day.querySelector('.toplist-day__lazy') : null;
    if (!lazy) {
      return;
    }
    lazy.classList.add('is-fading');
    setTimeout(function() {
      lazy.classList.add('is-hidden');
    }, 240);
  }

  function fetchDayPayload(day) {
    var lazy = day ? day.querySelector('.toplist-day__lazy') : null;
    var src = lazy ? lazy.getAttribute('data-src') : '';
    if (!src) {
      return Promise.resolve(null);
    }
    if (state.dayCache[src]) {
      return state.dayCache[src];
    }
    setLazyState(day, 'loading', '正在加载当日小时榜单...');
    state.dayCache[src] = fetch(src, { credentials: 'same-origin' })
      .then(function(res) {
        if (!res.ok) {
          throw new Error('HTTP ' + res.status);
        }
        return res.json();
      })
      .catch(function(err) {
        delete state.dayCache[src];
        throw err;
      });
    return state.dayCache[src];
  }

  function hydrateDayIfNeeded(day) {
    if (!day) {
      return Promise.resolve(null);
    }
    var existingHours = day.querySelector('.toplist-hours');
    if (existingHours) {
      return Promise.resolve(existingHours);
    }
    return fetchDayPayload(day).then(function(payload) {
      if (!payload || !payload.panels || !payload.panels.length) {
        setLazyState(day, 'error', '加载失败，请重试');
        return null;
      }
      var body = day.querySelector('.toplist-day__body');
      if (!body) {
        return null;
      }
      var hours = buildHoursFromPayload(day.ownerDocument, payload);
      body.innerHTML = '';
      body.appendChild(hours);
      day.setAttribute('data-day-loaded', '1');
      fadeOutLazy(day);
      return hours;
    }).catch(function() {
      setLazyState(day, 'error', '加载失败，请重试');
      return null;
    });
  }

  function ensureDayLatestHourVisible(day) {
    if (!day || !day.open) {
      return Promise.resolve();
    }
    return hydrateDayIfNeeded(day).then(function(hours) {
      if (!hours) {
        return;
      }
      var active = hours.querySelector('.toplist-hour-btn.is-active') || hours.querySelector('.toplist-hour-btn');
      if (active) {
        activateHour(hours, active, false);
      }
    });
  }

  function scrollDayIntoView(day) {
    if (!day || !day.scrollIntoView) {
      return;
    }
    day.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  function updateDayJumpActive(root, day) {
    var jumps = root.querySelectorAll('.toplist-day-jump');
    var key = day ? day.getAttribute('data-day-key') : '';
    for (var i = 0; i < jumps.length; i++) {
      jumps[i].classList.toggle('is-active', jumps[i].getAttribute('data-day-key') === key);
    }
  }

  function expandLatest(root) {
    var days = root.querySelectorAll('details.toplist-day');
    for (var i = 0; i < days.length; i++) {
      days[i].open = i === 0;
    }
    var latestDay = days[0];
    if (!latestDay) {
      return;
    }
    ensureDayLatestHourVisible(latestDay).then(function() {
      updateDayJumpActive(root, latestDay);
    });
  }

  function collapseAll(root) {
    var days = root.querySelectorAll('details.toplist-day');
    for (var i = 0; i < days.length; i++) {
      days[i].open = false;
    }
  }

  function findDayByPanelId(root, panelId) {
    var days = root.querySelectorAll('details.toplist-day');
    for (var i = 0; i < days.length; i++) {
      var panelIds = (days[i].getAttribute('data-panel-ids') || '').split(',');
      for (var j = 0; j < panelIds.length; j++) {
        if (panelIds[j] === panelId) {
          return days[i];
        }
      }
    }
    return null;
  }

  function applyHash(root) {
    var hash = location.hash ? location.hash.slice(1) : '';
    if (!hash) {
      return Promise.resolve();
    }

    var panel = document.getElementById(hash);
    if (panel) {
      var panelDay = panel.closest('details.toplist-day');
      var panelHours = panel.closest('.toplist-hours');
      if (panelDay) {
        panelDay.open = true;
        updateDayJumpActive(root, panelDay);
      }
      if (panelHours) {
        var btn = panelHours.querySelector('.toplist-hour-btn[data-target="' + escId(hash) + '"]');
        if (btn) {
          activateHour(panelHours, btn, false);
        }
      }
      return Promise.resolve();
    }

    var lazyDay = findDayByPanelId(root, hash);
    if (!lazyDay) {
      return Promise.resolve();
    }
    lazyDay.open = true;
    updateDayJumpActive(root, lazyDay);

    return hydrateDayIfNeeded(lazyDay).then(function(hours) {
      if (!hours) {
        return;
      }
      var btn = hours.querySelector('.toplist-hour-btn[data-target="' + escId(hash) + '"]');
      if (btn) {
        activateHour(hours, btn, false);
      }
    });
  }

  function refreshVisibleHours(root) {
    var openDays = root.querySelectorAll('details.toplist-day[open]');
    for (var i = 0; i < openDays.length; i++) {
      var hours = openDays[i].querySelector('.toplist-hours');
      if (!hours) {
        continue;
      }
      var active = hours.querySelector('.toplist-hour-btn.is-active') || hours.querySelector('.toplist-hour-btn');
      if (active) {
        activateHour(hours, active, false);
      }
    }
  }

  function init() {
    var root = document.querySelector('.toplist-page');
    if (!root) {
      return;
    }

    setActionPressed(root);

    root.addEventListener('click', function(e) {
      var actionBtn = e.target && e.target.closest ? e.target.closest('.toplist-action') : null;
      if (actionBtn && root.contains(actionBtn)) {
        var action = actionBtn.getAttribute('data-action') || '';
        if (action === 'collapse-all') {
          collapseAll(root);
        } else if (action === 'expand-latest') {
          expandLatest(root);
        } else if (action === 'toggle-compare') {
          state.compareMode = !state.compareMode;
          root.classList.toggle('is-compare-mode', state.compareMode);
          setActionPressed(root);
          refreshVisibleHours(root);
        }
        return;
      }

      var jumpBtn = e.target && e.target.closest ? e.target.closest('.toplist-day-jump') : null;
      if (jumpBtn && root.contains(jumpBtn)) {
        var dayKey = jumpBtn.getAttribute('data-day-key');
        var day = root.querySelector('details.toplist-day[data-day-key="' + escId(dayKey) + '"]');
        if (!day) {
          return;
        }
        day.open = true;
        updateDayJumpActive(root, day);
        ensureDayLatestHourVisible(day).then(function() {
          scrollDayIntoView(day);
        });
        return;
      }

      var hourBtn = e.target && e.target.closest ? e.target.closest('.toplist-hour-btn') : null;
      if (hourBtn && root.contains(hourBtn)) {
        var hours = hourBtn.closest ? hourBtn.closest('.toplist-hours') : null;
        if (hours) {
          activateHour(hours, hourBtn, true);
        }
        return;
      }

      var retryBtn = e.target && e.target.closest ? e.target.closest('.toplist-day__retry') : null;
      if (retryBtn && root.contains(retryBtn)) {
        var retryDay = retryBtn.closest ? retryBtn.closest('details.toplist-day') : null;
        if (retryDay) {
          hydrateDayIfNeeded(retryDay).then(function(hours) {
            if (!hours) return;
            var active = hours.querySelector('.toplist-hour-btn');
            if (active) {
              activateHour(hours, active, false);
            }
          });
        }
        return;
      }

      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a || !root.contains(a)) {
        return;
      }
      var li = a.closest('li');
      if (!li) {
        return;
      }
      li.classList.add('toplist-clicked');
      setTimeout(function() {
        li.classList.remove('toplist-clicked');
      }, 280);
    });

    root.addEventListener('keydown', function(e) {
      var btn = e.target && e.target.closest ? e.target.closest('.toplist-hour-btn') : null;
      if (!btn || !root.contains(btn)) {
        return;
      }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Home' && e.key !== 'End') {
        return;
      }
      var nav = btn.parentElement;
      if (!nav) {
        return;
      }
      var buttons = nav.querySelectorAll('.toplist-hour-btn');
      if (!buttons.length) {
        return;
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
        return;
      }
      var idx = -1;
      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] === btn) {
          idx = i;
          break;
        }
      }
      if (idx < 0) {
        return;
      }
      e.preventDefault();
      var next = idx;
      if (e.key === 'ArrowRight') next = idx + 1;
      if (e.key === 'ArrowLeft') next = idx - 1;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = buttons.length - 1;
      if (next < 0) next = buttons.length - 1;
      if (next >= buttons.length) next = 0;
      buttons[next].focus();
      activateHour(nav.parentElement, buttons[next], true);
    });

    root.addEventListener('toggle', function(e) {
      var day = e.target;
      if (!day || !day.classList || !day.classList.contains('toplist-day')) {
        return;
      }
      if (day.open) {
        updateDayJumpActive(root, day);
      }
      ensureDayLatestHourVisible(day);
    }, true);

    applyHash(root).then(function() {
      var openDays = root.querySelectorAll('details.toplist-day[open]');
      for (var i = 0; i < openDays.length; i++) {
        ensureDayLatestHourVisible(openDays[i]);
      }
      if (openDays[0]) {
        updateDayJumpActive(root, openDays[0]);
      }
    });

    if (window.matchMedia) {
      var media = window.matchMedia('(min-width: 768px)');
      var onChange = function() {
        refreshVisibleHours(root);
      };
      if (media.addEventListener) {
        media.addEventListener('change', onChange);
      } else if (media.addListener) {
        media.addListener(onChange);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
