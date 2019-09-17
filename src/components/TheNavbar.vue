<template>
  <nav
    id="Navbar"
    class="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1 class="title">
          EKSPRESSO
          <b-tag type="is-danger" rounded>BETA</b-tag>
        </h1>
      </router-link>
      <a
        role="button"
        :class="[isMenuActive ? 'is-active' : '', 'navbar-burger']"
        @click="isMenuActive = !isMenuActive"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      :class="[isMenuActive ? 'is-active' : '', 'navbar-menu']"
    >
      <div v-if="isLoggedIn" class="navbar-start">
        <router-link class="navbar-item" to="/">
          {{ $t("menu.home") }}
        </router-link>

        <router-link class="navbar-item" to="/expenses">
          {{ $t("menu.expenses") }}
        </router-link>

        <router-link class="navbar-item" to="/archive">
          {{ $t("menu.archive") }}
        </router-link>
      </div>
      <div class="navbar-end">
        <router-link class="navbar-item" to="/progress">
          {{ $t("menu.progress") }}
        </router-link>
        <div
          :class="[
            profileDropdown ? 'is-active' : '',
            'navbar-item has-dropdown'
          ]"
          v-if="isLoggedIn"
          @click="profileDropdown = !profileDropdown"
        >
          <a class="navbar-link">
            {{ $t("menu.profile") }}
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
                  {{ $t("auth.signout") }}
                </b-button>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item" v-else>
          <div class="buttons">
            <b-button
              type="is-success"
              @click="handleClickSignIn"
              icon-right="google"
              :disabled="!isInit"
            >
              {{ $t("auth.signin") }}
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
      isMenuActive: false,
      profileDropdown: false
    };
  },
  watch: {
    $route() {
      this.isMenuActive = false;
    }
  },
  methods: {
    handleClickSignIn() {
      this.$store.dispatch("auth/login");
    },
    handleClickSignOut() {
      this.$store.dispatch("auth/logout");
    }
  },
  computed: {
    email() {
      return this.getUser() ? this.getUser().getEmail() : "";
    },
    imageUrl() {
      return this.getUser() ? this.getUser().getImageUrl() : "";
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
.navbar-dropdown {
  padding: 0;
}
</style>
