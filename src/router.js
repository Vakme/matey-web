import Vue from "vue";
import Router from "vue-router";
import Home from "./views/HomeView.vue";
import Login from "./views/LoginView.vue";
import store from "./store/store";

Vue.use(Router);

const shouldNotBeAuthenticated = (to, from, next) => {
  let loading = setInterval(function() {
    if (store.getters["auth/getInitState"]) {
      clearInterval(loading);
      if (!store.getters["auth/getLoginState"]) {
        next();
        return;
      }
      next("/");
    }
  }, 500);
};

const shouldBeAuthenticated = (to, from, next) => {
  let loading = setInterval(function() {
    if (store.getters["auth/getInitState"]) {
      clearInterval(loading);
      if (store.getters["auth/getLoginState"]) {
        next();
        return;
      }
      next("/login");
    }
  }, 500);
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      beforeEnter: shouldBeAuthenticated,
      component: Home
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: shouldNotBeAuthenticated,
      component: Login
    },
    {
      path: "/expenses",
      name: "expenses",
      beforeEnter: shouldBeAuthenticated,
      component: () => import("./views/CurrentExpensesView.vue")
    },
    {
      path: "/archive",
      name: "archive",
      beforeEnter: shouldBeAuthenticated,
      component: () => import("./views/ArchiveView.vue")
    },
    {
      path: "/progress",
      name: "progress",
      component: () => import("./views/ProgressView.vue")
    }
  ]
});
