/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2020/03/04/Ubuntu18-04-IDEA2019-2-1的安装/index.html","3ff19e778b813701224929b51be96bb7"],["/2020/03/04/VPN-on-linux/index.html","004b28ce448a80ef917326bc03e362e7"],["/2020/03/05/侧栏中的posts打开的链接错误-archives-7C-7C-20archive-Hexo建站/index.html","504adc0d6a09ac74ef23967fd6e1e6fa"],["/2020/03/05/网址分享-实用网站合集/index.html","173e1133b42f983b2035393a45ae1fb2"],["/2020/03/07/工具分享/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/2020/03/07/工具分享/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/2020/03/07/工具分享/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/2020/03/07/工具分享/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/2020/03/07/工具分享/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/2020/03/07/工具分享/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/2020/03/07/工具分享/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/2020/03/07/工具分享/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/2020/03/07/工具分享/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/2020/03/07/工具分享/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/2020/03/07/工具分享/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/2020/03/07/工具分享/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/2020/03/07/工具分享/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/2020/03/07/工具分享/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/2020/03/07/工具分享/index.html","06171d8fd553162700ee052f4d0a4a6c"],["/2020/03/10/MyBatis入门-一/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/2020/03/10/MyBatis入门-一/index.html","2c3727f54031f607b2f94f18d1569ba6"],["/2020/03/12/MyBatis入门-二/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/2020/03/12/MyBatis入门-二/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/2020/03/12/MyBatis入门-二/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/2020/03/12/MyBatis入门-二/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/2020/03/12/MyBatis入门-二/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/2020/03/12/MyBatis入门-二/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/2020/03/12/MyBatis入门-二/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/2020/03/12/MyBatis入门-二/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/2020/03/12/MyBatis入门-二/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/2020/03/12/MyBatis入门-二/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/2020/03/12/MyBatis入门-二/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/2020/03/12/MyBatis入门-二/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/2020/03/12/MyBatis入门-二/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/2020/03/12/MyBatis入门-二/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/2020/03/12/MyBatis入门-二/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/2020/03/12/MyBatis入门-二/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/2020/03/12/MyBatis入门-二/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/2020/03/12/MyBatis入门-二/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/2020/03/12/MyBatis入门-二/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/2020/03/12/MyBatis入门-二/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/2020/03/12/MyBatis入门-二/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/2020/03/12/MyBatis入门-二/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/2020/03/12/MyBatis入门-二/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/2020/03/12/MyBatis入门-二/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/2020/03/12/MyBatis入门-二/index.html","82e40cd82c5c7c62628cc56194e72b57"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/2020/03/14/win10字体显示Mac效果-Chrome字体效果增强/index.html","441f1886577f3d52202e275e895e04c5"],["/2020/03/25/实习日常问题记录-2020/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/2020/03/25/实习日常问题记录-2020/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/2020/03/25/实习日常问题记录-2020/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/2020/03/25/实习日常问题记录-2020/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/2020/03/25/实习日常问题记录-2020/index.html","e9c1752a53254579c22f9ff9f202fefa"],["/2020/03/27/响应式中-media的注意事项/index.html","2cba28c4d583fa85e6ae1632daa46d8c"],["/2020/04/16/project-problem-record/index.html","c579d862f6bfb80634273998f6434a92"],["/2020/04/22/Redis的安装-Linux/index.html","e81647cecc932a9991fcd4cf654d8525"],["/2020/04/27/高效使用Google搜索-Tools/index.html","9d861ab92491de3c42852d362b35aeab"],["/2020/04/28/将SVG图像插入到Word以及Visio-2013下载“/index.html","bd7db830521947821c7cbbc3fd5fd1ba"],["/2020/05/18/音乐下载公告/index.html","bcd80ec3244fc4b1a04510b8985867ca"],["/2020/05/21/vimdiff的使用教程/index.html","f453867379270837d8590f1005120a97"],["/2020/06/04/vim常用操作/index.html","7e416fc8c5426800f9895b182aee144d"],["/2020/06/09/腾讯电脑管家开启桌面整理的壁纸保存在PC的哪个文件夹中/index.html","a742247d6ad948ed964408714831a5c8"],["/2020/06/09/获取PC已连接过wifi密码的方法/index.html","1f6bc4c574a49ad420c4849f34cce7cb"],["/2020/06/12/文件上传并校验文件-Vue-Django开发/index.html","b3e578c54fcc4614c668e1b29d0db248"],["/2020/10/21/假如我的明天是这样/index.html","2f2190b8c5c9af7a20e75bf8601d3115"],["/2020/10/31/美食食谱/index.html","d89122ea66c88bff2a08902cae795e70"],["/2020/11/01/PLSQL的安装和配置-11-1-Oracle/index.html","22dd7e449f5b3a7cded9130549b5f192"],["/2020/11/12/JetBrains-全系列产品-包括-IDEA激活到2089年/index.html","637f918eb9e874f471fbc530207ad656"],["/2021/01/01/IDEA-PyCharm-GoLang等JetBrains-2020-3-x激活到2099/index.html","bb5d81741ab22cd1f5bf2544515be683"],["/2021/01/02/test/index.html","b0ac48be744feef85f53e441856ce484"],["/404.html","080d1b59b25e43db563a4f6c00cbd340"],["/about/index.html","0bb40c2a3e8182d96925b636ff16657b"],["/archives/2020/03/index.html","2e14be03c160af0ade237141429947a2"],["/archives/2020/04/index.html","8ffe62a86a77415b4c1d3bed259da948"],["/archives/2020/05/index.html","61c61b13a75be67900809e3642776fb6"],["/archives/2020/06/index.html","330d04cbbdecae0ffa26a9e6b3745101"],["/archives/2020/10/index.html","de2ea1b257b67049caefb1b50960fe7a"],["/archives/2020/11/index.html","50be328b37b6421576d704bd3fb6d3d4"],["/archives/2020/index.html","624f0c910d61341a970780e8bccf7984"],["/archives/2021/01/index.html","055eeb4bec64f391e1dffefb6c822dee"],["/archives/2021/index.html","055eeb4bec64f391e1dffefb6c822dee"],["/archives/index.html","c06fb7726dcfd2483df6fb596ffc4507"],["/baidu_verify_ZY7f24W6aE.html","47ef7ffd8252f84bd180ca96198b289e"],["/categories/BugFix/index.html","6112a697db40959e4c19860d9d32bc1e"],["/categories/IDE/index.html","b04527d82c7a518bf843900c79917250"],["/categories/Java框架/index.html","72406e0c123d328b273ce57f11b0b1cb"],["/categories/Linux/index.html","5b2c3e5fd256da7a9cf856ed1ff2f698"],["/categories/Note/index.html","456882f57728123b6b318ea91eadc229"],["/categories/index.html","f2b3e5fd568b73ce0bae07a93c15faf2"],["/categories/question/index.html","317a397320f2807472f241716988e09d"],["/categories/skill/index.html","dffdb4f28d7fd31c650ace5ef5ec9020"],["/categories/soft/index.html","22fbbb98bd99b8782c11e508bc2a2c09"],["/categories/technology/index.html","d55e0c842af3f69592f4f50f8738b26f"],["/categories/公告/index.html","2e7991c2f9b392d43d71c497a5e2eecb"],["/categories/前端/index.html","4211331473a8ebfa405caa3c476a951b"],["/categories/实习/index.html","576cd5ea069a2905c2c605894dca8b97"],["/categories/美食/index.html","aaf6f9595b4c04031a294a95b4880900"],["/categories/资源分享/index.html","494b9e1f15ea0e935da9239308c3997e"],["/css/gitalk.css","66a24678711b73aeeb957f18b5d1605d"],["/css/main.css","e563c97ae87854c848f737514ee8a70b"],["/google91a04f17fb107c17.html","1b657066cb7067d1aad2d1b9d790c154"],["/img/avatar.png","2d9aa61e592b26e2745f3c161c48c397"],["/img/bg/about_bg.png","b43a58fbbc249d3fcc278e9b3a70ace1"],["/img/bg/index_bg.jpg","5cf9f1e5ce0c204e8ca5363ca4e71e91"],["/img/default.png","cbecf637ecf1059c2ff594cc419a04f9"],["/img/favicon.png","5603316bb5bc54a9d5cab14fddd4c510"],["/img/loading.gif","15657539044e11a19a1c6c7e3073d1b3"],["/img/police_beian.png","b769e8dfde5660239317ed60758dba13"],["/index.html","bbd224c13733bc2cff6016df6f86c7a5"],["/js/boot.js","5da9497656f20a001223cce4d5fd1d4f"],["/js/color-schema.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/debouncer.js","7b7e577abe6d5f3add8355b7e4a17f27"],["/js/events.js","cf3771a4be758d6106f0786397c04605"],["/js/lazyload.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/leancloud.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/local-search.js","f2aeb7853af4a9b54b7b419774935a97"],["/js/plugins.js","d41d8cd98f00b204e9800998ecf8427e"],["/js/utils.js","bebfc2c72d96b514cb89ef7cbf1d26a9"],["/lib/hint/hint.min.css","b5f3452bff6af473afc6ec1169990093"],["/links/index.html","6848f4da7174b26e22017fbc95f50d2e"],["/page/2/index.html","8d441e6cbb7d61c149b0351143fdab81"],["/page/3/index.html","4130175065ede3413a8d1fce746596d8"],["/page/4/index.html","804c40b70437cdaf6ee6e0689c5b3719"],["/sw-register.js","1093e69c8830e24e8456faae3c80bb07"],["/tags/Hexo/index.html","e745a1441eba8874512e71f85b3ef5ad"],["/tags/Linux-2020/index.html","540fa122fe187199de99a963fb4b7cd3"],["/tags/Linux/index.html","f39b757fda49ac08baf86b84c861ad06"],["/tags/MyBatis/index.html","0b1c25122bfa7cd1ce270a128c6a4471"],["/tags/Vue-Django/index.html","ae29ba503bf5971c30703ae55bd7b91f"],["/tags/index.html","f668d3e9e13350e1ae0b411c5b5d1d89"],["/tags/jsp-ssm/index.html","7fd819cad3f7e58171dca5db9283fe5f"],["/tags/notice/index.html","1aeaca745f4575670d2cfa563572ac3a"],["/tags/share/index.html","85dc699d12ed2190f374dcd20acd1fd5"],["/tags/tools/index.html","1d3ff329cb8c4349f29b65179b4cc2b2"],["/tags/vim/index.html","64cd93725c4de07f51e963697f4fa064"],["/tags/win10/index.html","ad14b84ca007bb932d379d5bf39d2698"],["/tags/响应式/index.html","01428f3827bf23536eac1c281bf1dab3"],["/tags/感悟/index.html","37223344cf7884f9f33ba3db94acbea4"],["/tags/食谱/index.html","c58d19992f7d3f2cda17976971449236"]];
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
