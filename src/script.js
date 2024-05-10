// ----- VARIABLEN -----
const cityInput = document.getElementById("CityInput");
const weatherContainer = document.getElementById("WeatherContainer");
let weatherData = {};

// ----- SUBMIT ON ENTER -----
cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("SubmitBtn").click();
  }
});

// ----- WETTERDATEN ABRUFEN -----
function fetchWeatherInfo() {
  // Stadtnamen aus Eingabefeld abrufen und Leerzeichen entfernen
  const city = cityInput.value.trim();

  // Überprüfen, ob Eingabefeld leer ist
  if (city === "") {
    alert("Bitte gib einen Stadtnamen ein!");
    return;
  }

  // API-Anfrage senden
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=f9efa4a5066845e6927105223240205&q=${city}&lang=de`
  )
    .then((response) => {
      // Fehlermeldung anzeigen, wenn die Stadt nicht gefunden wurde
      if (response.ok) {
        return response.json();
      } else {
        alert("Stadt nicht gefunden!");
      }
    })
    // Objekt mit Wetterdaten erstellen
    .then((data) => {
      weatherData = {
        city: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
      };
      
      displayWeatherInfo(); // Wetterdaten anzeigen
      cityInput.value = ""; // Eingabefeld leeren
    });
}

// ----- WETTERDATEN ANZEIGEN -----
function displayWeatherInfo() {
  // Neue Wetter-Card erstellen
  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather-card");

  // Wetterdaten in die Wetter-Card einfügen
  weatherCard.innerHTML = `
    <h2>${weatherData.city}</h2>
    <p class="temp">${weatherData.temperature} °C</p>
    <p class="cond">${weatherData.condition}</p>
    <img class="icon" src="${weatherData.icon}">
  `;

  // Wetter-Card zum Container hinzufügen
  weatherContainer.appendChild(weatherCard);
}