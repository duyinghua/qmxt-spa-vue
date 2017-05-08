<template>
    <div class="tab-nav">
        <nav class="container box">
            <router-link class="news" active-class="active" to="/news">资讯</router-link>
            <router-link class="video" active-class="active" to="/video">视频</router-link>
        </nav>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            current: String
        }
    }
</script>

<style>
    .tab-nav { position: fixed; bottom: 0; left: 0; height: 50px; width: 100%; background-color: #FFF; font-size: 10px; background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, transparent), color-stop(0.5, #E0E0E0), to(#E0E0E0)); background-repeat: repeat-x; background-position: left top; background-size: 100% 1px; }
    .tab-nav a { display: block; -webkit-box-flex: 1; width: 10px; height: 100%; text-align: center; padding: 32px 0 3px; color: #AAA; cursor: pointer; }
    .tab-nav .news { background: url(../assets/img/news-unselected.png) no-repeat center 7px / auto 24px; }
    .tab-nav .video { background: url(../assets/img/video-unselected.png) no-repeat center 7px / auto 24px; }
    .tab-nav .news.active { background-image: url(../assets/img/news-selected.png); color: #FF8100; }
    .tab-nav .video.active { background-image: url(../assets/img/video-selected.png); color: #FF8100; }
</style>
