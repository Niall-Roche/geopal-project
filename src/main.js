import Vue from 'vue';
import App from './App.vue';
import gmapsInit from './utils/gmaps';

/*
 *  Initialize Google Maps and then render Vue
 */
gmapsInit().then((result) => {
  Vue.prototype.$google = result;
  Vue.prototype.$map = null;
  Vue.prototype.$markers = [];
  Vue.prototype.$JSON_TYPE = 'application/json';
  Vue.prototype.$markerColors = {
    red: {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      text: 'red'
    },
    blue: {
      url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      text: 'blue'
    },
    yellow: {
      url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
      text: 'yellow'
    },
    green: {
      url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      text: 'green'
    },
    purple: {
      url: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
      text: 'purple'
    },
    pink: {
      url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
      text: 'pink'
    }
  };
  Vue.config.productionTip = false;

  Vue.filter('capitalize', (value) => {
    if (!value) return '';
    const val = value.toString();
    return val.charAt(0).toUpperCase() + val.slice(1);
  });

  new Vue({
    render: h => h(App)
  }).$mount('#app');
});
