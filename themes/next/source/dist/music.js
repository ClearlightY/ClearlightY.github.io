const ap = new APlayer({
  container: document.getElementById('aplayer'),
  fixed: true,
  autoplay: true,
  loop: 'all',
  order: 'list',
  preload: 'auto',
  theme: '#b7daff',
  volume: '0.65',
  audio: [
    {
      name: '许嵩',
      artist: '断桥残雪',
      url: 'https://www.joy127.com/url/141.mp3',
      // cover: 'http://oeff2vktt.bkt.clouddn.com/image/96.jpg',
    }
  ]
});
