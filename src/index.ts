import { getUserIP, getWeather } from "./requestors"

getUserIP().then(ip => getWeather(ip || "London"))
