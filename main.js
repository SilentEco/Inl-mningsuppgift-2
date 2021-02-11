{
  let weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");

  weatherUrl.searchParams.set("q", "Huntingburg");
  weatherUrl.searchParams.set("appid", "07666263ed3ccc84e4b232450fe32cc1");
  weatherUrl.searchParams.set("mode", "json");
  weatherUrl.searchParams.set("units", "metric");
  weatherUrl.searchParams.set("lang", "se");

  document.querySelector("#weatherToday").innerText = weatherUrl;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", weatherUrl);
  xhr.responseType = "json";

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`ERROR: ${xhr.status} (${xhr.statusText})`);
    } else {
      console.log(xhr.status + " " + xhr.statusText);
      console.log(xhr.response);
    }
  };

  xhr.send();
}

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
  venueUrl.searchParams.append("near", "Huntingburg");
  venueUrl.searchParams.append("limit", "10");
  venueUrl.searchParams.append("v", "20210210");

  document.querySelector("#venuesUrl").innerText = venueUrl;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", venueUrl);
  xhr.responseType = "json";

  xhr.onload = function () {
    console.log(xhr.status + " " + xhr.statusText);
    console.log(xhr.response);
  };

  let props = venueUrl.searchParams.entries();

  for (const [k, v] of props) {
    console.log(k + ": " + v);
  }
  xhr.send();
};
