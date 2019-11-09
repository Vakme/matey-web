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
                <p class="subtitle">
                  {{ funds.creditor }}
                </p>
              </div>
            </div>
            <div class="has-text-centered">
              <div>
                <p class="heading">{{ $t("expenses_modal.value") }}</p>
                <p class="subtitle">{{ funds.diff.toLocaleString() }} zł</p>
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
          <div class="tile is-child box is-centered">
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
            <apexchart
              ref="pieChart"
              type="donut"
              width="90%"
              :options="chartOptions"
              :series="series"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AuthStateMixin from "../mixins/AuthStateMixin";

export default {
  name: "home",
  mixins: [AuthStateMixin],
  data() {
    return {
      errors: "",
      funds: null,
      dates: [],
      selectedDate: "all",
      series: [],
      chartOptions: {
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  color: "#FFF"
                },
                value: {
                  show: true,
                  color: "#FFF",
                  formatter: function(value) {
                    return value + " zł";
                  }
                }
              }
            }
          }
        },
        colors: [
          "#c200fb",
          "#ec0868",
          "#fc2f00",
          "#ec7d10",
          "#ffbc0a",
          "#048a81",
          "#06d6a0",
          "#54c6eb",
          "#8a89c0",
          "#cda2ab"
        ],
        legend: {
          showForSingleSeries: true,
          labels: {
            colors: ["#fff"],
            useSeriesColors: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    sortDates(a, b) {
      a = new Date(a.year, a.month);
      b = new Date(b.year, b.month);
      return a < b ? -1 : a > b ? 1 : 0;
    },
    renderChart() {
      const value = this.selectedDate;
      let queryString = "";
      if (value !== "all") {
        queryString = `?year=${value.year}&month=${value.month}`;
      }
      this.$http.get("summary/chart" + queryString).then(response => {
        this.funds = response.data.summary;
        this.dates = response.data.dates.sort(this.sortDates);
        this.series = response.data.values;
        this.chartOptions = {
          ...this.chartOptions,
          labels: response.data.labels
        };
      });
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
