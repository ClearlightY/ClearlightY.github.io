(function () {
  'use strict';

  function mountRecipesPage() {
    if (typeof window.__recipesPageCleanup === 'function') {
      window.__recipesPageCleanup();
      window.__recipesPageCleanup = null;
    }

    var app = document.getElementById('recipe-app');
    if (!app) {
      document.body.classList.remove('recipes-page');
      return;
    }

    var isActive = true;
    var requestController = typeof AbortController === 'function' ? new AbortController() : null;
    document.body.classList.add('recipes-page');

  var aliases = {
    '西红柿': '番茄', '圣女果': '番茄', '马铃薯': '土豆', '洋芋': '土豆',
    '青葱': '葱', '香葱': '葱', '大葱': '葱', '生姜': '姜', '蒜头': '蒜',
    '猪绞肉': '猪肉末', '肉馅': '猪肉末', '生抽': '酱油', '老抽': '酱油',
    '花椰菜': '西兰花', '包菜': '卷心菜', '圆白菜': '卷心菜', '玉蜀黍': '玉米'
  };

  var ingredientFamilies = {
    '冰糖': '糖', '低筋面粉': '面粉', '红茶': '茶叶',
    '鸡胸肉': '鸡肉', '鸡腿': '鸡肉', '五花肉': '猪肉', '猪肉末': '猪肉',
    '馄饨皮': '面粉', '春卷皮': '面粉'
  };

  var recipes = [];
  var STORAGE_KEYS = {
    preferences: 'recipes.preferences.v1',
    randomHistory: 'recipes.randomHistory.v1',
    cooking: 'recipes.cookingSession.v1'
  };
  var categoryAccents = {
    '家常菜': '#667b68', '主食': '#9a7655', '汤羹': '#6f8c91',
    '小吃': '#b76545', '烘焙': '#a97968', '饮品': '#718b7b', '其他': '#7b817d'
  };
  var categories = ['全部'];
  var commonIngredients = [];
  var quickFilters = ['全部'];
  var ingredientGroups = {};
  var state = {
    query: '', category: '全部', quick: '全部', ingredients: [], time: '', difficulty: '', sort: 'updated', shown: 12, view: 'cards'
  };
  var decision = { time: '', difficulty: '' };
  var cooking = {
    recipe: null, step: 0, completedSteps: [], checkedIngredients: [], showIngredients: false,
    timer: null, wakeEnabled: false, wakeLock: null
  };
  var timerTicker = null;
  var drawerReturnFocus = null;
  var cookingReturnFocus = null;
  var els = {
    list: document.getElementById('recipe-list-view'), detail: document.getElementById('recipe-detail-view'),
    grid: document.getElementById('recipe-grid'), search: document.getElementById('recipe-search'),
    count: document.getElementById('result-count'), empty: document.getElementById('empty-state'),
    load: document.getElementById('load-more-button'), summary: document.getElementById('active-filter-summary'),
    backdrop: document.getElementById('drawer-backdrop'), ingredientDrawer: document.getElementById('ingredient-drawer'),
    filterDrawer: document.getElementById('filter-drawer'), cooking: document.getElementById('cooking-mode'), toast: document.getElementById('recipe-toast'),
    decision: document.getElementById('decision-panel'), recommendations: document.getElementById('recommendation-results'),
    viewToggle: document.getElementById('recipe-view-toggle'), filterResultCount: document.getElementById('filter-result-count'),
    ingredientResultCount: document.getElementById('ingredient-result-count')
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char];
    });
  }

  function uniqueValues(values) {
    return values.filter(function (value, index, list) { return value && list.indexOf(value) === index; });
  }

  function readStorage(key, fallback) {
    try {
      var value = JSON.parse(window.localStorage.getItem(key));
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (error) { return; }
  }

  function removeStorage(key) {
    try { window.localStorage.removeItem(key); } catch (error) { return; }
  }

  function initialShown() {
    return window.matchMedia && window.matchMedia('(max-width: 680px)').matches ? 8 : 12;
  }

  function inferTimerSeconds(value) {
    var text = String(value || '');
    var minutes = text.match(/(\d+(?:\.\d+)?)\s*分钟/);
    if (minutes) return Math.max(1, Math.round(Number(minutes[1]) * 60));
    var seconds = text.match(/(\d+(?:\.\d+)?)\s*秒/);
    return seconds ? Math.max(1, Math.round(Number(seconds[1]))) : 0;
  }

  function formatDuration(seconds) {
    var value = Math.max(0, Math.ceil(Number(seconds) || 0));
    var minutes = Math.floor(value / 60);
    var rest = value % 60;
    return String(minutes).padStart(2, '0') + ':' + String(rest).padStart(2, '0');
  }

  function normalizeRecipe(recipe) {
    return {
      slug: String(recipe.slug || ''),
      name: String(recipe.name || '未命名菜品'),
      description: String(recipe.description || ''),
      category: String(recipe.category || '其他'),
      tags: Array.isArray(recipe.tags) ? recipe.tags.map(String) : [],
      time: Math.max(0, Number(recipe.time) || 0),
      difficulty: String(recipe.difficulty || '简单'),
      servings: Math.max(1, Number(recipe.servings) || 1),
      favorite: Boolean(recipe.favorite),
      updated: String(recipe.updated || ''),
      aliases: Array.isArray(recipe.aliases) ? recipe.aliases.map(String) : [],
      cover: String(recipe.cover || ''),
      accent: String(recipe.accent || ''),
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.map(function (item) {
        return { name: String(item.name || ''), amount: String(item.amount || ''), prep: String(item.prep || '') };
      }).filter(function (item) { return item.name; }) : [],
      steps: Array.isArray(recipe.steps) ? recipe.steps.map(function (step) {
        return {
          title: String(step.title || ''), text: String(step.text || ''), tip: String(step.tip || ''),
          timer: Math.max(0, Number(step.timer) || inferTimerSeconds(step.text))
        };
      }).filter(function (step) { return step.title || step.text; }) : [],
      notes: Array.isArray(recipe.notes) ? recipe.notes.map(String).filter(Boolean) : [],
      logs: Array.isArray(recipe.logs) ? recipe.logs.map(function (log) {
        return { date: String(log.date || ''), rating: Math.max(0, Math.min(5, Number(log.rating) || 0)), note: String(log.note || '') };
      }) : []
    };
  }

  function configureFilters() {
    var preferredCategories = ['家常菜', '主食', '汤羹', '小吃', '烘焙', '饮品'];
    var availableCategories = uniqueValues(recipes.map(function (recipe) { return recipe.category; }));
    categories = ['全部'].concat(preferredCategories.filter(function (item) { return availableCategories.indexOf(item) !== -1; }))
      .concat(availableCategories.filter(function (item) { return preferredCategories.indexOf(item) === -1; }).sort());

    var tagValues = uniqueValues(recipes.reduce(function (all, recipe) { return all.concat(recipe.tags); }, []));
    var preferredTags = ['常做', '快手', '下饭', '清淡'];
    quickFilters = ['全部'];
    if (recipes.some(function (recipe) { return recipe.favorite; })) quickFilters.push('常做');
    quickFilters = uniqueValues(quickFilters.concat(preferredTags.filter(function (item) { return tagValues.indexOf(item) !== -1; })))
      .concat(tagValues.filter(function (item) { return preferredTags.indexOf(item) === -1; }).sort());

    var ingredientCounts = {};
    recipes.forEach(function (recipe) {
      uniqueValues(recipe.ingredients.map(function (item) { return item.name; })).forEach(function (name) {
        ingredientCounts[name] = (ingredientCounts[name] || 0) + 1;
      });
    });
    commonIngredients = Object.keys(ingredientCounts).sort(function (a, b) {
      return ingredientCounts[b] - ingredientCounts[a] || a.localeCompare(b, 'zh-CN');
    }).slice(0, 6);

    var groupDefinitions = {
      '肉禽蛋奶': ['鸡蛋', '鸡胸肉', '鸡腿', '五花肉', '猪肉末', '牛奶', '黄油'],
      '水产豆制品': ['鲈鱼', '虾', '豆腐'],
      '蔬菜水果': ['番茄', '土豆', '青椒', '茄子', '芹菜', '西兰花', '卷心菜', '玉米', '柠檬'],
      '主食与烘焙': ['米饭', '面条', '面粉', '大米', '小米', '馄饨皮', '春卷皮', '低筋面粉'],
      '调味与其他': ['葱', '姜', '蒜', '豆瓣酱', '花椒', '干辣椒', '醋', '酱油', '糖', '冰糖', '红茶']
    };
    var allIngredients = Object.keys(ingredientCounts).sort(function (a, b) { return a.localeCompare(b, 'zh-CN'); });
    var assigned = [];
    ingredientGroups = {};
    Object.keys(groupDefinitions).forEach(function (group) {
      var items = groupDefinitions[group].filter(function (item) { return ingredientCounts[item]; });
      if (items.length) ingredientGroups[group] = items;
      assigned = assigned.concat(items);
    });
    var otherIngredients = allIngredients.filter(function (item) { return assigned.indexOf(item) === -1; });
    if (otherIngredients.length) ingredientGroups['其他食材'] = otherIngredients;
  }

  function loadPreferences() {
    var preferences = readStorage(STORAGE_KEYS.preferences, {});
    var defaultView = window.matchMedia && window.matchMedia('(max-width: 680px)').matches ? 'compact' : 'cards';
    state.view = preferences.view === 'compact' || preferences.view === 'cards' ? preferences.view : defaultView;
    state.shown = initialShown();
  }

  function savePreferences() {
    writeStorage(STORAGE_KEYS.preferences, { view: state.view });
  }

  function updateViewMode() {
    els.grid.classList.toggle('is-compact-view', state.view === 'compact');
    els.grid.classList.toggle('is-card-view', state.view === 'cards');
    els.viewToggle.setAttribute('aria-pressed', state.view === 'compact' ? 'true' : 'false');
    els.viewToggle.textContent = state.view === 'compact' ? '卡片视图' : '紧凑列表';
  }

  function toggleViewMode() {
    state.view = state.view === 'compact' ? 'cards' : 'compact';
    savePreferences();
    updateViewMode();
  }

  function normalize(value) {
    var text = String(value || '').toLowerCase().replace(/[，、／/]/g, ' ').replace(/\s+/g, ' ').trim();
    Object.keys(aliases).sort(function (a, b) { return b.length - a.length; }).forEach(function (key) {
      text = text.split(key).join(aliases[key]);
    });
    return text;
  }

  function queryTokens() { return normalize(state.query).split(' ').filter(Boolean); }

  function highlight(value) {
    var output = escapeHtml(value);
    var rawTokens = String(state.query).replace(/[，、／/]/g, ' ').split(/\s+/).filter(Boolean);
    rawTokens = rawTokens.concat(rawTokens.map(normalize)).filter(function (token, index, list) { return token && list.indexOf(token) === index; });
    rawTokens.forEach(function (token) {
      var safe = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (safe) output = output.replace(new RegExp('(' + safe + ')', 'gi'), '<mark>$1</mark>');
    });
    return output;
  }

  function recipeHaystack(recipe) {
    return normalize([recipe.name, recipe.description, recipe.category, recipe.tags.join(' '), recipe.aliases.join(' '), recipe.ingredients.map(function (i) { return i.name; }).join(' ')].join(' '));
  }

  function filteredRecipes() {
    var tokens = queryTokens();
    var result = recipes.filter(function (recipe) {
      var ingredientNames = recipe.ingredients.map(function (item) { return normalize(item.name); });
      return (!tokens.length || tokens.every(function (token) { return recipeHaystack(recipe).indexOf(token) !== -1; })) &&
        (state.category === '全部' || recipe.category === state.category) &&
        (state.quick === '全部' || (state.quick === '常做' ? recipe.favorite : recipe.tags.indexOf(state.quick) !== -1)) &&
        state.ingredients.every(function (item) { return ingredientNames.indexOf(normalize(item)) !== -1; }) &&
        (!state.time || (state.time === '15' ? recipe.time <= 15 : state.time === '30' ? recipe.time > 15 && recipe.time <= 30 : state.time === '60' ? recipe.time > 30 && recipe.time <= 60 : recipe.time > 60)) &&
        (!state.difficulty || recipe.difficulty === state.difficulty);
    });
    return result.sort(function (a, b) {
      if (state.sort === 'name') return a.name.localeCompare(b.name, 'zh-CN');
      if (state.sort === 'time') return a.time - b.time;
      return b.updated.localeCompare(a.updated);
    });
  }

  function syncUrl(replace) {
    var params = new URLSearchParams();
    if (state.query) params.set('q', state.query);
    if (state.category !== '全部') params.set('category', state.category);
    if (state.quick !== '全部') params.set('tag', state.quick);
    if (state.ingredients.length) params.set('ingredients', state.ingredients.join(','));
    if (state.time) params.set('time', state.time);
    if (state.difficulty) params.set('difficulty', state.difficulty);
    if (state.sort !== 'updated') params.set('sort', state.sort);
    var currentRecipe = els.detail.dataset.slug;
    if (!els.detail.hidden && currentRecipe) params.set('recipe', currentRecipe);
    var next = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history[replace ? 'replaceState' : 'pushState']({}, '', next);
  }

  function loadUrlState() {
    var params = new URLSearchParams(window.location.search);
    state.query = params.get('q') || '';
    state.category = params.get('category') || '全部';
    state.quick = params.get('tag') || '全部';
    state.ingredients = (params.get('ingredients') || '').split(',').filter(Boolean);
    state.time = params.get('time') || '';
    state.difficulty = params.get('difficulty') || '';
    state.sort = params.get('sort') || 'updated';
    els.search.value = state.query;
    return params.get('recipe');
  }

  function renderStaticFilters() {
    document.getElementById('common-ingredients').innerHTML = commonIngredients.map(function (item) {
      return '<button type="button" class="filter-chip" data-ingredient="' + escapeHtml(item) + '">' + escapeHtml(item) + '</button>';
    }).join('');
    document.getElementById('quick-filters').innerHTML = quickFilters.map(function (item) {
      return '<button type="button" class="filter-chip" data-quick="' + escapeHtml(item) + '">' + escapeHtml(item) + '</button>';
    }).join('');
    document.getElementById('category-tabs').innerHTML = categories.map(function (item) {
      return '<button type="button" class="category-chip" data-category="' + escapeHtml(item) + '">' + escapeHtml(item) + '</button>';
    }).join('');
    document.getElementById('ingredient-groups').innerHTML = Object.keys(ingredientGroups).map(function (group) {
      return '<section class="ingredient-group"><h3>' + escapeHtml(group) + '</h3><div class="chip-list">' + ingredientGroups[group].map(function (item) {
        return '<button type="button" class="ingredient-chip" data-ingredient="' + escapeHtml(item) + '">' + escapeHtml(item) + '</button>';
      }).join('') + '</div></section>';
    }).join('');
    document.getElementById('advanced-filters').innerHTML =
      filterGroup('主分类', 'category', categories) +
      filterGroup('制作时间', 'time', [['','全部'],['15','15 分钟内'],['30','16—30 分钟'],['60','31—60 分钟'],['61','60 分钟以上']]) +
      filterGroup('难度', 'difficulty', [['','全部'],['简单','简单'],['中等','中等'],['较难','较难']]) +
      filterGroup('特征标签', 'quick', quickFilters) +
      '<section class="filter-group"><h3>排序方式</h3><select id="recipe-sort" class="sort-select" aria-label="排序方式"><option value="updated">最近更新</option><option value="name">名称</option><option value="time">制作时间</option></select></section>';
  }

  function filterGroup(title, key, values) {
    return '<section class="filter-group"><h3>' + escapeHtml(title) + '</h3><div class="filter-options">' + values.map(function (entry) {
      var value = Array.isArray(entry) ? entry[0] : entry;
      var label = Array.isArray(entry) ? entry[1] : entry;
      return '<button type="button" class="filter-chip" data-filter-key="' + escapeHtml(key) + '" data-filter-value="' + escapeHtml(value) + '">' + escapeHtml(label) + '</button>';
    }).join('') + '</div></section>';
  }

  function updateFilterStates() {
    app.querySelectorAll('[data-category]').forEach(function (button) { button.classList.toggle('is-active', button.dataset.category === state.category); });
    app.querySelectorAll('[data-quick]').forEach(function (button) { button.classList.toggle('is-active', button.dataset.quick === state.quick); });
    app.querySelectorAll('[data-ingredient]').forEach(function (button) { button.classList.toggle('is-active', state.ingredients.indexOf(button.dataset.ingredient) !== -1); });
    app.querySelectorAll('[data-filter-key]').forEach(function (button) {
      var current = state[button.dataset.filterKey];
      button.classList.toggle('is-active', String(current) === button.dataset.filterValue);
    });
    var sort = document.getElementById('recipe-sort'); if (sort) sort.value = state.sort;
  }

  function renderActiveFilters() {
    var active = [];
    var timeLabels = { '15': '15分钟内', '30': '16—30分钟', '60': '31—60分钟', '61': '60分钟以上' };
    if (state.query) active.push({ key: 'query', label: '搜索：' + state.query });
    if (state.category !== '全部') active.push({ key: 'category', label: state.category });
    state.ingredients.forEach(function (ingredient) { active.push({ key: 'ingredient', value: ingredient, label: ingredient }); });
    if (state.quick !== '全部') active.push({ key: 'quick', label: state.quick });
    if (state.time) active.push({ key: 'time', label: timeLabels[state.time] || '制作时间' });
    if (state.difficulty) active.push({ key: 'difficulty', label: state.difficulty });
    if (state.sort !== 'updated') active.push({ key: 'sort', label: state.sort === 'name' ? '按名称' : '按时间' });
    els.summary.hidden = active.length === 0;
    els.summary.innerHTML = active.length ? '<span class="active-filter-label">当前条件</span>' + active.map(function (item) {
      return '<button class="active-filter-chip" type="button" data-remove-filter="' + escapeHtml(item.key) + '"' +
        (item.value ? ' data-remove-value="' + escapeHtml(item.value) + '"' : '') + '>' + escapeHtml(item.label) + ' ×</button>';
    }).join('') + '<button class="text-button active-filter-clear" type="button" data-action="clear">清除全部</button>' : '';
  }

  function removeFilter(key, value) {
    if (key === 'query') { state.query = ''; els.search.value = ''; }
    if (key === 'category') state.category = '全部';
    if (key === 'ingredient') state.ingredients = state.ingredients.filter(function (item) { return item !== value; });
    if (key === 'quick') state.quick = '全部';
    if (key === 'time') state.time = '';
    if (key === 'difficulty') state.difficulty = '';
    if (key === 'sort') state.sort = 'updated';
    state.shown = initialShown();
    renderList();
  }

  function renderList(updateUrl) {
    var result = filteredRecipes();
    els.count.textContent = result.length;
    els.grid.innerHTML = result.slice(0, state.shown).map(renderCard).join('');
    els.empty.hidden = result.length !== 0;
    els.load.hidden = result.length <= state.shown;
    els.filterResultCount.textContent = result.length;
    els.ingredientResultCount.textContent = result.length;
    renderActiveFilters();
    updateFilterStates();
    updateViewMode();
    if (updateUrl !== false) syncUrl(true);
  }

  function renderCard(recipe) {
    var ingredients = recipe.ingredients.slice(0, 3);
    var accent = /^#[0-9a-f]{6}$/i.test(recipe.accent) ? recipe.accent : (categoryAccents[recipe.category] || categoryAccents['其他']);
    return '<article class="recipe-card" tabindex="0" role="link" data-recipe="' + escapeHtml(recipe.slug) + '" aria-label="查看' + escapeHtml(recipe.name) + '">' +
      '<div class="recipe-card-visual" style="--recipe-accent:' + accent + '" aria-hidden="true"><span>' + escapeHtml(recipe.category.slice(0, 1) || '食') + '</span></div>' +
      '<div class="recipe-card-body"><div class="recipe-card-top"><div><h2>' + highlight(recipe.name) + '</h2><p>' + highlight(recipe.description) + '</p></div>' +
      (recipe.favorite ? '<span class="favorite-badge">常做</span>' : '') + '</div>' +
      '<div class="recipe-meta"><span>' + escapeHtml(recipe.category) + '</span><span>' + escapeHtml(recipe.difficulty) + '</span><span>' + escapeHtml(recipe.time) + ' 分钟</span><span>' + escapeHtml(recipe.servings) + ' 人份</span></div>' +
      '<div class="recipe-card-footer"><div class="card-ingredients">' + ingredients.map(function (item) { return '<span class="card-ingredient">' + highlight(item.name) + '</span>'; }).join('') +
      (recipe.ingredients.length > 3 ? '<span class="more-ingredients">+' + (recipe.ingredients.length - 3) + '</span>' : '') + '</div><span class="recipe-card-arrow">→</span></div></div></article>';
  }

  function recommendationScore(recipe) {
    var selected = state.ingredients.map(normalize);
    var recipeIngredients = recipe.ingredients.map(function (item) { return normalize(item.name); });
    var matched = selected.filter(function (item) { return recipeIngredients.indexOf(item) !== -1; }).length;
    var ingredientScore = selected.length ? matched / selected.length * 55 : 28;
    var maxTime = Number(decision.time) || 0;
    var timeScore = !maxTime || recipe.time <= maxTime ? 15 : Math.max(0, 15 - (recipe.time - maxTime) / 3);
    var difficultyScore = !decision.difficulty || recipe.difficulty === decision.difficulty ? 10 : 0;
    var favoriteScore = recipe.favorite ? 10 : 4;
    var latestLog = recipe.logs.map(function (log) { return log.date; }).filter(Boolean).sort().reverse()[0] || '';
    var freshnessScore = !latestLog || latestLog < new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10) ? 10 : 4;
    return ingredientScore + timeScore + difficultyScore + favoriteScore + freshnessScore;
  }

  function recommendationReasons(recipe) {
    var reasons = [];
    if (state.ingredients.length) {
      var recipeIngredients = recipe.ingredients.map(function (item) { return normalize(item.name); });
      var matched = state.ingredients.filter(function (item) { return recipeIngredients.indexOf(normalize(item)) !== -1; }).length;
      reasons.push('已有 ' + matched + ' / ' + state.ingredients.length + ' 种所选食材');
    }
    if (decision.time && recipe.time <= Number(decision.time)) reasons.push(recipe.time + '分钟可完成');
    if (decision.difficulty && recipe.difficulty === decision.difficulty) reasons.push('符合' + decision.difficulty + '难度');
    if (recipe.favorite) reasons.push('你的常做菜');
    if (!reasons.length) reasons.push(recipe.category + ' · ' + recipe.time + '分钟');
    return reasons.slice(0, 3);
  }

  function renderRecommendations() {
    var recommended = recipes.slice().sort(function (a, b) {
      return recommendationScore(b) - recommendationScore(a) || b.updated.localeCompare(a.updated);
    }).slice(0, 3);
    els.recommendations.innerHTML = '<div class="recommendation-heading"><h3>为你挑了这三道</h3><span>结合食材、时间、难度与下厨记录</span></div><div class="recommendation-grid">' + recommended.map(function (recipe) {
      return '<article class="recommendation-card" tabindex="0" role="link" data-recipe="' + escapeHtml(recipe.slug) + '" aria-label="查看推荐菜谱' + escapeHtml(recipe.name) + '"><h4>' + escapeHtml(recipe.name) + '</h4><p>' + escapeHtml(recipe.description) + '</p><div class="match-reasons">' + recommendationReasons(recipe).map(function (reason) {
        return '<span class="match-reason">' + escapeHtml(reason) + '</span>';
      }).join('') + '</div></article>';
    }).join('') + '</div>';
  }

  function updateDecisionStates() {
    app.querySelectorAll('[data-decision-key]').forEach(function (button) {
      button.classList.toggle('is-active', decision[button.dataset.decisionKey] === button.dataset.decisionValue);
    });
  }

  function openDecisionPanel() {
    els.decision.hidden = false;
    updateDecisionStates();
    renderRecommendations();
    els.decision.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function pickRandomRecipe() {
    var candidates = filteredRecipes();
    if (!candidates.length) { toast('当前条件没有可随机选择的菜谱'); return; }
    var history = readStorage(STORAGE_KEYS.randomHistory, []);
    if (!Array.isArray(history)) history = [];
    var available = candidates.filter(function (recipe) { return history.slice(0, 3).indexOf(recipe.slug) === -1; });
    if (!available.length) available = candidates;
    var recipe = available[Math.floor(Math.random() * available.length)];
    writeStorage(STORAGE_KEYS.randomHistory, [recipe.slug].concat(history.filter(function (slug) { return slug !== recipe.slug; })).slice(0, 10));
    toast('今晚试试：' + recipe.name);
    openRecipe(recipe.slug, true);
  }

  function openRecipe(slug, push) {
    var recipe = recipes.find(function (item) { return item.slug === slug; });
    if (!recipe) return;
    els.list.hidden = true; els.detail.hidden = false; els.detail.dataset.slug = slug;
    els.detail.innerHTML = renderDetail(recipe, recipe.servings);
    if (push !== false) syncUrl(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderDetail(recipe, servings) {
    var scale = servings / recipe.servings;
    var savedSession = readStorage(STORAGE_KEYS.cooking, null);
    var checkedIngredients = savedSession && savedSession.recipeSlug === recipe.slug && Array.isArray(savedSession.checkedIngredients) ? savedSession.checkedIngredients : [];
    var cookingLabel = savedSession && savedSession.recipeSlug === recipe.slug ? '继续烹饪' : '开始烹饪';
    return '<div class="recipe-back-row"><button class="recipe-back-button" type="button" data-action="back-list"><span class="recipe-back-icon" aria-hidden="true">←</span><span>返回菜谱</span></button></div>' +
      '<header class="detail-header"><div class="detail-title-row"><div><h1>' + escapeHtml(recipe.name) + '</h1><p class="detail-description">' + escapeHtml(recipe.description) + '</p>' +
      '<div class="detail-meta">' + escapeHtml(recipe.category) + '　·　' + escapeHtml(recipe.difficulty) + '　·　' + escapeHtml(recipe.time) + ' 分钟　·　' + escapeHtml(servings) + ' 人份</div></div>' +
      '<div class="detail-actions"><button class="primary-button" type="button" data-action="start-cooking">' + cookingLabel + '</button><button class="tool-button" type="button" data-action="copy-ingredients">复制食材</button><button class="tool-button" type="button" data-action="print">打印食谱</button></div></div></header>' +
      '<div class="detail-layout"><aside class="ingredient-panel"><h2>食材</h2><div class="serving-control"><span>份量</span><div class="serving-buttons"><button type="button" data-serving="-1" aria-label="减少份量">−</button><strong id="serving-value" data-value="' + servings + '">' + servings + ' 人</strong><button type="button" data-serving="1" aria-label="增加份量">＋</button></div></div>' +
      '<ul class="ingredient-checklist">' + recipe.ingredients.map(function (item, index) { return '<li><input id="ingredient-' + index + '" type="checkbox" data-ingredient-index="' + index + '" ' + (checkedIngredients.indexOf(index) !== -1 ? 'checked' : '') + '><label for="ingredient-' + index + '">' + escapeHtml(item.name) + (item.prep ? '<span class="ingredient-prep">' + escapeHtml(item.prep) + '</span>' : '') + '</label><span class="ingredient-amount">' + escapeHtml(scaleAmount(item.amount, scale)) + '</span></li>'; }).join('') + '</ul></aside>' +
      '<section class="steps-panel"><h2>制作步骤</h2>' + recipe.steps.map(function (step, index) { return '<article class="recipe-step"><span class="step-number">' + String(index + 1).padStart(2, '0') + '</span><div class="step-content"><h3>' + escapeHtml(step.title) + '</h3><p>' + escapeHtml(step.text) + '</p>' + (step.tip ? '<div class="step-tip">注意：' + escapeHtml(step.tip) + '</div>' : '') + (step.timer ? '<button class="step-timer-link" type="button" data-action="start-step-timer" data-step-index="' + index + '">计时 ' + escapeHtml(Math.ceil(step.timer / 60)) + ' 分钟</button>' : '') + '</div></article>'; }).join('') +
      '<section class="global-notes"><h3>全局注意事项</h3>' + recipe.notes.map(function (note) { return '<div class="global-note">' + escapeHtml(note) + '</div>'; }).join('') + '</section></section></div>' +
      '<section class="cooking-log"><h2>下厨记录</h2><div class="log-list">' + recipe.logs.map(function (log) { return '<div class="log-item"><span class="log-date">' + escapeHtml(log.date) + '</span><span>' + escapeHtml(log.note) + '</span><span class="log-stars">' + (log.rating ? '★★★★★'.slice(0, log.rating) + '☆☆☆☆☆'.slice(0, 5 - log.rating) : '') + '</span></div>'; }).join('') + '</div></section>';
  }

  function scaleAmount(amount, scale) {
    if (scale === 1) return amount;
    return amount.replace(/\d+(?:\.\d+)?/, function (number) {
      var value = Math.round(parseFloat(number) * scale * 10) / 10;
      return String(value).replace(/\.0$/, '');
    });
  }

  function backToList(push) {
    els.detail.hidden = true; els.detail.dataset.slug = ''; els.list.hidden = false;
    if (push !== false) syncUrl(false);
    renderList(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleIngredient(name) {
    var index = state.ingredients.indexOf(name);
    if (index === -1) state.ingredients.push(name); else state.ingredients.splice(index, 1);
    state.shown = initialShown(); renderList();
  }

  function clearAll() {
    state.query = ''; state.category = '全部'; state.quick = '全部'; state.ingredients = [];
    state.time = ''; state.difficulty = ''; state.sort = 'updated'; state.shown = initialShown(); els.search.value = '';
    renderList();
  }

  function openDrawer(drawer) {
    closeDrawers(false);
    drawerReturnFocus = document.activeElement;
    els.backdrop.hidden = false; drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var closeButton = drawer.querySelector('[data-close-drawer]');
    window.setTimeout(function () {
      if (drawer.classList.contains('is-open')) (closeButton || drawer).focus();
    }, 260);
  }

  function closeDrawers(restoreFocus) {
    var hadOpenDrawer = els.ingredientDrawer.classList.contains('is-open') || els.filterDrawer.classList.contains('is-open');
    [els.ingredientDrawer, els.filterDrawer].forEach(function (drawer) { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); });
    els.backdrop.hidden = true; document.body.style.overflow = '';
    if (restoreFocus !== false && hadOpenDrawer && drawerReturnFocus && document.contains(drawerReturnFocus)) drawerReturnFocus.focus();
    drawerReturnFocus = null;
  }

  function toast(message) {
    els.toast.textContent = message; els.toast.hidden = false;
    window.clearTimeout(toast.timer); toast.timer = window.setTimeout(function () { els.toast.hidden = true; }, 1800);
  }

  function copyIngredients(recipe) {
    var text = recipe.name + '（' + recipe.servings + ' 人份）\n' + recipe.ingredients.map(function (item) { return '□ ' + item.name + '　' + item.amount + (item.prep ? '（' + item.prep + '）' : ''); }).join('\n');
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { toast('食材清单已复制'); });
    else toast('当前浏览器不支持自动复制');
  }

  function cookingPayload() {
    return cooking.recipe ? {
      recipeSlug: cooking.recipe.slug,
      step: cooking.step,
      completedSteps: cooking.completedSteps,
      checkedIngredients: cooking.checkedIngredients,
      showIngredients: cooking.showIngredients,
      timer: cooking.timer,
      wakeEnabled: cooking.wakeEnabled,
      updatedAt: Date.now()
    } : null;
  }

  function saveCookingSession() {
    var payload = cookingPayload();
    if (payload) writeStorage(STORAGE_KEYS.cooking, payload);
  }

  function timerRemaining() {
    if (!cooking.timer) return 0;
    if (!cooking.timer.running) return Math.max(0, Number(cooking.timer.remaining) || 0);
    return Math.max(0, Math.ceil((Number(cooking.timer.endAt) - Date.now()) / 1000));
  }

  function stopTimerTicker() {
    if (timerTicker) window.clearInterval(timerTicker);
    timerTicker = null;
  }

  function startTimerTicker() {
    stopTimerTicker();
    if (!cooking.timer || !cooking.timer.running) return;
    timerTicker = window.setInterval(function () {
      var remaining = timerRemaining();
      var output = document.getElementById('cooking-timer-value');
      if (output) output.textContent = formatDuration(remaining);
      if (remaining <= 0) {
        cooking.timer.running = false;
        cooking.timer.remaining = 0;
        stopTimerTicker();
        saveCookingSession();
        toast('计时完成，可以继续下一步');
      }
    }, 500);
  }

  function startStepTimer(resume, overrideSeconds) {
    var step = cooking.recipe.steps[cooking.step];
    var duration = resume && cooking.timer ? timerRemaining() : (Number(overrideSeconds) || step.timer);
    if (!duration) return;
    cooking.timer = {
      step: cooking.step,
      duration: cooking.timer && resume ? cooking.timer.duration : duration,
      remaining: duration,
      endAt: Date.now() + duration * 1000,
      running: true
    };
    saveCookingSession();
    renderCooking();
    startTimerTicker();
  }

  function pauseStepTimer() {
    if (!cooking.timer) return;
    cooking.timer.remaining = timerRemaining();
    cooking.timer.running = false;
    cooking.timer.endAt = 0;
    stopTimerTicker();
    saveCookingSession();
    renderCooking();
  }

  function resetStepTimer() {
    cooking.timer = null;
    stopTimerTicker();
    saveCookingSession();
    renderCooking();
  }

  function releaseWakeLock() {
    if (cooking.wakeLock && typeof cooking.wakeLock.release === 'function') cooking.wakeLock.release().catch(function () { return; });
    cooking.wakeLock = null;
  }

  function requestWakeLock() {
    if (!cooking.wakeEnabled || !navigator.wakeLock || document.visibilityState !== 'visible') return Promise.resolve();
    return navigator.wakeLock.request('screen').then(function (sentinel) {
      cooking.wakeLock = sentinel;
      sentinel.addEventListener('release', function () { cooking.wakeLock = null; });
    }).catch(function () {
      cooking.wakeEnabled = false;
      saveCookingSession();
      toast('当前浏览器无法保持屏幕常亮');
    });
  }

  function toggleWakeLock() {
    cooking.wakeEnabled = !cooking.wakeEnabled;
    if (cooking.wakeEnabled) requestWakeLock(); else releaseWakeLock();
    saveCookingSession();
    renderCooking();
  }

  function openCooking(recipe, requestedStep) {
    if (!recipe) return;
    cookingReturnFocus = document.activeElement;
    var saved = readStorage(STORAGE_KEYS.cooking, null);
    var detailChecked = Array.from(els.detail.querySelectorAll('[data-ingredient-index]:checked')).map(function (input) { return Number(input.dataset.ingredientIndex); });
    if (saved && saved.recipeSlug === recipe.slug) {
      cooking.recipe = recipe;
      cooking.step = requestedStep === undefined ? Math.max(0, Math.min(recipe.steps.length - 1, Number(saved.step) || 0)) : requestedStep;
      cooking.completedSteps = Array.isArray(saved.completedSteps) ? saved.completedSteps : [];
      cooking.checkedIngredients = Array.isArray(saved.checkedIngredients) ? saved.checkedIngredients : detailChecked;
      cooking.showIngredients = Boolean(saved.showIngredients);
      cooking.timer = saved.timer || null;
      cooking.wakeEnabled = Boolean(saved.wakeEnabled);
      if (cooking.timer && cooking.timer.running && timerRemaining() <= 0) { cooking.timer.running = false; cooking.timer.remaining = 0; }
      toast('已继续上次的烹饪进度');
    } else {
      cooking.recipe = recipe;
      cooking.step = Math.max(0, Math.min(recipe.steps.length - 1, Number(requestedStep) || 0));
      cooking.completedSteps = [];
      cooking.checkedIngredients = detailChecked;
      cooking.showIngredients = false;
      cooking.timer = null;
      cooking.wakeEnabled = false;
    }
    els.cooking.hidden = false;
    document.body.style.overflow = 'hidden';
    saveCookingSession();
    renderCooking();
    startTimerTicker();
    requestWakeLock();
  }

  function closeCooking(completed) {
    if (completed) removeStorage(STORAGE_KEYS.cooking); else saveCookingSession();
    stopTimerTicker();
    releaseWakeLock();
    els.cooking.hidden = true; document.body.style.overflow = '';
    var resumeButton = els.detail.querySelector('[data-action="start-cooking"]');
    if (resumeButton) resumeButton.textContent = completed ? '开始烹饪' : '继续烹饪';
    if (cookingReturnFocus && document.contains(cookingReturnFocus)) cookingReturnFocus.focus();
    cookingReturnFocus = null;
    if (completed) toast('本次烹饪已完成，记得记录味道');
  }

  function moveCookingStep(direction) {
    if (direction > 0) {
      if (cooking.completedSteps.indexOf(cooking.step) === -1) cooking.completedSteps.push(cooking.step);
      if (cooking.step === cooking.recipe.steps.length - 1) return closeCooking(true);
    }
    cooking.step = Math.max(0, Math.min(cooking.recipe.steps.length - 1, cooking.step + direction));
    saveCookingSession();
    renderCooking();
  }

  function renderCooking() {
    var recipe = cooking.recipe, step = recipe.steps[cooking.step];
    var progress = Math.round((cooking.step + 1) / recipe.steps.length * 100);
    var timer = cooking.timer;
    var timerLabel = timer && timer.step !== cooking.step ? '步骤 ' + (timer.step + 1) + ' 计时' : '步骤计时';
    var timerHtml = step.timer || timer ? '<div class="step-timer"><span class="step-timer-label">' + timerLabel + '</span><strong id="cooking-timer-value">' + formatDuration(timer ? timerRemaining() : step.timer) + '</strong>' +
      (!timer ? '<button class="primary-button" type="button" data-cooking="timer-start">开始计时</button>' : timer.running ? '<button class="tool-button" type="button" data-cooking="timer-pause">暂停</button><button class="tool-button" type="button" data-cooking="timer-reset">重置</button>' : '<button class="primary-button" type="button" data-cooking="timer-resume">继续</button><button class="tool-button" type="button" data-cooking="timer-reset">重置</button>') + '</div>' : '<div class="step-timer"><span class="step-timer-label">临时计时</span><button class="tool-button" type="button" data-cooking="timer-manual" data-seconds="300">5分钟</button><button class="tool-button" type="button" data-cooking="timer-manual" data-seconds="600">10分钟</button></div>';
    els.cooking.innerHTML = '<div class="cooking-shell"><header class="cooking-header"><strong>' + escapeHtml(recipe.name) + '</strong><div class="cooking-progress-wrap"><div class="cooking-progress-label"><span>烹饪进度</span><span>' + (cooking.step + 1) + ' / ' + recipe.steps.length + '</span></div><div class="cooking-progress"><span style="width:' + progress + '%"></span></div></div><div class="cooking-header-actions"><button class="tool-button wake-lock-toggle ' + (cooking.wakeEnabled ? 'is-active' : '') + '" type="button" data-cooking="wake" ' + (!navigator.wakeLock ? 'hidden' : '') + '>屏幕常亮</button><button class="tool-button" type="button" data-cooking="close">退出</button></div></header>' +
      '<main class="cooking-content"><span class="cooking-step-number">' + String(cooking.step + 1).padStart(2, '0') + '</span><h2>' + escapeHtml(step.title) + '</h2><p class="cooking-instruction">' + escapeHtml(step.text) + '</p>' +
      (step.tip ? '<div class="cooking-tip">注意：' + escapeHtml(step.tip) + '</div>' : '') + timerHtml +
      (cooking.showIngredients ? '<aside class="cooking-ingredients"><strong>食材清单</strong><ul>' + recipe.ingredients.map(function (item, index) { return '<li><label><input type="checkbox" data-cooking-ingredient="' + index + '" ' + (cooking.checkedIngredients.indexOf(index) !== -1 ? 'checked' : '') + '> ' + escapeHtml(item.name) + '　' + escapeHtml(item.amount) + '</label></li>'; }).join('') + '</ul></aside>' : '') + '</main>' +
      '<footer class="cooking-footer"><button class="tool-button" type="button" data-cooking="ingredients">' + (cooking.showIngredients ? '收起食材' : '查看食材') + '</button><div class="cooking-nav"><button class="tool-button" type="button" data-cooking="prev" ' + (cooking.step === 0 ? 'disabled' : '') + '>上一步</button><button class="primary-button" type="button" data-cooking="next">' + (cooking.step === recipe.steps.length - 1 ? '完成烹饪' : '完成此步') + '</button></div></footer></div>';
    els.cooking.focus();
  }

  function initializeRecipes(payload) {
    var sourceRecipes = payload && Array.isArray(payload.recipes) ? payload.recipes : [];
    recipes = sourceRecipes.map(normalizeRecipe).filter(function (recipe) {
      return recipe.slug && recipe.ingredients.length && recipe.steps.length;
    });
    if (!recipes.length) throw new Error('没有可用的食谱数据');

    configureFilters();
    loadPreferences();
    renderStaticFilters();
    var initialSlug = loadUrlState();
    document.getElementById('recipe-total').textContent = recipes.length;
    document.getElementById('ingredient-total').textContent = new Set(recipes.reduce(function (all, recipe) {
      return all.concat(recipe.ingredients.map(function (item) { return ingredientFamilies[item.name] || item.name; }));
    }, [])).size;
    document.getElementById('latest-update').textContent = recipes.map(function (recipe) { return recipe.updated; }).filter(Boolean).sort().reverse()[0] || '—';
    renderList(false);
    if (initialSlug) openRecipe(initialSlug, false);
  }

  function showLoadError(error) {
    els.count.textContent = '0';
    els.grid.innerHTML = '<p class="recipe-load-error">食谱数据加载失败，请重新构建网站后重试。</p>';
    els.empty.hidden = true;
    els.load.hidden = true;
    console.error('[recipes] 数据加载失败：', error);
  }

  app.addEventListener('click', function (event) {
    var target = event.target.closest('button, [data-recipe]'); if (!target) return;
    if (target.dataset.recipe) return openRecipe(target.dataset.recipe, true);
    if (target.dataset.removeFilter) return removeFilter(target.dataset.removeFilter, target.dataset.removeValue || '');
    if (target.dataset.decisionKey) {
      decision[target.dataset.decisionKey] = target.dataset.decisionValue;
      updateDecisionStates();
      return;
    }
    if (target.dataset.category !== undefined) { state.category = target.dataset.category; state.shown = initialShown(); return renderList(); }
    if (target.dataset.quick !== undefined) { state.quick = target.dataset.quick; state.shown = initialShown(); return renderList(); }
    if (target.dataset.ingredient) return toggleIngredient(target.dataset.ingredient);
    if (target.dataset.filterKey) { state[target.dataset.filterKey] = target.dataset.filterValue; state.shown = initialShown(); return renderList(); }
    if (target.hasAttribute('data-close-drawer')) return closeDrawers();
    if (target.dataset.serving) {
      var recipe = recipes.find(function (item) { return item.slug === els.detail.dataset.slug; });
      var current = Number(document.getElementById('serving-value').dataset.value);
      var next = Math.max(1, Math.min(12, current + Number(target.dataset.serving)));
      els.detail.innerHTML = renderDetail(recipe, next); return;
    }
    switch (target.dataset.action) {
      case 'clear': clearAll(); break;
      case 'clear-ingredients': state.ingredients = []; renderList(); break;
      case 'clear-advanced': state.category = '全部'; state.quick = '全部'; state.time = ''; state.difficulty = ''; state.sort = 'updated'; renderList(); break;
      case 'back-list': backToList(true); break;
      case 'start-cooking': openCooking(recipes.find(function (item) { return item.slug === els.detail.dataset.slug; })); break;
      case 'start-step-timer': openCooking(recipes.find(function (item) { return item.slug === els.detail.dataset.slug; }), Number(target.dataset.stepIndex)); break;
      case 'copy-ingredients': copyIngredients(recipes.find(function (item) { return item.slug === els.detail.dataset.slug; })); break;
      case 'print': window.print(); break;
      case 'open-decision': openDecisionPanel(); break;
      case 'close-decision': els.decision.hidden = true; break;
      case 'generate-recommendations': renderRecommendations(); break;
      case 'random-recipe': pickRandomRecipe(); break;
      case 'open-ingredients': openDrawer(els.ingredientDrawer); break;
      case 'toggle-view': toggleViewMode(); break;
    }
  });

  els.cooking.addEventListener('click', function (event) {
    var target = event.target.closest('[data-cooking]'); if (!target) return;
    event.stopPropagation();
    if (target.dataset.cooking === 'close') return closeCooking();
    if (target.dataset.cooking === 'ingredients') cooking.showIngredients = !cooking.showIngredients;
    if (target.dataset.cooking === 'prev') return moveCookingStep(-1);
    if (target.dataset.cooking === 'next') return moveCookingStep(1);
    if (target.dataset.cooking === 'timer-start') return startStepTimer(false);
    if (target.dataset.cooking === 'timer-manual') return startStepTimer(false, Number(target.dataset.seconds));
    if (target.dataset.cooking === 'timer-pause') return pauseStepTimer();
    if (target.dataset.cooking === 'timer-resume') return startStepTimer(true);
    if (target.dataset.cooking === 'timer-reset') return resetStepTimer();
    if (target.dataset.cooking === 'wake') return toggleWakeLock();
    saveCookingSession();
    renderCooking();
  });

  els.cooking.addEventListener('change', function (event) {
    if (event.target.dataset.cookingIngredient === undefined) return;
    var index = Number(event.target.dataset.cookingIngredient);
    if (event.target.checked && cooking.checkedIngredients.indexOf(index) === -1) cooking.checkedIngredients.push(index);
    if (!event.target.checked) cooking.checkedIngredients = cooking.checkedIngredients.filter(function (item) { return item !== index; });
    saveCookingSession();
  });

  els.grid.addEventListener('keydown', function (event) {
    var card = event.target.closest('[data-recipe]');
    if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openRecipe(card.dataset.recipe, true); }
  });
  els.search.addEventListener('input', function () { state.query = els.search.value.trim(); state.shown = initialShown(); renderList(); });
  els.load.addEventListener('click', function () { state.shown += initialShown(); renderList(false); });
  document.getElementById('clear-filter-button').addEventListener('click', clearAll);
  document.getElementById('advanced-filter-button').addEventListener('click', function () { openDrawer(els.filterDrawer); });
  document.getElementById('ingredient-drawer-button').addEventListener('click', function () { openDrawer(els.ingredientDrawer); });
  document.getElementById('mobile-filter-button').addEventListener('click', function () { openDrawer(els.filterDrawer); });
  document.getElementById('mobile-ingredient-button').addEventListener('click', function () { openDrawer(els.ingredientDrawer); });
  els.backdrop.addEventListener('click', closeDrawers);
  document.getElementById('advanced-filters').addEventListener('change', function (event) { if (event.target.id === 'recipe-sort') { state.sort = event.target.value; renderList(); } });
  els.detail.addEventListener('change', function (event) {
    if (event.target.dataset.ingredientIndex === undefined) return;
    var recipe = recipes.find(function (item) { return item.slug === els.detail.dataset.slug; });
    if (!recipe) return;
    var saved = readStorage(STORAGE_KEYS.cooking, null);
    var checked = Array.from(els.detail.querySelectorAll('[data-ingredient-index]:checked')).map(function (input) { return Number(input.dataset.ingredientIndex); });
    writeStorage(STORAGE_KEYS.cooking, {
      recipeSlug: recipe.slug,
      step: saved && saved.recipeSlug === recipe.slug ? saved.step : 0,
      completedSteps: saved && saved.recipeSlug === recipe.slug && Array.isArray(saved.completedSteps) ? saved.completedSteps : [],
      checkedIngredients: checked,
      showIngredients: false,
      timer: saved && saved.recipeSlug === recipe.slug ? saved.timer : null,
      wakeEnabled: saved && saved.recipeSlug === recipe.slug ? Boolean(saved.wakeEnabled) : false,
      updatedAt: Date.now()
    });
  });
  function handleDocumentKeydown(event) {
    if (event.key === 'Escape') { closeDrawers(); if (!els.cooking.hidden) closeCooking(); }
    if (!els.cooking.hidden && event.key === 'ArrowLeft') { event.preventDefault(); moveCookingStep(-1); }
    if (!els.cooking.hidden && event.key === 'ArrowRight') { event.preventDefault(); moveCookingStep(1); }
  }

  function handleVisibilityChange() {
    if (document.visibilityState === 'visible' && !els.cooking.hidden && cooking.wakeEnabled) requestWakeLock();
  }

  function handlePopState() {
    var slug = loadUrlState();
    if (slug) openRecipe(slug, false); else backToList(false);
    renderList(false);
  }

  document.addEventListener('keydown', handleDocumentKeydown);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('popstate', handlePopState);

  window.__recipesPageCleanup = function () {
    if (!isActive) return;
    isActive = false;
    document.removeEventListener('keydown', handleDocumentKeydown);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('popstate', handlePopState);
    stopTimerTicker();
    releaseWakeLock();
    if (requestController) requestController.abort();
    document.body.style.overflow = '';
    document.body.classList.remove('recipes-page');
  };

  fetch(app.dataset.source || '/recipes/data.json', {
    credentials: 'same-origin',
    signal: requestController ? requestController.signal : undefined
  })
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(function (payload) {
      if (isActive && document.contains(app)) initializeRecipes(payload);
    })
    .catch(function (error) {
      if (isActive && error.name !== 'AbortError') showLoadError(error);
    });
  }

  document.addEventListener('site:page-loaded', mountRecipesPage);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountRecipesPage);
  } else {
    mountRecipesPage();
  }
}());
