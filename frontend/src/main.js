import Vue from 'vue';
import App from './App.vue';
import router from '@/router/index';
// import store from '@/store/index';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Fontawesome library
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Fontawesome library - all icon
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  // store,
}).$mount('#app');
