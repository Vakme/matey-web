export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/getLoginState"];
    },
    isInit() {
      return this.$store.getters["auth/getInitState"];
    }
  },
  created() {
    if (!this.$store.getters["auth/getInitState"])
      this.$store
        .dispatch("auth/initializeAuth")
        .catch(() => (this.errors = "Init error"));
  }
};
