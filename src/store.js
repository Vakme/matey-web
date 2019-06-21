import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const INITIALIZED = "INIT";

export default new Vuex.Store({
  state: {
    isInit: false,
    isSignIn: false,
    user: null
  },
  mutations: {
    [LOGIN](state) {
      state.isSignIn = Vue.prototype.$gAuth.isAuthorized;
      state.user = Vue.prototype.$gAuth.GoogleAuth;
    },
    [LOGOUT](state) {
      state.user = null;
      state.isSignIn = Vue.prototype.$gAuth.isAuthorized;
    },
    [INITIALIZED](state) {
      state.isInit = Vue.prototype.$gAuth.isInit;
      state.isSignIn = Vue.prototype.$gAuth.isAuthorized;
      state.user = Vue.prototype.$gAuth.GoogleAuth;
    }
  },
  actions: {
    login({ commit }) {
      Vue.prototype.$gAuth.signIn().then(user => {
        console.log("user", user);
        commit(LOGIN);
      });
    },
    logout({ commit }) {
      Vue.prototype.$gAuth.signOut().then(() => {
        commit(LOGOUT);
      });
    },
    initializeAuth({ commit }) {
      let isInit;
      let checkGauthLoad = setInterval(function() {
        isInit = Vue.prototype.$gAuth.isInit;
        if (isInit) {
          clearInterval(checkGauthLoad);
          commit(INITIALIZED);
        }
      }, 1000);
    }
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    getLoginState: state => {
      return state.isSignIn;
    },
    getInitState: state => {
      return state.isInit;
    }
  }
});
