/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","fc4cc7d23d46ae8189512426a695eb63"],["/2020/03/04/VPN-on-linux/index.html","414f4e954bafa5160a9fe0817debc540"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","a1feecf1c22376a984c811185c888812"],["/2020/03/05/网址分享-实用网站合集/index.html","6cdf30464df705602b3783b79aec654c"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","52748095305de8ff1ed73ed897e5ab50"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","3a69de0f4df44f9144defae78a53de31"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","0d3ede6379d96e6411817cd31cb31581"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","0ae2dbf63a4321c29e6ea4a99f5f21d4"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","23172cdd044ba21e686919af6adf05ea"],["/2020/03/27/响应式中-media的注意事项/index.html","c781fdae5f509662de75399a1aff3470"],["/2020/04/16/project-problem-record/index.html","bbff322d1a56bc9cb3fe6d4681dab1f7"],["/2020/04/22/Redis的安装-Linux/index.html","f61c6c0ff835898930fc77f26444822d"],["/2020/04/27/高效使用Google搜索-Tools/index.html","6cfe02eeed29e70785d13f95fbcdcb42"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","07423a1d6ba7dbc0b398847567ae5b37"],["/2020/05/18/音乐下载公告/index.html","de0d8927ac5b1bd177abb3dee0935789"],["/2020/05/21/vimdiff的使用教程/index.html","fb92e04267af68377093326c0a635dab"],["/2020/06/04/vim常用操作/index.html","5be4200134efcab3444f370c5b0d41ca"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","d5d867a205e0deda91ed6dd93db22398"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","a35ab63aeef1f6a56854ea88723b8511"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","544975c34bc5b5329acad1f575dc3920"],["/about/index.html","87371fbf88115e4c96e1166d51e52d98"],["/archives/2020/03/index.html","526307d9a0ab319cb6559f00550bf62d"],["/archives/2020/04/index.html","6436e0e7a560ce1b6fec4bf7fce22c69"],["/archives/2020/05/index.html","2a71e82b29f1a134ed035879d77698fc"],["/archives/2020/06/index.html","5ef6540b0b4b9e5c87f74870b882718e"],["/archives/2020/index.html","627af8ba934bc9318ab2d55d292299b7"],["/archives/index.html","ac3dcd1d334c12c1a025c8c592735ccd"],["/baidu_verify_ZY7f24W6aE.html","f9ef9be258f944086048c96728a5ac82"],["/categories/BugFix/index.html","6e58fd6eab416e08da7f6103fb8b6b19"],["/categories/IDE/index.html","85458b9032ececfff28b7207c839217b"],["/categories/Java框架/index.html","6a36f87f29b274c03e8ea5a7d1c6b411"],["/categories/Linux/index.html","b35c96f4fa4f86750ed0d5097c18df5c"],["/categories/index.html","0c6d165c02f68857fbf28afd20055c06"],["/categories/question/index.html","b89e15aea62fe2c596ddc396013b4e97"],["/categories/skill/index.html","3ff8962339a98f3ad91710a024075840"],["/categories/soft/index.html","8e8bb02206b714b4fcf8d5be707ca76c"],["/categories/technology/index.html","b66b280400d32b49c3a3aa7bfefeca20"],["/categories/公告/index.html","118f23f179b5283c9a35ca551823679a"],["/categories/前端/index.html","5c075eceb406e6b24459b002fe939d3c"],["/categories/实习/index.html","8fcccbac81d30ad220fe2e0af42eb95b"],["/categories/资源分享/index.html","bfce480e9fab175501bf81341627319c"],["/css/main.css","d617bf01c9fd3d6b92f657b134950a01"],["/dist/APlayer.min.css","bf3183f473de7ecd89bd43c8322adfa7"],["/dist/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/dist/music.js","bb73b66399145ce465e0f6324f4e2359"],["/google91a04f17fb107c17.html","1a7e91fced81461faae2e9a3840caada"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/background.jpg","9c08c8abb229d11481cd6cd05a76adf9"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/index.html","3e152c85d6b4d31ac7aef8927b93f198"],["/js/cursor/love.min.js","7bcfdb57debd43483174cf9e15ab37cc"],["/js/cursor/text.js","2575e429ed33732d430a9edb372b93f5"],["/js/src/affix.js","50c18109b06d7c6e8d2fa816f6269978"],["/js/src/algolia-search.js","95ef6eb711f75b0cd3792f330180da60"],["/js/src/bootstrap.js","edc5200ac6c2324f204f045d74a8386d"],["/js/src/exturl.js","e4d306fb15ab5be16313e3b3a1d80384"],["/js/src/hook-duoshuo.js","c73fba9e66d3053666321da1689fd8e4"],["/js/src/js.cookie.js","12fb885d53d33ac6a3b6aa697bf3cbbb"],["/js/src/motion.js","fb3ff7c004e89f1efb311e733b608590"],["/js/src/post-details.js","fb025a79766dbf7f75e7ecc8dab47e4b"],["/js/src/schemes/pisces.js","344039b26176623d0ac1a232ed77b56d"],["/js/src/scroll-cookie.js","abeb8f8b384c2167860c1426bf2a222c"],["/js/src/scrollspy.js","a62ed575f9fac08f93c13b82dca6a86a"],["/js/src/utils.js","a42d20df271dcf1eeafeeedecaf1e501"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","3697979a5bfd33e71e960f6d2e460cf2"],["/lib/Han/dist/han.js","ef00976808ff2e19dec7441b596ed490"],["/lib/Han/dist/han.min.css","0e75cf74a9e621ba59794973e8b295c2"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/activate-power-mode/activate-power-mode.js","17c737a6cf00609f819ddc3e3e1bb7cc"],["/lib/algolia-instant-search/instantsearch.min.css","8884c70883b9b73e853aad77107ec825"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","9001025172543e4964dd4c3aaa9b756f"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","667ce3b8825cfdb37f10de1593ed2466"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","6bc27c5565773489f37335878cc0a103"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","98a493c041f7df79aa350467c3d03644"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","15b12f72e490dfac7ca7b6e52db8bedd"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","84e634ad0bed40a9866ae94d031f5348"],["/lib/fancybox/source/jquery.fancybox.css","996097e74ab2db38442d8da369ae0ebb"],["/lib/fancybox/source/jquery.fancybox.js","ba479b21fba82b70a74f3ec4444a954c"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","a9015d8c5883b4091554683dfd2e28ee"],["/lib/fastclick/lib/fastclick.js","262e814d9cc1593044ad97a673b2c510"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","5db71a1b177c5f3d8034b74657944f18"],["/lib/font-awesome/css/font-awesome.min.css","5db71a1b177c5f3d8034b74657944f18"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","6e7563e37208d53fdc685c2b7a991893"],["/lib/jquery_lazyload/README.html","ae59770199d9351d50b33c533bfd5e8d"],["/lib/jquery_lazyload/jquery.lazyload.js","69d025d1ed10d9217da907c069b99812"],["/lib/jquery_lazyload/jquery.scrollstop.js","783914ddd5ce41ea727129c1a59f9a37"],["/lib/needsharebutton/font-embedded.css","b04f4a72748565f3f3b09745d4da07b4"],["/lib/needsharebutton/needsharebutton.css","d41d8cd98f00b204e9800998ecf8427e"],["/lib/needsharebutton/needsharebutton.js","b46f1c22c02ec0abcdd61f8185bce76b"],["/lib/pace/pace-theme-barber-shop.min.css","d44c9ace736cc934db61ca25a3209548"],["/lib/pace/pace-theme-big-counter.min.css","265b7c61781a0637b4e4f7374d9ccd24"],["/lib/pace/pace-theme-bounce.min.css","67cc0f0d59e4a161c60d40dcd8e6224c"],["/lib/pace/pace-theme-center-atom.min.css","b77fdcd2a71a633a6090bf796d46704f"],["/lib/pace/pace-theme-center-circle.min.css","c9c0ccc6106ecb180cd8e684f732afa3"],["/lib/pace/pace-theme-center-radar.min.css","c4580c4ba7218a9caaf799d276ea5816"],["/lib/pace/pace-theme-center-simple.min.css","f43f235b58bb92bf806e80d26b815db5"],["/lib/pace/pace-theme-corner-indicator.min.css","81843bad191f5fec971e1e3349994d4b"],["/lib/pace/pace-theme-fill-left.min.css","8dcdede6a1da8b78dc7d05c9d2bf06ee"],["/lib/pace/pace-theme-flash.min.css","adc68f6216616c7b47fbe754c6175506"],["/lib/pace/pace-theme-loading-bar.min.css","b361b93d1b1ff63236ab6689a4e317fd"],["/lib/pace/pace-theme-mac-osx.min.css","d218a010f90198a375c725b348c8eae9"],["/lib/pace/pace-theme-minimal.min.css","39ac7ce879052b52dfdbeb4fa98d45dc"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","10757cdfba4edd63fedfe18832b07d85"],["/lib/velocity/velocity.js","d01cf948d3556c1ed088753cf664c94f"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","d4da983e2d6b915bcfe11943a06701b9"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","2b43bd64a94e3ce7f293e48d5f22bf91"],["/page/3/index.html","18c218fd81a7f2b808ce9c4143b8ef43"],["/sw-register.js","3f7d5b628e330059bcbf6fb6da058047"],["/tags/Hexo/index.html","9f4cf44f18f27800eea8d4e62b901a32"],["/tags/Linux-2020/index.html","78a57214ad4664c191bb3cce5c04f5fd"],["/tags/Linux/index.html","754cf376f7caec4753bcf320406a41d2"],["/tags/MyBatis/index.html","968331b82dd7f7ce8e4f67cfc408fbb2"],["/tags/Vue-Django/index.html","81a65edcbb97f847d3906b5c3a326e0d"],["/tags/index.html","09f4ae1fbcae72db352e16b8bb9a45a4"],["/tags/jsp-ssm/index.html","fc30d6134e8c70ed6eba59adac3e6f59"],["/tags/notice/index.html","3555d07513d98cf6e99246c25c97af58"],["/tags/share/index.html","9056db2a9c57df065b59ca70a3a35603"],["/tags/tools/index.html","62f607280b5bd7c06998baf086f36a80"],["/tags/vim/index.html","ced859ad5134e87592774b704e874bc9"],["/tags/win10/index.html","b74ee519e407a5e61e79740f00707fdb"],["/tags/响应式/index.html","844e32324f4a0587767e79476a6badc8"],["/uploads/black_cat.jpg","57a308c673300c2498ab3eba6eef8be2"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
