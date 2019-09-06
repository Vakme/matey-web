<template>
  <article class="expense-arr">
    <b-table
      class="table"
      :data="funds"
      :striped="true"
      :hoverable="true"
      :mobile-cards="true"
    >
      <template slot-scope="props">
        <b-table-column field="name" :label="$t('expenses_modal.name')">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column field="date" :label="$t('expenses_modal.date')">
          {{ parseTimestamp(props.row.date) }}
        </b-table-column>

        <b-table-column field="type" :label="$t('expenses_modal.type')">
          {{
            $t(
              "expenses.types." + (props.row.type ? props.row.type : "outcome")
            )
          }}
        </b-table-column>

        <b-table-column
          v-if="showTypes"
          field="subtype"
          :label="$t('expenses_modal.subtype')"
        >
          {{ $t("expenses.subtypes." + props.row.subtype) }}
        </b-table-column>

        <b-table-column
          field="value"
          :label="$t('expenses_modal.value')"
          numeric
        >
          {{ parseNumber(props.row.value) }} zł
        </b-table-column>

        <b-table-column label="Actions" centered v-if="removable">
          <span class="expense-icon">
            <b-icon
              icon="pencil"
              @click.native="onClickUpdate(props.row)"
            ></b-icon>
          </span>
          <span class="expense-icon">
            <b-icon
              icon="delete"
              @click.native="onClickDelete(props.row)"
            ></b-icon>
          </span>
        </b-table-column>
      </template>
    </b-table>
    <div class="level is-mobile">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ $t("expenses.amount") }}</p>
          <p class="title">{{ funds.length }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ $t("expenses_modal.value") }}</p>
          <p class="title">
            {{
              parseNumber(
                calculateSum(funds, "income") - calculateSum(funds, "outcome")
              )
            }}
            zł
          </p>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "ExpenseArray",
  props: {
    funds: Array,
    removable: Boolean,
    showTypes: Boolean
  },
  methods: {
    onClickDelete(row) {
      this.$buefy.dialog.confirm({
        message: this.$t("expenses.delete_dialog") + " " + row.name + "?",
        onConfirm: () => this.$emit("delete", row.id)
      });
    },
    onClickUpdate(row) {
      this.$emit("update", row);
    },
    parseTimestamp(datetime) {
      return new Date(datetime).toLocaleDateString();
    },
    parseNumber(num) {
      return num.toLocaleString();
    },
    calculateSum(arr, typeFilter) {
      return arr
        .map(elem => ({
          ...elem,
          type: typeof elem.type === "undefined" ? "outcome" : elem.type
        }))
        .filter(elem => elem.type === typeFilter)
        .map(elem => elem.value)
        .reduce((a, b) => a + b, 0);
    }
  }
};
</script>

<style scoped>
.expense-icon {
  cursor: pointer;
  margin: 0 5px;
}
</style>
