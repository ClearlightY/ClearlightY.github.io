const fs = require('fs');
const path = require('path');
const frontMatter = require('hexo-front-matter');

const DEFAULT_SOURCE_DIR = path.join('source', 'recipes', 'data');
const DATA_ROUTE = 'recipes/data.json';

function resolveSourceDir(hexo, sourceDir) {
  const value = String(sourceDir || '').trim();
  if (!value) return path.join(hexo.base_dir, DEFAULT_SOURCE_DIR);
  if (path.isAbsolute(value)) return value;
  return path.join(hexo.base_dir, value);
}

function stringValue(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback || '';
  return String(value).trim();
}

function stringList(value) {
  if (Array.isArray(value)) return value.map(item => stringValue(item)).filter(Boolean);
  if (!value) return [];
  return String(value).split(/[，,]/).map(item => item.trim()).filter(Boolean);
}

function dateValue(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  return stringValue(value);
}

function booleanValue(value) {
  if (typeof value === 'boolean') return value;
  return /^(?:true|yes|1)$/i.test(stringValue(value));
}

function sectionKey(title) {
  const value = stringValue(title).replace(/\s+/g, '');
  const mapping = {
    '\u98df\u6750': 'ingredients',
    '\u98df\u6750\u6e05\u5355': 'ingredients',
    '\u5236\u4f5c\u6b65\u9aa4': 'steps',
    '\u6b65\u9aa4': 'steps',
    '\u6ce8\u610f\u4e8b\u9879': 'notes',
    '\u5907\u6ce8': 'notes',
    '\u4e0b\u53a8\u8bb0\u5f55': 'logs',
    '\u5236\u4f5c\u8bb0\u5f55': 'logs'
  };
  return mapping[value] || '';
}

function splitCells(value) {
  return String(value || '').split('|').map(item => item.trim());
}

function parseRecipeBody(body) {
  const result = { ingredients: [], steps: [], notes: [], logs: [] };
  const lines = String(body || '').split(/\r?\n/);
  let section = '';
  let currentStep = null;

  for (const rawLine of lines) {
    const heading = rawLine.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      section = sectionKey(heading[1]);
      currentStep = null;
      continue;
    }

    const line = rawLine.trim();
    if (!line || !section) continue;

    if (section === 'ingredients') {
      const match = line.match(/^[-*]\s+(.+)$/);
      if (!match) continue;
      const cells = splitCells(match[1]);
      if (cells[0]) {
        result.ingredients.push({
          name: cells[0],
          amount: cells[1] || '\u9002\u91cf',
          prep: cells.slice(2).join(' | ')
        });
      }
      continue;
    }

    if (section === 'steps') {
      const stepMatch = line.match(/^\d+[.)]\s+(?:\*\*(.+?)\*\*|([^\uff1a:]+))[\uff1a:]\s*(.+)$/);
      if (stepMatch) {
        currentStep = { title: stringValue(stepMatch[1] || stepMatch[2]), text: stringValue(stepMatch[3]), tip: '' };
        result.steps.push(currentStep);
        continue;
      }
      const tipMatch = line.match(/^(?:[-*]\s*)?(?:\u63d0\u793a|\u6ce8\u610f)[\uff1a:]\s*(.+)$/);
      if (tipMatch && currentStep) {
        currentStep.tip = stringValue(tipMatch[1]);
        continue;
      }
      if (currentStep && !/^[-*]\s+/.test(line)) currentStep.text += ` ${line}`;
      continue;
    }

    if (section === 'notes') {
      const match = line.match(/^[-*]\s+(.+)$/);
      if (match) result.notes.push(stringValue(match[1]));
      continue;
    }

    if (section === 'logs') {
      const match = line.match(/^[-*]\s+(.+)$/);
      if (!match) continue;
      const cells = splitCells(match[1]);
      if (cells[0]) {
        result.logs.push({
          date: cells[0],
          rating: Math.max(0, Math.min(5, Number(cells[1]) || 0)),
          note: cells.slice(2).join(' | ')
        });
      }
    }
  }

  return result;
}

function parseRecipeFile(filePath) {
  // Pages CMS may save Markdown with CRLF. hexo-front-matter 3.x only
  // recognizes the opening delimiter reliably after normalizing line endings.
  const raw = fs.readFileSync(filePath, 'utf8').replace(/\r\n?/g, '\n');
  const parsed = frontMatter.parse(raw);
  const body = parseRecipeBody(parsed._content);
  const slug = stringValue(parsed.slug, path.basename(filePath, path.extname(filePath)));
  const tags = stringList(parsed.tags);
  const favorite = parsed.favorite === undefined ? tags.includes('\u5e38\u505a') : booleanValue(parsed.favorite);

  return {
    slug,
    name: stringValue(parsed.name || parsed.title),
    description: stringValue(parsed.description),
    category: stringValue(parsed.category, '\u5176\u4ed6'),
    tags,
    time: Math.max(0, Number(parsed.time) || 0),
    difficulty: stringValue(parsed.difficulty, '\u7b80\u5355'),
    servings: Math.max(1, Number(parsed.servings) || 1),
    favorite,
    updated: dateValue(parsed.updated),
    aliases: stringList(parsed.aliases),
    ingredients: body.ingredients,
    steps: body.steps,
    notes: body.notes,
    logs: body.logs,
    source: path.basename(filePath)
  };
}

function loadRecipes(hexo) {
  const cfg = (hexo.config && hexo.config.recipes_page) || {};
  const sourceDir = resolveSourceDir(hexo, cfg.source_dir);
  if (!fs.existsSync(sourceDir)) return { recipes: [], sourceDir };

  const files = fs.readdirSync(sourceDir)
    .filter(name => !name.startsWith('_') && name.toLowerCase().endsWith('.md'))
    .sort()
    .map(name => path.join(sourceDir, name));

  const recipes = [];
  const slugs = new Map();
  for (const filePath of files) {
    const recipe = parseRecipeFile(filePath);
    if (!recipe.name) {
      hexo.log.warn(`[recipes] Skip ${path.basename(filePath)}: missing name/title.`);
      continue;
    }
    if (!recipe.slug) {
      hexo.log.warn(`[recipes] Skip ${path.basename(filePath)}: missing slug.`);
      continue;
    }
    if (slugs.has(recipe.slug)) {
      throw new Error(`[recipes] Duplicate slug "${recipe.slug}" in ${slugs.get(recipe.slug)} and ${path.basename(filePath)}.`);
    }
    slugs.set(recipe.slug, path.basename(filePath));
    if (!recipe.ingredients.length) hexo.log.warn(`[recipes] ${recipe.source} has no ingredients.`);
    if (!recipe.steps.length) hexo.log.warn(`[recipes] ${recipe.source} has no steps.`);
    recipes.push(recipe);
  }

  recipes.sort((a, b) => {
    const updatedDiff = (b.updated || '').localeCompare(a.updated || '');
    return updatedDiff || a.name.localeCompare(b.name, 'zh-CN');
  });
  return { recipes, sourceDir };
}

hexo.extend.generator.register('recipes-data', function() {
  const { recipes, sourceDir } = loadRecipes(this);
  this.log.info(`[recipes] Loaded ${recipes.length} Markdown recipes from ${sourceDir}`);
  return {
    path: DATA_ROUTE,
    data: JSON.stringify({ recipes }, null, 2)
  };
});
