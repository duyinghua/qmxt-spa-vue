import Vue from 'vue'
import Router from 'vue-router'
import NewsPage from '../components/NewsPage.vue'
import VideoPage from '../components/VideoPage.vue'
import SearchPage from '../components/SearchPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/news'},
    {path: '/news', component: NewsPage},
    {path: '/video', component: VideoPage},
    {path: '/search', component: SearchPage}
  ]
})
