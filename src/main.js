import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GAuth from "vue-google-oauth2";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

const gauthOption = {
  clientId: process.env.CLIENT_ID,
  scope: "profile email
};

Vue.use(Buefy);
Vue.use(GAuth, gauthOption);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
