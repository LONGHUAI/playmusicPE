// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import icon from '../src/icon.css'
Vue.config.productionTip = false
import axios from 'axios'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})




// 导入 Element_ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


// 懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/群星.png'),
  loading: require('./assets/加载.gif'),
  attempt: 2,
})

// 全局过滤器
//分秒
Vue.filter('conversion',(value)=>{
  //调用Date的方法，处理时间戳
  var fen = new Date(value).getMinutes()
  fen = fen<10?'0'+ fen  : fen
  // console.log(fen);
  var miao = new Date(value).getSeconds()
 miao =  miao<10? '0'+ miao : miao
  // console.log(miao);
  return fen +':'+ miao
 })
//  完整时间
// 全局的过滤器  完整时间
Vue.filter('filterTime',(value)=>{
	const date = new Date(value)
	
	const y = date.getFullYear()
	const m = (date.getMonth() + 1 + '').padStart(2,'0')
	const d = (date.getDate() + '').padStart(2,'0')
	
	const h = (date.getHours() + '').padStart(2,'0')
	const min = (date.getMinutes() + '').padStart(2,'0')
	const ss = (date.getSeconds() + '').padStart(2,'0')
	
	return `${y}-${m}-${d} ${h}:${min}:${ss}`
})
 