import { getDayName } from "./dateProcessors";
import { DailyForecast } from "./interfaces";
import * as Plot from "@observablehq/plot";

// for continuity when graphs change
let currentTitle = "Temperature (°C)"
let currentVariable = "temp_c"

function createTabs(dataPoints: DailyForecast[]) {
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
      currentTitle = title
      currentVariable = variable

      draw(dataPoints)
    })
    tabList.appendChild(tab)
  }

  for (const [title, variable] of Object.entries(tabData)) {
    createTab(title, variable)
  }
  
  return tabList
}

function draw(days: DailyForecast[]) {
  const flipChart = document.getElementById("hourly-forecast")
  const tabs = createTabs(days)

  const graph = Plot.plot({
    className: "graph",
    height: 200,
    marginBottom: 40,
    grid: true,
    color: {
      legend: true
    },
    marks: [
      days.map(
        day => Plot.lineY(day.hour, {
          stroke: (d) => getDayName(day.date),
          x: (d) => d["time"].slice(11, 13),
          y: currentVariable,
        })
      ),
    ],
    x: {
      label: "Hour",
    },
    y: {
      label: currentTitle,
      ticks: 5
    },
  })

  if(flipChart) {
    flipChart.innerHTML = ""
    flipChart.appendChild(tabs)
    flipChart.appendChild(graph)
  }
}

class GraphManager {
  selections: DailyForecast[]

  constructor() {
    this.selections = []
  }

  add(selection: DailyForecast) {
    this.selections.push(selection)
    draw(this.selections)
  }

  remove(selection: DailyForecast) {
    const isLongEnough = this.selections.length > 1

    if(isLongEnough) {
      this.selections = this.selections.filter(s => s !== selection)
      draw(this.selections)
    }

    return isLongEnough
  }

  refresh() {
    this.selections = []
  }
}

const graphManager = new GraphManager()

export default graphManager