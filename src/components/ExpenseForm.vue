<template>
  <form action="" id="AddExpense">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t("expenses_modal.add_title") }}</p>
      </header>
      <section class="modal-card-body">
        <div class="level">
          <b-field
            :label="$t('expenses_modal.name')"
            :type="{ 'is-danger': hasError }"
            :message="{ 'Field cannot be empty': hasError }"
          >
            <b-autocomplete
              v-model="name"
              ref="autocomplete"
              :data="names"
              field="name"
              :open-on-focus="true"
              :placeholder="$t('expenses_modal.name_placeholder')"
              required
              :class="'my-autocomplete'"
            >
              <template slot="footer">
                <a @click="showAddType">
                  <span> {{ $t("expenses.expense_types.add_new") }} </span>
                </a>
              </template>
              <template slot="empty">
                > {{ $t("expenses.expense_types.no_results") + name }}</template
              >
            </b-autocomplete>
          </b-field>
          <b-field :label="$t('expenses_modal.description')">
            <b-input maxlength="50" v-model="description"></b-input>
          </b-field>
        </div>
        <div class="level is-mobile">
          <b-field :label="$t('expenses_modal.type')">
            <b-select :placeholder="$t('expenses_modal.type')" v-model="type">
              <option v-for="option in types" :value="option" :key="option">
                {{ $t("expenses.types." + option) }}
              </option>
            </b-select>
          </b-field>

          <b-field :label="$t('expenses_modal.subtype')">
            <b-select
              :placeholder="$t('expenses_modal.subtype')"
              v-model="subtype"
            >
              <option v-for="option in subtypes" :value="option" :key="option">
                {{ $t("expenses.subtypes." + option) }}
              </option>
            </b-select>
          </b-field>
        </div>

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
      description: "",
      names: [],
      type: "outcome",
      types: ["income", "outcome"],
      subtype: "common",
      subtypes: ["common", "personal"],
      hasError: false
    };
  },
  props: {
    expense: Object
  },
  mounted: function() {
    if (this.expense) {
      this.name = this.expense.name;
      this.description = this.expense.description;
      this.date = new Date(this.expense.date);
      this.value = this.expense.value;
      this.subtype = this.expense.subtype;
      this.type = this.expense.type;
    }
    this.$http.get("types/").then(response => {
      this.names = response.data;
    });
  },
  methods: {
    showAddType() {
      this.$buefy.dialog.prompt({
        message: `Expense type`,
        inputAttrs: {
          placeholder: "e.g. Shopping",
          maxlength: 20,
          value: this.name
        },
        confirmText: "Add",
        onConfirm: value => {
          this.$http.post("/types", { name: value }).then(response => {
            this.names = response.data;
            this.$refs.autocomplete.setSelected(value);
          });
        }
      });
    },
    addExpense(e) {
      e.preventDefault();
      if (this.name.length === 0) {
        this.hasError = true;
        return;
      }
      let newExpense = {
        name: this.name,
        date: this.date,
        description: this.description,
        value: this.value,
        subtype: this.subtype,
        type: this.type
      };
      this.hasError = false;
      this.$http.post("funds", newExpense).then(response => {
        this.$emit("update", response.data);
        this.$buefy.toast.open({
          type: "is-success",
          message: "Expense added"
        });
        this.$parent.close();
      });
    },
    editExpense(e) {
      e.preventDefault();
      let newExpense = {
        name: this.name,
        description: this.description,
        date: this.date,
        value: this.value,
        subtype: this.subtype,
        type: this.type
      };
      this.$http.put("funds/" + this.expense.id, newExpense).then(response => {
        this.$emit("update", response.data);
        this.$buefy.toast.open({
          type: "is-success",
          message: "Expense changed"
        });
        this.$parent.close();
      });
    },
    closeModal() {
      this.name = "";
      this.date = new Date();
      this.value = 0;
      this.description = "";
      this.$parent.close();
    }
  }
};
</script>

<style>
.modal-card-foot {
  justify-content: space-between;
}
.my-autocomplete .dropdown-menu.is-opened-top {
  height: 50px;
}
</style>
