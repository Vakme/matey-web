<template>
  <section id="Expenses" class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title view-title">{{ $t("expenses.title") }}</h1>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-button type="is-success" @click="updateExpense(null)">{{
              $t("expenses.add_new")
            }}</b-button>
          </div>
        </div>
      </div>
      <b-tabs v-model="activeTab" class="box">
        <b-tab-item :label="$t('expenses.my_tab')">
          <expense-array
            :funds="funds"
            :removable="true"
            :showTypes="true"
            @delete="deleteExpense"
            @update="updateExpense"
          ></expense-array>
        </b-tab-item>
        <b-tab-item :label="$t('expenses.partner_tab')">
          <expense-array
            :funds="partnerFunds"
            :removable="false"
            :showTypes="true"
          ></expense-array>
        </b-tab-item>
      </b-tabs>
      <b-button
        class="button is-fullwidth"
        type="is-primary"
        @click="summaryModal = true"
        >{{ $t("expenses.sumup_button") }}</b-button
      >
    </div>
    <b-modal :active.sync="summaryModal" has-modal-card>
      <modal-summary></modal-summary>
    </b-modal>
    <b-modal :active.sync="addModal">
      <modal-add @update="onUpdatedFunds" :expense="currentExpense"></modal-add>
    </b-modal>
  </section>
</template>

<script>
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseArray from "@/components/ExpenseArray";
import ExpenseForm from "@/components/ExpenseForm";
export default {
  name: "Expenses",
  components: {
    "modal-summary": ExpenseSummary,
    "modal-add": ExpenseForm,
    "expense-array": ExpenseArray
  },
  data() {
    return {
      funds: [],
      partnerFunds: [],
      summaryModal: false,
      addModal: false,
      error: "",
      activeTab: 0,
      currentExpense: null
    };
  },
  mounted() {
    this.getExpenses();
  },
  methods: {
    getExpenses() {
      this.$http.get("funds").then(response => {
        console.log(response.data);
        this.funds = response.data.me.funds;
        this.partnerFunds = response.data.partner.funds;
      });
    },
    deleteExpense(id) {
      this.$http.delete("funds/" + id).then(() => {
        this.getExpenses();
        this.$buefy.toast.open({
          type: "is-success",
          message: "Expense removed"
        });
      });
    },
    onUpdatedFunds(newData) {
      console.log("UPDATED");
      this.funds = newData.me.funds;
      this.partnerFunds = newData.partner.funds;
    },
    updateExpense(newData) {
      this.currentExpense = newData;
      this.addModal = true;
    }
  }
};
</script>

<style scoped></style>
