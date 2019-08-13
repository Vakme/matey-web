export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/getLoginState"];
    },
    isInit() {
      return this.$store.getters["auth/getInitState"];
    },
    username() {
      return this.getUser() ? this.getUser().getName() : "";
    }
  },
  methods: {
    getUser() {
      return this.$store.getters["auth/getUser"];
    }
  },
  created() {
    if (process.env.VUE_APP_TEST) this.$store.dispatch("auth/initTestEnv");

    if (!this.$store.getters["auth/getInitState"])
      this.$store.dispatch("auth/initializeAuth").catch(error =>
        this.$buefy.toast.open({
          type: "is-danger",
          message: error.message
        })
      );
  }
};
