import dotenv from 'dotenv'
dotenv.config()

$(document).ready(function() {

  $('#myDiv').keypress(function(e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
      $('#submit_button').click();
      return false;
    }
  });

  function getWeatherData(username) {
    return new Promise((resolve, reject) => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=${username}`)
        .then(response => {

          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }

          response.json().then(function(data) {
            console.log(data);
            resolve(data);
          });
        })
        .catch(err => reject(err));
    })
  }

  $('#submit_button').click(function() {

    console.log('hello');
    getWeatherData(process.env.WEATHER_API_KEY)
      .then(response => {
        console.log(response.weather[0].description);
      })
      .catch(err => console.log(err));

    // if ($("#units").val() != 'metric' && $("#units").val() != 'imperial' && $("#units").val() != 'default') {
    //   alert("Units value not matching! Please correct it!");
    //   $("#units").focus();
    //   return false;
    // }
    //
    // if ($("#city").val() == '') {
    //   alert("City cannot be empty!");
    //   $("#city").focus();
    //   return false;
    // }
    //
    // $("#res").text("Getting the results...............");
    // $.get("http://localhost:3000", {
    //   city: $("#city").val(),
    //   metric: $("#units").val()
    // }, function(data, status) {
    //   //data = JSON.parse(data);
    //   $("#res").text("Published!");
    //   //$("#res").toggle();
    //   $("#img").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    //   $("#des").val(data.weather[0].description);
    //   $("#ct").val(data.main.temp);
    //   $("#maxt").val(data.main.temp_max);
    //   $("#mint").val(data.main.temp_min);
    // });
  });
});
