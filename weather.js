const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  let city = req.body.CityName;
  const appid = "22f78fdbb51df8408a91ad6f41576383";
  const unit = "metric#";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=${unit}`;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      res.write(
        "<h1>this is current movement" + " :=    " + description + "</h1>"
      );
      res.write(`<h1>tempreture in ${city} is</h1> ` + "<h1>" + temp + "</h1>");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
