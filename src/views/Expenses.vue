<template>
  <section id="Expenses" class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title">Expenses</h1>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-button type="is-success" @click="addModal = true"
              >Add new expense</b-button
            >
          </div>
        </div>
      </div>
      <b-table
        class="table"
        :data="funds"
        :striped="true"
        :hoverable="true"
        :mobile-cards="true"
      >
        <template slot-scope="props">
          <b-table-column field="name" label="Name">
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="date" label="Date">
            {{ parseTimestamp(props.row.date) }}
          </b-table-column>

          <b-table-column field="value" label="Value" numeric>
            {{ parseNumber(props.row.value) }} zł
          </b-table-column>

          <b-table-column label="Remove" centered>
            <span class="remove-expense">
            <b-icon
              icon="delete"
              @click.native="onClickDelete(props.row.name)"
            ></b-icon>
              </span>
          </b-table-column>
        </template>
      </b-table>
      <div class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Number of expenses</p>
            <p class="title">{{ funds.length }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Value</p>
            <p class="title">{{ parseNumber(calculateSum(funds)) }} zł</p>
          </div>
        </div>
      </div>
      <b-button
        class="button is-fullwidth"
        type="is-link"
        @click="summaryModal = true"
        >Sum up</b-button
      >
    </div>
    <b-modal :active.sync="summaryModal" has-modal-card>
      <modal-summary></modal-summary>
    </b-modal>
    <b-modal :active.sync="addModal">
      <modal-add v-on:update="onUpdatedFunds"></modal-add>
    </b-modal>
  </section>
</template>

<script>
import Summary from "@/components/Summary";
import AddExpense from "@/components/AddExpense";
export default {
  name: "Expenses",
  components: {
    "modal-summary": Summary,
    "modal-add": AddExpense
  },
  data() {
    return {
      funds: [],
      summaryModal: false,
      addModal: false,
      error: ""
    };
  },
  mounted() {
    this.getExpenses();
  },
  methods: {
    getExpenses() {
      console.log("GET");
      this.$http
        .get("funds")
        .then(response => (this.funds = response.data.funds))
        .catch(e => (this.error = e));
    },
    onClickDelete(name) {
      this.$dialog.confirm({
        message: "Are you sure you want to delete expense " + name + "?",
        onConfirm: () => this.deleteExpense(name)
      });
    },
    deleteExpense(name) {
      this.$http
        .delete("funds/" + name)
        .then(() => {
          this.getExpenses();
          this.$toast.open({
            type: "is-success",
            message: "Expense removed"
          });
        })
        .catch(e => (this.error = e));
    },
    parseTimestamp(datetime) {
      return new Date(datetime).toLocaleDateString();
    },
    parseNumber(num) {
      return num.toLocaleString();
    },
    calculateSum(arr) {
      if (arr.length > 0)
        return arr.map(elem => elem.value).reduce((a, b) => a + b);
      else return 0;
    },
    onUpdatedFunds(newFunds) {
      console.log("UPDATED");
      this.funds = newFunds;
    }
  }
};
</script>

<style scoped>
.remove-expense {
  cursor: pointer;
}
</style>
