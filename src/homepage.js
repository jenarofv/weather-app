class Homepage {
  constructor(title) {
    const body = document.querySelector("body");
    const titleContainer = document.createElement("h1");
    titleContainer.id = "title";
    body.appendChild(titleContainer);
    this.title = title;
    const main = document.createElement("main");
    const locationField = document.createElement("input");
    locationField.id = "location-field";
    const locationLabel = document.createElement("label");
    locationLabel.htmlFor = "location-field";
    locationLabel.innerText = "Search for a location:"
    this.btn = document.createElement("button");
    this.btn.innerText = "search";
    main.appendChild(locationLabel);
    main.appendChild(locationField);
    main.appendChild(this.btn);
    body.appendChild(main);
    this.weather = document.createElement("div");
    this.weather.classList.add("weather");
    const linkToMap = document.createElement("p");
    linkToMap.classList.add("link-to-map");
    this.weather.appendChild(linkToMap);
    for (let i = 0; i < 7; i++) {
      const day = document.createElement("div");
      const icon = document.createElement("div");
      const desc = document.createElement("p");
      const dayName = document.createElement("p");
      dayName.classList.add("day-name");
      desc.classList.add("description");
      day.classList.add("day");
      day.id = `day-${i}`;
      day.appendChild(icon);
      day.appendChild(dayName);
      day.appendChild(desc);
      icon.classList.add("weather-icon");
      this.weather.appendChild(day);
    }
    main.appendChild(this.weather);
  }

  get title() {
    return document.getElementById("title");
  }

  set title(newTitle) {
    document.getElementById("title").innerText = newTitle;
  }

  get location() {
    return document.getElementById("location-field").value;
  }

}

export default Homepage;
