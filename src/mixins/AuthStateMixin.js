export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.getLoginState;
    },
    isInit() {
      return this.$store.getters.getInitState;
    }
  },
  created() {
    if (!this.$store.getters.getInitState)
      this.$store
        .dispatch("initializeAuth")
        .catch(() => (this.errors = "Init error"));
  }
};
