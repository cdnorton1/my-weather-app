$(document).ready(function() {

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

                if ($('#forecastImg').children().length  >  0) {
                    $('#forecastImg').children().remove();                
                }

                elem.setAttribute("src",  icon_url);                    
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
    });
});