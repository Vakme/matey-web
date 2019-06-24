import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import GAuth from "vue-google-oauth2";
import instance from "./api";
import VueAxios from "vue-axios";
import "vue-material-design-icons/styles.css";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

const gauthOption = {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: "profile email"
};
console.log(process.env.VUE_APP_CLIENT_ID);

Vue.use(Buefy, {
  defaultIconPack: "fa"
});
Vue.use(GAuth, gauthOption);
Vue.use(VueAxios, instance);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
