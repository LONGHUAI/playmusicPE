import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import index from '../components/index.vue'
import mv from '../components/mv.vue'
import music from '../components/music.vue'
import musiclist from '../components/musiclist.vue'
import mvs from '../components/mvs.vue'
import sousuo from '../components/sousuo.vue'
import gedan from '../components/gedan.vue'
import gedanxianqing from '../components/gedanxianqing.vue'
export default new Router({
  routes: [
    {
      path:'/',
      // name:'APP',  
      // 这个我不知道什么原因加了才能显示
      redirect:'/APP'
     },
     {
      path:'/mv',
      name:'mv',
      component:mv
     },
     {
      path:'/music',
      name:'music',
      component:music
     },
     {
      path:'/musiclist',
      name:'musiclist',
      component:musiclist
     },
     {
      path:'/index',
      name:'index',
      component:index
     },
     {
      path:'/mvs',
      name:'mvs',
      component:mvs
     },
     {
       path:'/sousuo',
       name:'sousuo',
       component:sousuo
     },
     {
      path:'/gedan',
      name:'gedan',
      component:gedan
    },
    {
      path:'/gedanxianqing',
      name:'gedanxianqing',
      component:gedanxianqing
    }
  ]
})
