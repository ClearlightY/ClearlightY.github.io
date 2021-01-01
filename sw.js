/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","520baf45e4906f125fa2fb4ae83d21b6"],["/2020/03/04/VPN-on-linux/index.html","7946f1b4539245fee8e961015795a36b"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","2de473bfaac39cb0bdd9f78e503d3762"],["/2020/03/05/网址分享-实用网站合集/index.html","060b38b3d38cdbf0a86f0111b7387eee"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","a8bf9815e5548bfe7b23999733a00e40"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","c1ead32699019aa6e8c366277a3f352f"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","33134858e3f99e7f1ac3383e186b77de"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","6525048da8f7c8882094680df33c111e"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","45256644b967c2c72be7a55b3f94aa97"],["/2020/03/27/响应式中-media的注意事项/index.html","2f00c98a167e8d235ef4f2dd1c2ca18e"],["/2020/04/16/project-problem-record/index.html","1089a7d7be3b176a6fa9e3ba24e75f40"],["/2020/04/22/Redis的安装-Linux/index.html","e26ff6a468e9627fdef8c1f091cf948f"],["/2020/04/27/高效使用Google搜索-Tools/index.html","efabb34eee72d84fc27e6dd95feda999"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","67789ff26fbb12f99909b9647d7f9eb0"],["/2020/05/18/音乐下载公告/index.html","3bd3d326e0c17c9d35b162e857441e2b"],["/2020/05/21/vimdiff的使用教程/index.html","26c996c7e276431da77de7afa7f78793"],["/2020/06/04/vim常用操作/index.html","6c490a13c7d15d1047467aec294a206c"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","53bb43f0102623f8a9b3fc4dde35f845"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","c39c5e4ca95255c3a8d016866480dea6"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","c4a91aa804f5a1cbc3acde723594fe41"],["/2020/10/21/假如我的明天是这样/index.html","c338783db537ae6a4fbb740209b7cff0"],["/2020/10/31/美食食谱/index.html","09df954cb5963ca3052a9dd8bbcd6ef3"],["/2020/11/01/PLSQL的安装和配置-11-1-Oracle/index.html","bd452f32c25f390d665922fce31d2837"],["/2020/11/12/JetBrains-全系列产品-包括-IDEA激活到2089年/index.html","fb65affdbd955b146a3f66af360756a4"],["/2021/01/01/IDEA-PyCharm-GoLang等JetBrains-2020-3-x激活到2099/index.html","4b5666ba5333c60e7f39d7975d4af8db"],["/404.html","84a602443c19e1ad4f6d28883bdb4f0c"],["/about/index.html","25cd5870a0a549cc05c3832d751532d7"],["/archives/2020/03/index.html","4b867de8b162732d009fe841e6a63202"],["/archives/2020/04/index.html","9ff9a4180b250fbfbb7e41ac5ca46901"],["/archives/2020/05/index.html","e6a26d3db52c78d9484a34dcdb817256"],["/archives/2020/06/index.html","fe081d562f002f9d0d189ac39be315a1"],["/archives/2020/10/index.html","fcf066d4cca03b89d89008df3be422c7"],["/archives/2020/11/index.html","8845b2cb3d36e76c03f39df95967c141"],["/archives/2020/index.html","c2de35468f5bac9b738266eb38951bd2"],["/archives/2021/01/index.html","fb1830da67cae463bce85e249e0f02a4"],["/archives/2021/index.html","fb1830da67cae463bce85e249e0f02a4"],["/archives/index.html","7a219e84f27cb8283171e283e848cdbd"],["/baidu_verify_ZY7f24W6aE.html","67aeb7657d2e04edaf9da69972f146b4"],["/categories/BugFix/index.html","f9a8dfe298a5d329e43dbd00748c8058"],["/categories/IDE/index.html","e00a4d41a998573e5e30e56b1f16afc9"],["/categories/Java框架/index.html","3448f732317feb4741432682b1d1fe6f"],["/categories/Linux/index.html","a42ab5fc161680121fe8bf4371c07a05"],["/categories/Note/index.html","c6f23c14333f2d178cedb6bd4bb4b704"],["/categories/index.html","8496b7b3e5a04731cd6520b8393aa8ce"],["/categories/question/index.html","eb6be724ee8ce04b98ecd3b1ceacbce2"],["/categories/skill/index.html","1e8187e242303bfaf2b4d95a35c2c230"],["/categories/soft/index.html","d999bbda8f2bc5b72a7e714e0e19adc8"],["/categories/technology/index.html","b3ce0d282b3ffde080c73ea3a5d2ce09"],["/categories/公告/index.html","aecd58fdbd9242218da8870b1c2bf2cb"],["/categories/前端/index.html","9ada6727c8c3833253d93a68ebbade9a"],["/categories/实习/index.html","6098336548f574e17d6502a840bbe99e"],["/categories/美食/index.html","6d25ade9752ee130748b7ec449e25fa0"],["/categories/资源分享/index.html","998769e87fadcdf64dd04d67d0eb16b6"],["/css/gitalk.css","7347ed41b9a605a959e9ee0134621670"],["/css/main.css","8334b0731729172f0b64beff6380946d"],["/google91a04f17fb107c17.html","45020b2add372dc510d8bbea7c6fa43f"],["/img/avatar.png","2d9aa61e592b26e2745f3c161c48c397"],["/img/default.png","cbecf637ecf1059c2ff594cc419a04f9"],["/img/favicon.png","5603316bb5bc54a9d5cab14fddd4c510"],["/img/loading.gif","15657539044e11a19a1c6c7e3073d1b3"],["/img/police_beian.png","b769e8dfde5660239317ed60758dba13"],["/index.html","2a6bfcecebe8fe08adfddfd5d118eefa"],["/js/boot.js","4766e15889941588981b3c3ab131307d"],["/js/color-schema.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/debouncer.js","76a66ce3215f599c5f5a1951c9fdf414"],["/js/events.js","89a2fed4f7afa576220ebabcc761703a"],["/js/lazyload.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/leancloud.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/local-search.js","c362a27536a0010c02919f80b42ca648"],["/js/plugins.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/utils.js","5e0c0854096a9fdc54f051e27e9c682b"],["/lib/hint/hint.min.css","fb374a8d2c53efa4173f4c4e386b50ef"],["/links/index.html","e99c635f9ae4a81f58db6bb80297a7e5"],["/page/2/index.html","48cb9704b802ef85514c53480a1d36cd"],["/page/3/index.html","5c46d970d8cefe271471eda28264be25"],["/page/4/index.html","ba14cadcd43130a40ba1f993fe4c0762"],["/sw-register.js","04b2c5c2cc051496f4b560b59d5a53ce"],["/tags/Hexo/index.html","9a3bb34578a91de599215f5e493a0d7a"],["/tags/Linux-2020/index.html","d70e1b2b3be90bc7d327c1311c905a65"],["/tags/Linux/index.html","ecacad514851f2fc9819d1351d963c0d"],["/tags/MyBatis/index.html","1303e90faf033d2821109213bd1992cc"],["/tags/Vue-Django/index.html","a58255014302143a78db5a8a5e2d3b26"],["/tags/index.html","6fcdad8e8e1ccc7b07ecc73a166ef4c9"],["/tags/jsp-ssm/index.html","c35df4aa2f723b321244276bdefebe91"],["/tags/notice/index.html","76d07a07022f686995ffe5aa7f5d6e64"],["/tags/share/index.html","8160476b88a7275acb49dab6721b0ade"],["/tags/tools/index.html","946d9f8fef03447734d52c88b99d459f"],["/tags/vim/index.html","f354eea9674abad77a9fd2fc3fcc3ebe"],["/tags/win10/index.html","ff63566bccf918efff4645a48afd5757"],["/tags/响应式/index.html","1763914e9273e20cbdfc938e99768996"],["/tags/感悟/index.html","9a56ef8378db572b38150d49d03559bf"],["/tags/食谱/index.html","c40c74b93c082f78db69a70afc4566f4"]];
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
