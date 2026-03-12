(function() {
  function escId(s) {
    if (window.CSS && typeof window.CSS.escape === 'function') {
      return window.CSS.escape(s);
    }
    return String(s).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
  }

  function activateHour(hours, btn) {
    if (!hours || !btn) {
      return;
    }
    var targetId = btn.getAttribute('data-target');
    if (!targetId) {
      return;
    }
    var buttons = hours.querySelectorAll('.toplist-hour-btn');
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
    }
    var panels = hours.querySelectorAll('.toplist-hour-panel');
    for (var j = 0; j < panels.length; j++) {
      panels[j].hidden = true;
    }
    var panel = hours.querySelector('#' + escId(targetId));
    if (panel) {
      panel.hidden = false;
      if (history && history.replaceState) {
        history.replaceState(null, '', '#' + targetId);
      }
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
