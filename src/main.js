import Vue from 'vue';
import PageLoading from '@/components/PageLoading.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';
import { toMoney } from '@/filters/format';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.filter('toMoney', toMoney);

Vue.component('PageLoading', PageLoading);
Vue.component('ErrorNotify', ErrorNotify);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
