import { mixins, Pie } from "vue-chartjs";
import "chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes";
import { HueCircle19 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau";
import Chart from "chart.js";
const { reactiveProp } = mixins;
Chart.defaults.global.defaultFontColor = "rgb(222, 229, 237)";

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: ["chartData"],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        colorschemes: {
          scheme: HueCircle19
        }
      }
    }
  }),
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
