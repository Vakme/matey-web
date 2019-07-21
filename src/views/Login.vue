<template>
  <section id="Login" class="hero is-fullheight-with-navbar">
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
          {{ $t("auth.signin") }}
        </b-button>
        {{ errors }}
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
      this.$store.dispatch("auth/login").catch(() =>
        this.$toast.open({
          type: "is-danger",
          message: "ERROR: Try later"
        })
      );
    }
  }
};
</script>

<style scoped></style>
