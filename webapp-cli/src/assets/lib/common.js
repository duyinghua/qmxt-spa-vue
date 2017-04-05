var GLOBAL = {};
var DOMAIN = {
        h5: 'http://s.quanminxingtan.com',
        api: 'http://api.quanminxingtan.com/api'
        //h5: 'http://192.168.31.157',
        //api: 'http://192.168.31.157/api'
        //h5: 'http://192.168.31.136:8882/weixin',
        //api: 'http://192.168.31.136:8882/weixin/json'
    },
    jsonpOpt = {
        dataType: 'json', type: 'get', timeout: 10000
    };
var webInterface = {
    singleton: {},
    protocol: {
        news_exclusive: DOMAIN.api + '/wechat/news/exclusive',
        news_recommend: DOMAIN.api + '/news',
        tv_recommend: DOMAIN.api + '/tv',
        search: DOMAIN.api + '/search/result'
    },
    error: function (text, fn) {
        text = text || '连接服务失败，请重试';
        $.toast('open', '连接服务失败，请重试');
    },
    headCheck: function (data, fn) {
        if (data.success) {
            return 1;
        } else if (data.msg) {
            $.toast('open', data.msg);
            return 0;
        }
    }
};
$.ajaxRequest = function (opt) {
    var protocolName = opt.url.replace(/[\.\/\:\?]/g, '$');
    opt.url += '?t=' + new Date().getTime();
    /*if (opt.data) {
     opt.data.p = 'm';
     } else {
     opt.data = {'p': 'm'};
     }*/
    var z = localStorage.getItem('z');
    if (z) {
        opt.data.z = z;
    }
    if (typeof opt.fail == "function") {
        opt.error = function (e) {
            opt.fail();
            webInterface.error();
        }
    } else {
        opt.error = function (e) {
            webInterface.error();
        }
    }
    if (typeof opt.pass == "function") {
        opt.success = function (data) {
            if (webInterface.headCheck(data)) {
                if (data.data && !data.data.items) {
                    data.data.items = [];
                }
                opt.pass(data.data);
            }
        }
    }
    var completeFunc = opt.complete;
    if (typeof completeFunc == 'function') {
        opt.complete = function () {
            webInterface.singleton[protocolName] = false;
            completeFunc();
        };
    } else {
        opt.complete = function () {
            webInterface.singleton[protocolName] = false;
        };
    }
    if (!webInterface.singleton[protocolName]) {
        webInterface.singleton[protocolName] = true;
        $.ajax($.extend(jsonpOpt, opt));
    }
};
var toastCloseTimer;
$.toast = function (method) {
    var $body = $('body');
    var $dialogToast = $('#dialog-toast');
    var $dialogText = $('#dialog-toast-text');
    if (!$dialogToast.length) {
        $dialogToast = $('<div id="dialog-toast"></div>');
        $dialogText = $('<div id="dialog-toast-text"></div>');
        $dialogToast.append($dialogText);
        $body.append($dialogToast);
    }
    var callback;
    var methods = {
        open: function (text, fn) {
            callback = fn;
            $dialogToast.fadeIn(500);
            $dialogText.html(text);
            clearTimeout(toastCloseTimer);
            $dialogText.addClass('toastIn').off('webkitAnimationEnd').on('webkitAnimationEnd', function () {
                $dialogText.removeClass('toastIn');
                toastCloseTimer = setTimeout(function () {
                    methods.close();
                }, 1888);
            });
        },
        close: function () {
            $dialogText.addClass('toastOut').off('webkitAnimationEnd').on('webkitAnimationEnd', function () {
                $dialogToast.hide();
                $dialogText.removeClass('toastOut');
                $dialogText.text('');
                (typeof(callback) == 'function') && callback();
            });
        }

    };
    $dialogToast.off('click').on('click', function () {
        clearTimeout(toastCloseTimer);
        methods.close();
    });
    if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
    } else {
        return console.error('Method ' + method + ' does not exist');
    }
};
export {webInterface, DOMAIN}