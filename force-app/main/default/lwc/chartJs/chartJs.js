import { LightningElement } from "lwc";
import CHART_JS from "@salesforce/resourceUrl/ChartJS";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
export default class ChartJs extends LightningElement {
  chartInitialized = false;

  renderedCallback() {
    if (this.chartInitialized) {
      return;
    }

    this.chartInitialized = true;
    this.loadAndInitializeChart();
  }
  //Kickstarter to call your initialChart() method to draw the desired chart.
  async loadAndInitializeChart() {
    try {
      // You can await Promise.all directly
      await Promise.all([loadScript(this, CHART_JS)]);

      this.initializeChart();
    } catch (error) {
      console.error(error);
    }
  }

  initializeChart() {
    console.log("initializeChart called");
    console.log("chart ref:", this.refs.chart);
    const ctx = this.refs.myChart;

    this.chart = new window.Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
