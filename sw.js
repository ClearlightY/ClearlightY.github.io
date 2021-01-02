/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","459e256680e3f928d8345827bccdff3a"],["/about/index.html","26d33c96297df76f0481d7641ae7ae7a"],["/archives/2020/03/index.html","1093b5b9f88cd151237d1718d089b1b3"],["/archives/2020/04/index.html","9393bbdff0e29b9d3779ac56a7638baa"],["/archives/2020/05/index.html","23cd97451e8fcd8a1d18d92a3a08bf31"],["/archives/2020/06/index.html","63718aea3023bc820d59b5f5fc847c1b"],["/archives/2020/10/index.html","81ed92eb69ed4645281bf3a138b8f142"],["/archives/2020/11/index.html","ac2778dfc12ae70db95ff43bf8b556a8"],["/archives/2020/index.html","f1fd72e2c03883ca6f1bd972a2f06fc8"],["/archives/2021/01/index.html","34d5a6d57bd73fa861a0c16126897caa"],["/archives/2021/index.html","34d5a6d57bd73fa861a0c16126897caa"],["/archives/index.html","c42bff8fa73d88944d699d8c7b793300"],["/baidu_verify_ZY7f24W6aE.html","d0212c957b7b0aff2bbe6b599ed6568e"],["/categories/BugFix/index.html","fb1d487e7797cbc74578c08ec0257a98"],["/categories/IDE/index.html","2b85a355de51b1ece853a58be563e5ff"],["/categories/Java框架/index.html","c82460a7e5ce49d192d673670d02aa37"],["/categories/Linux/index.html","8960c62532679eecc9a6b269136d824e"],["/categories/Note/index.html","3fb04b3ce2aa94b4364a4a8e7fcfb768"],["/categories/index.html","8e2f2c6024c91e636536d184884a9514"],["/categories/question/index.html","99308da26112c6c569b784e1dfa6301d"],["/categories/skill/index.html","442cac67d6375fa73c74292600745061"],["/categories/soft/index.html","32e7f7b1af2095f76f23d7fdeca98040"],["/categories/technology/index.html","47ffebd3e0e7b723087719dea6d535b9"],["/categories/公告/index.html","47426635433ac7cc05e8ebea6dbd6f8e"],["/categories/前端/index.html","588bb59a31d2d012c1d7c99df7bb6eee"],["/categories/实习/index.html","c09d9b86dba1d9624a98b34e9559d52b"],["/categories/美食/index.html","3738be2eff562c4a253eba13ab5f8906"],["/categories/资源分享/index.html","78fb776d47a217cb070242f6b948eff9"],["/css/gitalk.css","35484e8eb0eefa8032bd5213ddd6e1fc"],["/css/main.css","54a5cb05f0f44249cc8fbc8f4cbcb4c8"],["/google91a04f17fb107c17.html","e20c574e8dd627bf59a5750bf796aeec"],["/img/avatar.png","2d9aa61e592b26e2745f3c161c48c397"],["/img/bg/about_bg.png","b43a58fbbc249d3fcc278e9b3a70ace1"],["/img/bg/archive_bg.jpg","8e59d7b6d586f3909755c01f51bee9d9"],["/img/bg/ca_bg.jpg","9c0a593288e16f0f39ae3f46d1d086cb"],["/img/bg/index_bg.jpg","ff944680ff7e7d719e238b9737131132"],["/img/bg/tag_bg.png","ecda34f15b4bb494a66c467af217f0f0"],["/img/default.png","cbecf637ecf1059c2ff594cc419a04f9"],["/img/favicon.png","5603316bb5bc54a9d5cab14fddd4c510"],["/img/loading.gif","15657539044e11a19a1c6c7e3073d1b3"],["/img/police_beian.png","b769e8dfde5660239317ed60758dba13"],["/index.html","02814ef5cc19143dd86a742630ddd2af"],["/js/boot.js","197f588b5d5ab7428af0b8f01c860b21"],["/js/color-schema.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/debouncer.js","8029924fd9290705021e2dc20b7c08b6"],["/js/events.js","989bda2bab743d981dbd1ae02c5dd2f9"],["/js/lazyload.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/leancloud.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/local-search.js","0f0151e3bd3c8fc0aa7f65af364c467e"],["/js/plugins.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/utils.js","e70b8238ab80e75f688a26188cf293cb"],["/lib/hint/hint.min.css","b5f3452bff6af473afc6ec1169990093"],["/links/index.html","c548af2a233b12a9bdfcc8f3fcda3c00"],["/page/2/index.html","0a6c5798ce79941ceb91fd11ac2f9924"],["/page/3/index.html","ce58f24660c7a8dd1f3dc565fb9f984b"],["/page/4/index.html","be26a023d3fde511e297f2bf6098e815"],["/posts/10838.html","84c95ff95673a2f2c7d292dd08c33058"],["/posts/17143.html","cd2e7abded45d5e5717d6d2ec27f4d2d"],["/posts/17177.html","d3f730c988220eecf24dd37b9e960534"],["/posts/17177/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/posts/18217.html","d79409ab44716033cea453ba4c1b7d7e"],["/posts/20080.html","9020d82f631b70a05ea2a62c02972771"],["/posts/21655.html","470a27317b84a67ecc15a4c2ef33d8a7"],["/posts/27699.html","de7922ad6641a5975cf00495e8d4372c"],["/posts/28754.html","249370decc57d11ab6bdcab8626456bb"],["/posts/31617.html","7190abd5dadaf7b42070473139b1d052"],["/posts/31617/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/posts/31617/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/posts/31617/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/posts/31617/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/posts/31617/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/posts/33405.html","5d767b7b88deb0bb0877c3c4538e8af6"],["/posts/33725.html","d3a0c13ec15f4ca0a68066b53e7a9c95"],["/posts/33725/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/posts/33725/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/posts/33725/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/posts/33725/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/posts/33725/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/posts/33725/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/posts/33725/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/posts/33725/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/posts/33725/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/posts/33725/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/posts/33725/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/posts/33725/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/posts/33725/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/posts/33725/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/posts/33725/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/posts/33725/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/posts/33725/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/posts/33725/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/posts/33725/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/posts/33725/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/posts/33725/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/posts/33725/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/posts/33725/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/posts/33725/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/posts/34755.html","a1258472ab52e3d664e9d5eadd6551bc"],["/posts/38652.html","fb46c21aaf4bd050a848c66e7eb12a71"],["/posts/38652/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/posts/38652/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/posts/38652/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/posts/38652/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/posts/38652/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/posts/38754.html","64e11b157b71c78d8e4edcb94e5569a1"],["/posts/40064.html","e4ae1f1e1e802375e65da99c5e5ca040"],["/posts/40064/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/posts/40064/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/posts/40064/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/posts/40064/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/posts/40064/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/posts/40064/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/posts/40064/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/posts/40064/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/posts/40064/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/posts/40064/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/posts/40064/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/posts/40064/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/posts/40064/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/posts/40064/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/posts/40064/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/posts/40064/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/posts/40064/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/posts/40064/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/posts/45769.html","afbf4b63d816b5bbe73748ce5ff2ca6f"],["/posts/45902.html","bda9a782e64eb6768afd38aa31b7cc04"],["/posts/4763.html","499dfddc385dafd576549fa296e7b262"],["/posts/5056.html","20c278fc4fac08b3cce0bab8d7c8c353"],["/posts/52325.html","e7f4d92e6a61cd8e6f4b5dd35b43ef88"],["/posts/54105.html","102bc3b300ce5144dfb5c4afdb0285f6"],["/posts/55103.html","26f1faeaa9dfd0bdf8fbbe22e46437f1"],["/posts/59758.html","9098e6393b21be82c1f03efc577d8985"],["/posts/64128.html","b3d8733e55c73bdb6cb0787e29807a95"],["/posts/7479.html","3eb7bff62fd09484930159f2d406a226"],["/posts/9290.html","c4cc86c9b72e169590747dee45f0b440"],["/sw-register.js","e9e7a41d84bb438e69f40bb3112c8326"],["/tags/Linux-2020/index.html","e61508cb2c508726dce5d1d6779bca40"],["/tags/Linux/index.html","9d61888d9885a2e112dfd2a4721be3ff"],["/tags/MyBatis/index.html","43a0d77d1112ebe21ab1e552ba6bac24"],["/tags/Vue-Django/index.html","ff38d034a56fc81afd39dfded918c828"],["/tags/hexo/index.html","ba2250684c5367d1ae04e4b53e1ff9f0"],["/tags/index.html","c3b02adee17e935a1c2e2f595f062d09"],["/tags/jsp-ssm/index.html","6b51c91676a7bfa90b046c91d4ada5b3"],["/tags/notice/index.html","662c425c4c80ee719d93de601ba6c5d6"],["/tags/share/index.html","a332ea9c6384f6e445c1fbd3d13978bf"],["/tags/tools/index.html","2d35fe28be62851f5d538c59866571c6"],["/tags/vim/index.html","81c770d99979a9ffae405a804f60bab4"],["/tags/win10/index.html","038c65bacc75e9450677239df34bd94e"],["/tags/响应式/index.html","d68745ed7f702312fc3a041627baa8f0"],["/tags/感悟/index.html","faedd67f66a83b005656271d78cf8930"],["/tags/食谱/index.html","4fa26d3ffb3772cb77412654b803e321"]];
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
