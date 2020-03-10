const ap = new APlayer({
  container: document.getElementById('aplayer'),
  fixed: true,
  autoplay: true,
  loop: 'all',
  order: 'random',
  preload: 'auto',
  theme: '#8B275F',
  mutex: true,
  volume: '0.65',
  audio: [
    {
      name: '---------------------',
      artist: '-------------En-----------------------------------------------',
      url: 'https://sharefs.yun.kugou.com/202003091722/b507c6634c643b2d9137192943341dec/G119/M09/09/11/tw0DAFxuPuGAUY1MADJ89lcxGPY220.mp3',
      cover: 'https://s2.ax1x.com/2020/03/09/8pI7En.png',
    },
    {
      name: 'Lil Nas X、Billy Ray Cyrus',
      artist: 'Old Town Road (Remix)',
      url: 'https://sharefs.yun.kugou.com/202003091706/bef8f193dd5efc0803235bd39d7f142a/G159/M03/03/1B/f5QEAFyoRdaAJERmACZddAl9-mU591.mp3',
      cover: 'http://singerimg.kugou.com/uploadpic/pass/softhead/100/20161011/20161011085453526.jpg'
    },
    {
      name: 'Q;indivi、indivi',
      artist: 'Lovin\'You (Minnie Riperton)',
      url: 'https://sharefs.yun.kugou.com/202003091715/7e790a6560e7c484742d6696aed1ef55/G014/M00/08/04/Tg0DAFUJ5CiAXtQ3AFFdDn90CGM204.mp3',
      cover: 'http://singerimg.kugou.com/uploadpic/pass/softhead/100/20150716/20150716054057985933.jpg'
    },
    {
      name: 'The Chainsmokers',
      artist: 'Paris',
      url: 'https://sharefs.yun.kugou.com/202003091721/ecae4ff44c50c53dbf6edd3a72ee8c97/G098/M08/0E/09/AocBAFjmRAWASdX_ADYcB8dgVjQ284.mp3',
      cover: 'https://s2.ax1x.com/2020/03/09/8pTuyF.jpg',
    },
    {
      name: 'The Bosshoss',
      artist: 'My Personal Song',
      url: 'https://sharefs.yun.kugou.com/202003091711/8fd888f3925472d5e7b9c4478c324ef7/G029/M0A/1D/11/_ZMEAFWfasmAQhROADbwqFiJ6BM639.mp3',
      cover: 'https://s2.ax1x.com/2020/03/09/8pTuyF.jpg',
    },
    {
      name: '----------------------',
      artist: '------------治愈---------------------------------------------',
      url: 'https://sharefs.yun.kugou.com/202003091737/db1d68551395fe6e94604344bedff72d/G137/M01/00/1D/aZQEAFuIGfqAY1FYADcF0ktlfoY024.mp3',
      cover: 'https://s2.ax1x.com/2020/03/09/8pWqVx.png',
    },
    {
      name: '邱有句',
      artist: '夏天的秘密',
      url: 'http://fdfs.xmcdn.com/group20/M07/24/44/wKgJLFs2-_OCFQYuABlJQt4DYWc894.mp3',
      cover: 'https://s2.ax1x.com/2020/03/09/8pTuyF.jpg',
    },
    {
      name: '邱有句',
      artist: '夏鸣',
      url: 'https://sharefs.yun.kugou.com/202003091633/fb4329cac26579677ca67f8c0d042799/G095/M0A/1A/18/P5QEAFkEtTuAeORiAC7ms1v1ag8986.mp3',
      cover: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000000NzRd63756Gg.jpg',
    },
    {
      name: '邱有句',
      artist: '如果当初和你在一起',
      url: 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_65981569&response=res&type=convert_url&',
      cover: 'http://singerimg.kugou.com/uploadpic/pass/softhead/100/20190321/20190321235826969226.jpg'
    },
    {
      name: 'July',
      artist: 'My Soul',
      url: 'https://sharefs.yun.kugou.com/202003091644/c87f35276858690e8ab9fe87fc76a9ad/G007/M01/1F/03/Rw0DAFS4KQWATVY6ADg75kkDNnE499.mp3',
      cover: 'http://singerimg.kugou.com/uploadpic/pass/softhead/100/20160905/20160905104458149.jpg',
    },
    {
      name: '龙舟',
      artist: '天之痕',
      url: 'https://sharefs.yun.kugou.com/202003091659/5d9ae893e11898f9f715200ff3ed29c2/G058/M05/12/13/GpQEAFdoMFCAW5fIAD3m2o51nlE762.mp3',
      cover: 'http://singerimg.kugou.com/uploadpic/pass/softhead/100/20191025/20191025180409352912.jpg',
    },
    {
      name: '----------------------',
      artist: '----------Miss---------------------------------------------',
      url: 'https://sharefs.yun.kugou.com/202003091733/9e333b1cf090fbf0de4788989c0d79d6/G125/M0B/01/03/vQ0DAFsaKQeAaRa-AC8GWxC17xQ015.mp3',
      cover: 'https://s2.ax1x.com/2020/03/09/8pcfcn.png',
    },
    {
      name: '枯木逢春',
      artist: '这一生关于你的风景',
      url: 'https://sharefs.yun.kugou.com/202003082334/0d001148c7f00461d9bd8f4a5907760d/G160/M02/07/15/gJQEAFyd9hKAOrZgAD5Nj4OO35o583.mp3',
      cover: 'http://singerimg.kugou.com/uploadpic/pass/softhead/100/20181207/20181207145958704.jpg',
    },
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
      name: '本兮',
      artist: '...',
      url: 'https://sharefs.yun.kugou.com/202003101323/81a10954ccdd520b735e523963caa366/G009/M02/0A/17/qYYBAFT71ACAPFypADuZUHiT44A955.mp3',
      cover: 'https://s2.ax1x.com/2020/03/08/3zOSRx.jpg',
    },
    {
      name: '本兮',
      artist: '一直在等',
      url: 'http://fdfs.xmcdn.com/group16/M0B/5C/88/wKgDalXLWD7S_1FIAB8AgG5wQr4608.mp3',
      cover: 'http://imagev2.xmcdn.com/group12/M07/44/29/wKgDW1Wl5rTCWmIlAABU9OJHURY156.jpg!op_type=3&columns=640&rows=640',
    },
    {
      name: '李源田',
      artist: '庸俗',
      url: 'https://sharefs.yun.kugou.com/202003082333/4cd8aa50e50a42a326b33b21fa8cdd4a/G092/M05/10/10/PJQEAFu5R6yAXQQdADwkF32nMeA103.mp3',
      cover: 'https://s2.ax1x.com/2020/03/08/3zX9ts.png',
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
      name: 'Doris小武、Sis晴子',
      artist: '认真的老去(cover:张希/曹方)',
      url: 'https://sharefs.yun.kugou.com/202003091727/afb25e0f6fc3f9cbfdb59ca9d99ce51b/G129/M0B/09/17/wQ0DAFpJB7KAXfxdADbVuUsVzn8489.mp3',
      cover: 'http://singerimg.kugou.com/uploadpic/pass/softhead/100/20160713/20160713151939802.jpg'
    },
    {
      name: '林俊杰',
      artist: '裂缝中的阳光',
      url: 'https://sharefs.yun.kugou.com/202003082335/8876a31fc3187f0fa4f45ac7cedf4f08/G005/M05/03/04/pYYBAFT7EnKANNQ6ADfV3w4vyeE944.mp3',
      cover: 'http://singerimg.kugou.com/uploadpic/pass/softhead/100/20191017/20191017142309922.jpg',
    }
  ]
});
