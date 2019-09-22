import Chart from "chart.js";

Chart.defaults.global.defaultFontColor = "rgb(222, 229, 237)";

import { mixins, Pie } from "vue-chartjs";
const { reactiveProp } = mixins;
import "chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes";
import { HueCircle19 } from "chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau";

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
