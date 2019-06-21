<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="handleClickGetAuth" :disabled="!isInit">
      get auth code
    </button>
    <button @click="handleClickSignIn" v-if="!isLoggedIn" :disabled="!isInit">
      signIn
    </button>
    <button @click="handleClickSignOut" v-if="isLoggedIn" :disabled="!isInit">
      signOout
    </button>
    <div v-if="isLoggedIn">Zalogowano!</div>
    <div v-else>Wylogowano!</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      errors: ""
    };
  },
  mounted() {
    this.$store
      .dispatch("initializeAuth")
      .catch(() => (this.errors = "Login error"));
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getLoginState;
    },
    isInit() {
      return this.$store.getters.getInitState;
    }
  },
  methods: {
    handleClickGetAuth() {
      /*
      this.$gAuth
        .getAuthCode()
        .then(authCode => {
          // On success
          /!*return this.$http.post("http://your-backend-server.com/auth/google", {
            code: authCode,
            redirect_uri: "postmessage"
          });*!/
        })
        .then(response => {
          // And then
        })
        .catch(error => {
          // On fail do something
        });*/
    },
    handleClickSignIn() {
      this.$store.dispatch("login").catch(() => (this.errors = "Login error"));
    },
    handleClickSignOut() {
      this.$store.dispatch("logout").catch(() => (this.errors = "Login error"));
    }
  }
};
</script>
