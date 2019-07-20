<template>
  <section class="home section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-4 is-vertical is-parent">
          <div class="tile is-child box">
            <p class="title">Hello {{ username }}!</p>
          </div>
          <div class="tile is-child box">
            <p class="subtitle">Take a look at your profile (TBD)</p>
            <div class="buttons">
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
        <div class="tile is-parent">
          <div
            class="tile is-child box expenses-tile"
            @click.self="handleClickExpenses"
          >
            <p class="title">Take look at your expenses</p>
            <div class="buttons">
              <b-button
                class="button"
                type="is-link"
                @click="summaryModal = true"
                >Sum up</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="summaryModal" has-modal-card>
      <modal-summary></modal-summary>
    </b-modal>
  </section>
</template>

<script>
// @ is an alias to /src

import AuthStateMixin from "../mixins/AuthStateMixin";
import Summary from "../components/Summary";

export default {
  name: "home",
  components: {
    "modal-summary": Summary
  },
  mixins: [AuthStateMixin],
  data() {
    return {
      summaryModal: false,
      errors: ""
    };
  },
  computed: {
    username() {
      return this.$store.getters["auth/getUser"].getName();
    }
  },
  methods: {
    handleClickSignOut() {
      this.$store.dispatch("auth/logout").catch(() =>
        this.$toast.open({
          type: "is-danger",
          message: "ERROR: Try later"
        })
      );
    },
    handleClickExpenses() {
      this.$router.push("expenses");
    }
  }
};
</script>
<style lang="scss">
.tile .buttons {
  justify-content: center;
}
.expenses-tile {
  cursor: pointer;
  text-decoration: none;
  &:hover {
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px #7957d5;
  }
}
</style>
