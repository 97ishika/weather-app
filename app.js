
//jshint esversion:6;
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const city = req.body.cityName;
  const apikey = "27268e5c8e2435da63ce729429f71ca8";
  const unit = "metric";
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey +"&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weather_description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const weather_image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature of " + city + "is " + temp + " degree celsius </h1>");
      res.write("<p>The weather description: " + weather_description + "</p>")
      res.write("<img src =" + weather_image + ">");
      res.send();

    });
  });
});


app.listen(3000, function(){
  console.log("Server is running on 3000.");
});
