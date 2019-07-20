<template>
  <form action="" id="AddExpense">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("expenses_modal.add_title") }}</p>
      </header>
      <section class="modal-card-body">
        <b-field :label="$t('expenses_modal.name')">
          <b-input
            type="text"
            :value="name"
            v-model="name"
            :placeholder="$t('expenses_modal.name_placeholder')"
            required
          >
          </b-input>
        </b-field>

        <b-field :label="$t('expenses_modal.date')">
          <b-datepicker
            v-model="date"
            :value="date"
            :placeholder="$t('expenses_modal.date_placeholder')"
            icon="calendar-today"
          >
          </b-datepicker>
        </b-field>

        <b-field :label="$t('expenses_modal.value')">
          <b-numberinput step="0.01" :value="value" v-model="value">
          </b-numberinput>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          {{ $t("expenses_modal.close") }}
        </button>
        <button class="button is-primary" type="submit" @click="addExpense">
          {{ $t("expenses_modal.submit") }}
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: "Summary",
  data() {
    return {
      name: "",
      date: new Date(),
      value: 0,
      error: ""
    };
  },
  methods: {
    addExpense(e) {
      e.preventDefault();
      let newExpense = {
        name: this.name,
        date: this.date,
        value: this.value
      };
      this.$http
        .post("funds", newExpense)
        .then(response => {
          console.log(response.data);
          this.$emit("update", response.data.funds);
          this.$toast.open({
            type: "is-success",
            message: "Expense added"
          });
          this.$parent.close();
        })
        .catch(() =>
          this.$toast.open({
            type: "is-danger",
            message: "ERROR: Try later"
          })
        );
    }
  }
};
</script>

<style scoped></style>
