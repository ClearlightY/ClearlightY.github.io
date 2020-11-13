/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","909fad531303e99e7c4b0b6b2f83c435"],["/2020/03/04/VPN-on-linux/index.html","9ec3f8d44e29086f4b8927cc13f64749"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","048389d16a6802ad0e28589b8f59e74b"],["/2020/03/05/网址分享-实用网站合集/index.html","b7dd2f9af394ebb636ef6e627cf07326"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","48745d8f119182b202ddf403e97efb2d"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","bcfeed76bd9dfb2a1dff52869356f677"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","604cadc8b9ea9150d7321bc1f7772f18"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","2cf26076378c14df3eff0a21f8d34917"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","af0492255ab9286070c146bebf6f17d3"],["/2020/03/27/响应式中-media的注意事项/index.html","03d2755c474ca62fdb7d3cd08eeb27f0"],["/2020/04/16/project-problem-record/index.html","45b60fc62f79163d6183385bbe76dfba"],["/2020/04/22/Redis的安装-Linux/index.html","62461338bbb6e8ff7af10f46c80fb2ca"],["/2020/04/27/高效使用Google搜索-Tools/index.html","1fcaa7bb6883c816ba4a91f7034ff588"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","5afda5f2ff8a6cbb44bcc895b0587e50"],["/2020/05/18/音乐下载公告/index.html","91d1bd9bad88c4d7078398920bd42ecf"],["/2020/05/21/vimdiff的使用教程/index.html","70c1ad89e4116f1e7c05283060140ef5"],["/2020/06/04/vim常用操作/index.html","7ca3beeab6674918f785daff5363de36"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","7f77f0253cf91617fd808ea5de1ac259"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","b126072a0800c15950bd9e1eeeb5deef"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","0ac62d7cc69a2628c47edc8d51c1e451"],["/2020/10/21/假如我的明天是这样/index.html","fa1a4a153988a3476af915cd4d76bac9"],["/2020/10/31/美食食谱/index.html","fa5969ff8ee0c09d02f4dc1d5db639a2"],["/2020/11/01/PLSQL的安装和配置-11-1-Oracle/index.html","559faafdd77fe04ab192e4c3a03e9147"],["/2020/11/12/JetBrains-全系列产品-包括-IDEA激活到2089年/index.html","f53c9fe055d2d229f9caadb1fb58d646"],["/about/index.html","45391d18887ba0d3649a2b68536c8163"],["/archives/2020/03/index.html","482822d46a8f01479469a9b4c8332f2a"],["/archives/2020/04/index.html","2b9c2191fe73c43767ce4aa7c5fd9f0a"],["/archives/2020/05/index.html","793771ad7da5d4791b7a2591d4991360"],["/archives/2020/06/index.html","3f253b99140fcf9d0c73446c0f80dbda"],["/archives/2020/10/index.html","871fa185da0fc6f43e10118bad005177"],["/archives/2020/11/index.html","d3c789c4aecfe97e6280f5b680394d92"],["/archives/2020/index.html","16411cfd36b45c0d19f93899f5b18a33"],["/archives/index.html","bc577d8d9077bacbc9e6e2325ce0a9dc"],["/baidu_verify_ZY7f24W6aE.html","a3e26dac9ff4d06f32819d17d7b73771"],["/categories/BugFix/index.html","3e1054d1fb3f32b412e9bcc38f21be97"],["/categories/IDE/index.html","7710e3447794fd6fbb7174eae46470f6"],["/categories/Java框架/index.html","6b9ee65868ba4998e7e716e73bb5d7eb"],["/categories/Linux/index.html","879d76178f54c539c57c62800a2a3a70"],["/categories/Note/index.html","823702039772e5acfba07cdadb93f952"],["/categories/index.html","7b08f358b9064fecd0407d1297c7428c"],["/categories/question/index.html","274d0aa6c4bb1551944ba0824f8004fe"],["/categories/skill/index.html","c9b89c50d11f187db9e5322088c5e66e"],["/categories/soft/index.html","567f76c311b4f07913a40d5aa8d17d3e"],["/categories/technology/index.html","d09cdbdea11f6241c19299333674597e"],["/categories/公告/index.html","1cfa7d10fb2b77db287121efb2b917cf"],["/categories/前端/index.html","52117b51d9c9c93d186c5734d8aabd75"],["/categories/实习/index.html","b31d43c6e8a68248de3f786bc0497596"],["/categories/美食/index.html","efbd288b50d02c936c5bc5b208922a7a"],["/categories/资源分享/index.html","53dc80758ca3fbbf28f48e68145d786d"],["/css/main.css","fa3c93d8c5c5a9654ba59a672595dfe2"],["/dist/APlayer.min.css","2fbbce4fad84b01a274dd994b59bfb08"],["/dist/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/dist/music.js","3051d79c24d5cb96f613f9562f29d551"],["/google91a04f17fb107c17.html","bddca3e79e40e4b2490de494ca5dcd4d"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/background.jpg","9c08c8abb229d11481cd6cd05a76adf9"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/index.html","33742e13a5ea8aed43e09ab4f210d6b4"],["/js/cursor/love.min.js","7bcfdb57debd43483174cf9e15ab37cc"],["/js/cursor/text.js","ae7f64e9375ec3562888e21c84aa899b"],["/js/src/affix.js","a50a97b727620504627738399dac3404"],["/js/src/algolia-search.js","784cefd978899e914d96cab4d878cc65"],["/js/src/bootstrap.js","5f7e360f0f700f6dfa0cd712f7571394"],["/js/src/exturl.js","5fdd1faba705e1b6bb5a772092edb954"],["/js/src/hook-duoshuo.js","d19a23b9f3c99244c48c5eb0629b8afa"],["/js/src/instantclick.js","a697bb76da24739af2119cea0187d865"],["/js/src/js.cookie.js","4b2f2ffa64cf1a4f8a94cd37de76c412"],["/js/src/motion.js","0511beb1958343959f1b284cb829a724"],["/js/src/post-details.js","516228f001acc40849c56aa28eb3eaaa"],["/js/src/schemes/pisces.js","e2abe088fa86b3a6e57cdac6500967bf"],["/js/src/scroll-cookie.js","fe8df5bc30c2ab4da3b47f21936c511d"],["/js/src/scrollspy.js","e7d665587af8df90bd2500aabd7c9f51"],["/js/src/utils.js","77a3ee18c37d209121f2c0e302cfc6e8"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","4b1caeaa08fa213f6eb73a80953ee2b2"],["/lib/Han/dist/han.js","4424005d4453c0a8b5a53ca982f02253"],["/lib/Han/dist/han.min.css","ced37b1b7a3c9b08bbbed5e6b53d17a9"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/activate-power-mode/activate-power-mode.js","3e578df32a0c47d515dc9ab822fe5d90"],["/lib/algolia-instant-search/instantsearch.min.css","640787b39dc808057c0ac08d2aa4d8cd"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","770076cc60fbc43e2fbb6ebb2a694a9a"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","32289762d2be5321f0ea81258528817f"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","3c290054e1d2669c46b15c8a0bc198c9"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","ee85d09df07c2c1dbbf8995087d69e2c"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","0a693e844ff1d6592bcbb7f8eaaaf64c"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","fc009a21f52bc17f2e4e15b3eaf16e27"],["/lib/fancybox/source/jquery.fancybox.css","35c40a503af77a0ac0af9322d308ec49"],["/lib/fancybox/source/jquery.fancybox.js","e01f724987227d0a2772554ac1a9aa1e"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","8c358bd2b814eaf9d2abc523570b8f64"],["/lib/fastclick/lib/fastclick.js","851793222dc4bb392162af8ccf68b3c1"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","a3562a570c37c8ff6849538d289879d8"],["/lib/font-awesome/css/font-awesome.min.css","a3562a570c37c8ff6849538d289879d8"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","9e2806e21f38fc8466c840ae8b988d58"],["/lib/jquery_lazyload/README.html","141f8f290c9ae7341ceb945cbd8d366e"],["/lib/jquery_lazyload/jquery.lazyload.js","fe57552b3c61eb30b2b42962a25e00fa"],["/lib/jquery_lazyload/jquery.scrollstop.js","bfc847ed2ee7f83aaf3c6ef735644c07"],["/lib/needsharebutton/font-embedded.css","be4a3fd6527c3ae89f282239633fd7c5"],["/lib/needsharebutton/needsharebutton.css","d41d8cd98f00b204e9800998ecf8427e"],["/lib/needsharebutton/needsharebutton.js","4f2dd5e35fcf5e7b5ffcb82997c4efbd"],["/lib/pace/pace-theme-barber-shop.min.css","cba619bdf7fbc1ebe0f34ee5d3b8f990"],["/lib/pace/pace-theme-big-counter.min.css","f39983f4153d4ed97645c523459d9fec"],["/lib/pace/pace-theme-bounce.min.css","82b3ff638a32028a15df03a4923a79b8"],["/lib/pace/pace-theme-center-atom.min.css","d69878b14d0a0f2851e50d3b9b9215e6"],["/lib/pace/pace-theme-center-circle.min.css","743bb2e1d77a63f5465eea9f94ab04de"],["/lib/pace/pace-theme-center-radar.min.css","ff138cd68a83f5ca186e60cd996dac60"],["/lib/pace/pace-theme-center-simple.min.css","b6811a414f95e28bf51331d57945b806"],["/lib/pace/pace-theme-corner-indicator.min.css","2f190f1732251dad8e2c072f4e382488"],["/lib/pace/pace-theme-fill-left.min.css","a06a239232901e9982f51230e6655a0a"],["/lib/pace/pace-theme-flash.min.css","88d1f00d73e5773e75ce70dca8888d47"],["/lib/pace/pace-theme-loading-bar.min.css","eafd4800bdd19bde5992a0bc492dca64"],["/lib/pace/pace-theme-mac-osx.min.css","8d988a6a84648165357a7bfcc967afc4"],["/lib/pace/pace-theme-minimal.min.css","a2640f88debd94fed31fe341de012b2b"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","c67f59aa774674f969ed8b7a9446de81"],["/lib/velocity/velocity.js","a5d8c58dcf79e41e79dbf7d5892257ff"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","e53115ab3bc060ed9a3709ba0f0c87ad"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","62e480484e71371dc821589dc18f2128"],["/page/3/index.html","b767ed2f41136541cfcb84b348306424"],["/sw-register.js","46ffc761f0b995ed18f4199e8f3d718d"],["/tags/Hexo/index.html","0f9315abdd6d7396da237ec938b0dd6b"],["/tags/Linux-2020/index.html","d68a197a464def96ef451bd6a70c9ad0"],["/tags/Linux/index.html","0a0efe9f25853fe273b8b185758d135a"],["/tags/MyBatis/index.html","0044a3247bf650e97214458db315e323"],["/tags/Vue-Django/index.html","126c9127acb633ccb55b12cde8376381"],["/tags/index.html","b1a0c2eaeb11f646a14bda209b4f6ccf"],["/tags/jsp-ssm/index.html","c95baa686d1d2bd039dc090aa4096271"],["/tags/notice/index.html","2f7f459b88d9b4c5fa9310d09423301d"],["/tags/share/index.html","c8483eca912774c9a4216e723fb41617"],["/tags/tools/index.html","b264608593d68838686610de269f0bc7"],["/tags/vim/index.html","4e5276f500011ae6714a05784abbff0a"],["/tags/win10/index.html","422584d18d5201c1ca141190fbc7a79f"],["/tags/响应式/index.html","fdfe78632ac462cc359eaf5d8ab7e7b1"],["/tags/感悟/index.html","79ba0a1e500eb3d30487402ed1d1527b"],["/tags/食谱/index.html","966c03c5249ef855ef4093a786f1aa76"],["/uploads/black_cat.jpg","57a308c673300c2498ab3eba6eef8be2"]];
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
