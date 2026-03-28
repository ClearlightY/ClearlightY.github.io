const fs = require('fs');
const path = require('path');

const MUSIC_DIR = path.join('source', 'music');
const PLAYLIST_PATH = 'music/playlist.json';
const AUDIO_EXTS = new Set(['.mp3', '.wav', '.ogg', '.m4a', '.flac', '.aac']);

function normalizeSlash(p) {
  return String(p || '').replace(/\\/g, '/');
}

function titleFromFilename(name) {
  return String(name || '')
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function loadMusicFiles(baseDir) {
  const musicDir = path.join(baseDir, MUSIC_DIR);
  if (!fs.existsSync(musicDir)) {
    return [];
  }

  return fs.readdirSync(musicDir)
    .filter(file => AUDIO_EXTS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map(file => ({
      name: titleFromFilename(file),
      artist: 'Clearlight',
      url: '/' + normalizeSlash(path.posix.join('music', file)),
      cover: '/img/bg/index_bg.jpg',
      theme: '#cc874c',
      filename: file
    }));
}

hexo.extend.generator.register('music-playlist', function() {
  const tracks = loadMusicFiles(this.base_dir);
  return {
    path: PLAYLIST_PATH,
    data: JSON.stringify({
      generatedAt: new Date().toISOString(),
      total: tracks.length,
      tracks
    }, null, 2)
  };
});
