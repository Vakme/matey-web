import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import GAuth from "vue-google-oauth2";
import instance from "./api";
import VueAxios from "vue-axios";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import i18n from "./i18n";
import "@/assets/styles.scss";
import Clipboard from "v-clipboard";
import VueApexCharts from "vue-apexcharts";

const gauthOption = {
  clientId: process.env.VUE_APP_CLIENT_ID,
  scope: "profile email"
};
Vue.use(Buefy);
Vue.use(GAuth, gauthOption);
Vue.use(VueAxios, instance);
Vue.use(Clipboard);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
