
import { getWeather } from "./requestors"
import "./style.css"

function setUpSearchBar() {
  const searchBar = document.querySelector<HTMLFormElement>("form#search-bar")
  const searchInput = document.querySelector<HTMLInputElement>("input[type='search']")

  if(searchBar && searchInput) {
    searchBar.addEventListener("submit", function(event) {
      event.preventDefault()
      getWeather(searchInput.value)
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

function parse(weatherData: object) {
  const parsedData = weatherData

  display(parsedData)
}

function display(info: object) {
  console.dir(info)
}

setUpSearchBar()
darkModeToggle()

export default parse