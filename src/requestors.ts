import display from "./view"

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

async function getWeather(area: string) {
  try{
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6cbf53650ce94daf8e3154314231712&q=${area}&days=8`,
      { 'mode': "cors"}
      )
    const data: WeatherApiResponse = await response.json()
    display(data)
  } catch(error) {
    console.error('Error fetching weather data:\n', error)
  }
}

interface WeatherApiResponse{
  location: Location;
  current: Current;
  forecast: {
    forecastday: DailyForecast[]
  };
}

interface Current {
  temp_c: number;
  condition: Condition;
  wind_kph: number;
  humidity: number;
  cloud: number;
  vis_km: number
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

interface DailyForecast {
  date: string;
  day: DayOverview;
  hour: HourlyForecast[];
}

interface DayOverview {
  avgtemp_c: number;
  avghumidity: number;
  daily_chance_of_rain: number;
  condition: Condition;
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
  text: string;
  icon: string;
}

export {getUserIP, getWeather, WeatherApiResponse}