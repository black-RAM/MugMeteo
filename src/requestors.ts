import { WeatherApiResponse, WeatherForecastResponse } from "./interfaces"
import { displayCurrent, displayForecast, showError } from "./view"

let updater: NodeJS.Timeout | null = null

async function getUserIP() {
  try {
    const response = await fetch('https://ipinfo.io/json')
    const data = await response.json()
    const userIP:string = data.ip
    return userIP
  } catch (error) {
    console.error('Error fetching IP address:\n', error)
    return null
  }
}

async function getForecast(area: string) {
  try{
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6cbf53650ce94daf8e3154314231712&q=${area}&days=8`,
      { 'mode': "cors"}
      )
    const data: WeatherForecastResponse = await response.json()

    if(!data.error) {
      displayForecast(data)

      if (updater) {
        clearInterval(updater)
      }
      updater = setInterval(updateCurrent, 1000*60, area)
    } else {
      if(data.error.code == 1006) {
        showError()
      } else {
        console.error("Bad response:\n", data.error)
      }
    }
  } catch(error) {
    console.error('Error fetching forecast data:\n', error)
  }
}

async function updateCurrent(area: string) {
  try {
    console.info('updating current weather data...')
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=6cbf53650ce94daf8e3154314231712&q=${area}`)
    const data: WeatherApiResponse = await response.json()
    displayCurrent(data)
  } catch (error) {
    console.error('Error fetching current data\n', error)
  }  
}

getUserIP().then(ip => getForecast(ip || "London"))

export default getForecast