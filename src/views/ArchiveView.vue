<template>
  <section id="Archive" class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title view-title">{{ $t("archive.title") }}</h1>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-button type="is-success" @click="openModal()">
              Show chart
            </b-button>
          </div>
        </div>
      </div>
      <b-tabs v-model="activeTab" class="box">
        <b-tab-item :label="$t('archive.my_tab')">
          <div v-for="(chunk, i) in myArchive" :key="i">
            <h2 class="subtitle">
              {{ $d(new Date(chunk[0].date), "month") | capitalize }}
            </h2>
            <expense-array :funds="chunk" :removable="false"></expense-array>
          </div>
        </b-tab-item>
        <b-tab-item :label="$t('archive.partner_tab')">
          <div v-for="(chunk, i) in partnerArchive" :key="i">
            <h2 class="subtitle">
              {{ $d(new Date(chunk[0].date), "month") | capitalize }}
            </h2>
            <expense-array :funds="chunk" :removable="false"></expense-array>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
    <b-modal :active.sync="isChartModalActive">
      <h1 class="title view-title inverted-title">Balance chart</h1>
      <div class="card">
        <div class="card-content">
          <line-chart :chartData="chartData" />
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import ExpenseArray from "../components/ExpenseArray";
import LineChart from "../components/LineChart";

export default {
  name: "Archive",
  components: {
    "expense-array": ExpenseArray,
    "line-chart": LineChart
  },
  data() {
    return {
      isChartModalActive: false,
      myArchive: [],
      partnerArchive: [],
      activeTab: 0,
      chartData: null
    };
  },
  mounted() {
    this.getArchive();
  },
  methods: {
    openModal() {
      const collection = this.myArchive
        .flat()
        .map(x => ({
          date: new Date(x.date).toDateString(),
          value: Number(x.value),
          type: x.type
        }))
        .reduce(
          (total, curr) => {
            const key = curr.type ? curr.type : "outcome";
            total[key][curr.date] =
              total[key][curr.date] + curr.value || curr.value;
            return total;
          },
          { income: {}, outcome: {} }
        );
      const collArr = {
        income: Object.keys(collection["income"]).map(function(key) {
          return { date: key, value: collection["income"][key] };
        }),
        outcome: Object.keys(collection["outcome"]).map(function(key) {
          return { date: key, value: collection["outcome"][key] };
        })
      };
      const labels = Array.from(
        new Set(
          collArr["outcome"]
            .map(x => this.$d(new Date(x.date), "short"))
            .concat(
              collArr["income"].map(x => this.$d(new Date(x.date), "short"))
            )
        )
      ).sort(this.sortDates);
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: "Income",
            borderColor: "rgb(92, 184, 92)",
            backgroundColor: "rgba(92, 184, 92, 0.1)",
            data: collArr.income.map(value => {
              return {
                x: this.$d(new Date(value.date), "short"),
                y: value.value
              };
            })
          },
          {
            label: "Outcome",
            borderColor: "rgb(217, 83, 79)",
            backgroundColor: "rgba(217, 83, 79, 0.1)",
            data: collArr.outcome.map(value => {
              return {
                x: this.$d(new Date(value.date), "short"),
                y: value.value
              };
            })
          }
        ]
      };
      this.isChartModalActive = true;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    sortDates(a, b) {
      a = new Date(a.date);
      b = new Date(b.date);
      return a < b ? -1 : a > b ? 1 : 0;
    },
    chunkArrayByMonth(arr) {
      if (arr.length === 0) return arr;
      arr = arr.sort(this.sortDates);
      let finalArr = [];
      let month = new Date(arr[0].date).getMonth(),
        newInd = 0;
      for (let ind in arr) {
        if (new Date(arr[ind].date).getMonth() !== month) {
          finalArr.push(arr.slice(newInd, ind));
          newInd = ind;
          month = new Date(arr[ind].date).getMonth();
        }
      }
      finalArr.push(arr.slice(newInd, arr.length));
      return finalArr;
    },
    getArchive() {
      this.$http.get("archive").then(response => {
        this.myArchive = this.chunkArrayByMonth(response.data.me.archive);
        this.partnerArchive = this.chunkArrayByMonth(
          response.data.partner.archive
        );
      });
    }
  },
  filters: {
    capitalize(val) {
      return val.toString().toLocaleUpperCase();
    }
  }
};
</script>

<style scoped>
.inverted-title {
  color: white;
}
</style>
