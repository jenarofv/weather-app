class Homepage {
  constructor(title) {
    const body = document.querySelector("body");
    const titleContainer = document.createElement("h1");
    titleContainer.id = "title";
    body.appendChild(titleContainer);
    this.title = title;
    this.locationField = document.createElement("input");
    const main = document.createElement("main");
    this.locationField.id = "location-field";
    const locationLabel = document.createElement("label");
    locationLabel.htmlFor = "location-field";
    locationLabel.innerText = "Search for a location:"
    this.btn = document.createElement("button");
    this.btn.innerText = "search";
    main.appendChild(locationLabel);
    main.appendChild(this.locationField);
    main.appendChild(this.btn);
    body.appendChild(main);
    this.weather = document.createElement("div");
    this.weather.classList.add("weather");
    const clearBtn = document.createElement("button");
    this.celsiusInput = document.createElement("input");
    this.celsiusInput.type = "checkbox";
    this.celsiusInput.checked = true;
    this.celsiusInput.id = "celsius";
    const celsiusDiv = document.createElement("div");
    const celsiusLabel = document.createElement("label");
    celsiusLabel.innerText = "Metric Units"
    celsiusLabel.htmlFor = "celsius";
    celsiusDiv.appendChild(celsiusLabel);
    celsiusDiv.appendChild(this.celsiusInput);
    main.appendChild(celsiusDiv);
    clearBtn.classList.add("clear");
    clearBtn.innerText = "clear";
    clearBtn.addEventListener("click", () => this.clearContent());
    main.appendChild(clearBtn);
    this.clearContent();
    this.generateDayCards();
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

  get metric() {
    return this.celsiusInput.checked;
  }

  clearContent() {
    this.locationField.value = "";
    this.weather.innerHTML = "<p class=\"link-to-map\"></p>";
    this.generateDayCards();
  }

  generateDayCards() {
    const main = document.querySelector("main");
    for (let i = 0; i < 7; i++) {
      const day = document.createElement("div");
      const dayLeft = document.createElement("div");
      const icon = document.createElement("div");
      const desc = document.createElement("p");
      const dayName = document.createElement("p");
      const temps = document.createElement("div");
      const suntimes = document.createElement("div");
      temps.classList.add("temps");
      suntimes.classList.add("suntimes");
      dayName.classList.add("day-name");
      desc.classList.add("description");
      day.classList.add("day");
      day.classList.add("hidden");
      day.id = `day-${i}`;
      dayLeft.classList.add("day-left-section")
      dayLeft.appendChild(icon);
      dayLeft.appendChild(dayName);
      dayLeft.appendChild(desc);
      day.appendChild(dayLeft);
      day.appendChild(temps);
      day.appendChild(suntimes);
      icon.classList.add("weather-icon");
      this.weather.appendChild(day);
    }
    main.appendChild(this.weather);
  }

}

export default Homepage;
