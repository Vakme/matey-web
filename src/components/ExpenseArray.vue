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

        <b-table-column
          field="value"
          :label="$t('expenses_modal.value')"
          numeric
        >
          {{ parseNumber(props.row.value) }} zł
        </b-table-column>

        <b-table-column label="Remove" centered v-if="removable">
          <span class="remove-expense">
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
          <p class="title">{{ parseNumber(calculateSum(funds)) }} zł</p>
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
    removable: Boolean
  },
  methods: {
    onClickDelete(row) {
      this.$dialog.confirm({
        message: this.$t("expenses.delete_dialog") + " " + row.name + "?",
        onConfirm: () => this.$emit("delete", row.id)
      });
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
    }
  }
};
</script>

<style scoped></style>
