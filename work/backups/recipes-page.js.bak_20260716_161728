(function () {
  'use strict';

  var app = document.getElementById('recipe-app');
  if (!app) return;
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
  var categories = ['全部'];
  var commonIngredients = [];
  var quickFilters = ['全部'];
  var ingredientGroups = {};
  var state = {
    query: '', category: '全部', quick: '全部', ingredients: [], time: '', difficulty: '', sort: 'updated', shown: 12
  };
  var cooking = { recipe: null, step: 0, showIngredients: false };
  var drawerReturnFocus = null;
  var cookingReturnFocus = null;
  var els = {
    list: document.getElementById('recipe-list-view'), detail: document.getElementById('recipe-detail-view'),
    grid: document.getElementById('recipe-grid'), search: document.getElementById('recipe-search'),
    count: document.getElementById('result-count'), empty: document.getElementById('empty-state'),
    load: document.getElementById('load-more-button'), summary: document.getElementById('active-filter-summary'),
    backdrop: document.getElementById('drawer-backdrop'), ingredientDrawer: document.getElementById('ingredient-drawer'),
    filterDrawer: document.getElementById('filter-drawer'), cooking: document.getElementById('cooking-mode'), toast: document.getElementById('recipe-toast')
  };

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char];
    });
  }

  function uniqueValues(values) {
    return values.filter(function (value, index, list) { return value && list.indexOf(value) === index; });
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
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.map(function (item) {
        return { name: String(item.name || ''), amount: String(item.amount || ''), prep: String(item.prep || '') };
      }).filter(function (item) { return item.name; }) : [],
      steps: Array.isArray(recipe.steps) ? recipe.steps.map(function (step) {
        return { title: String(step.title || ''), text: String(step.text || ''), tip: String(step.tip || '') };
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

  function renderList(updateUrl) {
    var result = filteredRecipes();
    els.count.textContent = result.length;
    els.grid.innerHTML = result.slice(0, state.shown).map(renderCard).join('');
    els.empty.hidden = result.length !== 0;
    els.load.hidden = result.length <= state.shown;
    var active = [];
    if (state.ingredients.length) active.push('食材：' + state.ingredients.join(' + '));
    if (state.quick !== '全部') active.push('标签：' + state.quick);
    if (state.time) active.push('已限制制作时间');
    if (state.difficulty) active.push('难度：' + state.difficulty);
    els.summary.hidden = active.length === 0;
    els.summary.textContent = active.length ? '当前筛选 · ' + active.join(' · ') : '';
    updateFilterStates();
    if (updateUrl !== false) syncUrl(true);
  }

  function renderCard(recipe) {
    var ingredients = recipe.ingredients.slice(0, 3);
    return '<article class="recipe-card" tabindex="0" role="link" data-recipe="' + escapeHtml(recipe.slug) + '" aria-label="查看' + escapeHtml(recipe.name) + '">' +
      '<div class="recipe-card-top"><div><h2>' + highlight(recipe.name) + '</h2><p>' + highlight(recipe.description) + '</p></div>' +
      (recipe.favorite ? '<span class="favorite-badge">常做</span>' : '') + '</div>' +
      '<div class="recipe-meta"><span>' + escapeHtml(recipe.category) + '</span><span>' + escapeHtml(recipe.difficulty) + '</span><span>' + escapeHtml(recipe.time) + ' 分钟</span><span>' + escapeHtml(recipe.servings) + ' 人份</span></div>' +
      '<div class="recipe-card-footer"><div class="card-ingredients">' + ingredients.map(function (item) { return '<span class="card-ingredient">' + highlight(item.name) + '</span>'; }).join('') +
      (recipe.ingredients.length > 3 ? '<span class="more-ingredients">+' + (recipe.ingredients.length - 3) + '</span>' : '') + '</div><span class="recipe-card-arrow">→</span></div></article>';
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
    return '<nav class="recipe-breadcrumb"><a href="/">首页</a> / <button type="button" data-action="back-list">Recipes</button> / ' + escapeHtml(recipe.name) + '</nav>' +
      '<header class="detail-header"><div class="detail-title-row"><div><h1>' + escapeHtml(recipe.name) + '</h1><p class="detail-description">' + escapeHtml(recipe.description) + '</p>' +
      '<div class="detail-meta">' + escapeHtml(recipe.category) + '　·　' + escapeHtml(recipe.difficulty) + '　·　' + escapeHtml(recipe.time) + ' 分钟　·　' + escapeHtml(servings) + ' 人份</div></div>' +
      '<div class="detail-actions"><button class="primary-button" type="button" data-action="start-cooking">开始烹饪</button><button class="tool-button" type="button" data-action="copy-ingredients">复制食材</button><button class="tool-button" type="button" data-action="print">打印食谱</button></div></div></header>' +
      '<div class="detail-layout"><aside class="ingredient-panel"><h2>食材</h2><div class="serving-control"><span>份量</span><div class="serving-buttons"><button type="button" data-serving="-1" aria-label="减少份量">−</button><strong id="serving-value" data-value="' + servings + '">' + servings + ' 人</strong><button type="button" data-serving="1" aria-label="增加份量">＋</button></div></div>' +
      '<ul class="ingredient-checklist">' + recipe.ingredients.map(function (item, index) { return '<li><input id="ingredient-' + index + '" type="checkbox"><label for="ingredient-' + index + '">' + escapeHtml(item.name) + (item.prep ? '<span class="ingredient-prep">' + escapeHtml(item.prep) + '</span>' : '') + '</label><span class="ingredient-amount">' + escapeHtml(scaleAmount(item.amount, scale)) + '</span></li>'; }).join('') + '</ul></aside>' +
      '<section class="steps-panel"><h2>制作步骤</h2>' + recipe.steps.map(function (step, index) { return '<article class="recipe-step"><span class="step-number">' + String(index + 1).padStart(2, '0') + '</span><div class="step-content"><h3>' + escapeHtml(step.title) + '</h3><p>' + escapeHtml(step.text) + '</p>' + (step.tip ? '<div class="step-tip">注意：' + escapeHtml(step.tip) + '</div>' : '') + '</div></article>'; }).join('') +
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
    state.shown = 12; renderList();
  }

  function clearAll() {
    state.query = ''; state.category = '全部'; state.quick = '全部'; state.ingredients = [];
    state.time = ''; state.difficulty = ''; state.sort = 'updated'; state.shown = 12; els.search.value = '';
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

  function openCooking(recipe) {
    cookingReturnFocus = document.activeElement;
    cooking.recipe = recipe; cooking.step = 0; cooking.showIngredients = false;
    els.cooking.hidden = false; document.body.style.overflow = 'hidden'; renderCooking();
  }

  function closeCooking() {
    els.cooking.hidden = true; document.body.style.overflow = '';
    if (cookingReturnFocus && document.contains(cookingReturnFocus)) cookingReturnFocus.focus();
    cookingReturnFocus = null;
  }

  function renderCooking() {
    var recipe = cooking.recipe, step = recipe.steps[cooking.step];
    els.cooking.innerHTML = '<div class="cooking-shell"><header class="cooking-header"><strong>' + escapeHtml(recipe.name) + '</strong><div class="cooking-header-actions"><span>' + (cooking.step + 1) + ' / ' + recipe.steps.length + '</span><button class="tool-button" type="button" data-cooking="close">退出</button></div></header>' +
      '<main class="cooking-content"><span class="cooking-step-number">' + String(cooking.step + 1).padStart(2, '0') + '</span><h2>' + escapeHtml(step.title) + '</h2><p class="cooking-instruction">' + escapeHtml(step.text) + '</p>' +
      (step.tip ? '<div class="cooking-tip">注意：' + escapeHtml(step.tip) + '</div>' : '') +
      (cooking.showIngredients ? '<aside class="cooking-ingredients"><strong>食材清单</strong><ul>' + recipe.ingredients.map(function (item) { return '<li>' + escapeHtml(item.name) + '　' + escapeHtml(item.amount) + '</li>'; }).join('') + '</ul></aside>' : '') + '</main>' +
      '<footer class="cooking-footer"><button class="tool-button" type="button" data-cooking="ingredients">' + (cooking.showIngredients ? '收起食材' : '查看食材') + '</button><div class="cooking-nav"><button class="tool-button" type="button" data-cooking="prev" ' + (cooking.step === 0 ? 'disabled' : '') + '>上一步</button><button class="primary-button" type="button" data-cooking="next">' + (cooking.step === recipe.steps.length - 1 ? '完成' : '下一步') + '</button></div></footer></div>';
    els.cooking.focus();
  }

  function initializeRecipes(payload) {
    var sourceRecipes = payload && Array.isArray(payload.recipes) ? payload.recipes : [];
    recipes = sourceRecipes.map(normalizeRecipe).filter(function (recipe) {
      return recipe.slug && recipe.ingredients.length && recipe.steps.length;
    });
    if (!recipes.length) throw new Error('没有可用的食谱数据');

    configureFilters();
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
    if (target.dataset.category !== undefined) { state.category = target.dataset.category; state.shown = 12; return renderList(); }
    if (target.dataset.quick !== undefined) { state.quick = target.dataset.quick; state.shown = 12; return renderList(); }
    if (target.dataset.ingredient) return toggleIngredient(target.dataset.ingredient);
    if (target.dataset.filterKey) { state[target.dataset.filterKey] = target.dataset.filterValue; state.shown = 12; return renderList(); }
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
      case 'copy-ingredients': copyIngredients(recipes.find(function (item) { return item.slug === els.detail.dataset.slug; })); break;
      case 'print': window.print(); break;
    }
  });

  els.cooking.addEventListener('click', function (event) {
    var target = event.target.closest('[data-cooking]'); if (!target) return;
    event.stopPropagation();
    if (target.dataset.cooking === 'close') return closeCooking();
    if (target.dataset.cooking === 'ingredients') cooking.showIngredients = !cooking.showIngredients;
    if (target.dataset.cooking === 'prev') cooking.step = Math.max(0, cooking.step - 1);
    if (target.dataset.cooking === 'next') { if (cooking.step === cooking.recipe.steps.length - 1) return closeCooking(); cooking.step += 1; }
    renderCooking();
  });

  els.grid.addEventListener('keydown', function (event) {
    var card = event.target.closest('[data-recipe]');
    if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openRecipe(card.dataset.recipe, true); }
  });
  els.search.addEventListener('input', function () { state.query = els.search.value.trim(); state.shown = 12; renderList(); });
  els.load.addEventListener('click', function () { state.shown += 12; renderList(false); });
  document.getElementById('clear-filter-button').addEventListener('click', clearAll);
  document.getElementById('advanced-filter-button').addEventListener('click', function () { openDrawer(els.filterDrawer); });
  document.getElementById('ingredient-drawer-button').addEventListener('click', function () { openDrawer(els.ingredientDrawer); });
  document.getElementById('mobile-filter-button').addEventListener('click', function () { openDrawer(els.filterDrawer); });
  document.getElementById('mobile-ingredient-button').addEventListener('click', function () { openDrawer(els.ingredientDrawer); });
  els.backdrop.addEventListener('click', closeDrawers);
  document.getElementById('advanced-filters').addEventListener('change', function (event) { if (event.target.id === 'recipe-sort') { state.sort = event.target.value; renderList(); } });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape') { closeDrawers(); if (!els.cooking.hidden) closeCooking(); } });
  window.addEventListener('popstate', function () { var slug = loadUrlState(); if (slug) openRecipe(slug, false); else backToList(false); renderList(false); });

  fetch(app.dataset.source || '/recipes/data.json', { credentials: 'same-origin' })
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(initializeRecipes)
    .catch(showLoadError);
}());
