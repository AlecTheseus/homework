
import Vue from 'vue';
import App from './App';
import router from './router';
require("font-awesome-webpack");
import 'bootstrap/dist/css/bootstrap.css';
import 'js-cookie/src/js.cookie.js';
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App: App }
});

//# sourceMappingURL=main-compiled.js.map