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
      <a role="button" :class="[isMenuActive ? 'is-active' : '', 'navbar-burger']" @click="isMenuActive = !isMenuActive"  aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" :class="[isMenuActive ? 'is-active' : '', 'navbar-menu']">
      <div v-if="isLoggedIn" class="navbar-start">
        <router-link class="navbar-item" to="/">
          Home
        </router-link>

        <router-link class="navbar-item" to="/expenses">
          Expenses
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable" v-if="isLoggedIn">
          <a class="navbar-link">
            Profile
          </a>
          <div class="navbar-dropdown is-right">
            <div class="dropdown-content has-text-centered">
              <div class="dropdown-item">
                <figure class="image is-96x96 profile-picture">
                  <img
                    class="is-rounded"
                    :src="imageUrl"
                    alt="profile picture"
                  />
                </figure>
                <div class="username has-text-weight-bold">{{ username }}</div>
                <div class="email is-size-7">{{ email }}</div>
              </div>
              <div class="navbar-item buttons">
                <b-button
                  type="is-primary"
                  @click="handleClickSignOut"
                  :disabled="!isInit"
                  outlined
                >
                  Sign Out
                </b-button>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item" v-else>
          <div class="buttons">
            <b-button
              type="is-primary"
              @click="handleClickSignIn"
              :disabled="!isInit"
              outlined
            >
              Sign In
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
      errors: "",
      isMenuActive: false
    };
  },
  methods: {
    handleClickSignIn() {
      this.$store.dispatch("auth/login").catch(e =>
        this.$toast.open({
          type: "is-danger",
          message: "ERROR: Try later"
        })
      );
    },
    handleClickSignOut() {
      this.$store.dispatch("auth/logout").catch(e =>
        this.$toast.open({
          type: "is-danger",
          message: "ERROR: Try later"
        })
      );
    }
  },
  computed: {
    username() {
      return this.$store.getters["auth/getUser"].getBasicProfile().getName();
    },
    email() {
      return this.$store.getters["auth/getUser"].getBasicProfile().getEmail();
    },
    imageUrl() {
      return this.$store.getters["auth/getUser"]
        .getBasicProfile()
        .getImageUrl();
    }
  }
};
</script>

<style scoped>
.profile-picture {
  margin: auto;
}
.profile-picture img {
  max-height: 100%;
}
.buttons {
  justify-content: center;
}
</style>
