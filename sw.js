/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","2994422d6a0b5626412e8d49827b9c37"],["/2020/03/04/VPN-on-linux/index.html","c97b5bdd441bf712fc069bf85fe460be"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","4ad7affbf01c8ca252b2aabcf8b23295"],["/2020/03/05/网址分享-实用网站合集/index.html","6dc2f0eb8debcbe2c93428a3b2f9eda2"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","67acbe7db790fb1f37804f4c54808b2e"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","223b21ebfb40a048bf4fd2546fcbb0ba"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","ad93654fb64c8cc07fea5e74f7cd1a9a"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","09a5ff47eb658866ad9dd5e163771385"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","bd4dc882832694a32546529ac0f5de9f"],["/2020/03/27/响应式中-media的注意事项/index.html","d00807b0928784ea0dcdf0a4dad4b015"],["/2020/04/16/project-problem-record/index.html","de07cd88c972529a3e7e592f1728b81f"],["/2020/04/22/Redis的安装-Linux/index.html","0a921f6b835d4ff9980e21d6ff78bc4c"],["/2020/04/27/高效使用Google搜索-Tools/index.html","5b866e8fb8202c92380c88f1e3cb09bd"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","21ce3134b0bc230560b22f5b9ef1df7c"],["/2020/05/18/音乐下载公告/index.html","7e79a3c9c9484969db582d91ee34d079"],["/2020/05/21/vimdiff的使用教程/index.html","f7c8ace664f13ef507c2438f76320126"],["/2020/06/04/vim常用操作/index.html","9bc6eb7ee0a7e9a0c045b840b8e21e1a"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","c4096f4578713e06917215f5be4ed26a"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","7c14cf46c45c9745771d76f44e3e0403"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","e5b43bbccd667c28b8365b0f948f36bd"],["/2020/10/21/假如我的明天是这样/index.html","70604732190321913e54714821f659f4"],["/about/index.html","a1421fd9f492eb02ddc9bf069d76c9dc"],["/archives/2020/03/index.html","0a194455801cef835b2b4c59136154d8"],["/archives/2020/04/index.html","df32748f50d9131da5d1c2032d06cf63"],["/archives/2020/05/index.html","a4fe3d4fe64469f5b044e56ad58aabc8"],["/archives/2020/06/index.html","a64b559468c48752a3fca88bb055a5bb"],["/archives/2020/10/index.html","e0821ee15bcd68c3e44f756b5ff9f25f"],["/archives/2020/index.html","7bf87268b52c0f872b07eab43f37fb04"],["/archives/index.html","9a77a4776abc41098cc6a2bf7e82594a"],["/baidu_verify_ZY7f24W6aE.html","10ce1b696428e3ca8a0e3227bccddbbd"],["/categories/BugFix/index.html","7b571a7a3db8cb130e867d5a93da23fa"],["/categories/IDE/index.html","4ce8ffb3790c7bda51c2802c72b29acd"],["/categories/Java框架/index.html","ce791bba12eec5c396e40a5decd312eb"],["/categories/Linux/index.html","bc607e937132ceb2c76b4fbfc3591426"],["/categories/Note/index.html","5565c236ab55208f0f4d64972f41bad3"],["/categories/index.html","4473519004ebaf336727b3c3a86204db"],["/categories/question/index.html","119883e934382c4180f67d3c593cc2a0"],["/categories/skill/index.html","4678ac95dc360ffc55d749053b188612"],["/categories/soft/index.html","582cafdc8af989774725a461fdc0fad4"],["/categories/technology/index.html","9e66506a04ee5dd132a563697c646dcf"],["/categories/公告/index.html","5efdbfc0249cc9d3da409d3041a48369"],["/categories/前端/index.html","1e2c4f3713599954afd9ad24609c6e5c"],["/categories/实习/index.html","cdd12c4bf7e219b3b8a431e076d05fa5"],["/categories/资源分享/index.html","ef2b5b197a79f9f7decb1998a099b8ee"],["/css/main.css","cd97c1b3d6960313147f02221c8620ce"],["/dist/APlayer.min.css","582e636535b5f189ac05aaf134299d10"],["/dist/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/dist/music.js","310753f012a6a8972f43a28aa26e98f2"],["/google91a04f17fb107c17.html","1d5605f1e4a0a9408e52e8690129da82"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/background.jpg","9c08c8abb229d11481cd6cd05a76adf9"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/index.html","f5a9aaae7334d9bc8439d13919d03332"],["/js/cursor/love.min.js","7bcfdb57debd43483174cf9e15ab37cc"],["/js/cursor/text.js","00963c0cd31de7496747bb5a5c36e978"],["/js/src/affix.js","b8cebc5d1bce20ab3fbffa671524c698"],["/js/src/algolia-search.js","8144f27c486fa0aeb984f6168f2d9b1d"],["/js/src/bootstrap.js","78735ac447d80696fa2034b311097f5b"],["/js/src/exturl.js","69176c02737a12a8fe841a8f4a28b596"],["/js/src/hook-duoshuo.js","0653ce593193fb0dafa661358c2ae9a2"],["/js/src/instantclick.js","490948fa8ea5bd669352bcff6bee989d"],["/js/src/js.cookie.js","0fd23d2d389e245b5d01f381dd3d5c33"],["/js/src/motion.js","811ac2dd40172f95d40afe4f5a19c6fc"],["/js/src/post-details.js","3e9e71b50185117978020e7344de663e"],["/js/src/schemes/pisces.js","a9586018f73797571fa16515591cbf7c"],["/js/src/scroll-cookie.js","a75e1de12bb59e4adcc5bee15d7ac5ca"],["/js/src/scrollspy.js","e22755e21c110a9fe2c16eeb6b4534c1"],["/js/src/utils.js","59ea933cefb50794f56a40102e39660e"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","a79031840bcef6565644e679d2925a8c"],["/lib/Han/dist/han.js","d7a334391f52a0eba87b141ce2f39a68"],["/lib/Han/dist/han.min.css","1a74156f461b6248ab2f907c1ca0aee1"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/activate-power-mode/activate-power-mode.js","50e961116d8301a07848205463510b37"],["/lib/algolia-instant-search/instantsearch.min.css","dce6af199efad49e92f02b9d6618cb26"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","734feb527144cd1d38ef48771837e512"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","566a6253124e1f16347b7a7f4b417ab2"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","07d215d04d9edfa8eed8adcf2e502679"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","ef2ff56f242a05c71b9bbfb33e79af8c"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","00dd38f27e0972567a19f211a5df7acf"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","c265bfc2ca7da1fa333c498472a69794"],["/lib/fancybox/source/jquery.fancybox.css","bbf8f2efd5ab9415354e87b28d77d8f6"],["/lib/fancybox/source/jquery.fancybox.js","7ece3dd41f98de91c61e61b5e7b615eb"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","b89f9be91e8391296bd49b5fcefa6b75"],["/lib/fastclick/lib/fastclick.js","8ad667b3091cfe42d68e97be38d2dc34"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","0ca1c0221d1e1b279e7b4139329397cd"],["/lib/font-awesome/css/font-awesome.min.css","0ca1c0221d1e1b279e7b4139329397cd"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","d31f4dae9907d696ade23d410793be42"],["/lib/jquery_lazyload/README.html","30b0a7c2a18ed3f52a4a09eb627e5253"],["/lib/jquery_lazyload/jquery.lazyload.js","1308294480e99222a9c3b19ce355740d"],["/lib/jquery_lazyload/jquery.scrollstop.js","52ddcaedb202402aedb2f636369af1ef"],["/lib/needsharebutton/font-embedded.css","b49cdba91d8ade7f952776c5389df03d"],["/lib/needsharebutton/needsharebutton.css","d41d8cd98f00b204e9800998ecf8427e"],["/lib/needsharebutton/needsharebutton.js","a6b914bdc77bf29d410bea2ca2ec2659"],["/lib/pace/pace-theme-barber-shop.min.css","efb340246d8b422ec4c2ace147793266"],["/lib/pace/pace-theme-big-counter.min.css","7a1953e4fe3d7de50073a187ce0ab54b"],["/lib/pace/pace-theme-bounce.min.css","1e4817cc48ab878e6415d64ae8c8350e"],["/lib/pace/pace-theme-center-atom.min.css","f4e1685d2681706a88d246ad2a5e1f8d"],["/lib/pace/pace-theme-center-circle.min.css","172e20d5e6298157e00884e65369e08b"],["/lib/pace/pace-theme-center-radar.min.css","88b4cc0d9311322b534895b60948304b"],["/lib/pace/pace-theme-center-simple.min.css","ddf11ef61d2a5e56f4421ff2d4f68ebb"],["/lib/pace/pace-theme-corner-indicator.min.css","27c2241930e76ffc6374e21686ea7c9f"],["/lib/pace/pace-theme-fill-left.min.css","ef09cdeeefdb3b6aa10f07e17fea0635"],["/lib/pace/pace-theme-flash.min.css","1d1a18fc05dde82e0e9f0dd4bcd82f7f"],["/lib/pace/pace-theme-loading-bar.min.css","52c99265e3df374fc60849bf5b331436"],["/lib/pace/pace-theme-mac-osx.min.css","5b3d446e4b5536ce88f5d4e62c10b7db"],["/lib/pace/pace-theme-minimal.min.css","ef15496a6e233ecd91868fd686e82450"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","9d3b1eb950adadc85dd7a1a24a24fe37"],["/lib/velocity/velocity.js","f07a38d498ad08fea4500de3954703db"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","a3ccf70bc312d4bf7e514ea0de82cfaf"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","35cd332ec5d75e8cb108bc92f021a7bd"],["/page/3/index.html","783c49b6a12335ec0ae8c994a39313c4"],["/sw-register.js","caacd6bb8d3889b93db0e391eb3d42e8"],["/tags/Hexo/index.html","57e090e2568faa0c9eb59872a5d832fc"],["/tags/Linux-2020/index.html","3c161675c1b50093e12824a82a607ffd"],["/tags/Linux/index.html","a08b8f41f78602ed78551182aa6df5e6"],["/tags/MyBatis/index.html","07486ee8280b023ee44e0572deb4d8e0"],["/tags/Vue-Django/index.html","ba2758d65ea76cbcc0bd220fdb3f5161"],["/tags/index.html","78b4162cee4dd6f8f86749007cb7eff5"],["/tags/jsp-ssm/index.html","33ce239284325af24487e32b77db7941"],["/tags/notice/index.html","e04953a712a88cb95c172ca641afea8d"],["/tags/share/index.html","039d4841a13feb7346580cb75e245d3d"],["/tags/tools/index.html","4a601dc020008a0126b99658bae691b0"],["/tags/vim/index.html","936ec9fe79e45351ed1b525c6e4de61a"],["/tags/win10/index.html","b94de8fa4ae83637806e95e1e3205eb9"],["/tags/响应式/index.html","e626519b29a42ddda294758c6e847db0"],["/tags/感悟/index.html","ee1ddf96687e68dac63a53b08d844989"],["/uploads/black_cat.jpg","57a308c673300c2498ab3eba6eef8be2"]];
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
