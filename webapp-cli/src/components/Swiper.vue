<template>
    <div class="banner swiper">
        <div class="list" @touchstart="swipeStart" @touchmove="swipeMove" @touchend="swipeEnd" :style="{width:elWidth+'px',left:elLeft+'px'}">
            <a v-for="b in list" class="li" :style="{backgroundImage:'url('+b.img_url+')',width:iWidth+'px'}" :href="link(b)"></a>
        </div>
        <div v-if="dot" class="nav">
            <span v-for="(item, index) in list" :class="{active:cur-1==index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            duration: {type: Number, default: 3000},
            dot: {type: Boolean, default: true},
            list: Array
        },
        data: function () {
            return {
                $list: null,
                iWidth: Number,
                elWidth: Number,
                elLeft: Number,
                downX: Number,
                lastX: Number,
                lastY: Number,
                cur: 1,
                timeDown: Number,
                vertical: Boolean,
                listnum: Number,
                timer: null
            }
        },
        mounted: function () {
            var $swiper = this.$el;
            this.$list = $swiper.querySelector('.list');
            var $li = this.$list.childNodes;
            this.listnum = this.list.length;
            this.iWidth = $swiper.clientWidth;
            this.elWidth = this.iWidth * (this.listnum + 2);
            var $liFirst = $li[0].cloneNode();
            var $liLast = $li[$li.length - 1].cloneNode();
            $liFirst.style.width = this.iWidth + 'px';
            $liLast.style.width = this.iWidth + 'px';
            this.$list.insertBefore($liLast, $li[0]);
            this.$list.appendChild($liFirst);
            this.elLeft = this.cur * -this.iWidth;
            this.timer = setInterval(this.autorun, this.duration);
        },
        methods: {
            autorun: function () {
                this.cur++;
                this.runChange();
            },
            runChange: function (num) {
                var that = this;
                if (num) {
                    that.cur = num;
                }
                var left = (that.cur) * -that.iWidth;
                $(that.$list).animate({'left': left}, 300, 'linear', function () {
                    if (that.cur == (that.listnum + 2) - 1) {
                        that.cur = 1;
                        that.elLeft = that.cur * -that.iWidth
                    } else if (that.cur == 0) {
                        that.cur = (that.listnum + 2) - 1 - 1;
                        that.elLeft = that.cur * -that.iWidth
                    } else {
                        that.elLeft = left;
                    }
                })
            },
            swipeStart: function (_e) {
                this.vertical = null;
                var _t = _e.changedTouches[0];
                this.lastX = _t.clientX;
                this.lastY = _t.clientY;
                this.downX = _t.clientX;
                this.timeDown = new Date().getTime();
                clearInterval(this.timer)
            },
            swipeMove: function (_e) {
                var _t = _e.changedTouches[0];
                var _mx = _t.clientX;
                var _my = _t.clientY;
                var mxDiff = _mx - this.lastX;
                var myDiff = _my - this.lastY;
                this.lastX = _mx;
                this.lastY = _my;

                if (this.vertical === null) {
                    if (Math.abs(mxDiff) > Math.abs(myDiff)) {
                        return this.vertical = false;
                    } else {
                        return this.vertical = true;
                    }
                }
                if (!this.vertical) {
                    _e.preventDefault();
                    this.elLeft += mxDiff;

                    clearInterval(this.timer)
                }
            },
            swipeEnd: function (_e) {
                var _t = _e.changedTouches[0];
                this.vertical = null;
                var diffX = _t.clientX - this.downX;
                var timeDiff = Math.abs(new Date().getTime() - this.timeDown);
                if (diffX > 0) {
                    if (!((this.cur == 0) || (Math.abs(diffX) < 160 && timeDiff > 500))) {
                        this.cur--
                    }
                    this.runChange()
                } else {
                    if (diffX < 0) {
                        if (!((this.cur == (this.listnum + 2) - 1) || (Math.abs(diffX) < 160 && timeDiff > 500))) {
                            this.cur++
                        }
                        this.runChange()
                    }
                }
                this.timer = setInterval(this.autorun, this.duration)
            },
            link: function (o) {
                var url = '';
                switch (o.ref_content_type) {
                    case 1: //新闻频道
                    case 2: //新闻栏目
                    case 3: //专题新闻
                    case 5: //TV 频道
                    case 6: //TV 栏目
                        break;
                    case 4: //普通新闻
                    case 11://视频新闻
                        url = '/api/share/news/' + o.ref_content_id + '.html';
                        break;
                    case 7: //TV 点播
                        url = '/api/share/vod/' + o.ref_content_id + '.html';
                        break;
                    case 8: //TV 直播
                        url = '/api/share/live/' + o.ref_content_id + '.html';
                        break;
                    case 9: //广告
                        url = o.click_url;
                        break;
                    case 10://WebView
                        url = o.click_url;
                        break;
                }
                return this.DOMAIN.h5 + url;
            },
            renderBanner: function (that, banner_list) {
                banner_list.forEach(function (o, i) {
                    var url = '';
                    switch (o.ref_content_type) {
                        case 1: //新闻频道
                        case 2: //新闻栏目
                        case 3: //专题新闻
                        case 5: //TV 频道
                        case 6: //TV 栏目
                            break;
                        case 4: //普通新闻
                        case 11://视频新闻
                            url = '/api/share/news/' + o.ref_content_id + '.html';
                            break;
                        case 7: //TV 点播
                            url = '/api/share/vod/' + o.ref_content_id + '.html';
                            break;
                        case 8: //TV 直播
                            url = '/api/share/live/' + o.ref_content_id + '.html';
                            break;
                        case 9: //广告
                            url = o.click_url;
                            break;
                        case 10://WebView
                            url = o.click_url;
                            break;
                    }
                    o.link = this.DOMAIN.h5 + url;
                });
                that.bannerList = banner_list;
            }
        }
    }
</script>

<style>

    .banner { width: 100%; padding-bottom: 56.2%; min-height: 100px; }
    .swiper { position: relative; width: 100%; overflow: hidden; }
    .swiper .list { position: absolute; left: 0; height: 100%; overflow: hidden; }
    .swiper .li { display: block; float: left; height: 100%; position: relative; background-repeat: no-repeat; background-position: center center; background-size: cover; }
    .swiper .nav { position: absolute; margin: 0 10px; height: 30px; left: 0; right: 0; bottom: 0; display: -webkit-box; -webkit-box-orient: horizontal; -webkit-box-pack: end; -webkit-box-align: center; }
    .swiper .nav span { display: block; width: 8px; height: 8px; border-radius: 8px; background-color: #DDD; margin: 0 5px 0 5px; cursor: pointer; }
    .swiper .nav span.active { background-color: #333; }

</style>
