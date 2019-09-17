<template>
  <section id="Login" class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container is-fluid has-text-centered">
        <div class="columns is-vcentered">
          <div class="column">
            <div class="hero-image">
              <img :src="`${publicPath}mockups.png`" alt="mockups" />
            </div>
          </div>
          <div class="column">
            <div class="hero-description content has-text-left">
              <p class="title">{{ $t("landing.description") }}:</p>
              <ul class="has-text-left">
                <li v-for="(el, ind) in $t('landing.list')" :key="ind">
                  {{ el }}
                </li>
              </ul>
            </div>
            <div class="call-to-action">
              <b-button
                type="is-light"
                size="is-middle"
                @click="handleClickSignIn"
                v-if="!isLoggedIn"
                :disabled="!isInit"
              >
                <span class="button-inner">
                  {{ $t("landing.call") }}
                  <img
                    class="google-icon"
                    :src="`${publicPath}google-48.png`"
                    alt="google-icon"
                  />
                </span>
              </b-button>
            </div>
          </div>
        </div>
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
      publicPath: process.env.BASE_URL,
      errors: ""
    };
  },
  mounted() {
    console.log(this.$buefy);
  },
  methods: {
    handleClickSignIn() {
      this.$store.dispatch("auth/login");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../assets/colors.scss";

.hero {
  background: $grey-dark;
  background: linear-gradient(180deg, $grey-dark 0%, $dark 50%, $darkest 100%);
  .hero-image img {
    max-height: 75vh;
    width: auto;
  }
  .columns {
    align-items: stretch;
    .column {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .title {
        margin-bottom: 20px;
      }
      ul {
        color: #bdcbdb;
        font-size: 1.25rem;
        font-weight: 400;
        line-height: 1.25;
      }
      .button-inner {
        display: flex;
      }
      .google-icon {
        width: 24px;
        height: auto;
        margin-left: 10px;
      }
    }
  }
}
</style>
