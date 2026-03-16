(function() {
  var state = {
    compareMode: false,
    mobileChangesOnly: false,
    filterMode: 'all',
    filterSearch: '',
    dayCache: {},
    calendarMonths: [],
    calendarDays: {},
    calendarMonthIndex: 0,
    calendarCloseTimer: null,
    desktopScrollY: 0,
    programmaticDayKey: '',
    currentDayKey: '',
    currentPanelId: ''
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

  function formatHeat(heat) {
    if (heat === null || heat === undefined || heat === '') {
      return '';
    }
    return String(heat).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function getVisibleCount() {
    return state.compareMode && isDesktop() ? 2 : 1;
  }

  function isMobileChangesMode() {
    return !isDesktop() && state.mobileChangesOnly;
  }

  function setActionPressed(root) {
    var compareBtn = root.querySelector('.toplist-action[data-action="toggle-compare"]');
    var mobileBtn = root.querySelector('.toplist-action[data-action="toggle-changes"]');
    if (compareBtn) {
      compareBtn.setAttribute('aria-pressed', state.compareMode ? 'true' : 'false');
      compareBtn.textContent = state.compareMode ? '退出双列对比' : '桌面双列对比';
    }
    if (mobileBtn) {
      mobileBtn.setAttribute('aria-pressed', state.mobileChangesOnly ? 'true' : 'false');
      mobileBtn.textContent = state.mobileChangesOnly ? '显示全部' : '只看变化';
    }
  }

  function getPanelsData(hours) {
    return hours && hours._toplistPanelsData ? hours._toplistPanelsData : [];
  }

  function findRenderedPanel(hours, index) {
    return hours ? hours.querySelector('.toplist-hour-panel[data-idx="' + index + '"]') : null;
  }

  function setActionPressed(root) {
    var compareBtn = root.querySelector('.toplist-action[data-action="toggle-compare"]');
    var mobileBtn = root.querySelector('.toplist-action[data-action="toggle-changes"]');
    if (compareBtn) {
      compareBtn.setAttribute('aria-pressed', state.compareMode ? 'true' : 'false');
      compareBtn.textContent = state.compareMode ? '\u9000\u51fa\u53cc\u5217\u5bf9\u6bd4' : '\u684c\u9762\u53cc\u5217\u5bf9\u6bd4';
    }
    if (mobileBtn) {
      mobileBtn.setAttribute('aria-pressed', state.mobileChangesOnly ? 'true' : 'false');
      mobileBtn.textContent = state.mobileChangesOnly ? '\u663e\u793a\u5168\u90e8' : '\u53ea\u770b\u53d8\u5316';
    }
  }

  function setToolbarState(toolbar) {
    if (!toolbar) {
      return;
    }
    toolbar.setAttribute('data-filter-mode', state.filterMode);
    toolbar.setAttribute('data-filter-search', state.filterSearch);
    var input = toolbar.querySelector('.toplist-filter__input');
    if (input && input.value !== state.filterSearch) {
      input.value = state.filterSearch;
    }
  }

  function syncPanelToolbar(panel) {
    if (!panel) {
      return;
    }
    var toolbar = panel.querySelector('.toplist-filter');
    if (!toolbar) {
      return;
    }
    setToolbarState(toolbar);
    applyPanelFilter(panel);
  }

  function syncAllPanelFilters(root) {
    var panels = root.querySelectorAll('.toplist-hour-panel');
    for (var i = 0; i < panels.length; i++) {
      syncPanelToolbar(panels[i]);
    }
  }

  function updateStickyBar(root, day, panel) {
    var sticky = root.querySelector('.toplist-stickybar');
    if (!sticky) {
      return;
    }
    var value = sticky.querySelector('.toplist-stickybar__value');
    var dateEl = sticky.querySelector('.toplist-stickybar__date');
    var meta = sticky.querySelector('.toplist-stickybar__meta');
    var compare = sticky.querySelector('.toplist-stickybar__compare');
    var progress = sticky.querySelector('.toplist-stickybar__progress');
    var prevBtn = sticky.querySelector('[data-action="prev-hour"]');
    var nextBtn = sticky.querySelector('[data-action="next-hour"]');
    var hours = panel ? panel.closest('.toplist-hours') : (day ? day.querySelector('.toplist-hours') : null);
    var label = '--';
    var dateLabel = '--';
    if (day && panel) {
      var dateText = day.getAttribute('data-date') || '';
      var timeEl = panel.querySelector('.toplist-hour-panel__time');
      var timeText = timeEl ? timeEl.textContent : '';
      dateLabel = dateText || '--';
      label = timeText || '--';
    }
    if (value) {
      value.textContent = label;
    }
    if (dateEl) {
      dateEl.textContent = dateLabel;
    }
    if (compare) {
      if (state.compareMode && isDesktop() && hours) {
        var active = hours.querySelector('.toplist-hour-btn.is-active');
        var activeIdx = active ? Number(active.getAttribute('data-idx') || '0') : 0;
        var panelsData = getPanelsData(hours);
        var nextPanel = panelsData[activeIdx + 1];
        compare.hidden = !nextPanel;
        compare.textContent = nextPanel ? ('\u5bf9\u6bd4 ' + (panelsData[activeIdx] ? panelsData[activeIdx].hourLabel : '--') + ' vs ' + nextPanel.hourLabel) : '';
      } else {
        compare.hidden = true;
        compare.textContent = '';
      }
    }
    if (hours) {
      var activeBtn = hours.querySelector('.toplist-hour-btn.is-active');
      var idx = activeBtn ? Number(activeBtn.getAttribute('data-idx') || '0') : 0;
      var total = getPanelsData(hours).length;
      if (meta) {
        if (idx === 0) {
          meta.textContent = total > 1 ? '\u6700\u65b0\u65f6\u6bb5' : '\u552f\u4e00\u65f6\u6bb5';
        } else if (idx === total - 1) {
          meta.textContent = '\u6700\u65e9\u65f6\u6bb5';
        } else {
          meta.textContent = (idx + 1) + ' / ' + total + ' \u65f6\u6bb5';
        }
      }
      if (progress) {
        progress.style.height = total > 1 ? ((idx / (total - 1)) * 100).toFixed(2) + '%' : '100%';
      }
      if (prevBtn) {
        prevBtn.disabled = idx >= total - 1;
      }
      if (nextBtn) {
        nextBtn.disabled = idx <= 0;
      }
    } else {
      if (meta) {
        meta.textContent = '\u672a\u9009\u4e2d\u65f6\u6bb5';
      }
      if (progress) {
        progress.style.height = '0%';
      }
      if (prevBtn) {
        prevBtn.disabled = true;
      }
      if (nextBtn) {
        nextBtn.disabled = true;
      }
    }
  }

  function updateCurrentContext(root, day, panel) {
    state.currentDayKey = day ? (day.getAttribute('data-day-key') || '') : '';
    state.currentPanelId = panel ? (panel.id || '') : '';
    updateStickyBar(root, day, panel);
  }

  function ensureStickyBar(root) {
    return;
  }

  function buildPanelElement(doc, item, index, panelCount) {
    var tabId = item.panelId + '-tab';
    var panel = doc.createElement('section');
    panel.className = 'toplist-hour-panel';
    panel.id = item.panelId;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.setAttribute('aria-hidden', 'true');
    panel.setAttribute('data-idx', String(index));

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
    summary.textContent = buildPanelSummary(item, index, panelCount);

    var statsBar = buildStatsBar(doc, item.stats);
    var toolbar = buildFilterToolbar(doc);

    var entry = doc.createElement('div');
    entry.className = 'toplist-entry';
    var content = doc.createElement('div');
    content.className = 'toplist-entry__content';
    var list = doc.createElement('ol');
    var entries = item.entries || [];

    for (var j = 0; j < entries.length; j++) {
      var li = doc.createElement('li');
      var direction = entries[j].trend && entries[j].trend.direction ? entries[j].trend.direction : 'same';
      var emphasis = entries[j].trend && entries[j].trend.emphasis ? entries[j].trend.emphasis : 'default';
      var rank = entries[j].rank || (j + 1);
      li.setAttribute('data-rank', String(rank));
      li.setAttribute('data-trend', direction);
      li.setAttribute('data-emphasis', emphasis);

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
        heat.textContent = formatHeat(entries[j].heat);
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
    panel.appendChild(statsBar);
    panel.appendChild(toolbar);
    panel.appendChild(entry);
    return panel;
  }

  function ensurePanelRendered(hours, index) {
    if (!hours) {
      return null;
    }
    var existing = findRenderedPanel(hours, index);
    if (existing) {
      return existing;
    }
    var panelsData = getPanelsData(hours);
    var item = panelsData[index];
    var panelsWrap = hours.querySelector('.toplist-hours__panels');
    if (!item || !panelsWrap) {
      return null;
    }
    var panel = buildPanelElement(hours.ownerDocument, item, index, panelsData.length);
    panelsWrap.appendChild(panel);
    applyPanelFilter(panel);
    return panel;
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

  function bindHourNavDrag(nav) {
    if (!nav || nav.getAttribute('data-drag-bound') === '1') {
      return;
    }
    nav.setAttribute('data-drag-bound', '1');

    var dragState = {
      active: false,
      moved: false,
      startX: 0,
      startScrollLeft: 0
    };

    nav.addEventListener('mousedown', function(e) {
      if (!isDesktop() || e.button !== 0) {
        return;
      }
      dragState.active = true;
      dragState.moved = false;
      dragState.startX = e.clientX;
      dragState.startScrollLeft = nav.scrollLeft;
      nav.classList.add('is-dragging');
      document.body.classList.add('toplist-hours-dragging');
    });

    window.addEventListener('mousemove', function(e) {
      if (!dragState.active) {
        return;
      }
      var deltaX = e.clientX - dragState.startX;
      if (Math.abs(deltaX) > 4) {
        dragState.moved = true;
      }
      nav.scrollLeft = dragState.startScrollLeft - deltaX;
    });

    window.addEventListener('mouseup', function() {
      if (!dragState.active) {
        return;
      }
      dragState.active = false;
      nav.classList.remove('is-dragging');
      document.body.classList.remove('toplist-hours-dragging');
      if (dragState.moved) {
        nav.setAttribute('data-drag-moved', '1');
        setTimeout(function() {
          nav.removeAttribute('data-drag-moved');
        }, 120);
      }
    });

    nav.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
  }

  function animatePanel(panel) {
    if (!panel || prefersReducedMotion()) {
      return;
    }
  }

  function showPanels(hours, startIndex, count, updateHash, hashId) {
    var panelsData = getPanelsData(hours);
    var total = panelsData.length;
    var panels = hours.querySelectorAll('.toplist-hour-panel');
    var visibleCount = 0;
    for (var i = 0; i < panels.length; i++) {
      panels[i].hidden = true;
      panels[i].setAttribute('aria-hidden', 'true');
    }
    for (var j = startIndex; j < total && visibleCount < count; j++) {
      var panel = ensurePanelRendered(hours, j);
      if (!panel) {
        continue;
      }
      panel.hidden = false;
      panel.setAttribute('aria-hidden', 'false');
      animatePanel(panel);
      visibleCount++;
    }
    var panelsWrap = hours.querySelector('.toplist-hours__panels');
    if (panelsWrap) {
      panelsWrap.setAttribute('data-cols', String(visibleCount || 1));
    }
    var activePanel = ensurePanelRendered(hours, startIndex);
    var id = hashId || (activePanel ? activePanel.id : '');
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
    var panelCount = getPanelsData(hours).length;
    var remaining = panelCount - idx;
    var visible = remaining > 0 ? Math.min(getVisibleCount(), remaining) : 1;
    showPanels(hours, idx, visible, updateHash !== false, targetId);
    var panel = ensurePanelRendered(hours, idx);
    var day = hours.closest ? hours.closest('details.toplist-day') : null;
    var root = hours.closest ? hours.closest('.toplist-page') : null;
    if (root) {
      updateCurrentContext(root, day, panel);
    }
  }

  function buildPanelSummary(item, panelIndex, panelCount) {
    var total = item.total || (item.entries ? item.entries.length : 0);
    if (item.isEarliest || panelIndex === panelCount - 1) {
      return '\u5171 ' + total + ' \u6761\uff0c\u6682\u65e0\u66f4\u65e9\u5c0f\u65f6\u53ef\u5bf9\u6bd4';
    }
    return '\u5171 ' + total + ' \u6761\uff0c\u542b\u76f8\u5bf9\u4e0a\u4e00\u5c0f\u65f6\u53d8\u5316';
  }

  function buildStatsBar(doc, stats) {
    var safeStats = stats || { new: 0, up: 0, down: 0, same: 0 };
    var bar = doc.createElement('div');
    bar.className = 'toplist-hour-panel__stats';
    bar.setAttribute('aria-label', '\u53d8\u5316\u7edf\u8ba1');

    var items = [
      { cls: 'new', label: 'NEW ', value: safeStats.new || 0 },
      { cls: 'up', label: '\u4e0a\u5347 ', value: safeStats.up || 0 },
      { cls: 'down', label: '\u4e0b\u964d ', value: safeStats.down || 0 },
      { cls: 'same', label: '\u6301\u5e73 ', value: safeStats.same || 0 }
    ];

    for (var i = 0; i < items.length; i++) {
      var chip = doc.createElement('span');
      chip.className = 'toplist-stat toplist-stat--' + items[i].cls;
      chip.textContent = items[i].label + items[i].value;
      bar.appendChild(chip);
    }

    return bar;
  }

  function buildFilterToolbar(doc) {
    var frag = doc.createDocumentFragment();
    var wrap = doc.createElement('div');
    wrap.className = 'toplist-filter';
    wrap.setAttribute('data-filter-mode', state.filterMode);
    wrap.setAttribute('data-filter-search', state.filterSearch);

    var chips = doc.createElement('div');
    chips.className = 'toplist-filter__chips';
    chips.setAttribute('role', 'toolbar');
    chips.setAttribute('aria-label', '\u699c\u5355\u7b5b\u9009');

    var items = [
      { mode: 'all', label: '\u5168\u90e8' },
      { mode: 'changes', label: '\u53ea\u770b\u53d8\u5316' },
      { mode: 'new', label: '\u65b0\u4e0a\u699c' },
      { mode: 'up', label: '\u4e0a\u5347' },
      { mode: 'top10', label: 'Top10' }
    ];

    for (var i = 0; i < items.length; i++) {
      var chip = doc.createElement('button');
      chip.type = 'button';
      var active = items[i].mode === state.filterMode;
      chip.className = 'toplist-filter__chip' + (active ? ' is-active' : '');
      chip.setAttribute('data-filter', items[i].mode);
      chip.setAttribute('aria-pressed', active ? 'true' : 'false');
      chip.textContent = items[i].label;
      chips.appendChild(chip);
    }

    var search = doc.createElement('div');
    search.className = 'toplist-filter__search';

    var input = doc.createElement('input');
    input.type = 'search';
    input.className = 'toplist-filter__input';
    input.placeholder = '\u641c\u7d22\u5173\u952e\u8bcd';
    input.setAttribute('inputmode', 'search');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('aria-label', '\u641c\u7d22\u5f53\u524d\u699c\u5355\u5173\u952e\u8bcd');
    input.value = state.filterSearch;
    search.appendChild(input);

    var count = doc.createElement('span');
    count.className = 'toplist-filter__count';
    count.setAttribute('aria-live', 'polite');
    search.appendChild(count);

    wrap.appendChild(chips);
    wrap.appendChild(search);
    frag.appendChild(wrap);

    var empty = doc.createElement('p');
    empty.className = 'toplist-filter__empty';
    empty.hidden = true;
    empty.textContent = '\u5f53\u524d\u7b5b\u9009\u4e0b\u6682\u65e0\u7ed3\u679c';
    frag.appendChild(empty);

    return frag;
  }

  function buildHoursFromPayload(doc, payload) {
    var panels = payload && payload.panels ? payload.panels : [];
    var hours = doc.createElement('div');
    hours.className = 'toplist-hours is-lazy';
    hours._toplistPanelsData = panels;

    var nav = doc.createElement('div');
    nav.className = 'toplist-hours__nav';
    nav.setAttribute('role', 'tablist');
    nav.setAttribute('aria-label', '小时选择');
    bindHourNavDrag(nav);

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
    }

    if (panels.length) {
      var initialPanel = buildPanelElement(doc, panels[0], 0, panels.length);
      initialPanel.setAttribute('aria-hidden', 'false');
      initialPanel.hidden = false;
      panelsWrap.appendChild(initialPanel);
      syncPanelToolbar(initialPanel);
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
    setLazyState(day, 'loading', '\u6b63\u5728\u52a0\u8f7d\u5f53\u65e5\u5c0f\u65f6\u699c\u5355...');
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
        setLazyState(day, 'error', '\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5');
        return null;
      }
      var body = day.querySelector('.toplist-day__body');
      if (!body) {
        return null;
      }
      var hours = buildHoursFromPayload(day.ownerDocument, payload);
      body.innerHTML = '';
      body.appendChild(hours);
      var firstPanel = hours.querySelector('.toplist-hour-panel');
      if (firstPanel) {
        applyPanelFilter(firstPanel);
      }
      day.setAttribute('data-day-loaded', '1');
      fadeOutLazy(day);
      return hours;
    }).catch(function() {
      setLazyState(day, 'error', '\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5');
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
      var latestBtn = hours.querySelector('.toplist-hour-btn');
      if (latestBtn) {
        activateHour(hours, latestBtn, false);
      }
    });
  }

  function scrollDayIntoView(day) {
    if (!day) {
      return;
    }
    var rect = day.getBoundingClientRect ? day.getBoundingClientRect() : null;
    if (!rect || typeof window.scrollTo !== 'function') {
      if (day.scrollIntoView) {
        day.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }
      return;
    }
    var offset = isDesktop() ? 78 : 72;
    var targetTop = window.pageYOffset + rect.top - offset;
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }

  function settleAndScrollToDay(day) {
    return new Promise(function(resolve) {
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          scrollDayIntoView(day);
          resolve();
        });
      });
    });
  }

  function collectCalendarData(root) {
    var days = root.querySelectorAll('details.toplist-day[data-date]');
    var monthMap = {};
    var monthOrder = [];
    var dayMap = {};

    for (var i = 0; i < days.length; i++) {
      var dateText = days[i].getAttribute('data-date') || '';
      var dayKey = days[i].getAttribute('data-day-key') || '';
      if (!dateText || !dayKey) {
        continue;
      }
      var monthKey = dateText.slice(0, 7);
      if (!monthMap[monthKey]) {
        monthMap[monthKey] = true;
        monthOrder.push(monthKey);
      }
      dayMap[dateText] = dayKey;
    }

    state.calendarMonths = monthOrder;
    state.calendarDays = dayMap;
    state.calendarMonthIndex = 0;
  }

  function formatCalendarTitle(monthKey) {
    if (!monthKey) {
      return '';
    }
    return monthKey;
  }

  function currentActiveDayKey(root) {
    var activeJump = root.querySelector('.toplist-day-jump.is-active');
    return activeJump ? (activeJump.getAttribute('data-day-key') || '') : '';
  }

  function padDayNumber(day) {
    return day < 10 ? '0' + day : String(day);
  }

  function lockDesktopScroll() {
    if (!isDesktop()) {
      return;
    }
    state.desktopScrollY = window.pageYOffset || window.scrollY || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + state.desktopScrollY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  function unlockDesktopScroll() {
    if (!isDesktop() && !document.body.style.position) {
      return;
    }
    var scrollY = state.desktopScrollY || 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    if (isDesktop()) {
      window.scrollTo(0, scrollY);
    }
  }

  function openCalendar(root) {
    var trigger = root.querySelector('.toplist-calendar-trigger');
    var backdrop = root.querySelector('.toplist-calendar-backdrop');
    var panel = root.querySelector('.toplist-calendar');
    if (!trigger || !panel || root.classList.contains('is-calendar-open')) {
      return;
    }
    if (state.calendarCloseTimer) {
      clearTimeout(state.calendarCloseTimer);
      state.calendarCloseTimer = null;
    }
    if (backdrop) {
      backdrop.hidden = false;
    }
    lockDesktopScroll();
    panel.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(function() {
      root.classList.add('is-calendar-open');
      document.documentElement.classList.add('toplist-calendar-open');
    });
  }

  function closeCalendar(root) {
    var trigger = root.querySelector('.toplist-calendar-trigger');
    var backdrop = root.querySelector('.toplist-calendar-backdrop');
    var panel = root.querySelector('.toplist-calendar');
    if (!trigger || !panel) {
      return;
    }
    trigger.setAttribute('aria-expanded', 'false');
    root.classList.remove('is-calendar-open');
    document.documentElement.classList.remove('toplist-calendar-open');
    unlockDesktopScroll();
    if (state.calendarCloseTimer) {
      clearTimeout(state.calendarCloseTimer);
    }
    state.calendarCloseTimer = setTimeout(function() {
      panel.hidden = true;
      if (backdrop) {
        backdrop.hidden = true;
      }
      state.calendarCloseTimer = null;
    }, prefersReducedMotion() ? 0 : 260);
  }

  function getLatestDayKey(root) {
    var latestDay = root.querySelector('details.toplist-day[data-day-key]');
    return latestDay ? (latestDay.getAttribute('data-day-key') || '') : '';
  }

  function renderCalendar(root, selectedDayKey) {
    var panel = root.querySelector('.toplist-calendar');
    var title = root.querySelector('.toplist-calendar__title');
    var grid = root.querySelector('.toplist-calendar__grid');
    var prevBtn = root.querySelector('.toplist-calendar__nav[data-action="calendar-prev"]');
    var nextBtn = root.querySelector('.toplist-calendar__nav[data-action="calendar-next"]');
    if (!panel || !title || !grid || !state.calendarMonths.length) {
      return;
    }

    var monthIndex = state.calendarMonthIndex;
    if (monthIndex < 0) monthIndex = 0;
    if (monthIndex >= state.calendarMonths.length) monthIndex = state.calendarMonths.length - 1;
    state.calendarMonthIndex = monthIndex;

    var monthKey = state.calendarMonths[monthIndex];
    var latestDayKey = getLatestDayKey(root);
    title.textContent = formatCalendarTitle(monthKey);
    if (prevBtn) {
      prevBtn.disabled = monthIndex >= state.calendarMonths.length - 1;
    }
    if (nextBtn) {
      nextBtn.disabled = monthIndex <= 0;
    }

    var parts = monthKey.split('-');
    var year = Number(parts[0]);
    var monthNumber = Number(parts[1]);
    var firstDate = new Date(year, monthNumber - 1, 1);
    var offset = (firstDate.getDay() + 6) % 7;
    var totalDays = new Date(year, monthNumber, 0).getDate();
    var cells = [];

    for (var i = 0; i < offset; i++) {
      cells.push('<span class="toplist-calendar__cell toplist-calendar__cell--blank" aria-hidden="true"></span>');
    }

    for (var day = 1; day <= totalDays; day++) {
      var dayLabel = padDayNumber(day);
      var dateText = monthKey + '-' + dayLabel;
      var dayKey = state.calendarDays[dateText] || '';
      var isAvailable = !!dayKey;
      var isSelected = !!selectedDayKey && dayKey === selectedDayKey;
      var isLatest = !!latestDayKey && dayKey === latestDayKey;
      var classes = 'toplist-calendar__cell toplist-calendar__day';
      if (isAvailable) {
        classes += ' is-available';
      } else {
        classes += ' is-empty';
      }
      if (isSelected) {
        classes += ' is-selected';
      }
      if (isLatest) {
        classes += ' is-latest';
      }
      if (isAvailable) {
        cells.push('<button type="button" class="' + classes + '" data-action="calendar-pick" data-day-key="' + dayKey + '" data-date="' + dateText + '" role="gridcell" aria-selected="' + (isSelected ? 'true' : 'false') + '" aria-label="' + dateText + (isLatest ? ' 最新日期' : '') + '"><span>' + day + '</span>' + (isLatest ? '<span class="toplist-calendar__latest-badge">最新</span>' : '') + '</button>');
      } else {
        cells.push('<span class="' + classes + '" role="gridcell" aria-disabled="true"><span>' + day + '</span></span>');
      }
    }

    grid.innerHTML = cells.join('');
  }

  function syncCalendar(root, dayKey) {
    if (!state.calendarMonths.length) {
      collectCalendarData(root);
    }
    var selectedDate = '';
    var days = root.querySelectorAll('details.toplist-day[data-date]');
    for (var i = 0; i < days.length; i++) {
      if (days[i].getAttribute('data-day-key') === dayKey) {
        selectedDate = days[i].getAttribute('data-date') || '';
        break;
      }
    }
    if (selectedDate) {
      var monthKey = selectedDate.slice(0, 7);
      var monthIndex = state.calendarMonths.indexOf(monthKey);
      if (monthIndex >= 0) {
        state.calendarMonthIndex = monthIndex;
      }
    }
    renderCalendar(root, dayKey);
  }

  function updateDayJumpActive(root, day) {
    var jumps = root.querySelectorAll('.toplist-day-jump');
    var key = day ? day.getAttribute('data-day-key') : '';
    for (var i = 0; i < jumps.length; i++) {
      jumps[i].classList.toggle('is-active', jumps[i].getAttribute('data-day-key') === key);
    }
    syncCalendar(root, key);
  }

  function jumpToDay(root, dayKey, shouldScroll) {
    if (!dayKey) {
      return Promise.resolve();
    }
    var day = root.querySelector('details.toplist-day[data-day-key="' + escId(dayKey) + '"]');
    if (!day) {
      return Promise.resolve();
    }
    closeOtherDays(root, day);
    state.programmaticDayKey = dayKey;
    day.open = true;
    updateDayJumpActive(root, day);
    return ensureDayLatestHourVisible(day).then(function() {
      if (shouldScroll !== false) {
        return settleAndScrollToDay(day);
      }
    });
  }

  function closeOtherDays(root, activeDay) {
    var days = root.querySelectorAll('details.toplist-day');
    for (var i = 0; i < days.length; i++) {
      if (activeDay && days[i] === activeDay) {
        continue;
      }
      days[i].open = false;
    }
  }

  function getActiveHours(root) {
    var day = root.querySelector('details.toplist-day[open]');
    if (!day) {
      return null;
    }
    return day.querySelector('.toplist-hours');
  }

  function stepHour(root, direction) {
    var hours = getActiveHours(root);
    if (!hours) {
      return;
    }
    var active = hours.querySelector('.toplist-hour-btn.is-active') || hours.querySelector('.toplist-hour-btn');
    if (!active) {
      return;
    }
    var idx = Number(active.getAttribute('data-idx') || '0');
    var nextIdx = idx + direction;
    var buttons = hours.querySelectorAll('.toplist-hour-btn');
    if (nextIdx < 0 || nextIdx >= buttons.length) {
      return;
    }
    activateHour(hours, buttons[nextIdx], true);
  }

  function expandLatest(root) {
    var days = root.querySelectorAll('details.toplist-day');
    var latestDay = days[0];
    if (!latestDay) {
      return;
    }
    closeOtherDays(root, latestDay);
    latestDay.open = true;
    ensureDayLatestHourVisible(latestDay).then(function() {
      updateDayJumpActive(root, latestDay);
      var panel = latestDay.querySelector('.toplist-hour-panel[aria-hidden="false"]') || latestDay.querySelector('.toplist-hour-panel');
      updateCurrentContext(root, latestDay, panel);
    });
  }

  function collapseAll(root) {
    var days = root.querySelectorAll('details.toplist-day');
    for (var i = 0; i < days.length; i++) {
      days[i].open = false;
    }
    updateCurrentContext(root, null, null);
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
    root.classList.toggle('is-mobile-changes-mode', isMobileChangesMode());
    var navs = root.querySelectorAll('.toplist-hours__nav');
    for (var n = 0; n < navs.length; n++) {
      bindHourNavDrag(navs[n]);
    }
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
    var activeDay = root.querySelector('details.toplist-day[open]');
    var activePanel = activeDay ? (activeDay.querySelector('.toplist-hour-panel[aria-hidden="false"]') || activeDay.querySelector('.toplist-hour-panel')) : null;
    updateCurrentContext(root, activeDay, activePanel);
  }

  function normalizeSearchValue(value) {
    return String(value || '').trim().toLowerCase();
  }

  function matchesPanelFilter(item, mode, search) {
    var rank = Number(item.getAttribute('data-rank') || '0');
    var trend = item.getAttribute('data-trend') || 'same';
    var text = normalizeSearchValue(item.textContent || '');

    if (mode === 'changes' && trend === 'same') {
      return false;
    }
    if (mode === 'new' && trend !== 'new') {
      return false;
    }
    if (mode === 'up' && trend !== 'up') {
      return false;
    }
    if (mode === 'top10' && (!rank || rank > 10)) {
      return false;
    }
    if (search && text.indexOf(search) === -1) {
      return false;
    }
    return true;
  }

  function updateFilterChips(panel, mode) {
    var chips = panel.querySelectorAll('.toplist-filter__chip');
    for (var i = 0; i < chips.length; i++) {
      var active = chips[i].getAttribute('data-filter') === mode;
      chips[i].classList.toggle('is-active', active);
      chips[i].setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  function applyPanelFilter(panel) {
    if (!panel) {
      return;
    }
    var toolbar = panel.querySelector('.toplist-filter');
    var list = panel.querySelector('.toplist-entry__content ol');
    if (!toolbar || !list) {
      return;
    }
    var mode = toolbar.getAttribute('data-filter-mode') || 'all';
    var search = normalizeSearchValue(toolbar.getAttribute('data-filter-search') || '');
    var items = list.querySelectorAll('li');
    var visible = 0;

    for (var i = 0; i < items.length; i++) {
      var matched = matchesPanelFilter(items[i], mode, search);
      items[i].hidden = !matched;
      if (matched) {
        visible += 1;
      }
    }

    var count = panel.querySelector('.toplist-filter__count');
    if (count) {
      count.textContent = visible + ' / ' + items.length;
    }

    var empty = panel.querySelector('.toplist-filter__empty');
    if (empty) {
      empty.hidden = visible > 0;
    }

    panel.classList.toggle('is-filtered-empty', visible === 0);
    updateFilterChips(panel, mode);
  }

  function initPanelFilters(root) {
    var panels = root.querySelectorAll('.toplist-hour-panel');
    for (var i = 0; i < panels.length; i++) {
      applyPanelFilter(panels[i]);
    }
  }

  function updateHistoryVisibility(root) {
    var hero = root.querySelector('.toplist-hero');
    if (!hero) {
      return;
    }
    var rect = hero.getBoundingClientRect();
    var passedHero = rect.bottom < Math.min(window.innerHeight * 0.6, 280);
    root.classList.toggle('is-history-ready', passedHero);
    root.classList.toggle('is-hero-condensed', passedHero);
  }

  function init() {
    var root = document.querySelector('.toplist-page');
    if (!root) {
      return;
    }
    if (root.getAttribute('data-toplist-init') === '1') {
      return;
    }
    root.setAttribute('data-toplist-init', '1');
    document.body.classList.add('toplist-page-active');
    ensureStickyBar(root);

    collectCalendarData(root);
    setActionPressed(root);
    root.classList.toggle('is-mobile-changes-mode', isMobileChangesMode());
    syncCalendar(root, '');
    refreshVisibleHours(root);
    initPanelFilters(root);
    updateHistoryVisibility(root);

    root.addEventListener('click', function(e) {
      var actionBtn = e.target && e.target.closest ? e.target.closest('.toplist-action, .toplist-stickybar__btn') : null;
      if (actionBtn && root.contains(actionBtn)) {
        var action = actionBtn.getAttribute('data-action') || '';
        if (action === 'collapse-all') {
          collapseAll(root);
        } else if (action === 'expand-latest') {
          expandLatest(root);
        } else if (action === 'prev-hour') {
          stepHour(root, 1);
        } else if (action === 'next-hour') {
          stepHour(root, -1);
        } else if (action === 'toggle-compare') {
          state.compareMode = !state.compareMode;
          root.classList.toggle('is-compare-mode', state.compareMode);
          setActionPressed(root);
          refreshVisibleHours(root);
        } else if (action === 'toggle-changes') {
          state.mobileChangesOnly = !state.mobileChangesOnly;
          setActionPressed(root);
          refreshVisibleHours(root);
        }
        return;
      }

      var filterChip = e.target && e.target.closest ? e.target.closest('.toplist-filter__chip') : null;
      if (filterChip && root.contains(filterChip)) {
        var panel = filterChip.closest ? filterChip.closest('.toplist-hour-panel') : null;
        state.filterMode = filterChip.getAttribute('data-filter') || 'all';
        syncAllPanelFilters(root);
        if (panel) {
          updateCurrentContext(root, panel.closest('details.toplist-day'), panel);
        }
        return;
      }

      var calendarBtn = e.target && e.target.closest ? e.target.closest('[data-action]') : null;
      if (calendarBtn && root.contains(calendarBtn)) {
        var calendarAction = calendarBtn.getAttribute('data-action') || '';
        if (calendarAction === 'toggle-calendar') {
          if (root.classList.contains('is-calendar-open')) {
            closeCalendar(root);
          } else {
            syncCalendar(root, currentActiveDayKey(root));
            openCalendar(root);
          }
          return;
        }
        if (calendarAction === 'close-calendar') {
          closeCalendar(root);
          return;
        }
        if (calendarAction === 'calendar-prev') {
          state.calendarMonthIndex += 1;
          renderCalendar(root, currentActiveDayKey(root));
          return;
        }
        if (calendarAction === 'calendar-next') {
          state.calendarMonthIndex -= 1;
          renderCalendar(root, currentActiveDayKey(root));
          return;
        }
        if (calendarAction === 'calendar-pick') {
          var pickedDayKey = calendarBtn.getAttribute('data-day-key');
          if (isDesktop()) {
            closeCalendar(root);
            setTimeout(function() {
              jumpToDay(root, pickedDayKey, true);
            }, prefersReducedMotion() ? 0 : 280);
            return;
          }
          closeCalendar(root);
          setTimeout(function() {
            jumpToDay(root, pickedDayKey, true);
          }, prefersReducedMotion() ? 0 : 280);
          return;
        }
      }

      var jumpBtn = e.target && e.target.closest ? e.target.closest('.toplist-day-jump') : null;
      if (jumpBtn && root.contains(jumpBtn)) {
        var dayKey = jumpBtn.getAttribute('data-day-key');
        jumpToDay(root, dayKey, true);
        return;
      }

      var hourBtn = e.target && e.target.closest ? e.target.closest('.toplist-hour-btn') : null;
      if (hourBtn && root.contains(hourBtn)) {
        var hours = hourBtn.closest ? hourBtn.closest('.toplist-hours') : null;
        var navWrap = hourBtn.closest ? hourBtn.closest('.toplist-hours__nav') : null;
        if (navWrap && navWrap.getAttribute('data-drag-moved') === '1') {
          return;
        }
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

    root.addEventListener('input', function(e) {
      var input = e.target && e.target.closest ? e.target.closest('.toplist-filter__input') : null;
      if (!input || !root.contains(input)) {
        return;
      }
      var panel = input.closest ? input.closest('.toplist-hour-panel') : null;
      state.filterSearch = input.value || '';
      syncAllPanelFilters(root);
      if (panel) {
        updateCurrentContext(root, panel.closest('details.toplist-day'), panel);
      }
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
        var dayKey = day.getAttribute('data-day-key') || '';
        var shouldScroll = state.programmaticDayKey !== dayKey;
        closeOtherDays(root, day);
        updateDayJumpActive(root, day);
        ensureDayLatestHourVisible(day).then(function() {
          initPanelFilters(root);
          var panel = day.querySelector('.toplist-hour-panel[aria-hidden="false"]') || day.querySelector('.toplist-hour-panel');
          updateCurrentContext(root, day, panel);
          if (shouldScroll) {
            return settleAndScrollToDay(day);
          }
        });
        if (state.programmaticDayKey === dayKey) {
          state.programmaticDayKey = '';
        }
        return;
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
        var panel = openDays[0].querySelector('.toplist-hour-panel[aria-hidden="false"]') || openDays[0].querySelector('.toplist-hour-panel');
        updateCurrentContext(root, openDays[0], panel);
      }
      initPanelFilters(root);
    });

    document.addEventListener('click', function(e) {
      if (!root.classList.contains('is-calendar-open')) {
        return;
      }
      var insideCalendar = e.target && e.target.closest ? e.target.closest('.toplist-calendar-launcher') : null;
      if (!insideCalendar || !root.contains(insideCalendar)) {
        closeCalendar(root);
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && root.classList.contains('is-calendar-open')) {
        closeCalendar(root);
      }
    });

    if (window.matchMedia) {
      var media = window.matchMedia('(min-width: 768px)');
      var onChange = function() {
        root.classList.toggle('is-compare-mode', isDesktop() && state.compareMode);
        root.classList.toggle('is-mobile-changes-mode', isMobileChangesMode());
        setActionPressed(root);
        refreshVisibleHours(root);
        initPanelFilters(root);
        updateHistoryVisibility(root);
      };
      if (media.addEventListener) {
        media.addEventListener('change', onChange);
      } else if (media.addListener) {
        media.addListener(onChange);
      }
    }

    window.addEventListener('scroll', function() {
      updateHistoryVisibility(root);
    }, { passive: true });

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
