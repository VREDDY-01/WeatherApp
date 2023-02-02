const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function (req,res) {
    const query = req.body.city;
    const apiKey = "....";    //put your api key here
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
    https.get(url,function (response) {
        response.on("data",function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const img = weatherData.weather[0].icon;
            const imgURL = `http://openweathermap.org/img/wn/${img}@2x.png`;
            res.write(`<h1>The current Temperature in ${query} is ${temp} degree Celcius</h1>`);
            res.write(`<p>The climate is ${desc}.</p>`);
            res.write(`<img src="${imgURL}" alt="night_image">`);
            res.send();
        })
    })
})




app.listen(3000,function () {
    console.log("Server is running at 3000");
});
