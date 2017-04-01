$(document).ready(function() {

    // TODO: DISPLAY CURRENT LOCATION ON PAGE LOAD

    // var x = document.getElementById("demo");

    // function getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(showPosition);
    //     } else { 
    //         x.innerHTML = "Geolocation is not supported by this browser.";
    //     }
    // }
    // function showPosition(position) {
    //     x.innerHTML = "Latitude: " + position.coords.latitude + 
    //     "<br>Longitude: " + position.coords.longitude;
    // }


    $('button').click(function() {
        var userCity = $('#userCity').val();
        var userState = $('#userState').val();
        var forecastUrl = "http://api.wunderground.com/api/fe4dcbbab4ff6f1f/forecast/q/" + userState + "/" + userCity + ".json";
        var geoUrl = "http://api.wunderground.com/api/fe4dcbbab4ff6f1f/geolookup/conditions/q/" + userState + "/" + userCity + ".json";

        $.ajax({
            url: geoUrl,
            dataType: "jsonp",
            success: function(parsed_json) {
                var location = parsed_json['location']['city'];
                var locationState = parsed_json['location']['state'];
                var temp_f = parsed_json['current_observation']['temp_f'];
                var temp_c = parsed_json['current_observation']['temp_c'];
                var weather = parsed_json['current_observation']['weather'];
                var icon_url = parsed_json['current_observation']['icon_url'];
                var wu_logo = parsed_json['current_observation']['image']['url'];
                var feelslike_f = parsed_json['current_observation']['feelslike_f'];


                $('#currentWeather').html(location + ", " + locationState);
                $('#currentWeatherTemp').html(temp_f.toFixed(0) + '&deg; F');
                $('#feelsLikeTemp').html('Feels like: ' + feelslike_f + '&deg; F');


                // Display weather icon
                var elem = document.createElement("img");
                elem.setAttribute("src", icon_url);
                document.getElementById("forecastImg").appendChild(elem);

                $('#forecast').html(weather);


                // Display background image to coincide with current forecast
                var main_bg = document.getElementById('main');
                if (weather == "Clear") {
                    main_bg.style.backgroundImage = 'url("img/sunny.jpg")';
                } else if (weather == "Rain") {
                    main_bg.style.backgroundImage = 'url("img/rain1.jpg")';
                } else if (weather == "Heavy Rain") {
                    main_bg.style.backgroundImage = 'url("img/rain2.jpg")';
                } else if (weather == "Light Rain") {
                    main_bg.style.backgroundImage = 'url("img/rain3.jpg")';
                } else if (weather == "Overcast" || weather == "Mostly Cloudy" || weather == "Partly Cloudy") {
                    main_bg.style.backgroundImage = 'url("img/cloudy.jpeg")';
                } else if (weather == "Snow") {
                    main_bg.style.backgroundImage = 'url("img/snowy.jpeg")';
                }
            }
        });


        // $.ajax({
        //     url: forecastUrl,
        //     dataType: "jsonp",
        //     success: function(parsed_json) {

        //         var day1 = parsed_json['forecast']['txt_forecast']['forecastday'][2]['title'];
        //         var day1IconUrl = parsed_json['forecast']['txt_forecast']['forecastday'][2]['icon_url'];
        //         var day1Text = parsed_json['forecast']['txt_forecast']['forecastday'][2]['fcttext'];
        //         var day2 = parsed_json['forecast']['txt_forecast']['forecastday'][4]['title'];
        //         var day2IconUrl = parsed_json['forecast']['txt_forecast']['forecastday'][4]['icon_url'];
        //         var day2Text = parsed_json['forecast']['txt_forecast']['forecastday'][4]['fcttext'];
        //         var day3 = parsed_json['forecast']['txt_forecast']['forecastday'][6]['title'];
        //         var day3IconUrl = parsed_json['forecast']['txt_forecast']['forecastday'][6]['icon_url'];
        //         var day3Text = parsed_json['forecast']['txt_forecast']['forecastday'][6]['fcttext'];

        //         $('#day1').html(day1);
        //         $('#day1Text').html(day1Text);
        //         $('#day2').html(day2);
        //         $('#day2Text').html(day2Text);
        //         $('#day3').html(day3);
        //         $('#day3Text').html(day3Text);

        //         var day1Elem = document.createElement("img");
        //         var day2Elem = document.createElement("img");
        //         var day3Elem = document.createElement("img");
        //         day1Elem.setAttribute("src", day1IconUrl);
        //         day2Elem.setAttribute("src", day2IconUrl);
        //         day3Elem.setAttribute("src", day3IconUrl);
        //         document.getElementById("day1IconUrl").prependChild(day1Elem);
        //         document.getElementById("day2IconUrl").prependChild(day2Elem);
        //         document.getElementById("day3IconUrl").prependChild(day3Elem);

        // Display weather icon
        // var elem = document.createElement("img");
        // elem.setAttribute("src", icon_url);
        // document.getElementById("forecastImg").appendChild(elem);

        // $('#forecast').html(weather);

        //     }
        // });

    });
});


// TODO: ADD BUTTON TO TOGGLE BETWEEN Farenheit AND Celcius
//((temp_f - 32) * 5) / 9


// if ("geolocation" in navigator) {
//     $('.getLocation').show();
// } else {
//     $('.getLocation').hide();
// }

/* Get current location */

// $(document).ready(function($) {

//     $('.getLocation').on('click', function() {
//         navigator.geolocation.getCurrentPosition(function(position) {
//             loadWeather(position.coords.latitude + ',' + position.coords.longitude); 

//load weather using your lat/lng coordinates
//     });
// });