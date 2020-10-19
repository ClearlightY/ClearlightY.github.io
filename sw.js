/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","e8699b9f98902da76d12267e54f1408a"],["/2020/03/04/VPN-on-linux/index.html","8699fe309dbc527de8fb03ecd654de1e"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","5c263ec2f642d5be795698b624726a1b"],["/2020/03/05/网址分享-实用网站合集/index.html","6cc3a2e71762128b990ad03f46e841c7"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","5e0fa28d35e35a7d3b755c4c01bd8d9a"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","c0159bd5e6c70004eb2ea5eaa0fdc301"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","27614fe422e82bbdbdca9be55a2e28a0"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","f62a183ec666a14bf1ee630ac6de4167"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","bd9f437228650e17f82fd9099db4a360"],["/2020/03/27/响应式中-media的注意事项/index.html","1c47d4c257ec3352f825a185d2d65e9c"],["/2020/04/16/project-problem-record/index.html","de8c2ab8153b68d4c4df9c1cf3ec956a"],["/2020/04/22/Redis的安装-Linux/index.html","250750e84caa2d45d856f45c4d56befa"],["/2020/04/27/高效使用Google搜索-Tools/index.html","3f2fedc3f50d80dc414a1db50256be91"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","4ff1cd4a0e7f6f975e0973c8f045cff3"],["/2020/05/18/音乐下载公告/index.html","5797e1bff74ba858cdcb144d20aa11b4"],["/2020/05/21/vimdiff的使用教程/index.html","c07b7e7d9487dfba47285c4957dfca71"],["/2020/06/04/vim常用操作/index.html","bf1275406a97d29a75d4f76e81379d62"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","539090da4dca1ae323ad3bcef0d26f3e"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","4acaa6f21523606656b8fe7c58b4e4bc"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","18dfde16993eca9991a2432ff346ffa5"],["/about/index.html","2f22582d4c95b2d2b541fa210e033b61"],["/archives/2020/03/index.html","fa3d94e90ef0a59c461abe0c6be21497"],["/archives/2020/04/index.html","9e9c59b06f292f8b8ebb0a26ad4570ef"],["/archives/2020/05/index.html","793d3467563e61f9311c08a6b2b17eeb"],["/archives/2020/06/index.html","e3f8a3a22157696254767be98363bb74"],["/archives/2020/index.html","072ef23f49a8111df8a76e73c4c083ca"],["/archives/index.html","f98a3115b26e5f799ae0b748d02f4087"],["/baidu_verify_ZY7f24W6aE.html","0ed442bf5b55f13a77fff86a0b580c89"],["/categories/BugFix/index.html","e75f148b9395e2399c5fd64ad45629c4"],["/categories/IDE/index.html","c540724e34ada535603238314d1e3738"],["/categories/Java框架/index.html","913a49d7c49ed3b1507417af42dba6d0"],["/categories/Linux/index.html","7f930300fa36b68816001a36eaa2ec34"],["/categories/index.html","47e48a03e6d87424910ac591d00535f1"],["/categories/question/index.html","fc19b43585227586618df9a7c6fb6505"],["/categories/skill/index.html","47f4c22fd7e239ca619a328bd986bc3c"],["/categories/soft/index.html","444f1cf761490e1cc0e1d864151ae19e"],["/categories/technology/index.html","d7d183ff454cc57bd26885235751a39d"],["/categories/公告/index.html","10be9ed5bfbada60c908697689f42a97"],["/categories/前端/index.html","3116a95ae1596b5c368588335c64219c"],["/categories/实习/index.html","abdc1187024c4de3feee78c33abbcb79"],["/categories/资源分享/index.html","a2ab1c09b627f88328969f8b76f0b8fd"],["/css/main.css","ea694e72344a4aa116dc7c678e68ee89"],["/dist/APlayer.min.css","6d1d67785f3ee8a78b2c349cd9983714"],["/dist/APlayer.min.js","8f1017e7a73737e631ff95fa51e4e7d7"],["/dist/music.js","8205e719704e7f30c799b9488f742fd6"],["/google91a04f17fb107c17.html","e7e04189c71d867c47b81123b6c2b784"],["/images/algolia_logo.svg","88450dd56ea1a00ba772424b30b7d34d"],["/images/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/images/apple-touch-icon-next.png","fce961f0bd3cd769bf9c605ae6749bc0"],["/images/avatar.gif","2bed513bc5f13733cf9a8a12c4e1a971"],["/images/background.jpg","9c08c8abb229d11481cd6cd05a76adf9"],["/images/cc-by-nc-nd.svg","3b009b0d5970d2c4b18e140933547916"],["/images/cc-by-nc-sa.svg","cf2644b7aa5ebd3f5eab55329b4e7cb7"],["/images/cc-by-nc.svg","e63bcae937a1ae4cb6f83d8a1d26893c"],["/images/cc-by-nd.svg","78359b1307baffc2d0e8cffba5dee2dd"],["/images/cc-by-sa.svg","525d2a82716fe9860a65cf0ac5e231a0"],["/images/cc-by.svg","bd656500a74c634b4ff1333008c62cd8"],["/images/cc-zero.svg","2d6242e90c3082e7892cf478be605d26"],["/images/favicon-16x16-next.png","b8975923a585dbaa8519a6068e364947"],["/images/favicon-32x32-next.png","5a029563fe3214c96f68b46556670ea1"],["/images/loading.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/logo.svg","88985471c188e5c5a765a8f233c54df5"],["/images/placeholder.gif","c2196de8ba412c60c22ab491af7b1409"],["/images/quote-l.svg","a9d75107c4d7e31612f98e78be0979f9"],["/images/quote-r.svg","5f902def9e09af7fc41e4cf86ad1a0f9"],["/images/searchicon.png","3d6b5c9d6d6c26a2b76a14b8fdf3438a"],["/images/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/index.html","c95624d3d1637203157fad440b741db0"],["/js/cursor/love.min.js","7bcfdb57debd43483174cf9e15ab37cc"],["/js/cursor/text.js","30e913a441d8f544db1a66fcfa1bc179"],["/js/src/affix.js","e1ef1f2cc363c9ddb5255ee2c254b8ef"],["/js/src/algolia-search.js","4b49c6618546f92505fa88c3bdba74f3"],["/js/src/bootstrap.js","da9550b44fbdfa6f0899c843793628aa"],["/js/src/exturl.js","2c434277afe1d8dacae3bd0229ec972f"],["/js/src/hook-duoshuo.js","2857136768fd9566d21998a6a733e6bf"],["/js/src/js.cookie.js","9281d2ce1a21550c7f771c11b1dcdbb1"],["/js/src/motion.js","0a37628ff0eb245cf0ccdb554205ec06"],["/js/src/post-details.js","4a93163278392a33021e55d1750a1454"],["/js/src/schemes/pisces.js","f18314ea8053961fee7f10efcee2d3cf"],["/js/src/scroll-cookie.js","7a501a998f98485847f88c73fd365679"],["/js/src/scrollspy.js","f8310f44d6e145ee015d5d96cbd298b7"],["/js/src/utils.js","d1ad0aecb89da2a819334c8e8acdcc94"],["/lib/Han/dist/font/han-space.woff","b09f2dd7d3ad8ad07f3b8495133909d9"],["/lib/Han/dist/font/han.woff","e841c6b547bc06a06f60f4de52bf906e"],["/lib/Han/dist/font/han.woff2","2b06aa1c952a2dfaf00d99218689d147"],["/lib/Han/dist/han.css","eb5726be4ed211a4ec2b2b6553c81139"],["/lib/Han/dist/han.js","14f9fa82a8d5955b1e691d091912b27c"],["/lib/Han/dist/han.min.css","f8112f58f87c0c14e562861ae9860e64"],["/lib/Han/dist/han.min.js","96482c9c2b3c5ea9bf5a40db162c7f34"],["/lib/activate-power-mode/activate-power-mode.js","c3cdbcbe8de76d2525b2b4f81ec2cc3e"],["/lib/algolia-instant-search/instantsearch.min.css","fe95e2928b8edf3f5113fffa17b6d9e1"],["/lib/algolia-instant-search/instantsearch.min.js","0db46eba0c8133693ee839507b1612f2"],["/lib/canvas-nest/canvas-nest.min.js","36e103d2a05bc706bac40f9ab8881eb7"],["/lib/canvas-ribbon/canvas-ribbon.js","b040aa83b9aa16bc4b130de541847d0f"],["/lib/fancybox/source/blank.gif","325472601571f31e1bf00674c368d335"],["/lib/fancybox/source/fancybox_loading.gif","328cc0f6c78211485058d460e80f4fa8"],["/lib/fancybox/source/fancybox_loading@2x.gif","f92938639fa894a0e8ded1c3368abe98"],["/lib/fancybox/source/fancybox_overlay.png","77aeaa52715b898b73c74d68c630330e"],["/lib/fancybox/source/fancybox_sprite.png","783d4031fe50c3d83c960911e1fbc705"],["/lib/fancybox/source/fancybox_sprite@2x.png","ed9970ce22242421e66ff150aa97fe5f"],["/lib/fancybox/source/helpers/fancybox_buttons.png","b448080f8615e664b7788c7003803b59"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.css","34496eb1ea0223f16769c249fb832bcf"],["/lib/fancybox/source/helpers/jquery.fancybox-buttons.js","be54a91b82980088ec8434bbc34b1f17"],["/lib/fancybox/source/helpers/jquery.fancybox-media.js","411ae8eb8c716003b1f3e9f651e393f7"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.css","2c1661657097530808afc4a082826357"],["/lib/fancybox/source/helpers/jquery.fancybox-thumbs.js","2495d8bf483fcfd3c6fc64640c07acb5"],["/lib/fancybox/source/jquery.fancybox.css","70ebd68156ca83d3644442e05ecbdc26"],["/lib/fancybox/source/jquery.fancybox.js","4f792a2f5451e811742c6292ca50585c"],["/lib/fancybox/source/jquery.fancybox.pack.js","cc9e759f24ba773aeef8a131889d3728"],["/lib/fastclick/README.html","96b9402c9165f24fd4b87072080e9e20"],["/lib/fastclick/lib/fastclick.js","ac5fd86e12503da5c97d9481facdc487"],["/lib/fastclick/lib/fastclick.min.js","a0fc6c24d1f3ff9ac281887c92b24acd"],["/lib/font-awesome/css/font-awesome.css","5cb6f2d54c0ed0426c43353539f84af8"],["/lib/font-awesome/css/font-awesome.min.css","f5d62fc1a34ff6b0de50137332eda9c1"],["/lib/font-awesome/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/lib/font-awesome/fonts/fontawesome-webfont.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/lib/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/lib/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/lib/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/lib/jquery/index.js","32015dd42e9582a80a84736f5d9a44d7"],["/lib/jquery_lazyload/CONTRIBUTING.html","11e7816068b7376b64438849d3fbb2f2"],["/lib/jquery_lazyload/README.html","58082f6936b56e963a0d746ed872b627"],["/lib/jquery_lazyload/jquery.lazyload.js","615448c90e1d9d76e2e23d6df2a6eb9f"],["/lib/jquery_lazyload/jquery.scrollstop.js","0fed4379343f331859a1019b6d79e975"],["/lib/needsharebutton/font-embedded.css","000805833b134710056e614125208078"],["/lib/needsharebutton/needsharebutton.css","d41d8cd98f00b204e9800998ecf8427e"],["/lib/needsharebutton/needsharebutton.js","f836734ca32fd36908ca43c75d4f927d"],["/lib/pace/pace-theme-barber-shop.min.css","0d6b5288cf514df1dc8c471218253d0c"],["/lib/pace/pace-theme-big-counter.min.css","12e50273756499237fb709dc7437b589"],["/lib/pace/pace-theme-bounce.min.css","3575d25ad959888ad3b3017adceba6d4"],["/lib/pace/pace-theme-center-atom.min.css","befc3c873c87c3cba7a805c9d98d79e4"],["/lib/pace/pace-theme-center-circle.min.css","c52c229b9f083ac897152dbf33909dc9"],["/lib/pace/pace-theme-center-radar.min.css","33469fa7905c5bf972cba21b187e396b"],["/lib/pace/pace-theme-center-simple.min.css","4396425f7e5bc5d9f218a855587a16b5"],["/lib/pace/pace-theme-corner-indicator.min.css","c7c4e1bc1379f36d7acf9b495e19d2f9"],["/lib/pace/pace-theme-fill-left.min.css","f8ebc20aa22a722de233e10c8830ceb7"],["/lib/pace/pace-theme-flash.min.css","3e8ab9feace550e461ec0be8366b2ccf"],["/lib/pace/pace-theme-loading-bar.min.css","f091439aa57446eca98a721792a53b33"],["/lib/pace/pace-theme-mac-osx.min.css","ed09de23d105fd78e1872a4b3e71ffbf"],["/lib/pace/pace-theme-minimal.min.css","62c78d9a57b512db0e9061205a16b84d"],["/lib/pace/pace.min.js","24d2d5e3e331c4efa3cda1e1851b31a7"],["/lib/three/canvas_lines.min.js","1324174ae6190fbf63b7bf0ad0a8a5bd"],["/lib/three/canvas_sphere.min.js","5c6bc45b137448b5b9df152ccfb2659c"],["/lib/three/three-waves.min.js","41059bd5e5c7aa520b1b411919e5121f"],["/lib/three/three.min.js","3298078bce82bdb1afadf5b1a280915e"],["/lib/ua-parser-js/dist/ua-parser.min.js","a6e833266c4b41fabb9ba94a145322d8"],["/lib/ua-parser-js/dist/ua-parser.pack.js","c3bf9e508e83579c34089ba5c30bc630"],["/lib/velocity/velocity.js","efb110fc47ce1de07f0746f0b9436d92"],["/lib/velocity/velocity.min.js","c1b8d079c7049879838d78e0b389965e"],["/lib/velocity/velocity.ui.js","36343c40040958db39cdcd323fc79068"],["/lib/velocity/velocity.ui.min.js","444faf512fb24d50a5dec747cbbe39bd"],["/page/2/index.html","e901c48e75fe701cbad2cd78fed508d7"],["/page/3/index.html","ed22a2fb5d61cae3ab3d56cb9add77ec"],["/sw-register.js","65c0d70e0dd875fd63ae19f01af7b9e8"],["/tags/Hexo/index.html","54b53d5f42874c192420ab1e60fee71e"],["/tags/Linux-2020/index.html","3e1b1f35fda2931b45955ecaa8527d1d"],["/tags/Linux/index.html","07355e96265aa84a877fc110b9a883cd"],["/tags/MyBatis/index.html","06b5befe4241ec2e5116b068e307a487"],["/tags/Vue-Django/index.html","0b24cc47b39316422c1cd2df9e65e5f7"],["/tags/index.html","ff0d2ad9c0d584a9cf1b6cc9e45e9e3b"],["/tags/jsp-ssm/index.html","ed881b95b3262c69b16afc234af62138"],["/tags/notice/index.html","b5a3c027bb527d85e55116848e048a87"],["/tags/share/index.html","449f9192e1f276109a6db781a09f6e61"],["/tags/tools/index.html","9c72824b3a9a2a2be2b7246e67838f4a"],["/tags/vim/index.html","f4572b1afb84c2efe0ab39780d5d07f4"],["/tags/win10/index.html","64d34b7c4379f406d8127c33202c91e3"],["/tags/响应式/index.html","c4f6f0e9b2709ca4cf0fe3ec4cef7a39"],["/uploads/black_cat.jpg","57a308c673300c2498ab3eba6eef8be2"]];
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
