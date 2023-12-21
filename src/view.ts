import { WeatherApiResponse, WeatherForecastResponse } from "./interfaces";
import getForecast from "./requestors"
import "./style.css"

function setUpSearchBar() {
  const searchBar = document.querySelector<HTMLFormElement>("form#search-bar")
  const searchInput = document.querySelector<HTMLInputElement>("input[type='search']")

  if(searchBar && searchInput) {
    searchBar.addEventListener("submit", function(event) {
      event.preventDefault()
      getForecast(searchInput.value)
    })
  }
}

function darkModeToggle() {
  const toggle = document.querySelector<HTMLButtonElement>("button#toggle")
  const icon = document.getElementById("toggle-icon")
  let isDark = false

  if(toggle && icon) 
    toggle.addEventListener("click", () => {
      isDark = !isDark

      if(isDark) {
        document.body.classList.add("dark")
      } else {
        document.body.classList.remove("dark")
      }

      icon.classList.remove(isDark? "bi-sun" : "bi-moon-fill")
      icon.classList.add(isDark? "bi-moon-fill" : "bi-sun")
    })
}

function formatLocaleTime(epoch: number, timeZone: string): string {
  const epochMilliseconds = epoch * 1000;
  const date = new Date(epochMilliseconds);

  const options: Intl.DateTimeFormatOptions = { timeZone, hour: '2-digit', minute: '2-digit' };
  const formattedTime = date.toLocaleTimeString('en-US', options);

  return formattedTime;
}

function getDayName(dateString: string) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  
  return daysOfWeek[dayIndex];
}

function displayCurrent(data: WeatherApiResponse) {
  const currentConditionText = document.querySelector<HTMLHeadingElement>(".weather-condition-text"),
    locationText = document.querySelector<HTMLHeadingElement>(".location-text"),
    temperatureText = document.querySelector<HTMLParagraphElement>(".temperature-text"),
    windText = document.querySelector<HTMLParagraphElement>(".wind-text"),
    humidityText = document.querySelector<HTMLParagraphElement>(".humidity-text"),
    cloudCoverText = document.querySelector<HTMLParagraphElement>(".cloud-cover-text"),
    visibilityText = document.querySelector<HTMLParagraphElement>(".visibility-text"),
    clock = document.querySelector<HTMLTimeElement>(".clock")

  if(!(currentConditionText && locationText && temperatureText && windText && humidityText && cloudCoverText && visibilityText && clock)) return;

  currentConditionText.innerText = data.current.condition.text
  locationText.innerText = `${data.location.name}, ${data.location.country}`
  temperatureText.innerText = data.current.temp_c.toString()
  windText.innerText = `Wind: ${data.current.wind_kph}km/h`
  humidityText.innerText = `Humidity: ${data.current.humidity}%`
  cloudCoverText.innerText = `Cloud Cover: ${data.current.cloud}%`
  visibilityText.innerText = `Visibility: ${data.current.vis_km}km`
  clock.dateTime = data.location.localtime
  clock.innerText = formatLocaleTime(data.location.localtime_epoch, data.location.tz_id)
}

function displayForecast(data: WeatherForecastResponse) {
  displayCurrent(data)

  const tableBody = document.querySelector<HTMLTableSectionElement>("tbody#forecast-table")
  
  if(!tableBody) return

  tableBody.innerHTML = "" // clear
  
  // display data for each day
  for (const dayForecast of data.forecast.forecastday) {
    const row = document.createElement("tr"),
      dayCell = document.createElement("td"),
      iconCell = document.createElement("td"),
      tempCell = document.createElement("td"),
      humidCell = document.createElement("td"),
      rainCell = document.createElement("td");

    dayCell.innerText = getDayName(dayForecast.date)
    iconCell.innerHTML = `<img src=${dayForecast.day.condition.icon} alt=${dayForecast.day.condition.text}>`
    tempCell.innerText = `${dayForecast.day.avgtemp_c}C`
    humidCell.innerText = `${dayForecast.day.avghumidity}%`
    rainCell.innerText = `${dayForecast.day.daily_chance_of_rain}%`

    row.appendChild(dayCell)
    row.appendChild(iconCell)
    row.appendChild(tempCell)
    row.appendChild(humidCell)
    row.appendChild(rainCell)

    tableBody.appendChild(row)
  }
}

setUpSearchBar()
darkModeToggle()

export { displayForecast, displayCurrent }