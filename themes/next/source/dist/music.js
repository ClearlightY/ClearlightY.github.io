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
      name: '本兮',
      artist: '我不说',
      url: 'https://sharefs.yun.kugou.com/202003082320/65f2bb6bef5c6d7ecabbe1e2c0602917/G009/M06/10/1B/qYYBAFUOSyiAZ-vdADBFMKwtux8495.mp3',
      cover: 'https://s2.ax1x.com/2020/03/08/3zOSRx.jpg',
    },
    {
      name: '本兮',
      artist: '下雪的季节',
      url: 'https://sharefs.yun.kugou.com/202003082322/e50d7b1b8dba513b54987c603f77e4c3/G078/M0A/13/11/LpQEAFgzw7-AGkoAAEB5PaNTbJs830.mp3',
      cover: 'https://s2.ax1x.com/2020/03/08/3zOSRx.jpg',
    },
    {
      name: '李源田',
      artist: '庸俗',
      url: 'https://sharefs.yun.kugou.com/202003082333/4cd8aa50e50a42a326b33b21fa8cdd4a/G092/M05/10/10/PJQEAFu5R6yAXQQdADwkF32nMeA103.mp3',
      cover: 'https://s2.ax1x.com/2020/03/08/3zX9ts.png',
    },
    {
      name: '枯木逢春',
      artist: '这一生关于你的风景',
      url: 'https://sharefs.yun.kugou.com/202003082334/0d001148c7f00461d9bd8f4a5907760d/G160/M02/07/15/gJQEAFyd9hKAOrZgAD5Nj4OO35o583.mp3',
      cover: 'http://singerimg.kugou.com/uploadpic/pass/softhead/100/20181207/20181207145958704.jpg'
    },
    {
      name: '于溪悦',
      artist: '年轮说(cover:杨丞琳)',
      url: 'http://fdfs.xmcdn.com/group63/M06/E6/B0/wKgMaF33HxCS-VjLACB0viEsh8w141.mp3',
      cover: 'http://imagev2.xmcdn.com/group68/M03/84/3E/wKgMeF3sVhyCwHNWAAO0DYLSP4406.jpeg!op_type=3&columns=640&rows=640',
    },
    {
      name: '丫蛋蛋（马启涵）',
      artist: '遇见(cover:孙燕姿)',
      url: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_75699037&response=res&type=convert_url&',
      cover: 'https://s2.ax1x.com/2020/03/08/3zXvgx.md.jpg'
    },
    {
      name: '林俊杰',
      artist: '裂缝中的阳光',
      url: 'https://sharefs.yun.kugou.com/202003082335/8876a31fc3187f0fa4f45ac7cedf4f08/G005/M05/03/04/pYYBAFT7EnKANNQ6ADfV3w4vyeE944.mp3',
      cover: 'http://singerimg.kugou.com/uploadpic/pass/softhead/100/20191017/20191017142309922.jpg',
    }
  ]
});
