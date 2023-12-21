import { HourlyForecast, parse } from "./interfaces";
import * as Plot from "@observablehq/plot";

function draw(day: HourlyForecast[]) {
  const flipChart = document.getElementById("hourly-forecast")

  const data = parse(day)

  const graph = Plot.plot({
    width: 3000,
    height: 750,
    grid: true,
    marks: [
      Plot.lineY(data, {x: "hour", y: "temperature_c"})
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