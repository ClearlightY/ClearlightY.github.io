/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","c5eb539b8601a97180a0979ba5e47ff8"],["/2020/03/04/VPN-on-linux/index.html","73f2f9044c7cb15ad462c9df41eb88d3"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","12afb54d6779410c70d26f9adbddbcfe"],["/2020/03/05/网址分享-实用网站合集/index.html","de4d95b1463d97fb4d538757b75faef0"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","81dbcabc4f606c7fde8365f029391bb7"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","bae0510739a18a4988548d1b54119032"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","b79c8c2cdba449abe2e21af9994f137a"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","3b3408297e23cb811c28d36087f059f7"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","129b12dfa13b3703b3cdc505a46e36ee"],["/2020/03/27/响应式中-media的注意事项/index.html","71aa62d7ac55e3f9a69b3780ea7fa067"],["/2020/04/16/project-problem-record/index.html","7fbe1dcc7c9557dcc91037dedcf6786b"],["/2020/04/22/Redis的安装-Linux/index.html","0a31b1e08ca686bc2f49e9d781c1fc9d"],["/2020/04/27/高效使用Google搜索-Tools/index.html","7bdc2413722c899780ce8f105f678f90"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","250b1f9688b5afe1ca67e324eccdbd4f"],["/2020/05/18/音乐下载公告/index.html","202a306138b41ec1f07714af9a0c0ac7"],["/2020/05/21/vimdiff的使用教程/index.html","449739740050f8919918f5387c8ecbc3"],["/2020/06/04/vim常用操作/index.html","bd69573ee3c9c90213ff32dbba133d69"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","3cdacbe0298a6e9fb89a3fe95010c3d4"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","18aeb93c15936b37a2d8167614ab055a"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","8c1cbac395af28dd67a1809e3f80c16c"],["/about/index.html","5eea10699355a1931460055f677cdb7a"],["/archives/2020/03/index.html","7038085edf416ea2fc2eec58b8316129"],["/archives/2020/04/index.html","3a400bbf4144fa2d218f38194a23d30e"],["/archives/2020/05/index.html","61434b535b8fa2410b8778e6533dd18a"],["/archives/2020/06/index.html","c8d09ca49d5a25bc2bf3a956bbf2946b"],["/archives/2020/index.html","6ab0722b37860a36a7c68e34fc469477"],["/archives/index.html","5bc43cf41e3d19bcb028b6234547aa2b"],["/baidu_verify_ZY7f24W6aE.html","10680990e203191e70ebe9293478a0fc"],["/categories/BugFix/index.html","26fa0e7e4e676b91ef4316c4c9ebe9a8"],["/categories/IDE/index.html","443cd0139e3178d3afd81116bf9c3a18"],["/categories/Java框架/index.html","f84e2f985845b1a19d69b5bfe046b31c"],["/categories/Linux/index.html","a6da24eca90886a69d69e2c78d6ba477"],["/categories/index.html","a1fd6986df5810b7c1cd3bd02a2c7020"],["/categories/question/index.html","f93042c3783b5c2470113ad65c09a864"],["/categories/skill/index.html","adc9d2fca76b6ebe72bc119cb89cad44"],["/categories/soft/index.html","a6a5af4127e810e0869d53ee533479cf"],["/categories/technology/index.html","a86f1aa72789c1e8ee95af290d40c7c2"],["/categories/公告/index.html","077ce85f4e3c503945d3e6ec2f3c8ad3"],["/categories/前端/index.html","3b04047e441d0cda9dc28face2ddb9de"],["/categories/实习/index.html","9bc3893da5fa42c85ba32858cef81aff"],["/categories/资源分享/index.html","d92aea276beccdbce4aafe750870f5c0"],["/css/main.css","924cdb84d9a16c97807cbfff072e73c1"],["/dist/APlayer.min.css","6e8b24bb50e3856cb064cb557e0c2c21"],["/dist/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/dist/music.js","658ba42b8578155d7c425c804592a25c"],["/google91a04f17fb107c17.html","e54a656e681d7224219a855123ddcf4d"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/background.jpg","9c08c8abb229d11481cd6cd05a76adf9"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/index.html","751063ca8d727e46b1fbe6ff9142bfc8"],["/js/cursor/love.min.js","7bcfdb57debd43483174cf9e15ab37cc"],["/js/cursor/text.js","ab1121048005bc66d8d6b40cfc377e16"],["/js/src/affix.js","885006ffced3d398a3b3b12c5273a76f"],["/js/src/algolia-search.js","490358f778d94c6fa903e3b3ddeb259b"],["/js/src/bootstrap.js","aca83db52512d142a3951870e814603c"],["/js/src/exturl.js","02e15c7d763bd7bffacaeddeda418f06"],["/js/src/hook-duoshuo.js","e6dc03734716703d80d3e4760e82daaf"],["/js/src/js.cookie.js","7af3eea2f5d534de42dcea98f1ea440c"],["/js/src/motion.js","15f59778c28d31db9cde5f2728f01412"],["/js/src/post-details.js","ea7a42efacf84b60af97967020f03945"],["/js/src/schemes/pisces.js","c5719879605b3f904e8176bc880ff3d2"],["/js/src/scroll-cookie.js","84f6beb669fe8126b1dcc28ca40f6faf"],["/js/src/scrollspy.js","7ff51cdcca66e64ca14f8b4e5b28604c"],["/js/src/utils.js","ab13e4af638251f0623bfa3a7cefe461"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","bb73bf300a992ed1a2d8d1de1952a8d3"],["/lib/Han/dist/han.js","f4ee69999b46f19ffdf42e74653b9e8d"],["/lib/Han/dist/han.min.css","dc4d42e6fd47e06c50fc5740e62756f9"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/activate-power-mode/activate-power-mode.js","aae040bfda61fa8ea76ad004681657ea"],["/lib/algolia-instant-search/instantsearch.min.css","5e4bd46bec639b6d3bebe70025f38ed9"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","f9cbac0fdb629f46ff078e5892e6d511"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","ee1720d881f0a85433caf084f26996ab"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","3f1f88a59628508ca734ea37c1b09b49"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","52725196c30ef0168ba4f50760f7ae15"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","bd305bcdd8a1eb5e211a42d766e2485f"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","c6f30988fdbea975f7b988e56e26d868"],["/lib/fancybox/source/jquery.fancybox.css","a25c90c021462e802006a2de682bb835"],["/lib/fancybox/source/jquery.fancybox.js","e7bc262f638da52fb0ec704894d6ef6b"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","551c5a9cfd8b72f350877e7c2c970ffd"],["/lib/fastclick/lib/fastclick.js","69f1584d2cc0dbf69a18b6b894837fb4"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","4a019e0206172c5edd94e410f2ce8ce9"],["/lib/font-awesome/css/font-awesome.min.css","4a019e0206172c5edd94e410f2ce8ce9"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","a5bc0272513ab73785b02b21b5ce9177"],["/lib/jquery_lazyload/README.html","0704c1aa51cacc64a1d2d394d79b088f"],["/lib/jquery_lazyload/jquery.lazyload.js","31d325ef255775405b4a9725b75e0bd2"],["/lib/jquery_lazyload/jquery.scrollstop.js","60c75157474118169ae4df73c942c041"],["/lib/needsharebutton/font-embedded.css","61bb05c685c9a86bd3a0d728b69c8767"],["/lib/needsharebutton/needsharebutton.css","d41d8cd98f00b204e9800998ecf8427e"],["/lib/needsharebutton/needsharebutton.js","8fcbdf8d135b3a244b334bd25a5d2249"],["/lib/pace/pace-theme-barber-shop.min.css","3b3a64182d017542df8d78dd3d28a7e6"],["/lib/pace/pace-theme-big-counter.min.css","e0e4828a598373ebc9b1010bd0258e17"],["/lib/pace/pace-theme-bounce.min.css","099b909d738cd96d2273c90704d76eab"],["/lib/pace/pace-theme-center-atom.min.css","5b8f223bfe8111614e342df4c869f041"],["/lib/pace/pace-theme-center-circle.min.css","61cbcf4c107e887a7a4ddb8de53d47bc"],["/lib/pace/pace-theme-center-radar.min.css","e3b67d1f924917f4528f6deab8f2d94b"],["/lib/pace/pace-theme-center-simple.min.css","e286f53aa95f5b1f08d1e0effdce3567"],["/lib/pace/pace-theme-corner-indicator.min.css","eea6c6f52ae0b4c82ca9d4d858beb457"],["/lib/pace/pace-theme-fill-left.min.css","a7b89db2d348b9080d11b5c0b9706aab"],["/lib/pace/pace-theme-flash.min.css","199086c5ca878b2a712427ffc9008521"],["/lib/pace/pace-theme-loading-bar.min.css","c7dab64117b4e92108047c0e255d57ba"],["/lib/pace/pace-theme-mac-osx.min.css","eb000d4a207e55d10c88859dfc09a862"],["/lib/pace/pace-theme-minimal.min.css","3af614b0daaa18e6e0fb66fb759c13f3"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","110cc7fcbd5b9c70d5ea153eff2a7205"],["/lib/velocity/velocity.js","7503dfff3cb618a4fdc52eca7a83f193"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","38c222cd6cab1a703c6c5f72b21f6dbe"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","1b6182036150c1a86624f8ec264be7f5"],["/page/3/index.html","4f71634e7c6d80abc2794779280a2c18"],["/sw-register.js","5b19beb4972f0e87e96db75605072972"],["/tags/Hexo/index.html","0986c4def8cc0242146231e4dd536ca4"],["/tags/Linux-2020/index.html","b7dcddaf0895e4f1d64959a2ab04f109"],["/tags/Linux/index.html","30daee0a4afc7fa4ff64368c00bc0f9f"],["/tags/MyBatis/index.html","6cb52452784d19dee1a929a1889b493b"],["/tags/Vue-Django/index.html","f0966d1004bedaeea0c24d031db809d2"],["/tags/index.html","3f7b5f93905527d6291d53b82a7d47ae"],["/tags/jsp-ssm/index.html","0c220c0f719e9a988feaf3ff9488067b"],["/tags/notice/index.html","65e8637bdab34e2f98281f74fa068b78"],["/tags/share/index.html","96cd914612133609290e78915af603c0"],["/tags/tools/index.html","a303f68cf465d073f974f7eaab20c268"],["/tags/vim/index.html","1fbd3f8292963279215597a1d2059035"],["/tags/win10/index.html","d38e2d63d2e4288bb4a57b39769eb679"],["/tags/响应式/index.html","888ce96e274526ca6a5fb8af8259dd9f"],["/uploads/black_cat.jpg","57a308c673300c2498ab3eba6eef8be2"]];
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
