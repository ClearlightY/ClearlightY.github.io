(function() {
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

  function setActiveButton(hours, btn) {
    var buttons = hours.querySelectorAll('.toplist-hour-btn');
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
    }
  }

  function showPanels(hours, startIndex, count, updateHash, hashId) {
    var panels = hours.querySelectorAll('.toplist-hour-panel');
    for (var i = 0; i < panels.length; i++) {
      panels[i].hidden = true;
    }
    var shown = 0;
    for (var j = startIndex; j < panels.length && shown < count; j++) {
      panels[j].hidden = false;
      animatePanel(panels[j]);
      shown++;
    }
    var panelsWrap = hours.querySelector('.toplist-hours__panels');
    if (panelsWrap) {
      panelsWrap.setAttribute('data-cols', String(shown || 1));
    }
    var id = hashId || (panels[startIndex] ? panels[startIndex].id : '');
    if (updateHash && id && history && history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  function animatePanel(panel) {
    if (!panel || prefersReducedMotion()) {
      return;
    }
    var items = panel.querySelectorAll('.toplist-entry__content li');
    if (!items || !items.length) {
      return;
    }
    for (var i = 0; i < items.length; i++) {
      var li = items[i];
      li.classList.remove('toplist-animated');
      li.style.animationDelay = '';
    }
    panel.offsetHeight;
    for (var j = 0; j < items.length; j++) {
      var delay = Math.min(j, 40) * 18;
      items[j].style.animationDelay = delay + 'ms';
      items[j].classList.add('toplist-animated');
    }
  }

  function activateHour(hours, btn) {
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
    if (isDesktop()) {
      if (panels.length >= 3) {
        var remaining = panels.length - idx;
        showPanels(hours, idx, remaining >= 3 ? 3 : remaining, true, targetId);
        return;
      }
      showPanels(hours, idx, panels.length, true, targetId);
      return;
    }
    showPanels(hours, idx, 1, true, targetId);
  }

  function activateHourSilent(hours, btn) {
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
    if (isDesktop()) {
      if (panels.length >= 3) {
        var remaining = panels.length - idx;
        showPanels(hours, idx, remaining >= 3 ? 3 : remaining, false, targetId);
        return;
      }
      showPanels(hours, idx, panels.length, false, targetId);
      return;
    }
    showPanels(hours, idx, 1, false, targetId);
  }

  function ensureDayLatestHourVisible(day) {
    if (!day || !day.open) {
      return;
    }
    var hours = day.querySelector('.toplist-hours');
    if (!hours) {
      return;
    }
    var active = hours.querySelector('.toplist-hour-btn.is-active');
    if (!active) {
      active = hours.querySelector('.toplist-hour-btn');
    }
    if (active) {
      activateHourSilent(hours, active);
    }
  }

  function expandLatest(root) {
    var days = root.querySelectorAll('details.toplist-day');
    for (var i = 0; i < days.length; i++) {
      days[i].open = i === 0;
    }
    var latest = root.querySelector('details.toplist-day .toplist-hours');
    if (!latest) {
      return;
    }
    var btn = latest.querySelector('.toplist-hour-btn');
    if (btn) {
      activateHour(latest, btn);
    }
  }

  function collapseAll(root) {
    var days = root.querySelectorAll('details.toplist-day');
    for (var i = 0; i < days.length; i++) {
      days[i].open = false;
    }
  }

  function applyHash(root) {
    var hash = location.hash ? location.hash.slice(1) : '';
    if (!hash) {
      return;
    }
    var panel = document.getElementById(hash);
    if (!panel) {
      return;
    }
    var day = panel.closest ? panel.closest('details.toplist-day') : null;
    if (day) {
      day.open = true;
    }
    var hours = panel.closest ? panel.closest('.toplist-hours') : null;
    if (!hours) {
      return;
    }
    var btn = hours.querySelector('.toplist-hour-btn[data-target="' + escId(hash) + '"]');
    if (btn) {
      activateHour(hours, btn);
    }
  }

  function init() {
    var root = document.querySelector('.toplist-page');
    if (!root) {
      return;
    }
    root.addEventListener('click', function(e) {
      var actionBtn = e.target && e.target.closest ? e.target.closest('.toplist-action') : null;
      if (actionBtn && root.contains(actionBtn)) {
        var action = actionBtn.getAttribute('data-action') || '';
        if (action === 'collapse-all') {
          collapseAll(root);
        } else if (action === 'expand-latest') {
          expandLatest(root);
        }
        return;
      }

      var hourBtn = e.target && e.target.closest ? e.target.closest('.toplist-hour-btn') : null;
      if (hourBtn && root.contains(hourBtn)) {
        var hours = hourBtn.closest ? hourBtn.closest('.toplist-hours') : null;
        if (hours) {
          activateHour(hours, hourBtn);
        }
        return;
      }

      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) {
        return;
      }
      if (!root.contains(a)) {
        return;
      }
      var li = a.closest('li');
      if (!li) {
        return;
      }
      li.classList.add('toplist-clicked');
      setTimeout(function() {
        li.classList.remove('toplist-clicked');
      }, 320);
    });

    root.addEventListener('keydown', function(e) {
      var btn = e.target && e.target.closest ? e.target.closest('.toplist-hour-btn') : null;
      if (!btn || !root.contains(btn)) {
        return;
      }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Enter' && e.key !== ' ') {
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
      var next = e.key === 'ArrowRight' ? idx + 1 : idx - 1;
      if (next < 0) next = buttons.length - 1;
      if (next >= buttons.length) next = 0;
      buttons[next].focus();
    });

    applyHash(root);

    var openDays = root.querySelectorAll('details.toplist-day[open]');
    for (var i = 0; i < openDays.length; i++) {
      ensureDayLatestHourVisible(openDays[i]);
    }

    var visiblePanels = root.querySelectorAll('.toplist-hour-panel:not([hidden])');
    for (var j = 0; j < visiblePanels.length; j++) {
      animatePanel(visiblePanels[j]);
    }

    root.addEventListener('toggle', function(e) {
      var day = e.target;
      if (!day || !day.classList || !day.classList.contains('toplist-day')) {
        return;
      }
      ensureDayLatestHourVisible(day);
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
