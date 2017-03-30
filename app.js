$(document).ready(function() {

    $('.container').hide();

    $('button').click(function() {
        var userCity = $('#userCity').val();
        var userState = $('#userState').val();
        var apiUrl = "http://api.wunderground.com/api/fe4dcbbab4ff6f1f/geolookup/conditions/q/" + userState + "/" + userCity + ".json";

        $.ajax({
            url: apiUrl,
            dataType: "jsonp",
            success: function(parsed_json) {
                var location = parsed_json['location']['city'];
                var locationState = parsed_json['location']['state'];
                var temp_f = parsed_json['current_observation']['temp_f'];
                var temp_c = parsed_json['current_observation']['temp_c'];
                var weather = parsed_json['current_observation']['weather'];
                var icon_url = parsed_json['current_observation']['icon_url'];
                var wu_logo = parsed_json['current_observation']['image']['url'];
                var main_bg = document.getElementById('main');
                var elem = document.createElement("img");

                $('#currentWeather').html(location + ", " + locationState);
                $('#currentWeatherTemp').html(temp_f.toFixed(0) + '&deg; F');

                elem.setAttribute("src", icon_url);
                document.getElementById("forecastImg").appendChild(elem);

                $('#forecast').html(weather);


                if (weather == "Clear") {
                    main_bg.style.backgroundImage = 'url("sunny.jpg")';
                } else if (weather == "Rain") {
                    main_bg.style.backgroundImage = 'url("rainy.jpg")';
                } else if (weather == "Overcast" || weather == "Mostly Cloudy") {
                    main_bg.style.backgroundImage = 'url("cloudy.jpeg")';
                } else if (weather == "Snow") {
                    main_bg.style.backgroundImage = 'url("snowy.jpeg")';
                }
            }
        });
        $('.container').show();
    });
});