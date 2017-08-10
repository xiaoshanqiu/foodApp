// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
Vue.use(VueRouter);//注册

import VueResource from 'vue-resource';
Vue.use(VueResource);

//组件
import seller from './components/seller/seller.vue'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'

Vue.config.productionTip = false

const routes = [
  { path: '/', redirect: '/goods' },
  { path: '/seller', component: seller },
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings }
]

//注册组件 实例
const router = new VueRouter({
  routes,
  linkActiveClass:'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
