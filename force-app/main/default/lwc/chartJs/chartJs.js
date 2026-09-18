// ...existing code...
import { LightningElement } from "lwc";
import CHART_JS from "@salesforce/resourceUrl/ChartJS";
import { loadScript } from "lightning/platformResourceLoader";

export default class ChartJs extends LightningElement {
  chartInitialized = false;
  chartJsPromise;

  renderedCallback() {
    if (this.chartInitialized) return;

    if (!this.chartJsPromise) {
      // If your static resource is a zip containing chart.umd.min.js at root use:
      const url = CHART_JS.endsWith(".js")
        ? CHART_JS
        : CHART_JS + "/chart.umd.min.js";

      this.chartJsPromise = loadScript(this, url)
        .then(() => {
          this.initializeChart();
        })
        .catch((error) => {
          console.error("Error loading Chart.js", error);
        });
    }
  }

  initializeChart() {
    const canvas = this.template.querySelector("canvas");
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }
    const ctx = canvas.getContext("2d");

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
          y: { beginAtZero: true }
        }
      }
    });

    this.chartInitialized = true;
  }
}
// ...existing code...
