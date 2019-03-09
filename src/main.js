import Vue from 'vue';
import App from './App.vue';
import gmapsInit from './utils/gmaps';

/*
 *  Initialize Google Maps and then render Vue
 */
gmapsInit().then((result) => {
  Vue.prototype.$google = result;
  Vue.prototype.$markers = [];
  Vue.config.productionTip = false;

  new Vue({
    render: h => h(App)
  }).$mount('#app');
});
