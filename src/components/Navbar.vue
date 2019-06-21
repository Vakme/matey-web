<template>
  <nav
    id="Navbar"
    class="navbar is-light"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        Matey
      </router-link>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div v-if="isLoggedIn" class="navbar-start">
        <router-link class="navbar-item" to="/">
          Home
        </router-link>

        <router-link class="navbar-item" to="/expenses">
          Expenses
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <b-button
              type="is-primary"
              @click="handleClickSignIn"
              v-if="!isLoggedIn"
              :disabled="!isInit"
              outlined
            >
              Sign In
            </b-button>
            <b-button
              type="is-primary"
              @click="handleClickSignOut"
              v-if="isLoggedIn"
              :disabled="!isInit"
              outlined
            >
              Sign Out
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import AuthStateMixin from "@/mixins/AuthStateMixin";

export default {
  name: "Navbar",
  mixins: [AuthStateMixin],
  data() {
    return {
      errors: ""
    };
  },
  methods: {
    handleClickSignIn() {
      this.$store.dispatch("login").catch(() => (this.errors = "Login error"));
    },
    handleClickSignOut() {
      this.$store
        .dispatch("logout")
        .catch(() => (this.errors = "Logout error"));
    }
  }
};
</script>

<style scoped></style>
