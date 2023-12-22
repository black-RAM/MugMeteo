import { HourlyForecast } from "./interfaces";
import * as Plot from "@observablehq/plot";

function draw(day: HourlyForecast[]) {
  const flipChart = document.getElementById("hourly-forecast")

  const graph = Plot.plot({
    height: 200,
    marginBottom: 40,
    grid: true,
    marks: [
      Plot.lineY(day, {x: (d) => d["time"].slice(11, 13), y: "temp_c"})
    ],
    x: {
      label: "Hour",
    },
    y: {
      label: "Temperature (°C)",
      ticks: 5
    },
  })

  if(flipChart) {
    flipChart.innerHTML = ""
    flipChart.appendChild(graph)
  }
}

export default draw