import "./style.css";
import Homepage from "./homepage.js";

const homepage = new Homepage("Weather App");
homepage.btn.addEventListener("click", () => fetchForecast(homepage.location)); 

async function fetchForecast(location, metric=true) {
  const icons = {
    snow : "❄️",
    rain : "🌧️",
    fog : "🌫️",
    wind : "🌬️",
    cloudy : "☁️",
    "partly-cloudy-day" : "🌤️",
    "partly-cloudy-night" : "☁️",
    "clear-day" : "🌞",
    "clear-night" : "🌌",
  }
  const dayNames = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Thu"
  }
  const API = '3UTAV24BZFVF42D9WQCK72EFK';
  try {
    let response ;
    if (metric) {
      response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API}`);
    } else {
      response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API}`);
    }
    const jsonData = await response.json();
    for (let i = 0; i < 7; i++){
      const day = document.getElementById(`day-${i}`)
      const icon = document.querySelector(`#day-${i} .weather-icon`)
      const description = document.querySelector(`#day-${i} .description`);
      const dayName = document.querySelector(`#day-${i} .day-name`);
      day.classList.add("nice-border");
      dayName.innerText = dayNames[(new Date(jsonData.days[i].datetime)).getDay()];
      description.innerText = jsonData.days[i].description;
      icon.innerText = icons[jsonData.days[i].icon];
    }
    localStorage.setItem("forecast", JSON.stringify(jsonData));
  } catch (e) {
    alert("We could not find any location with that name");
    console.log(e);
  }
}
