<template>
  <form action="" id="AddExpense">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add Expense</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input
            type="text"
            :value="name"
            v-model="name"
            placeholder="Name of the expense"
            required
          >
          </b-input>
        </b-field>

        <b-field label="Select a date">
          <b-datepicker
            v-model="date"
            :value="date"
            placeholder="Click to select..."
            icon="calendar-today"
          >
          </b-datepicker>
        </b-field>

        <b-field label="Value">
          <b-numberinput step="0.01" :value="value" v-model="value">
          </b-numberinput>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button is-primary" type="submit" @click="addExpense">
          Login
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
        .catch(e => (this.error = e));
    }
  }
};
</script>

<style scoped></style>
