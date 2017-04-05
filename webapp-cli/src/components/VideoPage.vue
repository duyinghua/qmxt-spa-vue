<template>
    <div>
        <div class="title">
            <div class="container">
                <router-link class="btn-left btn-search" to="/search"></router-link>
                <a :class="['btn-right',{mlink:!pc}]" href="javascript:;" @click="download"><span class="btn-download">下载APP</span></a>
            </div>
        </div>
        <div class="paper pb-50 pt-45">
            <Swiper :duration="3666" :list="bannerList" v-if="bannerList.length>0"></Swiper>
            <info-list :id="'videoList'" :list="infoList"></info-list>
            <div v-if="loading" class="list-loading" style="display: block;"><i class="animate-loading"></i>正在加载</div>
            <div v-if="loadNomore" class="list-nomore">没有更多了</div>
        </div>
        <tab></tab>
    </div>
</template>

<script type="text/ecmascript-6">
    import InfoList from './InfoList.vue'
    import Swiper from './Swiper.vue'
    import Tab from './Tab.vue'


    var $win = $(window);
    const START_PAGE = 1;
    export default {
        components: {Swiper, Tab, InfoList},
        data: function () {
            return {
                loading: true,
                loadNomore: false,
                pageNum: START_PAGE,
                pageSize: 10,
                lsc: 0,
                infoList: [],
                bannerList: [],
                pc: /win|mac/i.test(navigator.platform)
            };
        },
        created: function () {
            this.loadList();
        },
        mounted: function () {
            var that = this;
            var $list = $('#videoList');
            $win.off('scroll').on('scroll', function (e) {
                var scrollTop = $win.scrollTop();
                if (scrollTop >= $list.height() - $win.height() - 100) {
                    that.loadList();
                }
            });
        },
        methods: {
            download: function () {
                if (this.pc) {
                    window.location.href = 'http://www.quanminxingtan.com';
                }
            },
            loadList: function () {
                var that = this;
                if (that.pageNum > 0) {
                    $.ajaxRequest({
                        data: {lsc: that.lsc, page_index: that.pageNum, page_size: that.pageSize},
                        url: that.webInterface.protocol.tv_recommend,
                        pass: function (data) {
                            that.lsc = data.list_service_cursor;
                            if (that.pageNum == 1 && data.focus_news && data.focus_news.item_list.length) {
                                that.bannerList = data.focus_news.item_list;
                            }
                            data.news_list = that.$parent.assembleUrl(data.news_list);
                            that.infoList = that.infoList.concat(data.news_list);
                            if (data.more) {
                                that.pageNum++;
                            } else {
                                that.pageNum = 0;
                                that.loadNomore = true;
                                that.loading = false;
                            }
                        }
                    });
                }
            }
        }
    }
</script>

<style>
</style>
