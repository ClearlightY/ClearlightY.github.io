(function() {
  function shouldEnable() {
    return window.matchMedia && window.matchMedia('(max-width: 767px)').matches;
  }

  function getButton() {
    return document.getElementById('scroll-top-button-mobile');
  }

  function createButton() {
    var btn = getButton();
    if (btn) {
      return btn;
    }
    btn = document.createElement('button');
    btn.id = 'scroll-top-button-mobile';
    btn.type = 'button';
    btn.setAttribute('aria-label', '返回顶部');
    btn.innerHTML = '<i class="iconfont icon-arrowup" aria-hidden="true"></i>';
    document.body.appendChild(btn);
    return btn;
  }

  function updateVisibility(btn) {
    if (!btn) {
      return;
    }
    var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    btn.classList.toggle('is-visible', y >= 600);
  }

  function scrollToTop() {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && 'scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    window.scrollTo(0, 0);
  }

  function init() {
    if (!shouldEnable()) {
      return;
    }
    var btn = createButton();
    updateVisibility(btn);
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToTop();
    });
    window.addEventListener('scroll', function() {
      updateVisibility(btn);
    }, { passive: true });

    if (window.matchMedia) {
      var mql = window.matchMedia('(max-width: 767px)');
      var onChange = function() {
        var enabled = shouldEnable();
        var current = getButton();
        if (!enabled && current) {
          current.remove();
        }
        if (enabled) {
          var b = createButton();
          updateVisibility(b);
        }
      };
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', onChange);
      } else if (typeof mql.addListener === 'function') {
        mql.addListener(onChange);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
