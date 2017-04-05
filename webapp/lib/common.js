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
(function ($) {
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
    $.fn.iScrollPull = function (method) {
        var $this = $(this);
        var scrollerHeight = $this.height();
        var $content = $this.children();
        $content.css('minHeight', scrollerHeight + 'px');
        var $wrapper = $this.children('.scroll-wrapper');
        if (!$wrapper.length) {
            $wrapper = $('<div class="scroll-wrapper"></div>');
            $content.wrap($wrapper);
            $wrapper.css('minHeight', scrollerHeight + 'px');
        }
        var $pullDown = $wrapper.children('.scroller-pull-down');
        var $pullUp = $wrapper.children('.scroller-pull-up');
        var methods = {
            init: function (option) {
                if (option.pullDown && !$pullDown.length) {
                    $pullDown = $('<div class="scroller-pull-down"><span class="scroller-icon"></span><span class="scroller-label">下拉即可刷新</span></div>');
                    $wrapper.prepend($pullDown);
                }
                if (option.pullUp && !$pullUp.length) {
                    $pullUp = $('<div class="scroller-pull-up"><span class="scroller-icon"></span><span class="scroller-label">加载更多</span></div>');
                    $wrapper.append($pullUp);
                }
                var $pullDownLabel = $pullDown.children('.scroller-label');
                var pullDownHeight = $pullDown.height();
                var $pullUpLabel = $pullUp.children('.scroller-label');
                var pullUpHeight = $pullUp.height();
                $this.iScroll({
                    topOffset: pullDownHeight,
                    bottomOffset: pullUpHeight,
                    onRefresh: function () {
                        if ($pullDown.hasClass('scroller-loading')) {
                            $pullDown.removeClass('scroller-loading scroller-flip');
                            $pullDownLabel.html('下拉即可刷新');
                        } else if ($pullUp.hasClass('scroller-loading')) {
                            $pullUp.removeClass('scroller-loading scroller-flip');
                            $pullUpLabel.html('加载更多');
                        }
                    },
                    onScrollMove: function () {
                        var maxScrollY = this.wrapperH - this.scrollerH + this.minScrollY + pullUpHeight;
                        if (this.y > 5 && !$pullDown.hasClass('scroller-flip')) {
                            $pullDown.attr('class', 'scroller-pull-down scroller-flip');
                            $pullDownLabel.html('释放立即刷新');
                            this.minScrollY = 0;
                        } else if (this.y < 5 && $pullDown.hasClass('scroller-flip')) {
                            $pullDown.removeClass('scroller-loading scroller-flip');
                            $pullDownLabel.html('下拉即可刷新');
                            this.minScrollY = -pullDownHeight;
                        } else if (this.y < (maxScrollY - pullUpHeight - 5) && !$pullUp.hasClass('scroller-flip')) {
                            $pullUp.attr('class', 'scroller-pull-up scroller-flip');
                            $pullUpLabel.html('释放立即加载');
                            this.maxScrollY = maxScrollY - pullUpHeight;
                        } else if (this.y > (maxScrollY - pullUpHeight + 5) && $pullUp.hasClass('scroller-flip')) {
                            $pullUp.removeClass('scroller-loading scroller-flip');
                            $pullUpLabel.html('加载更多');
                            this.maxScrollY = maxScrollY;
                        }
                    },
                    onScrollEnd: function () {
                        if ($pullDown.hasClass('scroller-flip')) {
                            $pullDown.attr('class', 'scroller-pull-down scroller-loading');
                            $pullDownLabel.html('正在刷新');
                            option.pullDown && option.pullDown();
                        } else if ($pullUp.hasClass('scroller-flip')) {
                            $pullUp.attr('class', 'scroller-pull-up scroller-loading');
                            $pullUpLabel.html('正在加载');
                            option.pullUp && option.pullUp();
                        }
                    }
                });
            },
            reset: function () {
                $pullUp.attr('class', 'scroller-pull-up').children('.scroller-label').html('加载更多')
            },
            finish: function () {
                $pullUp.attr('class', 'scroller-pull-up scroller-finish').children('.scroller-label').html('没有更多了')
            }
        };
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            return $.error('Method ' + method + ' does not exist');
        }
    };
    $.fn.sliderBanner = function (type, time) {
        time = time || 3000;
        this.each(function () {
            var $this = $(this);
            var backupHtml = $this.html();
            init($this);
            $(window).on('resize', function () {
                $this.html(backupHtml);
                init($this)
            })
        });
        function init($this) {
            var downX, lastX, lastY, cur = 1, timeDown;
            var vertical;
            var $list = $this.children();
            var $nav = $('<div class="nav"></div>');
            var $li = $list.children();
            var listnum = $li.length;
            for (var i = 0; i < listnum; i++) {
                $nav.append('<span></span>');
            }
            $this.append($nav);
            var wh = $this.width();
            if (type == 'phone') {
            } else {
                if (type == 'tablet') {
                    var ht = $this.height() || $li.height() || 'none';
                    $this.height(ht);
                    $li.height(ht)
                } else {
                    return
                }
            }
            $li.css({
                'display': 'block',
                'float': 'left',
                'width': wh,
                'height': '100%',
                'position': 'relative',
                'background-repeat': 'no-repeat',
                'background-position': 'center center',
                'background-size': 'cover'
            });
            var $liFirst = $li.first().clone();
            var $liLast = $li.last().clone();
            $list.prepend($liLast).append($liFirst);
            $list.css({left: cur * -wh, height: '100%', width: wh * (listnum + 2), overflow: 'hidden'});
            var percent = 100 / listnum;
            var $dot = $nav.children('span');
            $dot.eq(0).addClass('active');
            function autorun() {
                cur++;
                runChange()
            }

            function runChange(num) {
                if (num) {
                    cur = num;
                }
                var left = (cur) * -wh;
                $list.animate({'left': left}, 300, 'linear', function () {
                    if (cur == (listnum + 2) - 1) {
                        cur = 1;
                        $list.css({'left': cur * -wh})
                    } else {
                        if (cur == 0) {
                            cur = (listnum + 2) - 1 - 1;
                            $list.css({'left': cur * -wh})
                        }
                    }
                    changeDot($dot, cur, percent)
                })
            }

            var timer = setInterval(autorun, time);
            $list.off('touchstart').on('touchstart', function (_e) {
                vertical = null;
                //_e.preventDefault();
                _e = _e.changedTouches[0];
                lastX = _e.clientX;
                lastY = _e.clientY;
                downX = _e.clientX;
                timeDown = new Date().getTime();
                clearInterval(timer)
            });
            $list.off('touchend').on('touchend', function (_e) {
                _e = _e.changedTouches[0];
                vertical = null;
                var diffX = _e.clientX - downX;
                var timeDiff = Math.abs(new Date().getTime() - timeDown);
                if (diffX > 0) {
                    if (!((cur == 0) || (Math.abs(diffX) < 160 && timeDiff > 500))) {
                        cur--
                    }
                    runChange()
                } else {
                    if (diffX < 0) {
                        if (!((cur == (listnum + 2) - 1) || (Math.abs(diffX) < 160 && timeDiff > 500))) {
                            cur++
                        }
                        runChange()
                    }
                }
                timer = setInterval(autorun, time)
            });
            $list.off('touchmove').on('touchmove', function (_e) {
                var _t = _e.changedTouches[0];
                var _mx = _t.clientX;
                var _my = _t.clientY;
                var mxDiff = _mx - lastX;
                var myDiff = _my - lastY;
                lastX = _mx;
                lastY = _my;
                if (vertical === null) {
                    if (Math.abs(mxDiff) > Math.abs(myDiff)) {
                        return vertical = false;
                    } else {
                        return vertical = true;
                    }
                }
                if (!vertical) {
                    _e.preventDefault();
                    var left = Number($list.css('left').replace('px', ''));
                    left = left + mxDiff;
                    $list.css('left', left);
                    clearInterval(timer)
                }
            });
            $nav.on('click', 'span', function () {
                var index = $(this).index();
                runChange(index + 1);
            });
        }

        function changeDot(dot, cur, percent) {
            dot.removeClass();
            dot.eq(cur - 1).addClass('active')
        }
    };
})(Zepto);
