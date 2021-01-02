/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","d3862529aa30e55bc5d66199c72e5471"],["/about/index.html","14d077406016cc0cc8e1f71ffe4d3b9d"],["/archives/2020/03/index.html","e72af0d796314be041cea40015af9e30"],["/archives/2020/04/index.html","687b54203739ecc6bd411c73541b6dac"],["/archives/2020/05/index.html","9a74ab22580a5fb7e569ec9a7ed0e67d"],["/archives/2020/06/index.html","1eb17a9b3b59ef7031229d638432e44c"],["/archives/2020/10/index.html","bc1003fce355a1a6606a2da637841434"],["/archives/2020/11/index.html","d80e3f33af3f1cd3bb79859253348754"],["/archives/2020/index.html","5ffee3c2c36009be36d58fb7006403c3"],["/archives/2021/01/index.html","5a717ef5ff49727ae7a3807a5cbfe6d4"],["/archives/2021/index.html","5a717ef5ff49727ae7a3807a5cbfe6d4"],["/archives/index.html","a41cd5b2160df1b0194b5c6f2420d7c5"],["/baidu_verify_ZY7f24W6aE.html","9ea21a23ed94cc1e7e593b30ea94cd78"],["/categories/BugFix/index.html","1a43074962f95e8ea51f2598805579f5"],["/categories/IDE/index.html","5111ecd1899db0607d04e1a5ddbdaee6"],["/categories/Java框架/index.html","e5398488f549bd5fcbab17d8b0d94bf5"],["/categories/Linux/index.html","72cf7952d87e154199826b85a2ab5c91"],["/categories/Note/index.html","8554c81469f16498bf66dcd1851a328e"],["/categories/index.html","0ab6f28621ff436ba2699698cef2a0bb"],["/categories/question/index.html","25e52f55a5a4f8fc380d138104e6ea84"],["/categories/skill/index.html","9131450a8cb225c20919d08f98cdb8be"],["/categories/soft/index.html","c036ce6144701bf1a34ebcb73988934c"],["/categories/technology/index.html","0b254e55aedf2aaa4e65941fc32b56c0"],["/categories/公告/index.html","d4c093fd03b8b6b32841c117758815f8"],["/categories/前端/index.html","7320d2b1d37e79373e0148afcf1eb4be"],["/categories/实习/index.html","66310a2b667ec27f6b770b7264a00deb"],["/categories/美食/index.html","8693ec9637466dd0490c847cc038a45a"],["/categories/资源分享/index.html","2061b75cff241601e552daae0f9247bd"],["/css/gitalk.css","32ccf8f7306c23bb885d79b6875d86a3"],["/css/hbe.style.css","a8bc819e01e001d3bc6ae03a2afad957"],["/css/iconfont_csdn/demo.css","c5bc14b866c8415143bcf3992252e9ed"],["/css/iconfont_csdn/demo_index.html","db22514d56a65229304df701219c344a"],["/css/iconfont_csdn/iconfont.css","88bb0c530c7fb7b55dd941b5f408f37d"],["/css/iconfont_csdn/iconfont.eot","e8e9d18405d18fdc9fa881ee9bc2282c"],["/css/iconfont_csdn/iconfont.js","74353fb5f60f6d5f4057bdb71f673dbc"],["/css/iconfont_csdn/iconfont.svg","7bcbc4bd45de8d2dab8a37eb8f89287e"],["/css/iconfont_csdn/iconfont.ttf","7d7909eb9f6a4129ea585a9414ff82bf"],["/css/iconfont_csdn/iconfont.woff","da2579c3cfbde2ed1cb10430ce3026bd"],["/css/iconfont_csdn/iconfont.woff2","d2008b39edbda2f6f2d8c6e5b31b100f"],["/css/main.css","4249cee925839fd4d3ed608980e18350"],["/google91a04f17fb107c17.html","d429130d78b756499e6d2108449a0a13"],["/img/avatar.png","2d9aa61e592b26e2745f3c161c48c397"],["/img/avatar1.jpg","0c4117e36552b8e8c9e154b53d4a483d"],["/img/bg/about_bg.png","b43a58fbbc249d3fcc278e9b3a70ace1"],["/img/bg/archive_bg.jpg","8e59d7b6d586f3909755c01f51bee9d9"],["/img/bg/ca_bg.jpg","9c0a593288e16f0f39ae3f46d1d086cb"],["/img/bg/index_bg.jpg","ff944680ff7e7d719e238b9737131132"],["/img/bg/note.jpg","5cf9f1e5ce0c204e8ca5363ca4e71e91"],["/img/bg/tag_bg.png","ecda34f15b4bb494a66c467af217f0f0"],["/img/clearlighty.jpg","4ef72773b97196333dfa5ef985e7d432"],["/img/default.png","cbecf637ecf1059c2ff594cc419a04f9"],["/img/favicon.png","5603316bb5bc54a9d5cab14fddd4c510"],["/img/loading.gif","15657539044e11a19a1c6c7e3073d1b3"],["/img/other/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/img/other/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/img/police_beian.png","b769e8dfde5660239317ed60758dba13"],["/img/posts/article_bg.jpg","5fa08fe38895e93603ba47dbdd4be958"],["/index.html","d503f18bf0a55ad2e9c2784c7194c5ee"],["/js/boot.js","90aad96981f5e4f925314020984a6dd7"],["/js/color-schema.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/debouncer.js","15fb7021daaf704cc9e7930cc4d90e47"],["/js/events.js","4495030a93281ba608991c880b1a6ca2"],["/js/lazyload.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/leancloud.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/local-search.js","53e08ca0b761babd889764ceb749887f"],["/js/plugins.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/utils.js","38015edb393af11073a2b092673de51b"],["/lib/hbe.js","b5012c5bb408583c96a32031da7b9809"],["/lib/hint/hint.min.css","b5f3452bff6af473afc6ec1169990093"],["/links/index.html","375de2564c7c9e37ed28366165aa718c"],["/page/2/index.html","4ee0ce040ab0af4e62b97079111399fc"],["/page/3/index.html","4850d73da023765dbe54409286fe8ce3"],["/page/4/index.html","8bc7b4f64d2f2fe90501efcadcde25cd"],["/posts/10838.html","ef416d1d2ccbf08db0cd61a10b459114"],["/posts/12531.html","d0afe04539243875769ba93c17f1d951"],["/posts/17143.html","1d3e26b8adac1b8a4c66b6c1f0e94366"],["/posts/17177.html","aec1e384f88f22a915b7010c2f1d820b"],["/posts/17177/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/posts/18217.html","8ac5a9ae1cf79336d1f7a38a52947d37"],["/posts/20080.html","636a67bc15fa1e798ee5a87ef65f090b"],["/posts/21655.html","5f0b37f2f4879d5c5ddb18b8f0e3b962"],["/posts/28754.html","82698b4e01511ef21a45ff8b3ee76789"],["/posts/31617.html","2cebbeeb1196749a27bbc99655aef6f4"],["/posts/31617/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/posts/31617/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/posts/31617/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/posts/31617/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/posts/31617/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/posts/33405.html","58fa3ebf911d6e2f4033948078658d4f"],["/posts/33725.html","9c01f256d8e762d115b5a9e3ab2dbe73"],["/posts/33725/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/posts/33725/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/posts/33725/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/posts/33725/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/posts/33725/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/posts/33725/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/posts/33725/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/posts/33725/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/posts/33725/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/posts/33725/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/posts/33725/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/posts/33725/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/posts/33725/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/posts/33725/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/posts/33725/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/posts/33725/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/posts/33725/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/posts/33725/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/posts/33725/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/posts/33725/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/posts/33725/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/posts/33725/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/posts/33725/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/posts/33725/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/posts/34755.html","aa5448acc4790e0991aa03fb6fc002e8"],["/posts/38652.html","8ff7af3d5bc1df485d71bef8d5922d1f"],["/posts/38652/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/posts/38652/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/posts/38652/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/posts/38652/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/posts/38652/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/posts/38754.html","e92c4fa5b9f4518ef2529f7fd28ada82"],["/posts/40064.html","ba1c840bceb138f8bf217cd7f1d7818b"],["/posts/40064/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/posts/40064/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/posts/40064/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/posts/40064/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/posts/40064/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/posts/40064/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/posts/40064/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/posts/40064/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/posts/40064/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/posts/40064/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/posts/40064/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/posts/40064/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/posts/40064/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/posts/40064/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/posts/40064/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/posts/40064/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/posts/40064/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/posts/40064/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/posts/45769.html","823ee5594f284abd0aa01d2e9a9dd541"],["/posts/45902.html","7993a4985c907ca52bbf9220265f7085"],["/posts/4763.html","acbfb6dc947d0ea2a14d1b418afb0f34"],["/posts/5056.html","21a23a6e8d695e412ec67d46ded761fa"],["/posts/52325.html","cc51e779fa3d438d5e083a2c474d7349"],["/posts/54105.html","0784fbd6898b3280b1f1905b090d5aa3"],["/posts/55103.html","b1515854a717fd191ff83df0842b10d5"],["/posts/59758.html","305f42a19c11600f40e5d6eb28440d4a"],["/posts/64128.html","f426a358d2d6093d7571a8725164a499"],["/posts/7479.html","b46cd4a7fa7bfefe16afcb2b280225a3"],["/posts/9290.html","c8ce7d6876364e51e795dae7b311b906"],["/sw-register.js","570b3598314a354c556c2042a79aa24a"],["/tags/Linux-2020/index.html","c7efbf941cd3f8860006e484fd7af53f"],["/tags/Linux/index.html","ddeea7707c67ea8794baae46178f939a"],["/tags/MyBatis/index.html","7750beac9f08fc73165aee52f31bde6c"],["/tags/Vue-Django/index.html","553b29b505f8358cf4f0548f1bfac740"],["/tags/hexo/index.html","851fa386d8f1f10cd3826ad2bd9e291a"],["/tags/index.html","912558dab6fd9078ff5a9823e38619bf"],["/tags/jsp-ssm/index.html","85c1c9621c40d5e7fda470c1e06ba0c9"],["/tags/notice/index.html","3b817cd21b2117f3b3d05aaf2fc17925"],["/tags/share/index.html","dae5dfd57ade5eb89c42ae02e69f02d0"],["/tags/tools/index.html","ef4ca9f08025bdd810771c90f03a4a8d"],["/tags/vim/index.html","7e46d09adf7c1df63ed06c30964cd1cf"],["/tags/win10/index.html","98a44c2210b0205b85ffc42892b87c8d"],["/tags/响应式/index.html","8231bcfff794c39d41e66f28b05a44b7"],["/tags/感悟/index.html","d9bd177f3ccf5a370c601eaa9a902401"],["/tags/食谱/index.html","f77a5967edbf3fc4813b0cd9f071567a"]];
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
