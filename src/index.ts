import { getUserIP, getForecast } from "./requestors"

getUserIP().then(ip => getForecast(ip || "London"))
