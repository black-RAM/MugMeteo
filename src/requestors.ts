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
      `https://api.weatherapi.com/v1/forecast.json?key=6cbf53650ce94daf8e3154314231712&q=${area}&days=3`,
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
  forecast: object;
}

interface Current {
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
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

export {getUserIP, getWeather, WeatherApiResponse}