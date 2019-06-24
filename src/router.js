import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import store from "./store/store";

Vue.use(Router);

const shouldNotBeAuthenticated = (to, from, next) => {
  if (!store.getters["auth/getLoginState"]) {
    next();
    return;
  }
  next("/");
};

const shouldBeAuthenticated = (to, from, next) => {
  if (store.getters["auth/getLoginState"]) {
    next();
    return;
  }
  next("/login");
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
      component: () => import("./views/Expenses.vue")
    }
  ]
});
