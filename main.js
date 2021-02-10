const outputElement1 = document.querySelector("#weather");

getWeatherURL = function (cityName) {
  const url = new URL("https://api.openweathermap.org/data/2.5");

  url.searchParams.append("q", cityName);
  url.searchParams.append("appid", "07666263ed3ccc84e4b232450fe32cc1");
  url.searchParams.append("mode", "json");
  url.searchParams.append("units", "metric");
  url.searchParams.append("lang", "sv");

  outputElement1.innerText = url;
  return url;
};

const url = getWeatherURL("Halmstad");
