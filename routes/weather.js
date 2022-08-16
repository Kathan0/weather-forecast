import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from 'express';
const weatherRouter = express.Router();
var APIkey = 'c7c54588a67dbfb714bb23b1a8c7158b'

const cors = require('cors');

weatherRouter
.post('/getWeather', cors(), postWeather)


export function postWeather(req, res){
    console.log("Post request accessed");
    // const axios = require('axios').default;
    var data = req.body;
    console.log(data);

    weatherSearch(function(result){
        console.log(result);
        res.send({
            result: result,
            message: 1
        })
    }, data)
    
    // var jsonArray = {
    //     "weather":[]
    // };
    // for(var i=0; i< data.cities.length; i++){
    //     const URL = `https://api.openweathermap.org/data/2.5/weather?q=${data.cities[i]}&appid=${APIkey}`
    //     axios.get(URL)
    //     .then(res=>{
    //         // console.log(res);
    //         var city_name = res.data.name;
    //         var temp = (res.data.main.temp - 273.15).toFixed(2);
    //         var feels_like = (res.data.main.feels_like - 273.15).toFixed(2);
    //         // console.log(city_name+" "+temp+" "+feels_like);

    //         var result = `{"city_name":"${city_name}", "temp":"${temp}", "feels_like":"${feels_like}"}`;
    //         var obj = JSON.parse(result);
    //         jsonArray.weather.push(obj);

    //         return jsonArray;
    //     })
    // }
    // resultFinal.send({
    //     weather: weatherSearch(data),
    //     message: 1
    // })
}

function weatherSearch(callback, data){
    
    const axios = require('axios').default;
    var jsonArray = {
        "weather":[]
    };

        for(var i=0; i< data.cities.length; i++){
                if(typeof data.cities[i] != 'undefined' && data.cities[i] != ''){
                try{
                        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${data.cities[i]}&appid=${APIkey}`
                        axios.get(URL)
                        .then(res=>{
                            // console.log(res);
                            var city_name = res.data.name;
                            var temp = ( res.data.main.temp - 273.15).toFixed(2);
                            var feels_like = ( res.data.main.feels_like - 273.15).toFixed(2);
                            // console.log(city_name+" "+temp+" "+feels_like);

                            var result = `{"city_name":"${city_name}", "temp":"${temp}", "feels_like":"${feels_like}"}`;
                            var obj = JSON.parse(result);
                            jsonArray.weather.push(obj);
                        })
                        .catch(e=>{
                            if(e.data.cod == 404)
                            console.log(e.data.message);
                        })
                }
                catch(e){
                    if(e.data.cod == 404)
                    console.log(e.data.message);
                }
            }
            else break;
        }
    setTimeout(function(){
        callback(jsonArray);
    }, Math.random() * 4000 * data.cities.length)
}

export default weatherRouter;
