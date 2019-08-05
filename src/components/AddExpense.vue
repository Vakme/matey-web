<template>
  <form action="" id="AddExpense">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("expenses_modal.add_title") }}</p>
      </header>
      <section class="modal-card-body">
        <b-field
          :label="$t('expenses_modal.name')"
          :type="{ 'is-danger': hasError }"
          :message="{ 'Field cannot be empty': hasError }"
        >
          <b-input
            type="text"
            :value="name"
            v-model="name"
            :placeholder="$t('expenses_modal.name_placeholder')"
            required
          >
          </b-input>
        </b-field>

        <b-field :label="$t('expenses_modal.type')">
          <b-select :placeholder="$t('expenses_modal.type')" v-model="type">
            <option v-for="option in types" :value="option" :key="option">
              {{ option }}
            </option>
          </b-select>
        </b-field>

        <b-field :label="$t('expenses_modal.value')">
          <b-numberinput step="0.01" :value="value" v-model="value">
          </b-numberinput>
        </b-field>

        <b-field :label="$t('expenses_modal.date')">
          <b-datepicker
            v-model="date"
            :value="date"
            :placeholder="$t('expenses_modal.date_placeholder')"
            size="is-small"
            icon="calendar-today"
          >
          </b-datepicker>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="closeModal()">
          {{ $t("expenses_modal.close") }}
        </button>
        <button
          class="button is-primary"
          type="submit"
          @click="editExpense"
          v-if="expense"
        >
          {{ $t("expenses_modal.submit") }}
        </button>
        <button
          class="button is-primary"
          type="submit"
          @click="addExpense"
          v-else
        >
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
      error: "",
      type: "personal",
      types: ["common", "personal"],
      hasError: false
    };
  },
  props: {
    expense: Object
  },
  mounted: function() {
    if (this.expense) {
      this.name = this.expense.name;
      this.date = this.expense.date;
      this.value = this.expense.value;
      this.type = this.expense.type;
    }
  },
  methods: {
    addExpense(e) {
      e.preventDefault();
      if (this.name.length === 0) {
        this.hasError = true;
        return;
      }
      let newExpense = {
        name: this.name,
        date: this.date,
        value: this.value,
        type: this.type
      };
      this.hasError = false;
      this.$http
        .post("funds", newExpense)
        .then(response => {
          this.$emit("update", response.data);
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
    },
    editExpense(e) {
      e.preventDefault();
      let newExpense = {
        name: this.name,
        date: this.date,
        value: this.value,
        type: this.type
      };
      this.$http
        .put("funds/" + this.expense.id, newExpense)
        .then(response => {
          this.$emit("update", response.data);
          this.$toast.open({
            type: "is-success",
            message: "Expense changed"
          });
          this.$parent.close();
        })
        .catch(() =>
          this.$toast.open({
            type: "is-danger",
            message: "ERROR: Try later"
          })
        );
    },
    closeModal() {
      this.expense = null;
      this.name = "";
      this.date = new Date();
      this.value = 0;
      this.$parent.close();
    }
  }
};
</script>

<style scoped>
.modal-card-foot {
  justify-content: space-between;
}
</style>
