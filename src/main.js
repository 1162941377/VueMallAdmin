import Cookie from 'js-cookie';
import VCharts from 'v-charts';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/ant-design-vue';
import '@/assets/css/reset.less';
import api from './api';

Vue.use(VCharts);
Vue.prototype.$cookie = Cookie;
Vue.prototype.$api = api;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
