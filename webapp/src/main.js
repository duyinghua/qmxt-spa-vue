import Vue from 'vue'
import NewsPage from './compenents/NewsPage.vue'
import VideoPage from './compenents/VideoPage.vue'
import SearchPage from './compenents/SearchPage.vue'

var router = new VueRouter({
    routes: [
        {path: '/', redirect: '/news'},
        {path: '/news', component: NewsPage},
        {path: '/video', component: VideoPage},
        {path: '/search', component: SearchPage}
    ]
});
var index = new Vue({
    router,
    el: '#app',
    methods: {
        assembleUrl: function (list) {
            list.forEach(function (o, i) {
                switch (o.style_type) {
                    case 1:
                    case 2:
                    case 3:
                    case 11:
                        o.url = DOMAIN.h5 + '/api/share/news/' + o.id + '.html';
                        break;
                    case 5:
                        if (o.video_module_type == 1) {
                            o.url = DOMAIN.h5 + '/api/share/news/' + o.id + '.html';
                        } else if (o.video_module_type == 2) {
                            o.url = DOMAIN.h5 + '/api/share/vod/' + o.tv_program_id + '.html';
                        }
                        break;
                    case 6:
                        o.url = DOMAIN.h5 + '/api/share/live/' + o.live_id + '.html';
                        break;
                }
            });
            return list;
        }
    }
});

(function () {
    var mlinkOpts = [];
    $('a.mlink').each(function () {
        var $this = $(this);
        mlinkOpts.push({
            mlink: 'Aa3K',
            button: $this[0]
        });
    });
    new Mlink(mlinkOpts);
})();
