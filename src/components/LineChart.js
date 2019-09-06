import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData"],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  mounted() {
    console.log("Chart mounted");
    this.renderChart(this.chartData, this.options);
  }
};
