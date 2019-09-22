<template>
  <section class="home section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-4 is-vertical is-parent">
          <div class="tile is-child box">
            <p class="title">{{ $t("home.greetings") }}, {{ username }}!</p>
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
          <div class="tile is-child box">
            <p class="title">{{ $t("home.current_state") }}</p>
            <div class="has-text-centered">
              <div>
                <p class="heading">{{ $t("expenses_modal.return_to") }}</p>
                <p class="subtitle">{{ funds.summary.creditor }}</p>
              </div>
            </div>
            <div class="has-text-centered">
              <div>
                <p class="heading">{{ $t("expenses_modal.value") }}</p>
                <p class="subtitle">
                  {{ funds.summary.diff.toLocaleString() }} zł
                </p>
              </div>
            </div>
          </div>
          <div class="tile is-child box">
            <p class="title">{{ $t("home.expenses_tile") }}</p>
            <div class="buttons">
              <b-button
                class="button"
                type="is-primary"
                @click="handleClickExpenses"
                >{{ $t("expenses.add_new") }}</b-button
              >
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box">
            <b-select
              placeholder="Select a date"
              v-model="selectedDate"
              @input="renderChart"
              size="is-small"
              expanded
            >
              <option value="all">All</option>
              <option
                v-for="option in dates"
                :value="option"
                :key="$d(new Date(option.year, option.month), 'month_year')"
              >
                {{ $d(new Date(option.year, option.month), "month_year") }}
              </option>
            </b-select>
            <pie-chart :chartData="chartData" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

import AuthStateMixin from "../mixins/AuthStateMixin";
import PieChart from "../components/PieChart";

export default {
  name: "home",
  components: {
    "pie-chart": PieChart
  },
  mixins: [AuthStateMixin],
  data() {
    return {
      errors: "",
      funds: null,
      chartData: null,
      labels: null,
      dates: null,
      selectedDate: "all"
    };
  },
  mounted() {
    this.getChartData();
  },
  methods: {
    getChartData() {
      this.$http.get("summary/chart").then(response => {
        this.funds = response.data;
        this.prepareChart();
      });
    },
    prepareChart() {
      this.labels = Array.from(
        new Set(
          this.funds["incomes"]
            .map(x => x.name)
            .concat(this.funds["outcomes"].map(x => x.name))
        )
      );
      this.dates = this.funds["incomes"]
        .map(x => {
          return {
            year: x.year,
            month: x.month
          };
        })
        .concat(
          this.funds["outcomes"].map(x => {
            return {
              year: x.year,
              month: x.month
            };
          })
        )
        .filter((el, index, arr) => {
          return (
            index ===
            arr.findIndex(obj => {
              return JSON.stringify(obj) === JSON.stringify(el);
            })
          );
        })
        .sort(this.sortDates);
      this.renderChart(this.selectedDate);
    },
    sortDates(a, b) {
      a = new Date(a.year, a.month);
      b = new Date(b.year, b.month);
      return a < b ? -1 : a > b ? 1 : 0;
    },
    renderChart(value) {
      let currMonth = this.funds.outcomes.concat(this.funds.incomes);
      let label = value;
      if (value !== "all") {
        currMonth = currMonth.filter(
          x => x.year === value.year && x.month === value.month
        );
        label = this.$d(new Date(value.year, value.month), "month_year");
      }
      const currData = [];
      for (const label of this.labels) {
        if (value === "all") {
          currData.push(
            currMonth
              .filter(x => x.name === label)
              .map(x => x.value)
              .reduce((p, n) => p + n)
          );
        } else {
          currData.push(
            currMonth.findIndex(x => x.name === label) < 0
              ? 0
              : currMonth.find(x => x.name === label).value
          );
        }
      }
      this.chartData = {
        labels: this.labels,
        datasets: [
          {
            label: label,
            data: currData
          }
        ]
      };
    },
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
