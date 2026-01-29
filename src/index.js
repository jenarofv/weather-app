import "./style.css";
import Homepage from "./homepage.js";

const homepage = new Homepage("Weather App");
homepage.btn.addEventListener("click",
  () => fetchForecast(homepage.location, homepage.metric)
);

function titleCase(string) {
  let newString = string.at(0).toLocaleUpperCase();
  for (const letter of string.slice(1)) {
    newString += letter;
  }
  return newString;
}

async function fetchForecast(location, metric) {
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
    const symbol = metric ? "°C" : "°F";
    const jsonData = await response.json();
    const linkToMap = document.querySelector(`.link-to-map`);
    const locationTitleCase = titleCase(jsonData.resolvedAddress)
    const locationLink = `https://www.openstreetmap.org/#map=13/${jsonData.latitude}/${jsonData.longitude}`
    linkToMap.innerHTML = `view ${locationTitleCase} on <a href="${locationLink}" target="_blank">OpenStreetMap<a/>.`
    for (let i = 0; i < 7; i++){
      const currentDay = jsonData.days[i];
      const day = document.getElementById(`day-${i}`)
      day.classList.remove("hidden");
      const icon = document.querySelector(`#day-${i} .weather-icon`)
      const description = document.querySelector(`#day-${i} .description`);
      const dayName = document.querySelector(`#day-${i} .day-name`);
      const temps = document.querySelector(`#day-${i} .temps`);
      const suntimes = document.querySelector(`#day-${i} .suntimes`);
      temps.innerHTML = `<p>Min: ${currentDay.tempmin}${symbol}</p><p>Max: ${currentDay.tempmax}${symbol}</p>`;
      suntimes.innerHTML = `<p>sunrise: ${currentDay.sunrise.slice(0,5)}</p>sunset: ${currentDay.sunset.slice(0,5)}</p>`;
      day.classList.add("nice-border");
      dayName.innerText = dayNames[(new Date(currentDay.datetime)).getDay()];
      description.innerText = currentDay.description;
      icon.innerText = icons[currentDay.icon];
    }
    localStorage.setItem("forecast", JSON.stringify(jsonData));
  } catch (e) {
    alert("We could not find any location with that name");
    console.log(e);
  }
}
