require('./assets/css/common.css')
import Vue from 'vue'
import router from './router'
import {DOMAIN, webInterface} from './assets/lib/common.js'

Vue.prototype.DOMAIN = DOMAIN;
Vue.prototype.webInterface = webInterface;
new Vue({
    router,
    el: '#app',
    methods: {
        assembleUrl: function (list) {
            var that = this;
            list.forEach(function (o, i) {
                switch (o.style_type) {
                    case 1:
                    case 2:
                    case 3:
                    case 11:
                        o.url = that.DOMAIN.h5 + '/api/share/news/' + o.id + '.html';
                        break;
                    case 5:
                        if (o.video_module_type == 1) {
                            o.url = that.DOMAIN.h5 + '/api/share/news/' + o.id + '.html';
                        } else if (o.video_module_type == 2) {
                            o.url = that.DOMAIN.h5 + '/api/share/vod/' + o.tv_program_id + '.html';
                        }
                        break;
                    case 6:
                        o.url = that.DOMAIN.h5 + '/api/share/live/' + o.live_id + '.html';
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
