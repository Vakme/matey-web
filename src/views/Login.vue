<template>
  <section id="Login" class="hero is-primary is-fullheight-with-navbar is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          MATEY
        </h1>
        <b-button
          type="is-primary"
          inverted
          icon-right="google"
          @click="handleClickSignIn"
          v-if="!isLoggedIn"
          :disabled="!isInit"
        >
          Sign In
        </b-button>
        {{errors}}
      </div>
    </div>
  </section>
</template>

<script>
import AuthStateMixin from "@/mixins/AuthStateMixin";

export default {
  name: "Dashboard",
  mixins: [AuthStateMixin],
  data() {
    return {
      errors: ""
    };
  },
  methods: {
    handleClickSignIn() {
      this.$store
        .dispatch(".auth/login")
        .catch(() => (this.errors = "Login error"));
    }
  }
};
</script>

<style scoped></style>
