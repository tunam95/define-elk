const axios = require("axios");
const log = console.log;
 



function getweather(cdata){
    return axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${cdata.name}&appid=${encodeURIComponent('apikey')}`)
}

const weather_data = {};
const forecast_list = [];

async function getData(){
    try {
        const cdata = {
            name : 'seoul'
        }
        const response = await getweather(cdata);
        if (response.status == 200){
            this.weather_data = response.data;
            for(let i of response.data.list){
                const forecast_data = {
                    date_time : i.dt,
                    main: {
                        temp: i.main.temp,
                        feels_like: i.main.feels_like,
                        temp_min: i.main.temp_min,
                        temp_max: i.main.temp_max,
                        pressure: i.main.pressure,
                        pressure_sea_level: i.main.sea_level,
                        pressure_grnb_level: i.main.grnb_level,
                        temp_kf: i.main.temp_kf
                    },
                    weather: {
                        id: i.weather[0].id,
                        main: i.weather[0].main,
                        description: i.weather[0].description,
                        icon: i.weather[0].icon
                    },
                    clouds: {
                        cloudiness: i.clouds.all
                    },
                    wind: {
                        speed: i.wind.speed,
                        deg: i.wind.deg
                    },
                    sys: {
                        pod: i.sys.pod
                    },
                    hour_time: i.dt_txt
                };
                forecast_list.push(forecast_data);
            }
            const data = {
                city : response.data.city,
                list : forecast_list
            };
            log(response.data);
            const resp = await insertDoc('forecast2', 'weather_forecast', data);
        }
    } catch (error) {
        log('에러')
    }
}

getData();

const esClient = require('./client');
const insertDoc = async function(indexName, mappingType, data){
    return await esClient.index({
        index: indexName,
        type: mappingType,
        body: data
    });
}

module.exports = insertDoc;




