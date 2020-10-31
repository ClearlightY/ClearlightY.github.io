/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","5fdfc76041f825f8a285862bc06ceaa0"],["/2020/03/04/VPN-on-linux/index.html","da788b5a1a21073892b6080b11ebb291"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","452c2c73765b35df6bab5cab71996ccc"],["/2020/03/05/网址分享-实用网站合集/index.html","d184788d02a64fff7182b958ff2dc77f"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","82f9af75053b51b5bde0aacd180b7380"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","00b5afdfe4c7aa14d66b8d4df764c387"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","49b61523156013f6deb78441515d5459"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","ebeddf50f132736ffad13383c8000cad"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","7cd8191ddaf0eb1c36ae402cdf6fd52a"],["/2020/03/27/响应式中-media的注意事项/index.html","2649d114471762a1fbc92cf6357a375b"],["/2020/04/16/project-problem-record/index.html","a45bc8422619b2f0baf597ff5a5f0627"],["/2020/04/22/Redis的安装-Linux/index.html","911a934c3e00501d95e3b6292c3878e6"],["/2020/04/27/高效使用Google搜索-Tools/index.html","83668a1f79dd3d0087393d5af0a16c35"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","7d2cce33fb5b36892fa866ea5bee4328"],["/2020/05/18/音乐下载公告/index.html","2687346a30f0205c3290cb770396d502"],["/2020/05/21/vimdiff的使用教程/index.html","334bab99493aa410577f3250937465ad"],["/2020/06/04/vim常用操作/index.html","25eb726d749488d11660979e125a8af7"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","d60df140c25625bc7e699802580931c2"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","3a5afb3fbcb5f68069d2007c73fe3d87"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","390c9dfef72768130f17ac74a00a28b2"],["/2020/10/21/假如我的明天是这样/index.html","ad09cf8e9143d2b3a623beea780ecf54"],["/2020/10/31/美食食谱/index.html","ea55f0d5ecef99956c823de85e294a43"],["/about/index.html","0821c121f98a185f739d165d4402e627"],["/archives/2020/03/index.html","3cfbfbadfd4985215e2acc2ff5d35c72"],["/archives/2020/04/index.html","adc1957484140036a8d3c937ae7035c5"],["/archives/2020/05/index.html","313c2cccd390254397f90f77a2b5803e"],["/archives/2020/06/index.html","93e3c4c3f1d15e68ef92eaf66f57cba2"],["/archives/2020/10/index.html","154a1cd3917072b4afe41873ea0a303a"],["/archives/2020/index.html","f30ad743f907dcd14f9267481d22e4d2"],["/archives/index.html","4cfdd67810d5c81736ed8c4320eb996c"],["/baidu_verify_ZY7f24W6aE.html","7f995ebc16825c162767da04ff997c01"],["/categories/BugFix/index.html","7cfca44b34f2130a4f5b2181d66e5006"],["/categories/IDE/index.html","a284bfb16fcd08fe787bc6f9c756b227"],["/categories/Java框架/index.html","58849f640c8747105f270171e92e8f2c"],["/categories/Linux/index.html","5ec6d9b4d49b6771540a2ac7fda38967"],["/categories/Note/index.html","a9ae0b49dc39e424214bbecc9c8bb7cb"],["/categories/index.html","c9580aa307c881e464e71ae1eca77c98"],["/categories/question/index.html","0585c24218cf40bca3e62fd596bfab5e"],["/categories/skill/index.html","f4f8c298da8dbf645bbd5b14f12f93ba"],["/categories/soft/index.html","467113d0251ec526244fe668aa7dd7ea"],["/categories/technology/index.html","ed05d2362a2f4f1722453654def3e1cf"],["/categories/公告/index.html","b4de21d04a1726bb29fa2aced38f22c3"],["/categories/前端/index.html","3e1d5104c63e3fddf4bbebc96e10a75c"],["/categories/实习/index.html","5cd468919d1c2d6623406340aded53d1"],["/categories/美食/index.html","8a2ecbe4d1b2b3426fde4cde6c80b84c"],["/categories/资源分享/index.html","ec40541959adacc3aa9f17a3ce05b6a9"],["/css/main.css","db11473ff1dbc203f329c925ddb88c47"],["/dist/APlayer.min.css","ebf398ff73d43d8f5d5241b49ded12a7"],["/dist/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/dist/music.js","55b65347fabb2d75516c2593f3f5c03d"],["/google91a04f17fb107c17.html","d8afed025903fb9f682376c37f94e291"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/background.jpg","9c08c8abb229d11481cd6cd05a76adf9"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/index.html","5974d41382b0d7816cd3108da40cb56e"],["/js/cursor/love.min.js","7bcfdb57debd43483174cf9e15ab37cc"],["/js/cursor/text.js","1bdda1557dfd32df1e4eddd6cfa7d22b"],["/js/src/affix.js","dc5b98ff95308bbfd3c0feef86228c3b"],["/js/src/algolia-search.js","ff99a9884b67196581250f3122fb2638"],["/js/src/bootstrap.js","cb2410e7423276803fd86c4cc437d682"],["/js/src/exturl.js","a95d807ee3a6c26e6eac953e35bc9166"],["/js/src/hook-duoshuo.js","05027e9ab1f307885423845588c4e757"],["/js/src/instantclick.js","ce1ab90a851f0e91b630295b7bccea9e"],["/js/src/js.cookie.js","5f5a2964e6dc0b0676e42c7dea279704"],["/js/src/motion.js","e17a564b123871862b7696245db54519"],["/js/src/post-details.js","fba53107f4d4d86836dde81f8c415976"],["/js/src/schemes/pisces.js","a2b77c04e4b871e72e150c751b739bbc"],["/js/src/scroll-cookie.js","6487f0627ac338630a05ffbc190503e7"],["/js/src/scrollspy.js","4ca37e3a134a1388c35e0730c021ebfd"],["/js/src/utils.js","c00598df67e9bb038a8b2a0599651eaa"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","b891a9659c6d32dc85207a0af7c2d954"],["/lib/Han/dist/han.js","96cc06b50b1c354b73c9102a90c62beb"],["/lib/Han/dist/han.min.css","f91f50d18b0eaeac3033166a80bbb144"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/activate-power-mode/activate-power-mode.js","7175d97b8460f29cb220c5b9698b47e9"],["/lib/algolia-instant-search/instantsearch.min.css","f9680583ad42817d84119337ea7c3984"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","fa8c69babcf9315da92f3cd104422e26"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","5a04f7e37ea10c22b044dd880fd421e2"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","daaeeef04dfe44ba7c9f7db531ce53b5"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","d175472ae18adf0138b29f2558224029"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","47aed3552a9b400d193dae46a31e5bbb"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","bfd3a61814d16ed721d8e33979804f57"],["/lib/fancybox/source/jquery.fancybox.css","e6036b22e1a7ccbe41e7f60f7fc97902"],["/lib/fancybox/source/jquery.fancybox.js","4e6a8a1264410b095fd1dd8c55e452a7"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","a5dd551e0fc1e6822ef6a27b1a0af640"],["/lib/fastclick/lib/fastclick.js","5a53d3f63f912d753082c744a3d3e9ca"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","2b2f63f831c9acfed0b7ef42fc024174"],["/lib/font-awesome/css/font-awesome.min.css","2b2f63f831c9acfed0b7ef42fc024174"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","b97c4694f98fe9f30077268e2aa335d9"],["/lib/jquery_lazyload/README.html","fdff080dd593248a496482e9507c53d0"],["/lib/jquery_lazyload/jquery.lazyload.js","72ca2a93df3462642560ad0af0d82eff"],["/lib/jquery_lazyload/jquery.scrollstop.js","5d5e8e680dde5738533a93fb33384dfa"],["/lib/needsharebutton/font-embedded.css","a8e4e4ae5e23db81feb819ed6ebbe03a"],["/lib/needsharebutton/needsharebutton.css","d41d8cd98f00b204e9800998ecf8427e"],["/lib/needsharebutton/needsharebutton.js","a9ef498757f263fe92311a3d5ec9c59c"],["/lib/pace/pace-theme-barber-shop.min.css","fcb2fe3bf647ac3a6d5d48f8ce358d4b"],["/lib/pace/pace-theme-big-counter.min.css","431d0373ec9b4a8ea0e705824e7e1241"],["/lib/pace/pace-theme-bounce.min.css","36cd64feb2ce99f8f437de4d73a621df"],["/lib/pace/pace-theme-center-atom.min.css","f3e1bfdcb9abe982393976bb2757bdb0"],["/lib/pace/pace-theme-center-circle.min.css","81b0523a2364012afc61747ccb0c7b9b"],["/lib/pace/pace-theme-center-radar.min.css","d3b68ea2388adee03facc182193fb975"],["/lib/pace/pace-theme-center-simple.min.css","95c297cfe1224068c183d0084cfe712f"],["/lib/pace/pace-theme-corner-indicator.min.css","b6c69624f6d3f82b1a7fd0aeb8c92996"],["/lib/pace/pace-theme-fill-left.min.css","5957910e16551a0196c451a17f01b638"],["/lib/pace/pace-theme-flash.min.css","4ab78ad8b22eb9e606f3c1296b2196cd"],["/lib/pace/pace-theme-loading-bar.min.css","cfb43586552c321fcccb13b9eedd7c5f"],["/lib/pace/pace-theme-mac-osx.min.css","f517ce7db55073b122798bb2b51dad27"],["/lib/pace/pace-theme-minimal.min.css","8515e7b32a357a2afa30e34fb7435704"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","95793fa1b7b0b546711291c5851d0fab"],["/lib/velocity/velocity.js","a5abedf0dcca44f53b213b7b7f2b8f2a"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","d46738e2328c5671c9321c14caaed40c"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","e63d454673a5c4876f55aa414f4900c8"],["/page/3/index.html","9fa2d79e13a88824aae782ab44a89f0c"],["/sw-register.js","f5c195f07bf26592791c451024284dc9"],["/tags/Hexo/index.html","930836bce74615b30e1017900bdff253"],["/tags/Linux-2020/index.html","013a388a2e7d8931cf9e8dc5a48fb53a"],["/tags/Linux/index.html","628e8eb93dcc02370f2fab85dcbd1415"],["/tags/MyBatis/index.html","36542329d3e5b52147e480fcc7ee431b"],["/tags/Vue-Django/index.html","27cddb3ed04bb4b28bc98cfe7673001c"],["/tags/index.html","cbb02a4f87f20a3b96860e66dda17bf0"],["/tags/jsp-ssm/index.html","d743723e895d15bfac7a867cdb00041a"],["/tags/notice/index.html","c609a3d0376e02126a4e46b4ef441a72"],["/tags/share/index.html","3606a5c80d1a192f771b20c9fd73ba91"],["/tags/tools/index.html","65d809fd63251b5febe0ca6c577f8cf3"],["/tags/vim/index.html","8e27e3e5e002d053d65344dbd0e2ef4d"],["/tags/win10/index.html","e36dd1d0f86431626f725217a904d249"],["/tags/响应式/index.html","8be6d9773be3e5f32c7708a348e0164b"],["/tags/感悟/index.html","39f7765de13a9f9f009c84f757b4bd21"],["/tags/食谱/index.html","00dc5a82d8354ad6cc5e70fb947da2b8"],["/uploads/black_cat.jpg","57a308c673300c2498ab3eba6eef8be2"]];
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
