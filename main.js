let searchBox = document.getElementById("citySearch");

function getWeatherUrl(cityName) {
  let weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");

  weatherUrl.searchParams.set("q", cityName);
  weatherUrl.searchParams.set("appid", "07666263ed3ccc84e4b232450fe32cc1");
  weatherUrl.searchParams.set("mode", "json");
  weatherUrl.searchParams.set("units", "metric");
  weatherUrl.searchParams.set("lang", "se");

  return weatherUrl;
}

function getWeatherInfo() {
  let city = searchBox.value;
  let url = getWeatherUrl(city);

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert("ERROR: City does not exist, try again! \n\nTip: Check spelling.");
    } else {
      console.log(xhr.status + " " + xhr.statusText);
      console.log(xhr.response);
    }

    document.querySelector("#locationName").innerText = xhr.response.name;
    document.querySelector(
      "#weatherToday"
    ).innerText = `Temp: ${xhr.response.main.temp}°C`;
  };

  xhr.send();
}

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

let search = document.querySelector("#searchBtn");

search.addEventListener("click", function () {
  getWeatherInfo();
  getVenueInfo();
});
