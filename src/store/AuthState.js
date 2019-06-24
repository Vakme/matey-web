import Vue from "vue";
import router from "../router";
import api from "../api";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const INITIALIZED = "INIT";

const authModule = {
  namespaced: true,
  state: {
    isInit: false,
    isSignIn: false,
    user: null
  },
  mutations: {
    [LOGIN](state) {
      state.isSignIn = Vue.prototype.$gAuth.isAuthorized;
      state.user = Vue.prototype.$gAuth.GoogleAuth.currentUser.get();
      api.defaults.headers.common["Authorization"] =
        "Bearer " + state.user.getAuthResponse().id_token;
    },
    [LOGOUT](state) {
      state.user = null;
      state.isSignIn = false;
      api.defaults.headers.common["Authorization"] = "";
    },
    [INITIALIZED](state) {
      state.isInit = Vue.prototype.$gAuth.isInit;
      state.isSignIn = Vue.prototype.$gAuth.isAuthorized;
      state.user = Vue.prototype.$gAuth.GoogleAuth.currentUser.get();
      api.defaults.headers.common["Authorization"] =
        "Bearer " + state.user.getAuthResponse().id_token;
    }
  },
  actions: {
    login({ commit }) {
      Vue.prototype.$gAuth
        .signIn()
        .then(() => {
          commit(LOGIN);
          router.push("/");
        })
        .catch(err => console.log(err));
    },
    logout({ commit }) {
      Vue.prototype.$gAuth
        .signOut()
        .then(() => {
          commit(LOGOUT);
          router.push("/login");
        })
        .catch(err => console.log(err));
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
};

export default authModule;
