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
        }
    }
</script>

<style>
    .info-list li { font-size: 16px; padding: 20px 15px; background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0.5, transparent), color-stop(0.5, #E0E0E0), to(#E0E0E0)); background-repeat: repeat-x; background-position: left bottom; background-size: 300px 1px; cursor: pointer; }
    .info-list li:last-child { background: none; }
    .info-list li.style-banner { padding: 0; background: none; }
    .info-list li > a { display: block; color: #333; }
    .info-list li .photo { position: relative; display: block; border-radius: 5px; background: #E5E5E5 url(../assets/img/default-image.png) no-repeat center center; background-size: 46px; overflow: hidden; }
    .info-list li .photo img { position: absolute; left: 0; top: 0; width: 100%; height: 100%; border-radius: 5px; background-position: center center; background-size: cover; }
    .info-list li .read { float: left; padding-left: 20px; margin-right: 10px; line-height: 16px; font-size: 12px; color: #AAA; background: url(../assets/img/icon-eye.png) no-repeat left center; background-size: 15px; }
    .info-list li .watch { float: left; padding-left: 20px; margin-right: 10px; line-height: 16px; font-size: 12px; color: #AAA; background: url(../assets/img/icon-play.png) no-repeat left center; background-size: 15px; }
    .info-list li .author { float: left; margin-right: 10px; line-height: 16px; font-size: 12px; color: #AAA; }
    .info-list li .author i { display: inline-block; vertical-align: -3px; margin-right: 5px; width: 15px; height: 15px; background-image: url(../assets/img/default-head.png); background-repeat: no-repeat; background-position: center center; background-size: 15px; border-radius: 15px; }
    .info-list li .datetime { float: left; padding-left: 20px; margin-right: 10px; line-height: 16px; font-size: 12px; color: #AAA; background: url(../assets/img/icon-clock.png) no-repeat left center; background-size: 15px; }
    .info-list li .attitude { position: relative; float: left; height: 16px; line-height: 16px; padding: 0 25px 0 5px; border: 1px solid #FF8100; color: #FF8100; border-radius: 20px; font-size: 10px; }
    .info-list li .attitude:after { content: ''; position: absolute; top: 0; width: 15px; height: 16px; right: 5px; background: url(../assets/img/icon-atti.png) no-repeat center center; background-size: 11px }
    .info-list li .statistics > span:last-child { margin-right: 0 }
    .info-list li.style-0 .statistics { margin-top: 15px; overflow: hidden; }
    .info-list li.style-1 > a { display: -webkit-box; -webkit-box-orient: horizontal; }
    .info-list li.style-1 .photo { position: relative; width: 120px; height: 90px; }
    .info-list li.style-1 .info { display: block; margin-left: 12px; -webkit-box-flex: 1; }
    .info-list li.style-1 .info .tit { height: 36px; line-height: 18px; margin-bottom: 10px; display: -webkit-box; overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
    .info-list li.style-1 .statistics { margin: 10px 0; overflow: hidden; }
    .info-list li.style-2 .photo { position: relative; width: 100%; padding-bottom: 68.8%; margin: 15px 0; }
    .info-list li.style-2 .statistics { margin: 0; overflow: hidden; }
    .info-list li.style-3 .photos { display: block; white-space: nowrap; margin: 15px 0; position: relative; width: 100%; height: 90px; overflow-y: hidden; overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .info-list li.style-3 .photos .photo { display: inline-block; width: 120px; height: 90px; margin-right: 5px; }
    .info-list li.style-3 .photos .photo:last-child { margin-right: 0; }
    .info-list li.style-4 .photo { position: relative; width: 100%; padding-bottom: 50.14%; margin: 15px 0; }
    .info-list li.style-4 .photo:after { position: absolute; content: ""; left: 0; top: 0; width: 100%; height: 100%; background: url(../assets/img/icon-player.png) no-repeat center center; background-size: 39px; }
    .info-list li.style-4 .statistics { margin: 0; overflow: hidden; }
    .list-nomore, .list-loading { padding: 20px 15px; line-height: 20px; text-align: center; font-size: 14px; color: #AAA; }
    .list-loading .animate-loading { vertical-align: middle; display: inline-block; margin-right: 10px; width: 16px; height: 16px; background: url(../assets/img/iscroll-loading.gif) no-repeat 0 0; background-size: 16px; }

</style>
