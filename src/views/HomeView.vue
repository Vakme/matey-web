<template>
  <section class="home section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-4 is-vertical is-parent">
          <div class="tile is-child box">
            <p class="title">{{ $t("home.greetings") }}, {{ username }}!</p>
          </div>
          <div class="tile is-child box">
            <p class="subtitle">{{ $t("home.profile_tile") }} (TBD)</p>
            <div class="buttons">
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
        <div class="tile is-parent">
          <div
            class="tile is-child box expenses-tile"
            @click.self="handleClickExpenses"
          >
            <p class="title">{{ $t("home.expenses_tile") }}</p>
            <div class="buttons">
              <b-button
                class="button"
                type="is-primary"
                @click="summaryModal = true"
                >{{ $t("expenses.sumup_button") }}</b-button
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
import Summary from "../components/ExpenseSummary";

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
  methods: {
    handleClickSignOut() {
      this.$store.dispatch("auth/logout").catch(() =>
        this.$buefy.toast.open({
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
<style lang="scss" scoped>
@import "../assets/styles";
.tile .buttons {
  justify-content: center;
}
.expenses-tile {
  cursor: pointer;
  text-decoration: none;
  background-color: $dark;
  box-shadow: none;
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px $primary;
    background-color: $background;
  }
}
</style>
