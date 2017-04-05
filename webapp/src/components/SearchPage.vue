<template>
    <transition name="search-move">
        <div id="search-bar">
            <div class="search-title">
                <div class="container box">
                    <form method="post" @submit.prevent="searchSubmit">
                        <input type="search" class="search-cont" placeholder="搜索您感兴趣的内容" v-model.trim="searchCont" maxlength="14" v-keyboard="keyboard" @focus="keyboard=true" @blur="keyboard=false">
                    </form>

                    <span class="cancel" @click="close">取消</span>
                </div>
            </div>
            <div class="pt-45 container">
                <div v-if="!historyHide" class="history-record">
                    <div v-if="!historyList.length" class="empty">暂无历史记录</div>
                    <template v-else>
                        <ul>
                            <li v-for="item in historyList" @click="historyClick(item)">{{item}}</li>
                        </ul>
                        <a @click="clearHistory">清除历史记录</a>
                    </template>
                </div>
                <div v-else>
                    <info-list v-if="searchList.length" :id="'searchList'" :list="searchList"></info-list>
                    <template v-else>
                        <div v-if="searchLoading" class="list-loading"><i class="animate-loading"></i>正在加载</div>
                        <div v-else class="empty">还没内容呢~</div>
                    </template>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import router from '../router'
    import InfoList from './InfoList.vue'

    export default {
        components: {InfoList},
        directives: {
            keyboard: function (el, binding) {
                if (binding.value) {
                    el.focus();
                } else {
                    el.blur();
                }
            }
        },
        data: function () {
            return {
                PAGE_SIZE: 30,
                searchCont: '',
                searchList: [],
                searchLoading: false,
                historyList: [],
                historyHide: false, //历史记录切换开关
                keyboard: false     //展开收起键盘
            };
        },
        props: {},
        created: function () {

        },
        mounted: function () {
            var historyStr = localStorage.getItem('history') || '[]';
            this.historyList = JSON.parse(historyStr);
        },
        watch: {
            searchCont: function (val) {
                //搜索框清空后，列表也没结果则返回历史记录
                if (val == '' && !this.searchList.length) {
                    this.historyHide = false;
                }
            }
        },
        methods: {
            //关闭搜索页--执行载体的close事件
            close: function () {
                router.go(-1);
            },
            //记入历史记录
            setHistory: function (val) {
                var repeat = this.historyList.some(function (o) {
                    if (o == val) {
                        return true;
                    }
                });
                if (!repeat) {
                    if (this.historyList.length >= 10) {
                        this.historyList.pop(val);
                    }
                    this.historyList.unshift(val);
                    localStorage.setItem('history', JSON.stringify(this.historyList));
                }
            },
            clearHistory: function () {
                this.historyList = [];
                localStorage.removeItem('history');
            },
            historyClick: function (value) {
                this.searchCont = value;
                this.loadSearchList();
            },
            searchSubmit: function () {
                if (this.searchCont) {
                    this.setHistory(this.searchCont);
                    this.loadSearchList();
                    this.keyboard = false;
                }
            },
            loadSearchList: function () {
                var that = this;
                this.historyHide = true;
                this.searchLoading = true;
                $.ajaxRequest({
                    type: 'get',
                    url: that.webInterface.protocol.search,
                    data: {
                        keyword: that.searchCont,
                        page_index: 1,
                        page_size: that.PAGE_SIZE
                    },
                    pass: function (data) {
                        if (data.news) {
                            data.news = that.$parent.assembleUrl(data.news);
                            that.searchList = data.news;
                        } else {
                            that.searchList = [];
                        }
                    },
                    complete: function () {
                        that.searchLoading = false;
                    }
                });
            }
        }
    }
</script>

<style>
</style>
