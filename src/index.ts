import { getUserIP, getWeather } from "./requestors"
import "./style.css"

const userIPAddress = await getUserIP()

if (userIPAddress) {
  const weatherData = await getWeather(userIPAddress)

  if(weatherData) {
    console.dir(weatherData)
  }
}