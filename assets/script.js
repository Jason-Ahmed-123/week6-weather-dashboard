// Function to create persisting list of chosen cities:

// Function to generate weather forecast:
function populateCityWeather(city, citySearchList) {
  createCityList(citySearchList);

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
    city;

  var queryURL2 =
    "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
    city;

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // Set up "weather" object to save the retrieved data:
    .then(function (weather) {

      var nowMoment = moment();

      var displayMoment = $("<h3>");
      $("#city-name").empty();
      $("#city-name").append(
        displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
      );

      var cityName = $("<h3>").text(weather.name);
      $("#city-name").prepend(cityName);

      var weatherIcon = $("<img>");
      weatherIcon.attr(
        "src",
        "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
      );
      $("#current-icon").empty();
      $("#current-icon").append(weatherIcon);

      $("#temperature").text("Temperature: " + weather.main.temp + " °F");
      $("#humidity").text("Humidity: " + weather.main.humidity + "%");
      $("#wind").text("Wind Speed: " + weather.wind.speed + " MPH");

      var latitude = weather.coord.lat;
      var longitude = weather.coord.lon;

      var queryURL3 =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=885e9149105e8901c9809ac018ce8658&q=" +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude;

      $.ajax({
        url: queryURL3,
        method: "GET"
        // Set up "uvIndex" object to save the retrieved data:
      }).then(function (uvIndex) {

        var uvIndexDisplay = $("<button>");
        uvIndexDisplay.addClass("btn btn-danger");

        $("#uv").text("UV Index: ");
        $("#uv").append(uvIndexDisplay.text(uvIndex[0].value));

        $.ajax({
          url: queryURL2,
          method: "GET"
          // Set up "forecast" to save the retrieved data:
        }).then(function (forecast) {

          // Loop through the forecast list array and display a single forecast entry/time (5th entry of each day which is close to the highest temp/time of the day) from each of the 5 days
          for (var i = 6; i < forecast.list.length; i += 8) {
            var forecastDate = $("<h5>");

            var forecastPosition = (i + 2) / 8;

            $("#forecast-date" + forecastPosition).empty();
            $("#forecast-date" + forecastPosition).append(
              forecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY"))
            );

            var forecastIcon = $("<img>");
            forecastIcon.attr(
              "src",
              "https://openweathermap.org/img/w/" +
              forecast.list[i].weather[0].icon +
              ".png"
            );

            $("#forecast-icon" + forecastPosition).empty();
            $("#forecast-icon" + forecastPosition).append(forecastIcon);

            $("#forecast-temp" + forecastPosition).text(
              "Temp: " + forecast.list[i].main.temp + " °F"
            );
            $("#forecast-humidity" + forecastPosition).text(
              "Humidity: " + forecast.list[i].main.humidity + "%"
            );

            $(".forecast").attr(
              "style",
              "background-color:dodgerblue; color:white"
            );
          }
        });
      });
    });
}

$(document).ready(function () {
  var citySearchListStringified = localStorage.getItem("citySearchList");

  var citySearchList = JSON.parse(citySearchListStringified);

  if (citySearchList == null) {
    citySearchList = {};
  }

  createCityList(citySearchList);

  $("#weather").hide();
  $("#forecast-weather").hide();


  // Enter city name and retrieve new weather:
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input")
      .val()
      .trim()
      .toLowerCase();

    if (city != "") {
      //Check to see if there is any text entered
      citySearchList[city] = true;
      localStorage.setItem("citySearchList", JSON.stringify(citySearchList));

      populateCityWeather(city, citySearchList);

      $("#weather").show();
      $("#forecast-weather").show();
    }
  });

  $("#city-list").on("click", "button", function (event) {
    event.preventDefault();
    var city = $(this).text();

    populateCityWeather(city, citySearchList);

    $("#weather").show();
    $("#forecast-weather").show();
  });
});