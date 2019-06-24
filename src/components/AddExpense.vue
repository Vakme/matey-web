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
            placeholder="Click to select..."
            icon="calendar-today"
          >
          </b-datepicker>
        </b-field>

        <b-field label="Value">
          <b-numberinput step="0.01" v-model="value"> </b-numberinput>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button class="button is-primary">Login</button>
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
      date: "",
      value: 0,
      error: ""
    };
  }
};
</script>

<style scoped></style>
