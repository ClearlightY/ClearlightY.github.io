/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","4c5e6aa7b00e2c53d3809324e82f6f54"],["/2020/03/04/VPN-on-linux/index.html","48b58f4dc1a327c1f8885ba736a42773"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","07a6f730d07007dbd11e7f414aa84d8b"],["/2020/03/05/网址分享-实用网站合集/index.html","a656eaecac8e105598be7826b8b2429e"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","1ec4b1e19bbcbcd2df489b6b9c0fd8b0"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","c87b98efdc406ab24265ef4713de7588"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","f16c579c0cd2ad1de2d73e8f3bef1c7c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","d2efee79e9a033984ddaab6c7b51b28e"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","c5cab2a97861975a717a079ce90abb3c"],["/2020/03/27/响应式中-media的注意事项/index.html","ca1bd569de368fe224a052044961837d"],["/2020/04/16/project-problem-record/index.html","254e6f757863f06521f4d5be03a7753e"],["/2020/04/22/Redis的安装-Linux/index.html","94a45c28eb26a0225ff2fd34a6840da6"],["/2020/04/27/高效使用Google搜索-Tools/index.html","6bf0711cc2b22cceef1e9f1c440b539f"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","91a3288dc0a5172d34cb15fc95573ce1"],["/2020/05/18/音乐下载公告/index.html","452a5d553ec0be2bdea5032b3d0cbfcc"],["/2020/05/21/vimdiff的使用教程/index.html","704769476c64ed657df93b4b6f5f1a8e"],["/2020/06/04/vim常用操作/index.html","d165fd9800726de9ce1692b5aebf2b01"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","a2b3e7f2d12b5d6cf52d0b9770d129e3"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","31496c92569620820a3d32be5da54a98"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","9fb6ab9db8d401babb674b06a636179b"],["/2020/10/21/假如我的明天是这样/index.html","259a05d90b9d2facd12e37f87450c3db"],["/2020/10/31/美食食谱/index.html","18c5dfc6d9f232ad26746a42b7085e9a"],["/2020/11/01/PLSQL的安装和配置-11-1-Oracle/index.html","d664367dee5f62b3b80e71e1abacc36f"],["/about/index.html","a20e4fa03655fdf5e4dab6b201f63761"],["/archives/2020/03/index.html","f51f99ba3bf6c01fd8ce49771afc1d7d"],["/archives/2020/04/index.html","82e7c259105467a04dc7c13733b9f761"],["/archives/2020/05/index.html","027c5bb55817ac26e123c9a5527215e7"],["/archives/2020/06/index.html","e5b341f62e1699a53cf34fdfe0548ec3"],["/archives/2020/10/index.html","86fd752f03116a900461a9ad7f2852ea"],["/archives/2020/11/index.html","1d8a1e4ce61fbc4c343f00020fc5a2f2"],["/archives/2020/index.html","dc9358b2feea9d2fe132ef8093f342bf"],["/archives/index.html","141c71f49def1fe2adb9f5dd59de1e23"],["/baidu_verify_ZY7f24W6aE.html","27b181671277c11dd0b566b5c16f6aec"],["/categories/BugFix/index.html","3ffe51a6b620635878f31961674701c2"],["/categories/IDE/index.html","e1153f21013123b25e2e011d9682db2a"],["/categories/Java框架/index.html","59a1641c6742097fb77e5f3c7198f6af"],["/categories/Linux/index.html","871218b8c64ba2f0ad7af9f53840dd00"],["/categories/Note/index.html","5e57607db65b9b7a8747bb8b036a2077"],["/categories/index.html","4bd18308325888eb8743c5d1fa85011e"],["/categories/question/index.html","bef5c34ddf34f3899a9cbec059fff94d"],["/categories/skill/index.html","33655f817d83b5a672075ef3d5b3bbc9"],["/categories/soft/index.html","9389cd36f481a1e2c4d023a5290699a2"],["/categories/technology/index.html","b2ae4ec334ed535b762a183698182f17"],["/categories/公告/index.html","69bbdb4c6f1a73f4dfe7ec3925752750"],["/categories/前端/index.html","832f99245f5655114246ad9f2aa340f3"],["/categories/实习/index.html","064d1a09815a8a29f55cef2f0caa59da"],["/categories/美食/index.html","5f20f5983101b0446099191926fc0972"],["/categories/资源分享/index.html","d4ca2bd672ad132d1df6af77b0c3f4e9"],["/css/main.css","4dd45fd8e2036ae5185d041d585a31b4"],["/dist/APlayer.min.css","2f52c7cb8d4984689ae3b702268b73dd"],["/dist/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/dist/music.js","10146d4107e01beae4bc043a6ab93b24"],["/google91a04f17fb107c17.html","8be12e0b9893f8e7624c2538201c914d"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/background.jpg","9c08c8abb229d11481cd6cd05a76adf9"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/index.html","250eaa83894f75beda7948d7a2f99fc3"],["/js/cursor/love.min.js","7bcfdb57debd43483174cf9e15ab37cc"],["/js/cursor/text.js","5aad40d36fffb2237d7b6bc5750db720"],["/js/src/affix.js","d1bd6d52bb505e4bd6d92e16d60fd207"],["/js/src/algolia-search.js","c5c2331364641e6a8e1873c1ac5391e4"],["/js/src/bootstrap.js","4f56204c2e78940ee5380277cd07e7d6"],["/js/src/exturl.js","12f65f0a7038f80bc900d381f2413e85"],["/js/src/hook-duoshuo.js","68b98338891f9fbbdd06a15b290b6128"],["/js/src/instantclick.js","746d3141b8f4c623faad09c1d9a83f33"],["/js/src/js.cookie.js","8ce2028452b43985a9dcdf34a17380e3"],["/js/src/motion.js","71a32e7354d44b9eae190781ee9a5711"],["/js/src/post-details.js","c077d7f9ab1acffe2cc27eab2d93292a"],["/js/src/schemes/pisces.js","f0ae3cd3c171c131dd32b963323a1beb"],["/js/src/scroll-cookie.js","ad3fcc3d41c309eb9be6b2c04a46f609"],["/js/src/scrollspy.js","6de96f68ae79d683ce0d2a76df13a13e"],["/js/src/utils.js","ce978471c5b75ed647bd1c8533f477ec"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","acba07789d79d5ddda94e202aebfad8b"],["/lib/Han/dist/han.js","eaf2b67676438f7798576bc91d99ca41"],["/lib/Han/dist/han.min.css","760c71181577205c89d6f177912582ea"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/activate-power-mode/activate-power-mode.js","ccd7e718192cc123a8bdbbc2755ca2f0"],["/lib/algolia-instant-search/instantsearch.min.css","12925674f3a77d7594b4c4e7c6c086da"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","c8455351930203d7556d27f04452f637"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","c35cb25436e02980300871ca9e1ed318"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","c8483cd6183513bf0de511c097019bbd"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","2ad264bd680afea8c7894241539c30e6"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","0db0aa9a54cd390fbff8285557decb8a"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","e38d82e7035d6f1d33417aaac8b85963"],["/lib/fancybox/source/jquery.fancybox.css","13a342c3715182816d24ea2ef8a06895"],["/lib/fancybox/source/jquery.fancybox.js","c414b33d016dc28780c2553c9bf5cb26"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","0e974bbaeba15d4bf41725e93330ecd3"],["/lib/fastclick/lib/fastclick.js","c2764bc1316c90b8c597bc8de895f8ef"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","e1e28e70249b8edc1f50901cb65edc2b"],["/lib/font-awesome/css/font-awesome.min.css","e1e28e70249b8edc1f50901cb65edc2b"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","84b77f075037d0b3200f4d262c11f74a"],["/lib/jquery_lazyload/README.html","6fe09dd75557e59f4b1b1739dd5995b9"],["/lib/jquery_lazyload/jquery.lazyload.js","b8f2ef87cd1ce155f79318d879549667"],["/lib/jquery_lazyload/jquery.scrollstop.js","143dd302d806d2cdc0f23c0881321334"],["/lib/needsharebutton/font-embedded.css","f6ccb483cc9a20adfd4f0ca28dafcc80"],["/lib/needsharebutton/needsharebutton.css","d41d8cd98f00b204e9800998ecf8427e"],["/lib/needsharebutton/needsharebutton.js","a72e8142d87eb53829856860c8515618"],["/lib/pace/pace-theme-barber-shop.min.css","809890eab561b981d4611ed74f91d98a"],["/lib/pace/pace-theme-big-counter.min.css","77ddf1283ab1a6402c59b01d0a82f23e"],["/lib/pace/pace-theme-bounce.min.css","06be430f217a3502a720e3ada2642b96"],["/lib/pace/pace-theme-center-atom.min.css","4ca188f19833c961dd5b7e7f4cb90c88"],["/lib/pace/pace-theme-center-circle.min.css","da6ee49ab7ebe431f663e2bf9ef98e05"],["/lib/pace/pace-theme-center-radar.min.css","100adc75fe7560a1aa47547f067bdf5b"],["/lib/pace/pace-theme-center-simple.min.css","e53c08a21bfb2d5a78a8cb98eb77e62c"],["/lib/pace/pace-theme-corner-indicator.min.css","2ff4eb85c5e1afe93538b188b22e0410"],["/lib/pace/pace-theme-fill-left.min.css","95ad4a8e7afc3c22824b56de05633a03"],["/lib/pace/pace-theme-flash.min.css","40f3e0257f38425adc5f5bfa15e3e346"],["/lib/pace/pace-theme-loading-bar.min.css","9f01df61da9e9a67f1e6c5ffc4175bf7"],["/lib/pace/pace-theme-mac-osx.min.css","80d7571b8000d33a058689c813ad169f"],["/lib/pace/pace-theme-minimal.min.css","0e7beefd4edfd73e5be45e4f435d3112"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","2e858fbe4f4fcb2924d1c9ac6e7d4bf1"],["/lib/velocity/velocity.js","635cdbb5be93fe25a71790dc0c29e96c"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","7f768ca506e43e6e7dee7ed6fafc00a7"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","ef3481dd27bf074969413e0bcf0b0803"],["/page/3/index.html","9dbdc2e5fd012fa6a4eb551eb9cfc4ef"],["/sw-register.js","96d69f5badaf11851748e6c9f0db5b97"],["/tags/Hexo/index.html","d0961825756037c890a6f5a349340687"],["/tags/Linux-2020/index.html","9576bf812aa24ff699e1f3bdbc746cc6"],["/tags/Linux/index.html","f3d3624954f7d528f9845a76da5f5b5f"],["/tags/MyBatis/index.html","f25d4125566c24526ab5d82fc0fcec85"],["/tags/Vue-Django/index.html","8fd474bdae432b9678ce67d93f3aa183"],["/tags/index.html","4ed7a1421e9f2e06204c552db25f74ad"],["/tags/jsp-ssm/index.html","010f8c57783a71b0c67b4979289049fc"],["/tags/notice/index.html","708ce0928d17c0f2c4826c5b0bceca87"],["/tags/share/index.html","283f87aab2920536ceda3594d4bf3c33"],["/tags/tools/index.html","05e8357486bfc83756388b4304d27b38"],["/tags/vim/index.html","a70c8eaef6393da41faeb1c9e5dcc2ec"],["/tags/win10/index.html","77918daab8cf94b23a2152bc19c4d021"],["/tags/响应式/index.html","d7f7a6749bd103dd150ab7f1a9df45c4"],["/tags/感悟/index.html","45d3ef585b9c72001ab2494b5f04916c"],["/tags/食谱/index.html","9fc8b1abaf0c365985c16ece250e67bb"],["/uploads/black_cat.jpg","57a308c673300c2498ab3eba6eef8be2"]];
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
