/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","9467721d4567fb51bdd4fa0eb4613747"],["/2020/03/04/VPN-on-linux/index.html","46cdd26e38319c6c6e0a7f7f85623029"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","4eae632df69c6fa5794617306b5c4717"],["/2020/03/05/网址分享-实用网站合集/index.html","03bcd37e7d508ba4ac7c1642408006e1"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","fd1f99443c806cc9009c96ffb3c6318d"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","6e29dca96f359a3fc6d75f57fcc3abeb"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","436b1152df14d6764fcb7a32b30bd880"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","f39ef4e494af77f28aead5385d4d98df"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","8742021743e02606fbc99545327ec438"],["/2020/03/27/响应式中-media的注意事项/index.html","4bd5e519a0d02fe18031abdeb28360c2"],["/2020/04/16/project-problem-record/index.html","ef24b4b61166a7e53f58b742371feb12"],["/2020/04/22/Redis的安装-Linux/index.html","220bc4e94a3e1ea9cec27b1f78fb8c3f"],["/2020/04/27/高效使用Google搜索-Tools/index.html","d99527d6f64e6aebb347561f9f8cea1e"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","a7f9cada200dfc122668c0faa64712af"],["/2020/05/18/音乐下载公告/index.html","a9a29a00237a2a5432c745627caf362a"],["/2020/05/21/vimdiff的使用教程/index.html","437c70928578c228b0ba7ca9dcc15a1c"],["/2020/06/04/vim常用操作/index.html","4c307135819faa1f0454508a54faecab"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","c8102568a75e8f7ab4a6a6475de681c1"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","a9e313e6e752bcab65dd642d02a8fc59"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","ff32a54263a484a3bff89312ea51369a"],["/about/index.html","c022681261959abecdea542101fc4f35"],["/archives/2020/03/index.html","a5a8e3414b05d551cab1a15fa88991f2"],["/archives/2020/04/index.html","93d15284832ad902cb0d694be636f8d8"],["/archives/2020/05/index.html","366857f7638d47823b3833016e70c5ee"],["/archives/2020/06/index.html","5a52764730d83b35e7e9f7d3938add24"],["/archives/2020/index.html","d3b5c7468c3983cce0c629d7441cd14e"],["/archives/index.html","a4d8be25492cc260bd2b46bc48a67a34"],["/baidu_verify_ZY7f24W6aE.html","e19f58194f73874a5b617d70e4ba6c8a"],["/categories/BugFix/index.html","62b71a8f30514a15febdc7ca7dc55580"],["/categories/IDE/index.html","12a56ea4ead0dbd43b13e8b90a6d0c03"],["/categories/Java框架/index.html","d0b561964994580a4d5ab70811380c51"],["/categories/Linux/index.html","693092a18387248ced4a16489bb6ba32"],["/categories/index.html","127fb721bff30b18bfff02082907580e"],["/categories/question/index.html","d08cb8266588429c5bf847affead9d45"],["/categories/skill/index.html","9171a53934ad8ef0870e5c01c151fc4d"],["/categories/soft/index.html","bf07cc89ace59d32ea0fb77c0a9f5502"],["/categories/technology/index.html","5a86a3a78cdc686ac21316a7c6a44e06"],["/categories/公告/index.html","d059851bcba172608b1e744e97ab5bc3"],["/categories/前端/index.html","f1860cb57f67a42bbc4a3c811510b171"],["/categories/实习/index.html","c94124580e40446ff8224b3e7c179915"],["/categories/资源分享/index.html","61bbd0b07d5f6eafda4445aa89038f76"],["/css/main.css","8a95d8a27b0e576a4e6fffa3842cb424"],["/dist/APlayer.min.css","3bd6517deafd0509ddf05486dfd27211"],["/dist/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/dist/music.js","4db1ea3db7e04e5358f9ada5c84398ad"],["/google91a04f17fb107c17.html","d8718fa5e51c74c938dd15ab584d5305"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/background.jpg","9c08c8abb229d11481cd6cd05a76adf9"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/index.html","29476da88cd5039b2368bfd5fc6d46de"],["/js/cursor/love.min.js","7bcfdb57debd43483174cf9e15ab37cc"],["/js/cursor/text.js","01be65011040e9953cc9666f925d5256"],["/js/src/affix.js","272e2447d6ac47aa1b885bd40cb039a4"],["/js/src/algolia-search.js","1769fe6d0b705364fb277fcecaf4ee9f"],["/js/src/bootstrap.js","e885c9b1314cf38d1588e954a90051d4"],["/js/src/exturl.js","25d244aeafc693c2fea9de9e7ba6fe2f"],["/js/src/hook-duoshuo.js","dfd5f8ccabce6743e9475432a7c8ccc9"],["/js/src/js.cookie.js","dbd1bc68c15f1b4c41071944849aedab"],["/js/src/motion.js","899680de4753c2ae43ee3a82194ac63b"],["/js/src/post-details.js","430b2e7a89e667990ed6ce7ccdb02896"],["/js/src/schemes/pisces.js","f75eba64ddd13c5d33f25b9da76c17d6"],["/js/src/scroll-cookie.js","9b6fddb2fb587fb7080aa678951e031e"],["/js/src/scrollspy.js","7f600107d53e2bec955a31e401b26313"],["/js/src/utils.js","11b414099e7b849e6abffd7a444f0b9f"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","be39b90bbdd2e6ea46df8510030b80bb"],["/lib/Han/dist/han.js","7ac55e6df0c56e3261818f9a3fc760cd"],["/lib/Han/dist/han.min.css","c30deb4c3e218601eeb25977449ec03c"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/activate-power-mode/activate-power-mode.js","0427590384c7def68ece17671b3502fc"],["/lib/algolia-instant-search/instantsearch.min.css","c5a3d7bcaadc22fad87ece2559cf9617"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","ede116cb480c78defaf28a5a303e52fa"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","19274f2ee6f2a72dae9a46a4904655dc"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","90e49225ea4e131d1f7aea664f845759"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","65dc79806ce11f01fc4787482ff30458"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","f6836843f7c84cb2934281f8d64613b1"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","ad069e2855a333dd1194f22ee6bcd8e4"],["/lib/fancybox/source/jquery.fancybox.css","16b9beba897b2ebebecb872ca71372ad"],["/lib/fancybox/source/jquery.fancybox.js","2c5e7ac699d6c3f64ef0cf79f759bc4e"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","9400d7dfdbd496724124857c289edb3b"],["/lib/fastclick/lib/fastclick.js","19e15c6f73780097b9034b3526095c91"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","324a9ddbfa3c973616b49fa9f757cc68"],["/lib/font-awesome/css/font-awesome.min.css","324a9ddbfa3c973616b49fa9f757cc68"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","44f489e4fdc193dd8962f8f0c0ca25f7"],["/lib/jquery_lazyload/README.html","c76517f66284944ecdbf63bbb9091ecc"],["/lib/jquery_lazyload/jquery.lazyload.js","b2ab6024b7e079771138511fcad5064d"],["/lib/jquery_lazyload/jquery.scrollstop.js","bde1efa03799bbebd17925717d1db8ef"],["/lib/needsharebutton/font-embedded.css","daa6c76212b0668a70b87b53707e002c"],["/lib/needsharebutton/needsharebutton.css","d41d8cd98f00b204e9800998ecf8427e"],["/lib/needsharebutton/needsharebutton.js","5b7f0e22e6548fb6dc171972d99ce1b5"],["/lib/pace/pace-theme-barber-shop.min.css","de561d96ac4703ce5feaeef50d116639"],["/lib/pace/pace-theme-big-counter.min.css","c1099c9eec9cb73790b2133f81bfe196"],["/lib/pace/pace-theme-bounce.min.css","90c0f2b4713c8cb12ad500a52b1ca7ce"],["/lib/pace/pace-theme-center-atom.min.css","e3eb84d272e522c6d02ca9ea28c84b96"],["/lib/pace/pace-theme-center-circle.min.css","0354d88f8f248609eac36fb6779bbbb5"],["/lib/pace/pace-theme-center-radar.min.css","a4bf4755ef30f12a4b65580924ae0f89"],["/lib/pace/pace-theme-center-simple.min.css","4356f37c783132ea62d3d5b0be2323b1"],["/lib/pace/pace-theme-corner-indicator.min.css","3947b62cb0cea50dd037eac30ead0cce"],["/lib/pace/pace-theme-fill-left.min.css","1881424e22a7f7dca371287179ca6aeb"],["/lib/pace/pace-theme-flash.min.css","c4f25e3a728cde9f6c1285d72f198e37"],["/lib/pace/pace-theme-loading-bar.min.css","7ae657899ec2d0f9ac10e591b2d8188a"],["/lib/pace/pace-theme-mac-osx.min.css","0333f48ae9f285b13d84ce8906d9ab19"],["/lib/pace/pace-theme-minimal.min.css","2ef6c5cd3f3315b025231c61e8a6a22d"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","2ca7ba1c96fade563fc71e1c1a3d66b8"],["/lib/velocity/velocity.js","60d3028bb1011c293e4de57f56905318"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","042efac194fb4cd760f8d06f92199fa6"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","1bdcecfe0d911ac37a0826d348aecbd6"],["/page/3/index.html","77e47cc019ee0d6a1be55c307fa3ef0f"],["/sw-register.js","2f09a9593c597912b939b2c158faf001"],["/tags/Hexo/index.html","2832a5c6812e67ce55a64fdb5c9a26fb"],["/tags/Linux-2020/index.html","13b408b311c25ed1cdb890ebd3e3a154"],["/tags/Linux/index.html","7e698d429f8129d0ce30c7544f8cfc19"],["/tags/MyBatis/index.html","a2aa9c98f68a4c148bb4b1e771f1fb1f"],["/tags/Vue-Django/index.html","af169153ef6ef2c22a45e5766e4e57cf"],["/tags/index.html","72a4134d1a18bdc5d4f1efa3758baedb"],["/tags/jsp-ssm/index.html","79b25f4383714eb6b621a4b69a1d1f01"],["/tags/notice/index.html","4ca1a55aa99db5ba782f9b30facec3bb"],["/tags/share/index.html","6a5e366b2b1cd92b4c2b914bf962440d"],["/tags/tools/index.html","57c52d89fc9bee8f38fcaf07ef7174c7"],["/tags/vim/index.html","0d7f2eaa385f47cd8da584e67dd0e166"],["/tags/win10/index.html","8033f5ea438eb1c2bca8f08267ad4f9c"],["/tags/响应式/index.html","41192a4bbe7c260894200ea9ff431904"],["/uploads/black_cat.jpg","57a308c673300c2498ab3eba6eef8be2"]];
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
