/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/404.html","78e2a542302874c1dc4161dfdd6b4a0b"],["/about/index.html","ea632f474f94924e4acea85e54dedbc7"],["/archives/2020/03/index.html","3543b41a14434d2d54760148d436037c"],["/archives/2020/04/index.html","2225b5f23a96896f1f0cc5cf7dee1556"],["/archives/2020/05/index.html","0ac30cae2001b4db3ba5bea1099b405c"],["/archives/2020/06/index.html","8f6e1683f8a2c83ee63110113c30ceeb"],["/archives/2020/10/index.html","f14d89eb9f1243823325bd2515c84701"],["/archives/2020/11/index.html","24f649f4c79a89f585cb54a49bd6b637"],["/archives/2020/index.html","093d66a91d80239893565924a5817f57"],["/archives/2021/01/index.html","7fc7f90a6826df9da8fda52a72e66ac3"],["/archives/2021/03/index.html","a439b53d9d8b56c57425d6f0066e0ab0"],["/archives/2021/06/index.html","a804bd38a5a16b9687e60edc0dd88248"],["/archives/2021/index.html","99354e74ed4baeb4a8434c0c806a8dac"],["/archives/index.html","1c1dc3d792b367adaabf0348ae1cfa5e"],["/assets/js/DPlayer.min.js","472552604f19815d0a634bd3d953171e"],["/baidu_verify_ZY7f24W6aE.html","e917c178d7caacd55bdb2408220bde82"],["/categories/BugFix/index.html","8d51c67bbdd5aca6c3683ef6dde79a5e"],["/categories/Dev-tools/index.html","e41b28e09d784d74e5d9e17cf31b59b1"],["/categories/Hexo/index.html","527f70d0dc78455235d886beac9a7663"],["/categories/Java/index.html","fc769a8fffe15298eaa8a8d3279251b3"],["/categories/Note/index.html","500c914268852ca7a5596a7ffc267027"],["/categories/Skill/index.html","718726b5b98b8a1015543343f5094592"],["/categories/Work/index.html","25c73c3c60bca411911fb58ebd69278a"],["/categories/index.html","39c072e5f920fabc9c71bb9b17b6776b"],["/categories/书籍/index.html","bcaacd4cd2b9b2439dc175d2b312cf47"],["/categories/公告/index.html","1f1322a54a829645c651d613f8513512"],["/categories/前端/index.html","0a832762bcabc44e9e331df2ff9cf955"],["/categories/实习/index.html","b775150e00bd9203b32f3b3d9db51f3c"],["/categories/美食/index.html","954d03bbd51f5d2187be41e89f47902d"],["/categories/资源分享/index.html","85521c7492e73c4a2b65ef083d7382ea"],["/css/gitalk.css","5ce280d86637a41c57fdc51fd463237a"],["/css/hbe.style.css","a8bc819e01e001d3bc6ae03a2afad957"],["/css/iconfont_cloud/demo.css","31103ad158e19b978f7e730ff5ac959b"],["/css/iconfont_cloud/demo_index.html","e4aca8a824a601a311e6147f4fefefe0"],["/css/iconfont_cloud/iconfont.css","f1b3a9b07a71afeabb97da63ae8d2591"],["/css/iconfont_cloud/iconfont.eot","aec8b1a4d067a924d93edc74b78060a7"],["/css/iconfont_cloud/iconfont.js","369dcc49cf4a5493836f4060671c2a64"],["/css/iconfont_cloud/iconfont.svg","f7d1749add5e1c93c718979ab2cbfb38"],["/css/iconfont_cloud/iconfont.ttf","0e58d1340c2ba17ac6eb4c9bdf016625"],["/css/iconfont_cloud/iconfont.woff","7a80aa6b0489e3429f07d808d4beeaf7"],["/css/iconfont_cloud/iconfont.woff2","987f7ac41adbd726123df6dfb0e0686b"],["/css/iconfont_csdn/demo.css","31103ad158e19b978f7e730ff5ac959b"],["/css/iconfont_csdn/demo_index.html","ff111efbe8c90645d82a5aefcd25899a"],["/css/iconfont_csdn/iconfont.css","53283e7424986f294c8707b40cf4686d"],["/css/iconfont_csdn/iconfont.eot","e8e9d18405d18fdc9fa881ee9bc2282c"],["/css/iconfont_csdn/iconfont.js","4702919e2cfc29f4586cc074839b8f91"],["/css/iconfont_csdn/iconfont.svg","7bcbc4bd45de8d2dab8a37eb8f89287e"],["/css/iconfont_csdn/iconfont.ttf","7d7909eb9f6a4129ea585a9414ff82bf"],["/css/iconfont_csdn/iconfont.woff","da2579c3cfbde2ed1cb10430ce3026bd"],["/css/iconfont_csdn/iconfont.woff2","d2008b39edbda2f6f2d8c6e5b31b100f"],["/css/main.css","19a3dc57ced002a0f6955d44ae48a457"],["/google91a04f17fb107c17.html","29b3095eb7a17d3cddf48d1f9ef90b88"],["/img/avatar.png","2d9aa61e592b26e2745f3c161c48c397"],["/img/avatar1.jpg","0c4117e36552b8e8c9e154b53d4a483d"],["/img/bg/about_bg.png","b43a58fbbc249d3fcc278e9b3a70ace1"],["/img/bg/archive_bg.jpg","8e59d7b6d586f3909755c01f51bee9d9"],["/img/bg/ca_bg.jpg","9c0a593288e16f0f39ae3f46d1d086cb"],["/img/bg/index_bg.jpg","ff944680ff7e7d719e238b9737131132"],["/img/bg/link_bg.jpg","d5a0508ad590b5f6c8978a70e72aea35"],["/img/bg/note.jpg","5cf9f1e5ce0c204e8ca5363ca4e71e91"],["/img/bg/tag_bg.png","ecda34f15b4bb494a66c467af217f0f0"],["/img/clearlighty.jpg","4ef72773b97196333dfa5ef985e7d432"],["/img/default.png","cbecf637ecf1059c2ff594cc419a04f9"],["/img/favicon.png","5603316bb5bc54a9d5cab14fddd4c510"],["/img/loading.gif","15657539044e11a19a1c6c7e3073d1b3"],["/img/other/alipay.png","05c68d43551291ec41da8ef428672ba8"],["/img/other/wechatpay.png","7d6b9f135a3b12ce3962d11e4680553f"],["/img/police_beian.png","b769e8dfde5660239317ed60758dba13"],["/img/posts/article_bg.jpg","5fa08fe38895e93603ba47dbdd4be958"],["/img/qqGroup_bg.jpg","9d36341085ebea40ba32a4d6df897528"],["/index.html","8505e5c7d856e2193fe3a7f60c481ae1"],["/js/boot.js","df6699be634b89c020e50370f868f37f"],["/js/color-schema.js","d19f1aa40bdbdca2ffbbea5d6525afe4"],["/js/debouncer.js","b191fcef450414f12dd272f9a75b4576"],["/js/events.js","6c5f9959062cebd85db375e32e736201"],["/js/lazyload.js","cf2320cf7a65c67911b1fae9bb4958f3"],["/js/leancloud.js","eb5eb5f71bdb5d50dbf8082e64bfd0e6"],["/js/local-search.js","53461574609e41159a714670d9b66c0b"],["/js/plugins.js","93fa930e12b7596433529edc1b5458df"],["/js/utils.js","3eb420fea7d1d765cc5152f23a1861a3"],["/lib/hbe.js","b5012c5bb408583c96a32031da7b9809"],["/lib/hint/hint.min.css","b5f3452bff6af473afc6ec1169990093"],["/links/index.html","09c3afeb0d208723aab6baf7fd740aa1"],["/page/2/index.html","78464952bf704d642ada3bba64385f2b"],["/page/3/index.html","2aa6c9072737f5d98f64e521e81ddbdb"],["/page/4/index.html","b4e223ceb9dbf21efc18a2633732cc95"],["/posts/10838.html","372c3a3915d60121e8431a39b35bed7c"],["/posts/12531.html","6e9a336c8fbb4b47777f5cca67278afd"],["/posts/17143.html","321c80be695bc6b892720e7c6b1b8e3d"],["/posts/17177.html","add53580db3cac46f59cedf56ec2b52f"],["/posts/17177/1583847823526.png","a5c8af8abac00bf21fb870e3b6864228"],["/posts/18217.html","ca562b4b74b3e3091816b4b4ad2b8044"],["/posts/20080.html","21e46ab14ff9a173d7dc7d8f7c6d8620"],["/posts/21655.html","f8bdd6151c1acfe6c3ab29d7b67d3869"],["/posts/28754.html","46f7aa8be03a360ea1d22a2646a2bfe6"],["/posts/31617.html","386e693ffaca0769aa397c77541482cb"],["/posts/31617/1584192982223.png","3d5f09a60e03827021ab219efc7a749c"],["/posts/31617/1584193238839.png","d65b3fe777d7bbaa1e0831234455da11"],["/posts/31617/1584193393311.png","700e001c2d6ecd2b53d0a2ee428fdf9f"],["/posts/31617/1584193655469.png","5dd9032acf84a42c2b8b5bff3161be73"],["/posts/31617/1584193693173.png","717a4c460bc54c7721593ab9c76f067b"],["/posts/33405.html","b9844f597a3072a692f2fb60f6ef0f1a"],["/posts/33725.html","530815118bb7382a3406c611603172b8"],["/posts/33725/1571043441224.png","b6603912a67ce66d3790961fd951ef6f"],["/posts/33725/1571043760801.png","26a69989a09e9f1d837f7ec65224a0a9"],["/posts/33725/1571043830811.png","d587b2d1633f806add634a3548fac5d1"],["/posts/33725/1571044142787.png","c1d5ff17dca3970b9e24e48f4afbcd6a"],["/posts/33725/1571044205710.png","f9764d14609f4a6951c55d008f145afd"],["/posts/33725/1571044564929.png","8a686c28c149b26d3f9539e20c1d4c31"],["/posts/33725/1571044635199.png","99ae47c030a9156ebfecf6d8645d7185"],["/posts/33725/1571044779971.png","ebb1ecbbbcfb60e72d944fab39302ea3"],["/posts/33725/1571044965358.png","1593ea455139f42095a9a96ff3fb581e"],["/posts/33725/1571046361233.png","e60a8c131e44877f3c5c7772c63df2d4"],["/posts/33725/1571046416787.png","8a09054c4e03f7796500373224d3f019"],["/posts/33725/1571046645444.png","a1dbfdb5621a565a19ad1d26cbcf432b"],["/posts/33725/1571046656518.png","9b5fa721856b438a7f00c021486f5a4b"],["/posts/33725/1571046737598.png","95f46ed7b935217ab52b322ce1a492dd"],["/posts/33725/1571046852101.png","e51eaf80175f47082d796c0520d09c08"],["/posts/33725/1571046911114.png","ca620755ded9cc765e4214c90dbb49c4"],["/posts/33725/1571047010724.png","484a9383f510375c539c8e0bfc945e71"],["/posts/33725/1571047205911.png","1d972d44d1084e2237364450179e2f8a"],["/posts/33725/1571047298046.png","6811e5a24c8057606f13999472ae0bc6"],["/posts/33725/1571047409500.png","c2b297dab6058005ad24419bd96941d3"],["/posts/33725/1571047456882.png","772b2375b9bbbee57d313ffb52023f1c"],["/posts/33725/1571047713267.png","b8dc64d150b6144923eb37f5b650d2ae"],["/posts/33725/1571047726523.png","76542bb5ae10e723bbad8f63c056ac6f"],["/posts/33725/MyBatis_all.png","fc510f75904686671746389a1c7a2fea"],["/posts/34755.html","10061bf68d89e05ff232d5cff7b376e3"],["/posts/38652.html","d7327174287a54962295180ce4a47549"],["/posts/38652/GwaGOH.png","ee6b36bb68ab4ac958e020c5f49fab5f"],["/posts/38652/GwaKFx-1585984619575.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/posts/38652/GwaKFx.png","1b426dee2b8ebbc82775a48e50ca1edd"],["/posts/38652/GwaNTI.png","b63f768cbe7572bf639db47225c04faf"],["/posts/38652/GwafhV.png","13bacaeaab3f57e9e5cf6509cff7ea46"],["/posts/38754.html","94ce4bf5f92ff29fd133711b1b14bafd"],["/posts/3b3ba7ea.html","58af1ad4793db1428fd3b2fe100bcd6a"],["/posts/40064.html","35496a618ff6ffdbfa55dec60be97b93"],["/posts/40064/1583587621923.png","bb6b722a31b641ccd03b45da4fb2f36b"],["/posts/40064/1583587792885.png","4b4a8eb33062447df42d15c96ca17ad7"],["/posts/40064/1583587947046.png","2dff03313b7bbe2c2978f94f32158158"],["/posts/40064/1583588017684.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588026457.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588028954.png","1ce37a4a180e9f1bf15e314b3a1302b8"],["/posts/40064/1583588184810.png","ac17a3320de079c3304df2aac606fa01"],["/posts/40064/1583588245643.png","70fdb3fd4b55f48e09cd4a8098495653"],["/posts/40064/1583672380750.png","b50657617cbb79029a5eaeb4638ef105"],["/posts/40064/1584101465442.png","54307244f4ad7c9527f3233b567ab2fd"],["/posts/40064/1584101475797.png","af466d9277d27c8e5d33b965cec2c8d7"],["/posts/40064/1584109127958.png","f503237cf6276c6430323f2494ed80ec"],["/posts/40064/1584192557744.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/posts/40064/1584192657761.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/1584192660241.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/1584192739397.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/posts/40064/2020-03-22_233711-1584891826669.png","6e670cd92b2723f868878186e606f874"],["/posts/40064/2020-03-22_233711.png","6e670cd92b2723f868878186e606f874"],["/posts/40064/8oM0Rf.png","af466d9277d27c8e5d33b965cec2c8d7"],["/posts/40064/8oM2on.png","3bd8e5a47dc1635ba634fc38a7850ab0"],["/posts/40064/8oMWiq.png","5efbec3cf5b3c774e53cd5494cee26f5"],["/posts/40064/8oMcZj.png","f503237cf6276c6430323f2494ed80ec"],["/posts/40064/8oMgds.png","4e60c3f881f38e2f02b4bc8d77e9d981"],["/posts/40064/8oMwJP.png","6e670cd92b2723f868878186e606f874"],["/posts/407cdecb.html","1c36d18d86edacfde5d0353cca9c8fb0"],["/posts/45769.html","d12b75d5b041d4edaa83d0aae6590974"],["/posts/45902.html","5c3da8ff4f60877fab2e9e8f5d6c216f"],["/posts/4763.html","8e0780cf2082b4079d757c92ccae6d2a"],["/posts/5056.html","84cd01993bb4c71c3d8e864e006f6b07"],["/posts/52325.html","730302e5c55533d0e4ccae428a6dd19c"],["/posts/54105.html","6aa58049bc90c0cf1ed1f6c0ded70d1a"],["/posts/55103.html","f72a75a2064e80ab498effbd8c20e863"],["/posts/59758.html","0c1f212c833267b59c8ca6212a2ca9b7"],["/posts/64128.html","492b2ef0e260355164917326cbb91b81"],["/posts/7479.html","41e3a6ccdc005baae89cc89022f6c4ef"],["/posts/9290.html","96ef0a9cfc2e2cb2a1f070caa38c8389"],["/posts/e4d5f452.html","b2d4664743c29c8a54b92aeb7a463997"],["/posts/f058495d.html","256c05872f7b578cf396f79c2f2afa45"],["/posts/fluid_details.html","422787ad4acf926eb51171fbc284bcf4"],["/sw-register.js","f2cbfd6beb54c24ad2630ef67c34c6db"],["/tags/Bootstrap/index.html","49491de797a90d0799abaa091c6fdd6d"],["/tags/Daily-notes/index.html","80f67de9f5332b015b9cecddc1baa982"],["/tags/Django/index.html","3aa121c0f48fd3e0469e6c5fd133b9de"],["/tags/Fluid/index.html","ecff83f3559aa3b933277945b2916f9b"],["/tags/Hexo/index.html","7aa23bb7639d664b746c130c83029992"],["/tags/IDEA2020-3激活/index.html","c6d7f7e943af528e160edbca6eb3e13c"],["/tags/JSP/index.html","3bb80462a1b9cde8ae3a99c7263cac84"],["/tags/JetBrains产品激活/index.html","36eaf1cbe086c48befb4360d9f0b7a6c"],["/tags/Linux-IDEA-2019-2/index.html","5ccde1df585cfe923b5ea728b731d6c3"],["/tags/Linux-Redis/index.html","746c22ddd6e7ccc53f50071394e6432c"],["/tags/Mac-Go/index.html","d9a8617a1ec72e56270d3feab5a3c862"],["/tags/MyBatis/index.html","eec53abbba5f8497e38a4b1533c559b1"],["/tags/Navicat/index.html","f242bcb17b265ac1ee5a3c21c6c63ff7"],["/tags/Notice/index.html","1abdf3ac704560ecee6c9b5804ec6e19"],["/tags/PLSQL-developer/index.html","df6ce1332bb597d24f193b4651cc3ed8"],["/tags/V2ray/index.html","7ee9d9b594904587a93c4c4075a36bd1"],["/tags/Vim/index.html","db179192f7625819f8f07e655990326b"],["/tags/Vue/index.html","ff92d89b77b16790873afcbd8d1e9d07"],["/tags/Win10字体增强/index.html","8baef5875405e64ebeb4bab4c119b428"],["/tags/Windows/index.html","02ba0bca254323c65de8f315bb8e6c73"],["/tags/hexo-abbrlink/index.html","869246a0a08163be2c24e46ce419480b"],["/tags/index.html","93aa87dfaed8eea3c4e84fec31695e13"],["/tags/share/index.html","e15e08937ccbef240c8415b2f2059d1d"],["/tags/tools/index.html","19ef491bf999bafaa8a5b4825467200f"],["/tags/vimdiff/index.html","e2177ae782dff27146d095262b31a6e9"],["/tags/感悟/index.html","79d547dbf488911294ca8e475221ad77"],["/tags/理财/index.html","81033b11dc6bacfcd8ab9a59d6daec30"],["/tags/食谱/index.html","4d6b737f18918390a5e85ddb648d0818"]];
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
