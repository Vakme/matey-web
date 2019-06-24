import Vue from "vue";
import Vuex from "vuex";

import authState from "./AuthState";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth: authState }
});
