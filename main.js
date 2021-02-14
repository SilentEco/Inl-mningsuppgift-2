getWeatherUrl = function (cityName) {
  let weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");

  weatherUrl.searchParams.set("q", cityName);
  weatherUrl.searchParams.set("appid", "07666263ed3ccc84e4b232450fe32cc1");
  weatherUrl.searchParams.set("mode", "json");
  weatherUrl.searchParams.set("units", "metric");
  weatherUrl.searchParams.set("lang", "se");

  return weatherUrl;
};

getWeatherInfo = function () {
  let url = getWeatherUrl("Huntingburg"); //<< ---- SÖKRUTA

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`ERROR: ${xhr.status} (${xhr.statusText})`);
    } else {
      console.log(xhr.status + " " + xhr.statusText);
      console.log(xhr.response);
    }

    document.querySelector("#weatherToday").innerText = xhr.response.main.temp;
  };

  xhr.send();
};
getVenueUrl = function () {
  let venueUrl = new URL("https://api.foursquare.com/v2/venues/explore");

  venueUrl.searchParams.append(
    "client_id",
    "WK1U1RIWEUBBVPLNBDFQHOSRAB4NSORTX5MCFWLYPVR1FJEM"
  );
  venueUrl.searchParams.append(
    "client_secret",
    "TO3WZEAX252K1EPRJYPOAKWPBLJQSHH4XOJO0DOFPXEOADQT"
  );
  venueUrl.searchParams.append("near", "Umeå");
  venueUrl.searchParams.append("limit", "3");
  venueUrl.searchParams.append("v", "20210214");
  venueUrl.searchParams.append("section", "food");
};
getVenueInfo = function () {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", venueUrl);
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

  // let props = venueUrl.searchParams.entries();

  // for (const [k, v] of props) {
  //   console.log(k + ": " + v);
  // }

  xhr.send();
};

getWeatherInfo();
