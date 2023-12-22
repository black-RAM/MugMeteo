import { HourlyForecast } from "./interfaces";
import * as Plot from "@observablehq/plot";

function createTabs(dataPoints: HourlyForecast[]) {
  const tabList = document.createElement("ul")
  const tabData = {
    "Temperature (°C)": "temp_c",
    "Wind Speed (km/h)": "wind_kph",
    "Humidity (%)": "humidity",
    "Cloud Cover (%)": "cloud",
    "Rainfall (mm)": "precip_mm",
    "UV Index": "uv"
  }

  const createTab = (title: string, variable: string) => {
    const tab = document.createElement("li")
    tab.innerText = title
    tab.title = title

    tab.addEventListener("click", () => {
      draw(dataPoints, title, variable)
    })
    tabList.appendChild(tab)
  }

  for (const [title, variable] of Object.entries(tabData)) {
    createTab(title, variable)
  }
  
  return tabList
}

function draw(day: HourlyForecast[], title = "Temperature (°C)", variable = "temp_c") {
  const flipChart = document.getElementById("hourly-forecast")
  const tabs = createTabs(day)

  const graph = Plot.plot({
    height: 200,
    marginBottom: 40,
    grid: true,
    marks: [
      Plot.lineY(day, {x: (d) => d["time"].slice(11, 13), y: variable})
    ],
    x: {
      label: "Hour",
    },
    y: {
      label: title,
      ticks: 5
    },
  })

  if(flipChart) {
    flipChart.innerHTML = ""
    flipChart.appendChild(tabs)
    flipChart.appendChild(graph)
  }
}

export default draw