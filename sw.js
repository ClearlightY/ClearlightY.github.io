/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","061091b664cb4201213f139928bdeb55"],["/about/index.html","6ac65c53de086c3d466fdfd501e457c6"],["/archives/2020/03/index.html","9939296d27cf9d2cffccd5f3c3168287"],["/archives/2020/04/index.html","ba03c4509162d106c36ed6de22166023"],["/archives/2020/05/index.html","e6747a750b291c294e6a8702312a2b71"],["/archives/2020/06/index.html","d1b9e6b83a61e790bc3686df18658dc2"],["/archives/2020/10/index.html","63024d7623a3b338e8f204388c87d924"],["/archives/2020/11/index.html","5c24d3b44fe4519b03e14720f8218f5f"],["/archives/2020/index.html","bfeaf0cf6a6bc8a72c4ef93d12cbe5eb"],["/archives/2021/01/index.html","e140c2d2c8c7e8e6f853ff2429f0b2b0"],["/archives/2021/index.html","e140c2d2c8c7e8e6f853ff2429f0b2b0"],["/archives/index.html","7a3e62802d1bcd06811a08fbdafbdf9b"],["/baidu_verify_ZY7f24W6aE.html","f143e367b5f123de2fc5304fcc6026de"],["/categories/BugFix/index.html","b9c9679fecf83d59b5bf0e7b4450f4aa"],["/categories/IDE/index.html","62b5a270eaed163508f6311f3a5c3052"],["/categories/Java框架/index.html","2dc74d3942bf46c31593efd21534d8d2"],["/categories/Linux/index.html","1160edcbc0e61f4ecb36e346e7bbdb8e"],["/categories/index.html","6d0b448f7d099a9f8150156aa127a0af"],["/categories/question/index.html","8fbe1ea07d8e9366d2a9b63ae5d12229"],["/categories/skill/index.html","9a62d5f5954c1ba5d09380e0247292c6"],["/categories/soft/index.html","1116c193a931ad0a38c81b3094545643"],["/categories/technology/index.html","165dc11b6d36543adb6a360f8756190d"],["/categories/公告/index.html","b39aca50c91e79cf05736a978fc9396c"],["/categories/前端/index.html","32790d1103523b8e8501dfb5ac47cc22"],["/categories/实习/index.html","3b1c7a61f947c82796c898d47b22eb38"],["/categories/美食/index.html","4099551b46359ccc242f6e4459a2ee6f"],["/categories/资源分享/index.html","83888c65b21ad798f6724162e75e1fbc"],["/css/gitalk.css","ed4d9955aa9c1f6414098940e4baadae"],["/css/iconfont_csdn/demo.css","48d4bd2f6a60c48bd3ac8746358a1aca"],["/css/iconfont_csdn/demo_index.html","54b352f7d55bcba35bf7c6882a8f2744"],["/css/iconfont_csdn/iconfont.css","f846fd9361ec69edf0d7ffbd2c677c2d"],["/css/iconfont_csdn/iconfont.eot","e8e9d18405d18fdc9fa881ee9bc2282c"],["/css/iconfont_csdn/iconfont.js","a3997e7111f942975f5b1eb2ac4c22b3"],["/css/iconfont_csdn/iconfont.svg","7bcbc4bd45de8d2dab8a37eb8f89287e"],["/css/iconfont_csdn/iconfont.ttf","7d7909eb9f6a4129ea585a9414ff82bf"],["/css/iconfont_csdn/iconfont.woff","da2579c3cfbde2ed1cb10430ce3026bd"],["/css/iconfont_csdn/iconfont.woff2","d2008b39edbda2f6f2d8c6e5b31b100f"],["/css/main.css","950815d5b14b7a1ecdce85aaf990d58a"],["/google91a04f17fb107c17.html","6925de3c4c4b05bd73cf9d96ff05dc29"],["/img/avatar.png","2d9aa61e592b26e2745f3c161c48c397"],["/img/avatar1.jpg","0c4117e36552b8e8c9e154b53d4a483d"],["/img/bg/about_bg.png","b43a58fbbc249d3fcc278e9b3a70ace1"],["/img/bg/archive_bg.jpg","8e59d7b6d586f3909755c01f51bee9d9"],["/img/bg/ca_bg.jpg","9c0a593288e16f0f39ae3f46d1d086cb"],["/img/bg/index_bg.jpg","ff944680ff7e7d719e238b9737131132"],["/img/bg/note.jpg","5cf9f1e5ce0c204e8ca5363ca4e71e91"],["/img/bg/tag_bg.png","ecda34f15b4bb494a66c467af217f0f0"],["/img/clearlighty.jpg","4ef72773b97196333dfa5ef985e7d432"],["/img/default.png","cbecf637ecf1059c2ff594cc419a04f9"],["/img/favicon.png","5603316bb5bc54a9d5cab14fddd4c510"],["/img/loading.gif","15657539044e11a19a1c6c7e3073d1b3"],["/img/police_beian.png","b769e8dfde5660239317ed60758dba13"],["/index.html","1210cca81cc84366066aa5d99ae8d484"],["/js/boot.js","f7c1ebf2b93f59149bd0e4d2dfe918cb"],["/js/color-schema.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/debouncer.js","3fd0c75917c704a017042a149692a12c"],["/js/events.js","3de91efd9f2392261ee92bdd9a8ef63a"],["/js/lazyload.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/leancloud.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/local-search.js","a87d35a67c02553c8320ba9415530ed9"],["/js/plugins.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/utils.js","2c86cd5af8aab46533378c1c3a871585"],["/lib/hint/hint.min.css","b5f3452bff6af473afc6ec1169990093"],["/links/index.html","11f1a3930cf550e79dbd57502f17e98a"],["/page/2/index.html","86fe178488960aa61bb482f7df888e83"],["/page/3/index.html","e6dd95e86c5042bc27dc8c204807ecb3"],["/page/4/index.html","105fec960f466fc0c9aea4305bdd8858"],["/posts/10838.html","579ac275ccb4c58f35658cd479e4420d"],["/posts/12531.html","d51cd019ef43938dafd0b0090446989a"],["/posts/17143.html","323f55185b1b02e7df18dda05616f34b"],["/posts/17177.html","a08c9bd9935069540d28ac1cc709d269"],["/posts/17177/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/posts/18217.html","6616f480a2be4aa65317249b3303da28"],["/posts/20080.html","25b4d0b3588c62dc9d1df71f573cc2cb"],["/posts/21655.html","7d4e9560bcb94310a390283589b66394"],["/posts/28754.html","1d99b47046c8b356e4ff89b6ead3043a"],["/posts/31617.html","8956632b530325f666378c2369d32ed0"],["/posts/31617/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/posts/31617/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/posts/31617/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/posts/31617/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/posts/31617/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/posts/33405.html","1bd80ea7c48bbecfa4348fa2dde59113"],["/posts/33725.html","dba1eab681124ef5eef2adb4417acf2a"],["/posts/33725/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/posts/33725/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/posts/33725/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/posts/33725/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/posts/33725/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/posts/33725/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/posts/33725/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/posts/33725/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/posts/33725/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/posts/33725/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/posts/33725/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/posts/33725/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/posts/33725/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/posts/33725/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/posts/33725/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/posts/33725/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/posts/33725/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/posts/33725/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/posts/33725/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/posts/33725/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/posts/33725/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/posts/33725/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/posts/33725/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/posts/33725/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/posts/34755.html","8384328289c67ca2db78375471584bf8"],["/posts/38652.html","a8a78f1b3d3437f625bd8eb120763cfd"],["/posts/38652/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/posts/38652/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/posts/38652/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/posts/38652/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/posts/38652/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/posts/38754.html","6f19f716dcae01ef5862ba37d6ddffb5"],["/posts/40064.html","c9199545a1a8da79da6228249e443feb"],["/posts/40064/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/posts/40064/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/posts/40064/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/posts/40064/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/posts/40064/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/posts/40064/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/posts/40064/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/posts/40064/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/posts/40064/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/posts/40064/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/posts/40064/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/posts/40064/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/posts/40064/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/posts/40064/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/posts/40064/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/posts/40064/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/posts/40064/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/posts/40064/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/posts/45769.html","1574d63623ed8a98079c06ef66ccacc9"],["/posts/45902.html","a6fa9f51555a527646b026306deface3"],["/posts/4763.html","551475043eac6807819a54e305123cf1"],["/posts/5056.html","f28e407b34d9be4e7b6bd24bfecf6be5"],["/posts/52325.html","ac950364549e1e0a5a01a054f0de2955"],["/posts/54105.html","c524cc2949fa9af813bd98accc0538c4"],["/posts/55103.html","62e74e94f682a85f41abd2efae4e4530"],["/posts/59758.html","4963bb4f233681bb7dfd1ec14782ff05"],["/posts/64128.html","850b92ea0738030ce8a86ec988f395b6"],["/posts/7479.html","d6f440d17df9ff27b96ec08ddf1b478d"],["/posts/9290.html","46ff66fbb805fd5f13878894f4dfe6e8"],["/sw-register.js","667dc2a555198b8c5032a99f222b576e"],["/tags/Linux-2020/index.html","2a9bab5f020f36b7d9578ec1f282ffbd"],["/tags/Linux/index.html","f96774f290e23e503da143b8d623befb"],["/tags/MyBatis/index.html","ddd13feb566f784ea335c0b3b051f476"],["/tags/Vue-Django/index.html","3e2392decc84e2728bb4ede4b1868451"],["/tags/hexo/index.html","c5e683613ea4acf0bac3e6f2ca397d53"],["/tags/index.html","707323ef0887cf8ddc97f7c9fd499b6b"],["/tags/jsp-ssm/index.html","e091493b0fabfc37f9e1e0c119227fc9"],["/tags/notice/index.html","cb714ff869f309f10dbf000d7984e1c3"],["/tags/share/index.html","e8c3312e531deb207300f892e99cf4ae"],["/tags/tools/index.html","3922527c03292fd6affce43e0b89166d"],["/tags/vim/index.html","6b7881d30606f055299047915e401b45"],["/tags/win10/index.html","59dc9ef3ce8744f82cec4134b7e74f2e"],["/tags/响应式/index.html","13e95fa487ed56115276a749130ec285"],["/tags/食谱/index.html","9870e153d3a5016887d63ee43a13c145"]];
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
