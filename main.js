let searchBox = document.getElementById("citySearch");

// En funktion som skapar en url. Den tar in en parameter som defineras av sökrutan på hemsidan.
// Jag fyller i urelen med nödvändig data för att sökningen ska bli bra och fungera.
function getWeatherUrl(cityName) {
  let weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");

  weatherUrl.searchParams.set("q", cityName);
  weatherUrl.searchParams.set("appid", "07666263ed3ccc84e4b232450fe32cc1");
  weatherUrl.searchParams.set("mode", "json");
  weatherUrl.searchParams.set("units", "metric");
  weatherUrl.searchParams.set("lang", "se");

  return weatherUrl;
}

// En funktion som använder den nyskapta urelen och hämtar ut data.
function getWeatherInfo() {
  let city = searchBox.value;
  let url = getWeatherUrl(city);

  // Jag gör en HTTP request med den nyskapade urelen.
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "json";

  // Jag ser till att statusen är ok och att det finns en koppling
  // Om statusen är allt utom OK (200) meddelar hemsidan att något gått snett.
  xhr.onload = function () {
    if (xhr.status != 200) {
      alert("ERROR: City does not exist, try again! \n\nTip: Check spelling.");
    } else {
      console.log(xhr.status + " " + xhr.statusText);
      console.log(xhr.response);
    }

    // Jag fyller i hemsidan med dagens temperatur och vart vi sökt.
    document.querySelector("#locationName").innerText = xhr.response.name;
    document.querySelector(
      "#weatherToday"
    ).innerText = `Temp: ${xhr.response.main.temp}°C`;
  };

  xhr.send();
}

/*

  Koden nedan fungerar fungerar snarlikt som koden ovan.

  Vi bygger en url på precis samma sätt med nya parametrar som krävs för att vi ska få kalla på API:n.

  Vi hämtar ur information och fyller in hemsidan med top 3 restauranger på hemsidan.

*/

function getVenueUrl(cityName) {
  let venueUrl = new URL("https://api.foursquare.com/v2/venues/explore");

  venueUrl.searchParams.append(
    "client_id",
    "WK1U1RIWEUBBVPLNBDFQHOSRAB4NSORTX5MCFWLYPVR1FJEM"
  );
  venueUrl.searchParams.append(
    "client_secret",
    "TO3WZEAX252K1EPRJYPOAKWPBLJQSHH4XOJO0DOFPXEOADQT"
  );
  venueUrl.searchParams.append("near", cityName);
  venueUrl.searchParams.append("limit", "3");
  venueUrl.searchParams.append("v", "20210215");
  venueUrl.searchParams.append("section", "food");

  return venueUrl;
}

function getVenueInfo() {
  let city = searchBox.value;
  let url = getVenueUrl(city);

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "json";

  xhr.onload = function () {
    console.log(xhr.status + " " + xhr.statusText);
    console.log(xhr.response);

    document.querySelector("#venuesUrl1").innerText =
      xhr.response.response.groups[0].items[0].venue.name;
    document.querySelector("#venuesUrl2").innerText =
      xhr.response.response.groups[0].items[1].venue.name;
    document.querySelector("#venuesUrl3").innerText =
      xhr.response.response.groups[0].items[2].venue.name;
  };
  xhr.send();
}

// Detta kallar på det två funktionerna när man vill söka på en stad.
let search = document.querySelector("#searchBtn");
search.addEventListener("click", function () {
  getWeatherInfo();
  getVenueInfo();
});

document.getElementById("showWeather-checkbox").onchange = function () {
  let wDiv = document.getElementById("weatherDiv");
  wDiv.classList.toggle("hidden");
};

document.getElementById("showVenues-checkbox").onchange = function () {
  let vDiv = document.getElementById("venueDiv");
  vDiv.classList.toggle("hidden");
};
