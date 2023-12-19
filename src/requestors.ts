import parse from "./view"

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
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=6cbf53650ce94daf8e3154314231712&q=${area}&aqi=yes`)
    const data:object = await response.json()
    parse(data)
  } catch(error) {
    console.error('Error fetching weather data:\n', error)
  }
}

export {getUserIP, getWeather}