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
              {{ $t("archive.show_chart") }}
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
      <h1 class="title view-title inverted-title">
        {{ $t("archive.balance_chart") }}
      </h1>
      <div class="card">
        <div class="card-content">
          <apexchart
            ref="barChart"
            type="bar"
            width="100%"
            height="100%"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
import ExpenseArray from "../components/ExpenseArray";

export default {
  name: "Archive",
  components: {
    "expense-array": ExpenseArray
  },
  data() {
    return {
      isChartModalActive: false,
      myArchive: [],
      partnerArchive: [],
      activeTab: 0,
      chartData: null,
      series: [],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          }
        },
        legend: {
          showForSingleSeries: true,
          labels: {
            colors: ["#fff"],
            useSeriesColors: true
          }
        },
        tooltip: {
          theme: "dark"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              position: "bottom",
              orientation: "vertical"
            }
          }
        },
        dataLabels: {
          offsetY: 10,
          formatter: function(val) {
            return val.toFixed(2);
          },
          style: {
            fontSize: "10px"
          }
        },
        colors: ["#048a81", "#fc2f00", "#fff"],
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: "#FFF"
            }
          }
        },
        yaxis: {
          title: {
            text: "[PLN]",
            style: {
              color: "#FFF"
            }
          },
          labels: {
            formatter: function(val) {
              return val.toFixed(2);
            },
            style: {
              color: "#FFF"
            }
          }
        }
      }
    };
  },
  mounted() {
    this.getArchive();
  },
  methods: {
    openModal() {
      this.$http.get("summary/trendChart").then(response => {
        const values = [];
        for (let key of Object.keys(response.data.months)) {
          values.push({
            name: this.$t("expenses.types." + key),
            type: "column",
            data: response.data.months[key]
          });
        }
        const categories = response.data.categories.map(c =>
          this.$d(new Date(c.year, c.month), "month_year")
        );
        this.series = values;
        this.chartOptions = {
          ...this.chartOptions,
          xaxis: {
            ...this.chartOptions.xaxis,
            categories
          }
        };
      });
      this.isChartModalActive = true;
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
.card-content {
  height: 80vh;
}
</style>
