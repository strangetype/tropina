import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import storeProto from './store';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'font-awesome/css/font-awesome.css';

Vue.use(VueMaterial);
Vue.use(Vuex);

const store = new Vuex.Store(storeProto);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
