/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","91ce25b3a66fd7d187850e617f3388a2"],["/2020/03/04/VPN-on-linux/index.html","cb46469508c0d162e9edb6c474acd832"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","27f8db288dafb0fde58746d532aaab5d"],["/2020/03/05/网址分享-实用网站合集/index.html","f92273dd2273865fec9ca0b89edd774e"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","716e272c4585aa51ced686cc7da6f9a9"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","f4b8d40336f6c5762c241142b4f835c5"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","52192dd3b08664cbff1fc927b91c604b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","a14cea837966f5b47a25aeaef4749427"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","f71343dd0615afd472ee0c060b55f5a0"],["/2020/03/27/响应式中-media的注意事项/index.html","3fa72fa7703415bbdf653e5294747845"],["/2020/04/16/project-problem-record/index.html","44875badd8098f306722d7eb759339d7"],["/2020/04/22/Redis的安装-Linux/index.html","3387dfdffd4b2e3b85de4c56d29d9962"],["/2020/04/27/高效使用Google搜索-Tools/index.html","1ee431b1cd99f9d3dce2816227c87afa"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","4b0453ffb0860b0aca53d0df279274c0"],["/2020/05/18/音乐下载公告/index.html","b6db83ab67bdaa62cab00eb4ce9e079f"],["/2020/05/21/vimdiff的使用教程/index.html","b4ef4ff77a406055efd7ae46a91154e2"],["/2020/06/04/vim常用操作/index.html","7e480bf0e3797151a580a7f434f0d07c"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","7d68c2ba9b0afa93b03818a62be7f0cb"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","82accb278e4bc40f13ee508f4e6c1839"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","7fd23577e284ef9d613f75bc8a63f4a2"],["/2020/10/21/假如我的明天是这样/index.html","0ffde891448550730c9f0796e026e787"],["/2020/10/31/美食食谱/index.html","1d515162d4a304f4a216d23d99832fe0"],["/2020/11/01/PLSQL的安装和配置-11-1-Oracle/index.html","61acf4ce437e3eaeef9bec1dfdae6dce"],["/2020/11/12/JetBrains-全系列产品-包括-IDEA激活到2089年/index.html","636e1622b0fb1e6f96caa5480e48d05e"],["/about/index.html","ce7e9889e85fdadaef9a9ce61398db67"],["/archives/2020/03/index.html","4b4835d7574f620063462fd1615931ac"],["/archives/2020/04/index.html","32a1cb0245d023e41bfc1a50d05e743c"],["/archives/2020/05/index.html","584b1cacf557db86bc99feef47af315c"],["/archives/2020/06/index.html","cba40df31965ce6538f9086f91fbc96d"],["/archives/2020/10/index.html","0cdec3cf654d3deec34c70b6266451cd"],["/archives/2020/11/index.html","9be2dafa33bd170c5d08a02b2a10eac1"],["/archives/2020/index.html","e355034e8fbba7005731ee02a211b081"],["/archives/index.html","c128fc4c4517771c4af6fe76391bdecc"],["/baidu_verify_ZY7f24W6aE.html","d421d7210bdf7b576bc5cc49bf9a44dc"],["/categories/BugFix/index.html","e199cb4f827d57f33a60ff2bbd085df7"],["/categories/IDE/index.html","bdce1fd675863150173ced6b1169db22"],["/categories/Java框架/index.html","053141df22b0d8b205631b9f1131e64d"],["/categories/Linux/index.html","692359116b1134c792ae142144f56c71"],["/categories/Note/index.html","9c45e3ef7fd26480213ff87fb2794106"],["/categories/index.html","081799a977e7fa0d9166bcda2bbd0034"],["/categories/question/index.html","10f98942513b9bbabdf7bb2d33c6204d"],["/categories/skill/index.html","ebc530c17c7c7a34db34585898154e97"],["/categories/soft/index.html","83018de04273f170db66b1f90d3ad90e"],["/categories/technology/index.html","e52f29207fa7b984be2fa1dfb867399e"],["/categories/公告/index.html","3ce7aa729892b35174468b29984e61d5"],["/categories/前端/index.html","75c887246c8154dd417d61167f862aaf"],["/categories/实习/index.html","522174760851134050b6d5fe7efd1745"],["/categories/美食/index.html","3f5d13c32a28fd60d54a59b2dd164654"],["/categories/资源分享/index.html","7b68c846b205397418eaa7f9e12264fb"],["/css/main.css","6e753b2cff9096facc817066b328be5b"],["/dist/APlayer.min.css","75969ab3166f6f51b02cffe8fb495335"],["/dist/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/dist/music.js","c745834d9e4a975a227c8f03c079297e"],["/google91a04f17fb107c17.html","7942b0a658f33f9a543a63ea2e5ac132"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/background.jpg","9c08c8abb229d11481cd6cd05a76adf9"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/index.html","a8a06e77ec1de7ea286227971c112559"],["/js/cursor/love.min.js","7bcfdb57debd43483174cf9e15ab37cc"],["/js/cursor/text.js","0bfcb95f282ef48704c3011dbee76756"],["/js/src/affix.js","9e304f7d64d6ef0f61662e48b95ca82a"],["/js/src/algolia-search.js","93655f8ea52961cc857e9105a57c82e7"],["/js/src/bootstrap.js","4f1001eae8f122775c843774f120bb29"],["/js/src/exturl.js","becbc04dfb825acc55e5fc7b7477b424"],["/js/src/hook-duoshuo.js","571f0ef49fed2d0516fd2abd4bbbf9c4"],["/js/src/instantclick.js","0cd84bd7f9dd8bb74985faca3bf8b56c"],["/js/src/js.cookie.js","786f5350b00291cebc2e29fc07a41ebb"],["/js/src/motion.js","a1e078cb461caf1c64f1d0c7e042a742"],["/js/src/post-details.js","2856abd40ff98322c2791858ef7fba9a"],["/js/src/schemes/pisces.js","faa1668e601f2ae5e90f162b79b48d8d"],["/js/src/scroll-cookie.js","54faed2ef49e3ee7ffac3b267d8cd170"],["/js/src/scrollspy.js","fc11a52394f3412040f455a483216acc"],["/js/src/utils.js","ad745f74bed21177a9f5d8132aa0079e"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","31398e3ed2bf048d4659982fff7ed612"],["/lib/Han/dist/han.js","9c83791faa83fa14faeaf12f3a2a9bfd"],["/lib/Han/dist/han.min.css","b56d4bb05394c35d9c74d0f23f5a323f"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/activate-power-mode/activate-power-mode.js","084b43b6f2c3b891b37f49964f96c5aa"],["/lib/algolia-instant-search/instantsearch.min.css","50c386ffa1380a330906dc25bf7b9316"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","2e5b885198f0804d2ecd28c0218f633e"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","c42e731263b04eb6a2ec30e74c878aa4"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","dd72ac551478430a041fe15dfac827f1"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","66c24da2bdaefca66d6758d25b1318f8"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","5e9e7483c5af988a426c7a32c5737a9b"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","abbffae808126edf7f34911e2bb6fbd7"],["/lib/fancybox/source/jquery.fancybox.css","701707828cd69dd7f1ae440c2d61d501"],["/lib/fancybox/source/jquery.fancybox.js","23e95027f687f39ff0cf3f078b018575"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","7eb379a0faa6aceb8646f1efde1703e2"],["/lib/fastclick/lib/fastclick.js","2734cef7632126bb3492b19623398fe1"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","3f04053678a612d5f999d67bb51c4a90"],["/lib/font-awesome/css/font-awesome.min.css","592ade388eb536c5ef89df6416b84b2d"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","7b469cf8d0e0df803aee8736ec48d6df"],["/lib/jquery_lazyload/README.html","4c2bf68b7f747674e1b0364aeb4c6b09"],["/lib/jquery_lazyload/jquery.lazyload.js","62ec61bfa5e42d2ad2f08e782f88e413"],["/lib/jquery_lazyload/jquery.scrollstop.js","c42293acb4d72443bd94c3e80922bf1d"],["/lib/needsharebutton/font-embedded.css","b29675122db80e42fad401a06f54fdac"],["/lib/needsharebutton/needsharebutton.css","d41d8cd98f00b204e9800998ecf8427e"],["/lib/needsharebutton/needsharebutton.js","e013085c63cb38e38d68926fa4d4c199"],["/lib/pace/pace-theme-barber-shop.min.css","deed963715f5b27213989281f88e01a7"],["/lib/pace/pace-theme-big-counter.min.css","5fe958bd33140215615953a5ded049fc"],["/lib/pace/pace-theme-bounce.min.css","ef661734536c52d0c05f11d20dad1a54"],["/lib/pace/pace-theme-center-atom.min.css","2d76024f0a030402a5de70e512eef29f"],["/lib/pace/pace-theme-center-circle.min.css","c29d64a07a3c6d887d979a63ee8ed79d"],["/lib/pace/pace-theme-center-radar.min.css","401db7630adf1cd9851b16028a2acf29"],["/lib/pace/pace-theme-center-simple.min.css","20ed132a0f23b5c97e0af98eba078f0a"],["/lib/pace/pace-theme-corner-indicator.min.css","df86b42981c2e1c92ade80d6d6d152e7"],["/lib/pace/pace-theme-fill-left.min.css","790832f5a7f9aabccdef6d36c6d09f0d"],["/lib/pace/pace-theme-flash.min.css","250b6bfb15d53c2f349d77dae1007664"],["/lib/pace/pace-theme-loading-bar.min.css","ae9817e3858e2da7d472677202c0408d"],["/lib/pace/pace-theme-mac-osx.min.css","c72c5a4a9bc52bd1ee8ad33764ace872"],["/lib/pace/pace-theme-minimal.min.css","857ce870aeaecbc804c2f2c62cbca9cd"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","93ab70b7007fda0c7f5f35340d340429"],["/lib/velocity/velocity.js","dee1a53b7db6414c78fb6fc155acabfd"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","4949a44d31af344a4265feebaeea7383"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","870bf83ea4550502d7a2397a2545720c"],["/page/3/index.html","2f1e7b1fbb5c80b19cdf0230cbec44b7"],["/sw-register.js","0fb2131cc73625401f36708ab1b40ab3"],["/tags/Hexo/index.html","daa2954b4b3960a1d0f8c5f11ce3e470"],["/tags/Linux-2020/index.html","a34f4a396be05ba3c179a819cdb96b34"],["/tags/Linux/index.html","7053b22dfebe5a569f8ebec833175599"],["/tags/MyBatis/index.html","434381d2ef004415d127cbad014077c0"],["/tags/Vue-Django/index.html","6645551a44e9e9d0417f4febc0ab2576"],["/tags/index.html","957f868f47c4da2f3c7709283a036013"],["/tags/jsp-ssm/index.html","fc1738fdb8bf469648b01e8d497f9646"],["/tags/notice/index.html","2dd6c7ba3eb5424476b1d555af75c718"],["/tags/share/index.html","00a22065fe32e0f6b0374284a9cced0f"],["/tags/tools/index.html","8f5625db392dc8c3a51e27ecfb06c744"],["/tags/vim/index.html","3f0349bc9add11a7182a02f88d251fd7"],["/tags/win10/index.html","6528329b9ef4254f93f74dc9f3b90455"],["/tags/响应式/index.html","1539bb9b21ffe135f5bf00b842074b39"],["/tags/感悟/index.html","3b76537198050b22043e4a50beb671d8"],["/tags/食谱/index.html","8eaa7aa11a0bb7c7c5f1f6aa21708a10"],["/uploads/black_cat.jpg","57a308c673300c2498ab3eba6eef8be2"]];
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
