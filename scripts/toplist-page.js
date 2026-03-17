const fs = require('fs');
const path = require('path');

const DEFAULT_SOURCE_DIR = path.join('source', 'toplist', 'data');
const DEFAULT_DESCRIPTION = 'Weibo Top 50 by date and hour with lazy loading and rank change comparison.';
const DAY_DATA_DIR = 'toplist/day-data';

function resolveSourceDir(hexo, sourceDir) {
  const dir = String(sourceDir || '').trim();
  if (!dir) return path.join(hexo.base_dir, DEFAULT_SOURCE_DIR);
  if (path.isAbsolute(dir)) return dir;
  return path.join(hexo.base_dir, dir);
}

function normalizeSlash(p) {
  return String(p || '').replace(/\\/g, '/');
}

function extractDateHourFromFilename(filePath) {
  const base = path.basename(filePath);
  const m = base.match(/(\d{4})(\d{2})(\d{2})_(\d{2})/);
  if (!m) return { date: null, hour: null };
  return { date: `${m[1]}-${m[2]}-${m[3]}`, hour: m[4] };
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toIdPart(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseHotMd(mdText) {
  const reUpdated = /(updated|\u66f4\u65b0\u65f6\u95f4)/i;
  const reTotal = /(total|\u603b\u8ba1|\u603b\u6570)/i;
  const lines = String(mdText || '').split(/\r?\n/);
  const titleLine = lines.find(line => /^#\s+/.test(line)) || '';
  const title = titleLine.replace(/^#\s+/, '').trim() || '\u70ed\u641c';
  const updatedLine = lines.find(line => /\*\*.*\*\*:\s*/.test(line) && reUpdated.test(line)) || '';
  const updatedAt = updatedLine.replace(/.*\*\*.*\*\*:\s*/, '').trim();
  const totalLine = lines.find(line => /\*\*.*\*\*:\s*/.test(line) && reTotal.test(line)) || '';
  const total = totalLine.replace(/.*\*\*.*\*\*:\s*/, '').trim();

  const idx = lines.indexOf(titleLine);
  const bodyLines = idx >= 0 ? lines.slice(idx + 1) : lines.slice();
  let filtered = bodyLines
    .filter(line => !(/^\s*\*\*.*\*\*:\s*/.test(line) && reUpdated.test(line)))
    .filter(line => !/^\s*(\u66f4\u65b0\u65f6\u95f4)\s*[:\uff1a]\s*/i.test(line))
    .filter(line => !/^\s*##+\s*.*top\s*50.*$/i.test(line))
    .slice();

  const isHrLine = line => /^\s*(?:-{3,}|_{3,}|\*{3,})\s*$/.test(line);
  filtered = filtered.filter(line => !isHrLine(line));
  while (filtered.length && filtered[0].trim() === '') filtered.shift();

  return {
    title,
    updatedAt,
    total,
    body: filtered.join('\n').trim()
  };
}

function parseHotEntries(body) {
  const lines = String(body || '').split(/\r?\n/);
  const entries = [];

  for (const line of lines) {
    const match = line.match(/^\s*(\d+)\.\s+\[(.+?)\]\((.+?)\)\s*(?:\(([\d,.]+)\))?\s*$/);
    if (!match) continue;
    entries.push({
      rank: Number(match[1]),
      title: match[2].trim(),
      url: match[3].trim(),
      heat: (match[4] || '').trim()
    });
  }

  return entries;
}

function canonicalKey(entry) {
  return entry && (entry.url || entry.title || '').trim();
}

function buildTrendMap(previousEntries) {
  const map = new Map();
  for (let i = 0; i < previousEntries.length; i++) {
    map.set(canonicalKey(previousEntries[i]), i + 1);
  }
  return map;
}

function trendMeta(rank, previousRank) {
  if (!previousRank) {
    return {
      direction: 'new',
      delta: null,
      emphasis: 'new',
      shortLabel: 'NEW',
      longLabel: '\u65b0\u4e0a\u699c'
    };
  }

  const delta = previousRank - rank;
  if (delta > 0) {
    return {
      direction: 'up',
      delta,
      emphasis: delta >= 5 ? 'rise' : 'default',
      shortLabel: `+${delta}`,
      longLabel: `\u8f83\u4e0a\u4e00\u5c0f\u65f6\u4e0a\u5347 ${delta} \u4f4d`
    };
  }
  if (delta < 0) {
    return {
      direction: 'down',
      delta,
      emphasis: 'default',
      shortLabel: String(delta),
      longLabel: `\u8f83\u4e0a\u4e00\u5c0f\u65f6\u4e0b\u964d ${Math.abs(delta)} \u4f4d`
    };
  }
  return {
    direction: 'same',
    delta: 0,
    emphasis: 'default',
    shortLabel: '-',
    longLabel: '\u4e0e\u4e0a\u4e00\u5c0f\u65f6\u6301\u5e73'
  };
}

function buildTrendStats(entries) {
  const stats = { new: 0, up: 0, down: 0, same: 0 };
  for (const entry of entries) {
    const direction = entry && entry.trend ? entry.trend.direction : 'same';
    if (Object.prototype.hasOwnProperty.call(stats, direction)) {
      stats[direction] += 1;
    } else {
      stats.same += 1;
    }
  }
  return stats;
}

function formatHeat(heat) {
  if (!heat) return '';
  return String(heat).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function renderEntryList(entries) {
  const itemsHtml = entries.map(entry => {
    const heatHtml = entry.heat
      ? `<span class="toplist-entry__heat" title="\u70ed\u5ea6">${escapeHtml(formatHeat(entry.heat))}</span>`
      : '';
    const trendHtml = entry.trend
      ? `<span class="toplist-entry__trend toplist-entry__trend--${entry.trend.direction}" title="${escapeHtml(entry.trend.longLabel)}" aria-label="${escapeHtml(entry.trend.longLabel)}">${escapeHtml(entry.trend.shortLabel)}</span>`
      : '';
    const trendDirection = entry.trend && entry.trend.direction ? entry.trend.direction : 'same';
    const emphasis = entry.trend && entry.trend.emphasis ? entry.trend.emphasis : 'default';

    return `<li data-rank="${escapeHtml(entry.rank)}" data-trend="${escapeHtml(trendDirection)}" data-emphasis="${escapeHtml(emphasis)}"><a target="_blank" rel="noopener" href="${escapeHtml(entry.url)}">${escapeHtml(entry.title)}</a><span class="toplist-entry__meta">${trendHtml}${heatHtml}</span></li>`;
  }).join('\n');

  return `<ol>\n${itemsHtml}\n</ol>`;
}

function loadHotFiles(sourceDir) {
  if (!sourceDir || !fs.existsSync(sourceDir)) return [];

  const files = fs.readdirSync(sourceDir)
    .filter(name =>
      /^WB_Top_\d{8}_\d{2}\.md$/i.test(name) ||
      /^Top_\d{8}\.md$/i.test(name) ||
      /^WB_Hot_\d{8}_\d{2}\.md$/i.test(name) ||
      /^Hot_\d{8}\.md$/i.test(name)
    )
    .map(name => path.join(sourceDir, name));

  return files
    .map(filePath => {
      const { date, hour } = extractDateHourFromFilename(filePath);
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = parseHotMd(raw);
      const entries = parseHotEntries(parsed.body);
      return {
        date: date || '',
        hour: hour || '',
        path: filePath,
        title: parsed.title,
        updatedAt: parsed.updatedAt,
        total: String(entries.length),
        entries
      };
    })
    .filter(item => item.date && item.entries.length)
    .sort((a, b) => {
      const dateDiff = (b.date || '').localeCompare(a.date || '');
      if (dateDiff !== 0) return dateDiff;
      return (b.hour || '').localeCompare(a.hour || '');
    });
}

function groupByDate(items) {
  const groups = {};
  for (const item of items) {
    const key = item.date || '\u672a\u77e5\u65e5\u671f';
    (groups[key] = groups[key] || []).push(item);
  }
  return Object.keys(groups)
    .sort((a, b) => b.localeCompare(a))
    .map(dateKey => ({
      dateKey,
      dayItems: groups[dateKey].sort((a, b) => (b.hour || '').localeCompare(a.hour || ''))
    }));
}

function buildPayloadForDay(dayItems, dayId) {
  return dayItems.map((item, index) => {
    const previousEntries = dayItems[index + 1] ? dayItems[index + 1].entries : [];
    const previousMap = buildTrendMap(previousEntries);
    const entries = item.entries.map(entry => ({
      ...entry,
      trend: trendMeta(entry.rank, previousMap.get(canonicalKey(entry)))
    }));

    return {
      panelId: `${dayId}-${item.hour ? `h${item.hour}` : 'hna'}-${index}`,
      hourLabel: item.hour ? `${item.hour}:00` : '--',
      updatedAt: item.updatedAt || '',
      total: String(entries.length),
      isEarliest: index === dayItems.length - 1,
      stats: buildTrendStats(entries),
      entries
    };
  });
}

function renderStatsBar(stats) {
  const safeStats = stats || { new: 0, up: 0, down: 0, same: 0 };
  return `<div class="toplist-hour-panel__stats" aria-label="\u53d8\u5316\u7edf\u8ba1"><button type="button" class="toplist-stat toplist-stat--new" data-filter="new" aria-pressed="false">NEW ${safeStats.new}</button><button type="button" class="toplist-stat toplist-stat--up" data-filter="up" aria-pressed="false">\u4e0a\u5347 ${safeStats.up}</button><button type="button" class="toplist-stat toplist-stat--down" data-filter="down" aria-pressed="false">\u4e0b\u964d ${safeStats.down}</button><button type="button" class="toplist-stat toplist-stat--same" data-filter="same" aria-pressed="false">\u6301\u5e73 ${safeStats.same}</button></div>`;
}

function renderFilterToolbar() {
  return `<div class="toplist-filter" data-filter-mode="all" data-filter-search="">
    <div class="toplist-filter__chips" role="toolbar" aria-label="\u699c\u5355\u7b5b\u9009">
      <button type="button" class="toplist-filter__chip is-active" data-filter="all" aria-pressed="true">\u5168\u90e8</button>
      <button type="button" class="toplist-filter__chip" data-filter="changes" aria-pressed="false">\u53ea\u770b\u53d8\u5316</button>
      <button type="button" class="toplist-filter__chip" data-filter="top10" aria-pressed="false">Top10</button>
    </div>
    <div class="toplist-filter__search">
      <input type="search" class="toplist-filter__input" placeholder="\u641c\u7d22\u5173\u952e\u8bcd" inputmode="search" autocomplete="off" spellcheck="false" aria-label="\u641c\u7d22\u5f53\u524d\u699c\u5355\u5173\u952e\u8bcd">
      <span class="toplist-filter__count" aria-live="polite"></span>
      <button type="button" class="toplist-filter__clear" hidden disabled>\u6e05\u9664\u7b5b\u9009</button>
    </div>
  </div>
  <p class="toplist-filter__empty" hidden>\u5f53\u524d\u7b5b\u9009\u4e0b\u6682\u65e0\u7ed3\u679c</p>`;
}

function renderHoursBlock(payload, isInitialVisible) {
  const navHtml = payload.map((item, index) => {
    const btnId = `${item.panelId}-tab`;
    const active = index === 0;
    const titleAttr = item.updatedAt ? ` title="${escapeHtml(item.updatedAt)}"` : '';
    return `<button type="button" id="${btnId}" role="tab" tabindex="${active ? '0' : '-1'}" class="toplist-hour-btn${active ? ' is-active' : ''}" data-target="${item.panelId}" data-idx="${index}" aria-controls="${item.panelId}" aria-selected="${active ? 'true' : 'false'}"${titleAttr}>${escapeHtml(item.hourLabel)}</button>`;
  }).join('\n');

  const panelsHtml = payload.map((item, index) => {
    const active = index === 0;
    const metaRight = `${item.updatedAt ? `<span class="toplist-hour-panel__updated">${escapeHtml(item.updatedAt)}</span>` : ''}<span class="toplist-hour-panel__state" aria-live="polite"></span>`;
    const summaryText = index === payload.length - 1
      ? `\u5171 ${item.total} \u6761\uff0c\u6682\u65e0\u66f4\u65e9\u5c0f\u65f6\u53ef\u5bf9\u6bd4`
      : `\u5171 ${item.total} \u6761\uff0c\u542b\u76f8\u5bf9\u4e0a\u4e00\u5c0f\u65f6\u53d8\u5316`;
    return `<section class="toplist-hour-panel"${active ? '' : ' hidden'} id="${item.panelId}" role="tabpanel" aria-labelledby="${item.panelId}-tab" aria-hidden="${active ? 'false' : 'true'}" data-idx="${index}"><div class="toplist-hour-panel__meta"><span class="toplist-hour-panel__time">${escapeHtml(item.hourLabel)}</span>${metaRight}</div><p class="toplist-hour-panel__summary">${escapeHtml(summaryText)}</p>${renderStatsBar(item.stats)}${renderFilterToolbar()}<div class="toplist-entry"><div class="toplist-entry__content">${renderEntryList(item.entries)}</div></div></section>`;
  }).join('\n');

  return `
<div class="toplist-hours${isInitialVisible ? '' : ' is-lazy'}">
  <div class="toplist-hours__nav" role="tablist" aria-label="\u5c0f\u65f6\u9009\u62e9">
    ${navHtml}
  </div>
  <div class="toplist-hours__panels" data-cols="1">
    ${panelsHtml}
  </div>
</div>
  `.trim();
}

function dayDataRoute(dayId) {
  return `${DAY_DATA_DIR}/${dayId}.json`;
}

function buildToplistData(hexo) {
  const cfg = (hexo.config && hexo.config.toplist_page) || {};
  const sourceDir = resolveSourceDir(hexo, cfg.source_dir);
  const items = loadHotFiles(sourceDir);
  const days = groupByDate(items).map(({ dateKey, dayItems }, index) => {
    const dayId = `toplist-day-${toIdPart(dateKey) || `d${index}`}`;
    const payload = buildPayloadForDay(dayItems, dayId);
    return {
      dateKey,
      dayId,
      payload,
      latestUpdatedAt: dayItems[0] && dayItems[0].updatedAt ? dayItems[0].updatedAt : '',
      routePath: dayDataRoute(dayId),
      panelIds: payload.map(item => item.panelId)
    };
  });

  return { cfg, items, days, sourceDir };
}

function rootPath(hexo, routePath) {
  const root = (hexo.config && hexo.config.root) || '/';
  return `${String(root).replace(/\/?$/, '/')}${String(routePath || '').replace(/^\/+/, '')}`;
}

function renderTopListPage(hexo) {
  const { cfg, items, days, sourceDir } = buildToplistData(hexo);
  const heroTitle = cfg.title || '\u70ed\u641c\u699c TOP50';
  const enhancementsScriptSrc = rootPath(hexo, 'js/toplist-enhancements.js');

  if (items.length === 0) {
    return `
<div class="markdown-body toplist-page" data-toplist-render="v4">
  <div class="toplist-hero">
    <div class="toplist-hero__title">${escapeHtml(heroTitle)}</div>
    <p class="toplist-hero__desc">\u76ee\u524d\u5c1a\u672a\u8bfb\u53d6\u5230\u4efb\u4f55\u70ed\u641c md \u6e90\u3002</p>
    <p class="toplist-hero__desc">\u6570\u636e\u76ee\u5f55\uff1a${escapeHtml(sourceDir)}</p>
  </div>
</div>
    `.trim();
  }

  const newest = items[0] || {};
  const latestDay = days[0] || {};
  const latestPanel = latestDay.payload && latestDay.payload[0] ? latestDay.payload[0] : null;
  const heroMeta = newest.updatedAt
    ? `\u6700\u65b0\u66f4\u65b0\uff1a${escapeHtml(newest.updatedAt)}`
    : (newest.date ? `\u6700\u65b0\u65f6\u6bb5\uff1a${escapeHtml(newest.date)}${newest.hour ? ` ${escapeHtml(newest.hour)}:00` : ''}` : '');
  const heroUpdatedHtml = heroMeta
    ? `<p class="toplist-hero__updated">${heroMeta}</p>`
    : '';
  const summaryCards = latestPanel ? [
    { label: '\u5f53\u524d\u65f6\u6bb5', value: latestPanel.hourLabel || '--', tone: 'neutral' },
    { label: '\u65b0\u4e0a\u699c', value: latestPanel.stats && latestPanel.stats.new || 0, tone: 'new' },
    { label: '\u4e0a\u5347', value: latestPanel.stats && latestPanel.stats.up || 0, tone: 'up' },
    { label: '\u4e0b\u964d', value: latestPanel.stats && latestPanel.stats.down || 0, tone: 'down' }
  ] : [];
  const summaryHtml = summaryCards.length ? `
    <div class="toplist-hero__summary" aria-label="\u6700\u65b0\u6982\u89c8">
      ${summaryCards.map(card => `
        <div class="toplist-summary-card toplist-summary-card--${card.tone}">
          <span class="toplist-summary-card__label">${escapeHtml(card.label)}</span>
          <strong class="toplist-summary-card__value">${escapeHtml(String(card.value))}</strong>
        </div>
      `.trim()).join('\n')}
    </div>
  `.trim() : '';

  const quickDesktopDays = days.slice(0, 6);
  const quickMobileDays = days.slice(0, 3);

  const jumpHtml = quickDesktopDays.map((day, index) =>
    `<button type="button" class="toplist-day-jump${index === 0 ? ' is-active' : ''}" data-day-key="${escapeHtml(day.dayId)}"${index === 0 ? ' data-is-latest="true"' : ''}>${escapeHtml(day.dateKey)}${index === 0 ? '<span class="toplist-day-jump__badge">\u6700\u65b0</span>' : ''}</button>`
  ).join('\n');

  const mobileJumpHtml = quickMobileDays.map((day, index) =>
    `<button type="button" class="toplist-day-jump toplist-day-jump--mobile${index === 0 ? ' is-active' : ''}" data-day-key="${escapeHtml(day.dayId)}"${index === 0 ? ' data-is-latest="true"' : ''}>${escapeHtml(day.dateKey.slice(5))}${index === 0 ? '<span class="toplist-day-jump__badge">\u6700\u65b0</span>' : ''}</button>`
  ).join('\n');

  const stickyBarHtml = `
    <div class="toplist-stickybar" aria-label="\u5feb\u901f\u64cd\u4f5c">
      <div class="toplist-stickybar__summary">
        <span class="toplist-stickybar__label">\u5f53\u524d</span>
        <strong class="toplist-stickybar__value">${escapeHtml(latestDay.dateKey || '--')} ${escapeHtml(latestPanel && latestPanel.hourLabel ? latestPanel.hourLabel : '--')}</strong>
        <span class="toplist-stickybar__compare" hidden></span>
      </div>
      <div class="toplist-stickybar__actions">
        <button type="button" class="toplist-stickybar__btn" data-action="prev-hour">\u4e0a\u4e00\u5c0f\u65f6</button>
        <button type="button" class="toplist-stickybar__btn" data-action="next-hour">\u4e0b\u4e00\u5c0f\u65f6</button>
        <button type="button" class="toplist-stickybar__btn toplist-stickybar__btn--latest" data-action="expand-latest">\u56de\u5230\u6700\u65b0</button>
      </div>
    </div>
  `.trim();

  const daysHtml = days.map((day, index) => {
    const latestMeta = day.latestUpdatedAt
      ? `<span class="toplist-day__meta">\u6700\u65b0 ${escapeHtml(day.latestUpdatedAt.slice(11, 16))}</span>`
      : '';
    const bodyHtml = `<div class="toplist-day__lazy" data-day-key="${escapeHtml(day.dayId)}" data-src="${escapeHtml(rootPath(hexo, day.routePath))}" data-state="${index === 0 ? 'loading' : 'idle'}"><span class="toplist-day__lazy-spinner" aria-hidden="true"></span><span class="toplist-day__lazy-text">${index === 0 ? '\u6b63\u5728\u52a0\u8f7d\u6700\u65b0\u5c0f\u65f6\u699c\u5355...' : '\u5c55\u5f00\u540e\u52a0\u8f7d\u5f53\u65e5\u5c0f\u65f6\u699c\u5355'}</span><button type="button" class="toplist-day__retry" hidden>\u91cd\u8bd5</button></div>`;

    return `
<details class="toplist-day${index === 0 ? ' is-latest-day' : ''}" data-day-key="${escapeHtml(day.dayId)}" data-date="${escapeHtml(day.dateKey)}" data-panel-ids="${escapeHtml(day.panelIds.join(','))}"${index === 0 ? ' open' : ''}>
  <summary>
    <div class="toplist-day__left">
      <span class="toplist-day__date">${escapeHtml(day.dateKey)}</span>
      ${index === 0 ? '<span class="toplist-day__date-badge">\u6700\u65b0\u65e5\u671f</span>' : ''}
      <span class="toplist-day__count">${day.payload.length} \u4e2a\u65f6\u6bb5</span>
      ${latestMeta}
    </div>
  </summary>
  <div class="toplist-day__body">
    ${bodyHtml}
  </div>
</details>
    `.trim();
  }).join('\n');

  return `
<div class="markdown-body toplist-page" data-toplist-render="v4" data-default-description="${escapeHtml(DEFAULT_DESCRIPTION)}">
  <div class="toplist-hero">
    <div class="toplist-hero__title">${escapeHtml(heroTitle)}</div>
    <p class="toplist-hero__desc">\u6309\u65e5\u671f\u67e5\u770b\u5fae\u535a\u70ed\u641c TOP50\u3002\u9ed8\u8ba4\u5355\u5c0f\u65f6\u6d4f\u89c8\uff0c\u53ef\u5207\u6362\u4e3a\u684c\u9762\u53cc\u5217\u5bf9\u6bd4\uff0c\u5e76\u5c55\u793a\u76f8\u5bf9\u4e0a\u4e00\u5c0f\u65f6\u7684\u540d\u6b21\u53d8\u5316\u3002</p>
    ${heroUpdatedHtml}
    ${summaryHtml}
    <p class="toplist-hero__hint">\u79fb\u52a8\u7aef\u5efa\u8bae\u4f7f\u7528\u201c\u53ea\u770b\u53d8\u5316\u201d\uff0c\u684c\u9762\u7aef\u53ef\u5f00\u542f\u201c\u53cc\u5217\u5bf9\u6bd4\u201d\u3002\u5f53\u524d\u5c0f\u65f6\u53ef\u76f4\u63a5\u7b5b\u9009\u65b0\u4e0a\u699c\u3001\u4e0a\u5347\u3001Top10 \u6216\u641c\u7d22\u5173\u952e\u8bcd\u3002</p>
    <div class="toplist-actions">
      <button type="button" class="toplist-action toplist-action--primary" data-action="expand-latest">\u67e5\u770b\u6700\u65b0</button>
      <button type="button" class="toplist-action" data-action="collapse-all">\u6298\u53e0\u5168\u90e8</button>
      <button type="button" class="toplist-action toplist-action--desktop" data-action="toggle-compare" aria-pressed="false">\u684c\u9762\u53cc\u5217\u5bf9\u6bd4</button>
      <button type="button" class="toplist-action toplist-action--mobile" data-action="toggle-changes" aria-pressed="false">\u53ea\u770b\u53d8\u5316</button>
    </div>
    <div class="toplist-date-controls">
      <div class="toplist-day-jumps" aria-label="\u6700\u8fd1 5 \u5929">
        ${jumpHtml}
      </div>
      <div class="toplist-day-jumps toplist-day-jumps--mobile" aria-label="\u6700\u8fd1 3 \u5929">
        ${mobileJumpHtml}
      </div>
      <div class="toplist-calendar-launcher">
        <button type="button" class="toplist-calendar-trigger" data-action="toggle-calendar" aria-expanded="false" aria-controls="toplist-calendar-panel" aria-label="\u6253\u5f00\u5386\u53f2\u65e5\u5386">
          <span class="toplist-calendar-trigger__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M7 2.75a.75.75 0 0 1 .75.75v1h8.5v-1a.75.75 0 0 1 1.5 0v1h.75A2.5 2.5 0 0 1 21 7v11.5A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5V7a2.5 2.5 0 0 1 2.5-2.5h.75v-1A.75.75 0 0 1 7 2.75ZM4.5 9.5v9a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-9h-15Zm1-3.5a1 1 0 0 0-1 1V8h15V7a1 1 0 0 0-1-1h-.75v.75a.75.75 0 0 1-1.5 0V6h-8.5v.75a.75.75 0 0 1-1.5 0V6H5.5Z" fill="currentColor"/>
            </svg>
          </span>
          <span class="toplist-calendar-trigger__text">\u66f4\u591a\u5386\u53f2</span>
        </button>
        <button type="button" class="toplist-calendar-backdrop" data-action="close-calendar" aria-label="\u5173\u95ed\u5386\u53f2\u65e5\u5386" hidden></button>
        <div id="toplist-calendar-panel" class="toplist-calendar" role="dialog" aria-modal="true" aria-labelledby="toplist-calendar-title" hidden>
          <div class="toplist-calendar__topbar">
            <div class="toplist-calendar__heading">
              <div id="toplist-calendar-title" class="toplist-calendar__dialog-title">\u5386\u53f2\u65e5\u671f</div>
              <div class="toplist-calendar__dialog-desc">\u9009\u62e9\u67d0\u4e00\u5929\uff0c\u53ea\u67e5\u770b\u5f53\u65e5\u70ed\u641c</div>
            </div>
            <button type="button" class="toplist-calendar__close" data-action="close-calendar" aria-label="\u5173\u95ed\u5386\u53f2\u65e5\u5386">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="toplist-calendar__header">
            <button type="button" class="toplist-calendar__nav" data-action="calendar-prev" aria-label="\u4e0a\u4e00\u6708">&lt;</button>
            <div class="toplist-calendar__title">\u5386\u53f2\u65e5\u671f</div>
            <button type="button" class="toplist-calendar__nav" data-action="calendar-next" aria-label="\u4e0b\u4e00\u6708">&gt;</button>
          </div>
          <div class="toplist-calendar__weekdays" aria-hidden="true">
            <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
          </div>
          <div class="toplist-calendar__grid" role="grid" aria-label="\u53ef\u9009\u5386\u53f2\u65e5\u671f"></div>
          <div class="toplist-calendar__legend">
            <span class="toplist-calendar__legend-dot" aria-hidden="true"></span>
            <span>\u6709\u70ed\u641c\u6570\u636e</span>
          </div>
          <div class="toplist-calendar__footer">
            <span>\u70b9\u51fb\u7a7a\u767d\u533a\u57df\u6216\u6309 Esc \u5173\u95ed</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  ${stickyBarHtml}
  <div class="toplist-days">
    ${daysHtml}
  </div>
</div>
<script src="${escapeHtml(enhancementsScriptSrc)}" defer></script>
  `.trim();
}

hexo.extend.generator.register('toplist-day-data', function() {
  const { days } = buildToplistData(this);
  return days.map(day => ({
    path: day.routePath,
    data: JSON.stringify({
      dayKey: day.dayId,
      date: day.dateKey,
      updatedAt: day.latestUpdatedAt,
      panels: day.payload
    })
  }));
});

hexo.extend.filter.register('after_post_render', function(data) {
  const source = normalizeSlash(data && data.source);
  const pagePath = normalizeSlash(data && data.path);
  const isTopListPage = source === 'toplist/index.md' || pagePath === 'toplist/index.html';
  if (!isTopListPage) return data;
  data.content = renderTopListPage(hexo);
  data.excerpt = DEFAULT_DESCRIPTION;
  data.description = DEFAULT_DESCRIPTION;
  return data;
});
