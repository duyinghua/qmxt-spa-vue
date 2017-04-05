<template>
    <ul :id="id" class="info-list">
        <template v-for="item in list" track-by="$index">
            <li v-if="item.style_type==11" class="style-0">
                <a :href="item.url">
                    <div class="tit">{{item.title}}</div>
                    <div class="statistics">
                        <span class="read">{{item.read_num}}阅读</span>
                        <span class="author"><i :style="{backgroundImage: 'url('+item.publisher_icon+')'}"></i>{{item.publisher_name}}</span>
                        <span class="attitude">{{item.attitude_num}} 种态度</span>
                    </div>
                </a>
            </li>

            <li v-else-if="item.style_type==1" class="style-1">
                <a :href="item.url">
                    <div class="photo">
                        <img :src="item.img_url" :alt="item.title">
                    </div>
                    <div class="info">
                        <div class="tit">{{item.title}}</div>
                        <div class="statistics">
                            <span class="read">{{item.read_num}}阅读</span>
                            <span class="author"><i :style="{backgroundImage: 'url('+item.publisher_icon+')'}"></i>{{item.publisher_name}}</span>
                        </div>
                        <span class="attitude">{{item.attitude_num}} 种态度</span>
                    </div>
                </a>
            </li>

            <li v-else-if="item.style_type==3" class="style-2">
                <a :href="item.url">
                    <div class="tit">{{item.title}}</div>
                    <div class="photo">
                        <img :src="item.img_url" :alt="item.title">
                    </div>
                    <div class="statistics">
                        <span class="read">{{item.read_num}}阅读</span>
                        <span class="author"><i :style="{backgroundImage: 'url('+item.publisher_icon+')'}"></i>{{item.publisher_name}}</span>
                        <span class="attitude">{{item.attitude_num}} 种态度</span>
                    </div>
                </a>
            </li>

            <li v-else-if="item.style_type==2" class="style-3">
                <a :href="item.url">
                    <div class="tit">{{item.title}}</div>
                    <div class="photos">
                        <div v-for="img in item.img_url_list" class="photo">
                            <img :src="img" :alt="item.title">
                        </div>
                    </div>

                    <div class="statistics">
                        <span class="read">{{item.read_num}}阅读</span>
                        <span class="author"><i :style="{backgroundImage: 'url('+item.publisher_icon+')'}"></i>{{item.publisher_name}}</span>
                        <span class="attitude">{{item.attitude_num}} 种态度</span>
                    </div>
                </a>
            </li>

            <li v-else-if="item.style_type==5||item.style_type==6" class="style-4">
                <a :href="item.url">
                    <div class="tit">{{item.title}}</div>
                    <div class="photo">
                        <img :src="item.img_url" :alt="item.title">
                    </div>
                    <div class="statistics">
                        <span class="author"><i :style="{backgroundImage: 'url('+item.publisher_icon+')'}"></i>{{item.publisher_name}}</span>
                        <span v-if="item.watch_number" class="watch">观看{{item.watch_number}}</span>
                        <span v-if="item.publish_time" class="datetime">{{item.publish_time}}</span>
                    </div>
                </a>
            </li>
        </template>
    </ul>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            id: String,
            list: Array
        },
        methods: {
            toPage: function (event) {
                var dataset = event.currentTarget.dataset;
                var id = dataset.id;
                var type = dataset.type;
                var videoType = dataset.videoType;
                var url = '';
                switch (type) {
                    case '1':
                    case '2':
                    case '3':
                    case '11':
                        url = '/api/share/news/' + id + '.html';
                        break;
                    case '5':
                        if (videoType == 1) {
                            url = '/api/share/news/' + id + '.html';
                        } else if (videoType == 2) {
                            id = dataset.vodId;
                            url = '/api/share/vod/' + id + '.html';
                        }
                        break;
                    case '6':
                        id = dataset.liveId;
                        url = '/api/share/live/' + id + '.html';
                        break;
                }
                window.location.href = DOMAIN.h5 + url;
            }
        }
    }
</script>

<style>
</style>
