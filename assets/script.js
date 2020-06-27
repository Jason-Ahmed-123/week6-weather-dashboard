// Function to generate weather forecast:



// Enter city name and retrieve new weather:
  $("#search-button").on("click", function(event) {
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


  $("#city-list").on("click", "button", function(event) {
    event.preventDefault();
    var city = $(this).text();

    populateCityWeather(city, citySearchList);

    $("#weather").show();
    $("#forecast-weather").show();
  });
});