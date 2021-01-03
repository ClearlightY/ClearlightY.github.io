/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","94d7fe298943490f717d2e7b1354d597"],["/about/index.html","6455d93f6dcc0e5956e7d2f5f3eb5e36"],["/archives/2020/03/index.html","5cd8011eea14caa7c2784f4712920bcf"],["/archives/2020/04/index.html","99bda1211574f6c32e270e60563991eb"],["/archives/2020/05/index.html","14e974052be6601b85231f9859424b83"],["/archives/2020/06/index.html","ac18190ddc4e7893d175be69e11964f2"],["/archives/2020/10/index.html","a906757d907be3acb3ba73a2cc8fb092"],["/archives/2020/11/index.html","629f77c56c9a48140c8c1394f87085c1"],["/archives/2020/index.html","7207d87a671169e12a49398bd0ad41f1"],["/archives/2021/01/index.html","614a1882f9fad11a205b06a435c0573e"],["/archives/2021/index.html","614a1882f9fad11a205b06a435c0573e"],["/archives/index.html","a729c7ee0ac30e329da40f993cfe7cc3"],["/assets/js/DPlayer.min.js","472552604f19815d0a634bd3d953171e"],["/baidu_verify_ZY7f24W6aE.html","e917c178d7caacd55bdb2408220bde82"],["/categories/BugFix/index.html","347c0f3bc48c1a4b750f93fb7d3c3b24"],["/categories/IDE/index.html","3d4afcfc949396a346d5d1e65fb449d0"],["/categories/Java框架/index.html","e3b18491b9b4a385ee1a29e50240ef50"],["/categories/Linux/index.html","67069e98872f7b00025f3747f5ca7015"],["/categories/Note/index.html","e857b4171c3d8bead62cd8ffd91dbe5e"],["/categories/index.html","c18db9ce2a06636e9fc33d3ed3a4bc4c"],["/categories/question/index.html","3904ab4756ff7e12bf291835a96c55cc"],["/categories/skill/index.html","f8d02e50431d6fe11d0ac1ba786977ff"],["/categories/soft/index.html","79f263d9094bb60cd14f0cad3c3da631"],["/categories/technology/index.html","19af4b0b1818e8d93e7a16377412d95f"],["/categories/公告/index.html","34211e088b67ac8ff9abe51e1f88e86d"],["/categories/前端/index.html","afb64181e7c7cbebe05f156b95bbe439"],["/categories/实习/index.html","0bb7c764a77c3affc8b2e03f6ef7e50e"],["/categories/美食/index.html","22e576b24411259ebc588c47a092d6ac"],["/categories/资源分享/index.html","f5d2c3f1a9e76dc3773e02fd91c230eb"],["/css/gitalk.css","5ce280d86637a41c57fdc51fd463237a"],["/css/hbe.style.css","a8bc819e01e001d3bc6ae03a2afad957"],["/css/iconfont_cloud/demo.css","31103ad158e19b978f7e730ff5ac959b"],["/css/iconfont_cloud/demo_index.html","345383f917071bb8d8ccf3cf3062ecff"],["/css/iconfont_cloud/iconfont.css","f1b3a9b07a71afeabb97da63ae8d2591"],["/css/iconfont_cloud/iconfont.eot","aec8b1a4d067a924d93edc74b78060a7"],["/css/iconfont_cloud/iconfont.js","369dcc49cf4a5493836f4060671c2a64"],["/css/iconfont_cloud/iconfont.svg","f7d1749add5e1c93c718979ab2cbfb38"],["/css/iconfont_cloud/iconfont.ttf","0e58d1340c2ba17ac6eb4c9bdf016625"],["/css/iconfont_cloud/iconfont.woff","7a80aa6b0489e3429f07d808d4beeaf7"],["/css/iconfont_cloud/iconfont.woff2","987f7ac41adbd726123df6dfb0e0686b"],["/css/iconfont_csdn/demo.css","31103ad158e19b978f7e730ff5ac959b"],["/css/iconfont_csdn/demo_index.html","798b549e82e0d00b326c69db8d8e0988"],["/css/iconfont_csdn/iconfont.css","53283e7424986f294c8707b40cf4686d"],["/css/iconfont_csdn/iconfont.eot","e8e9d18405d18fdc9fa881ee9bc2282c"],["/css/iconfont_csdn/iconfont.js","4702919e2cfc29f4586cc074839b8f91"],["/css/iconfont_csdn/iconfont.svg","7bcbc4bd45de8d2dab8a37eb8f89287e"],["/css/iconfont_csdn/iconfont.ttf","7d7909eb9f6a4129ea585a9414ff82bf"],["/css/iconfont_csdn/iconfont.woff","da2579c3cfbde2ed1cb10430ce3026bd"],["/css/iconfont_csdn/iconfont.woff2","d2008b39edbda2f6f2d8c6e5b31b100f"],["/css/main.css","5fc3eb671e449a65bf8cf5d087525db5"],["/google91a04f17fb107c17.html","458c44c1eea005ff07202830480ef815"],["/img/avatar.png","2d9aa61e592b26e2745f3c161c48c397"],["/img/avatar1.jpg","0c4117e36552b8e8c9e154b53d4a483d"],["/img/bg/about_bg.png","b43a58fbbc249d3fcc278e9b3a70ace1"],["/img/bg/archive_bg.jpg","8e59d7b6d586f3909755c01f51bee9d9"],["/img/bg/ca_bg.jpg","9c0a593288e16f0f39ae3f46d1d086cb"],["/img/bg/index_bg.jpg","ff944680ff7e7d719e238b9737131132"],["/img/bg/link_bg.jpg","d5a0508ad590b5f6c8978a70e72aea35"],["/img/bg/note.jpg","5cf9f1e5ce0c204e8ca5363ca4e71e91"],["/img/bg/tag_bg.png","ecda34f15b4bb494a66c467af217f0f0"],["/img/clearlighty.jpg","4ef72773b97196333dfa5ef985e7d432"],["/img/default.png","cbecf637ecf1059c2ff594cc419a04f9"],["/img/favicon.png","5603316bb5bc54a9d5cab14fddd4c510"],["/img/loading.gif","15657539044e11a19a1c6c7e3073d1b3"],["/img/other/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/img/other/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/img/police_beian.png","b769e8dfde5660239317ed60758dba13"],["/img/posts/article_bg.jpg","5fa08fe38895e93603ba47dbdd4be958"],["/img/qqGroup_bg.jpg","9d36341085ebea40ba32a4d6df897528"],["/index.html","3acd65bcf2dee637492d9ddae1862ab3"],["/js/boot.js","df6699be634b89c020e50370f868f37f"],["/js/color-schema.js","d19f1aa40bdbdca2ffbbea5d6525afe4"],["/js/debouncer.js","b191fcef450414f12dd272f9a75b4576"],["/js/events.js","6c5f9959062cebd85db375e32e736201"],["/js/lazyload.js","cf2320cf7a65c67911b1fae9bb4958f3"],["/js/leancloud.js","eb5eb5f71bdb5d50dbf8082e64bfd0e6"],["/js/local-search.js","53461574609e41159a714670d9b66c0b"],["/js/plugins.js","93fa930e12b7596433529edc1b5458df"],["/js/utils.js","3eb420fea7d1d765cc5152f23a1861a3"],["/lib/hbe.js","b5012c5bb408583c96a32031da7b9809"],["/lib/hint/hint.min.css","b5f3452bff6af473afc6ec1169990093"],["/links/index.html","8b750690e2a787fbd7e4589649a60c6e"],["/page/2/index.html","ad45ea7a0788c7ed10b1c5343d6fdfae"],["/page/3/index.html","57ffca032cf79e78ae714f02568abf25"],["/page/4/index.html","bd77ad6d778beca0d472e5c04cbec5b2"],["/posts/10838.html","3f0fec9bc3b33c3ad46ecf7a1cc80d4a"],["/posts/12531.html","9eb29e58638675c1c45db1eb232dc185"],["/posts/17143.html","d430ead9eadff80f60b5ea567a353147"],["/posts/17177.html","eac5eb7408863f93a75f1740c5e774ed"],["/posts/17177/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/posts/18217.html","0688a09dbdceed5e2e2497401d26ec27"],["/posts/20080.html","043e52951f03d1698287e6209c1f0825"],["/posts/21655.html","f0bd508f8be10a79d7f4ecd78fbe36d2"],["/posts/28754.html","218ee9c35e3540803566319c2a9fb752"],["/posts/31617.html","cfd4ad22b061a86a5538854b1e84e60a"],["/posts/31617/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/posts/31617/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/posts/31617/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/posts/31617/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/posts/31617/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/posts/33405.html","c5b922472310eba175ae704d6bbed263"],["/posts/33725.html","d9721cdb42bdddab5195189d3f8893a6"],["/posts/33725/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/posts/33725/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/posts/33725/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/posts/33725/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/posts/33725/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/posts/33725/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/posts/33725/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/posts/33725/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/posts/33725/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/posts/33725/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/posts/33725/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/posts/33725/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/posts/33725/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/posts/33725/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/posts/33725/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/posts/33725/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/posts/33725/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/posts/33725/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/posts/33725/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/posts/33725/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/posts/33725/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/posts/33725/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/posts/33725/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/posts/33725/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/posts/34755.html","920af1e9643c66cc9be5fde14c637149"],["/posts/38652.html","52ce6962bffeb026c3fb24b3da5412b1"],["/posts/38652/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/posts/38652/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/posts/38652/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/posts/38652/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/posts/38652/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/posts/38754.html","d6cec5d54a97c4e2402db2007da45605"],["/posts/40064.html","1c929ea04376196b6c945ed9082d04b3"],["/posts/40064/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/posts/40064/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/posts/40064/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/posts/40064/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/posts/40064/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/posts/40064/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/posts/40064/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/posts/40064/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/posts/40064/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/posts/40064/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/posts/40064/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/posts/40064/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/posts/40064/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/posts/40064/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/posts/40064/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/posts/40064/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/posts/40064/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/posts/40064/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/posts/45769.html","0440d828769b51e99a66c6194882bed7"],["/posts/45902.html","d91e87953525493dd54846d51fa1565c"],["/posts/4763.html","3d8b85d3a0a45a1166b684c4837a9918"],["/posts/5056.html","f6db1894eaae2d0a5b952364318162d2"],["/posts/52325.html","e377ebbc8493593958127d525181d606"],["/posts/54105.html","288dc77c657ed636ff263c942fa3ac30"],["/posts/55103.html","a173d682f3e5eed75c4eee53dcbd740a"],["/posts/59758.html","a6683b6a6bb92fbc83e8322685b07988"],["/posts/64128.html","23cc9b297da40ceb194f43a5d0a3ce67"],["/posts/7479.html","2f9dc3f005591fbc4f3ba61899eea69f"],["/posts/9290.html","709240cca3608079ae21ec1cf9951594"],["/sw-register.js","b82d0effb016d4169d48fc8bae0fa5cd"],["/tags/Linux-2020/index.html","1737dba39393a0ff84da32c584b18f2a"],["/tags/Linux/index.html","76fe856e41c3d90044ad33a3d935d9f3"],["/tags/MyBatis/index.html","8d695ce1040987f5a03dbf9335d5bdcd"],["/tags/Vue-Django/index.html","65f21a880281bb71a91f25e4fd050c6e"],["/tags/hexo/index.html","6b44f72708b154ad4c20d19b2746b106"],["/tags/index.html","0eb3ee9e1c89379ec0523bb8fd186b58"],["/tags/jsp-ssm/index.html","a625d58f9d09e76e9f0292dd7771a232"],["/tags/notice/index.html","eb3f59ad52ddf9ba12d80936e00a56f5"],["/tags/share/index.html","37ed7c09407480cd787dff618c3de283"],["/tags/tools/index.html","c03ca7daabd8c9a81bbb1b1b7709fe99"],["/tags/vim/index.html","b72f4bfe2785f93bf577fbb3d753ed71"],["/tags/win10/index.html","ab298f825067065e06011dc5546ce9d2"],["/tags/响应式/index.html","ce76716f61a3e8de730cfcfdee9f28e4"],["/tags/感悟/index.html","92dabc3b08b4839ee2008477dd0e4b1a"],["/tags/食谱/index.html","0f47f587ee5fc98f00cb67c9cba24a11"]];
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
