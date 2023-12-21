import { displayCurrent, displayForecast } from "./view"

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
    displayForecast(data)

    setInterval(() => {updateCurrent(area)}, 1000*60)
  } catch(error) {
    console.error('Error fetching forecast data:\n', error)
  }
}

async function updateCurrent(area: string) {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=6cbf53650ce94daf8e3154314231712&q=${area}`)
    const data: WeatherApiResponse = await response.json()
    displayCurrent(data)
  } catch (error) {
    console.error('Error fetching current data\n', error)
  }  
}

interface WeatherApiResponse{
  location: Location;
  current: Current;
}
interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
  localtime_epoch: number;
  tz_id: string;
}
interface Current extends Condition {
  temp_c: number;
  wind_kph: number;
  humidity: number;
  cloud: number;
  vis_km: number
}

interface WeatherForecastResponse extends WeatherApiResponse {
  forecast: {
    forecastday: DailyForecast[];
  };
}
interface DailyForecast {
  date: string;
  day: DayOverview;
  hour: HourlyForecast[];
}
interface DayOverview extends Condition {
  avgtemp_c: number;
  avghumidity: number;
  daily_chance_of_rain: number;
}
interface HourlyForecast {
  time: string;
  temp_c: number;
  wind_kph: number;
  humidity: number;
  cloud: number;
  precip_mm: number;
  uv: number;
}
interface Condition {
  condition: {
    text: string;
    icon: string;
  }
}

export {getUserIP, getForecast, WeatherApiResponse, WeatherForecastResponse}