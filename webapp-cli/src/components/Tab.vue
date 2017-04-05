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
</style>
