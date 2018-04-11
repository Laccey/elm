// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
import vueResource from 'vue-resource';
// import { Button, Toast } from 'mint-ui';
import MintUI from 'mint-ui';

import './common/stylus/index.styl';
import 'mint-ui/lib/style.css';

Vue.use(vueResource);
Vue.use(MintUI);
// Vue.component(Button.name, Button);
// Vue.component(Toast.name, Toast);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
