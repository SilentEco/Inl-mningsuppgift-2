getWeatherURL = function (cityName) {
  let url = new URL("https://api.openweathermap.org/data/2.5/weather");

  url.searchParams.set("q", cityName);
  url.searchParams.set("appid", "07666263ed3ccc84e4b232450fe32cc1");
  url.searchParams.set("mode", "json");
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "se");

  for (let [key, val] of url.searchParams) {
    console.log(`${key}:${val}`);
  }
};
const url = getWeatherURL("Halmstad");

document.querySelector("#todaysWeather").innerText = url;
