const axios = require("axios");
const log = console.log;
 



function getweather(cdata){
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cdata.name}&appid=${encodeURIComponent('apikey')}`)
}

const weather_data = {};

async function getData(){
    try {
        const cdata = {
            name : 'seoul'
        }
        const response = await getweather(cdata);
        if (response.status == 200){
            this.weather_data = response.data;
            const data = {
                city: this.weather_data.city,
                list:this.weather_data.list,
                main:this.weather_data.main,
                wind:this.weather_data.wind,
                clouds:this.weather_data.clouds,
                time_data:this.weather_data.dt,
                sunrise:this.weather_data.sys.sunrise,
                sunset:this.weather_data.sys.sunset,
                city_id:this.weather_data.id,
                city_name:this.weather_data.name
            };
            const resp = await insertDoc('weather', 'current_weather', data);
            log(resp);
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




