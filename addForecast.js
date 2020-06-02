const esClient = require('./client');
const addmappingToIndex = async function(indexName, mappingType, mapping){
    console.log(mapping);
    return await esClient.indices.putMapping({
        index: indexName,
        type: mappingType,
        body: mapping
    });
}

module.exports = addmappingToIndex;


// test function to explain how to invoke.
async function test() {
    const mapping = {
        properties: {
            city: {
                properties: {
                    city_id: {type: "keyword"},
                    city_name: {type: "keyword"},
                    coord: {type: "geo_point"},
                    sunrise: {type: "integer"},
                    sunset: {type: "integer"}
                }
            },
            list: {
                type: "nested",
                properties: {
                    date_time: {type: "integer"},
                    main: {
                        properties: {
                            temp: {type: "float"},
                            feels_like: {type: "float"},//체감온도
                            temp_min: {type: "float"},
                            temp_max: {type: "float"},
                            pressure: {type: "integer"},
                            pressure_sea_level: {type: "integer"},
                            pressure_grnb_level: {type: "integer"},
                            time_humidity: {type: "integer"},
                            temp_kf: {type: "float"}
                        }
                    },
                    weather: {
                        properties: {
                            id: {type: "integer"},
                            main: {type: "text"},
                            description: {type: "text"},
                            icon: {type: "text"}
                        }
                    },
                    clouds: {
                        properties: {
                            cloudiness: {type: "integer"}
                        }
                    },
                    wind: {
                        properties: {
                            speed: {type: "double"},
                        deg: {type: "double"}
                        }
                    },
                    sys: {
                        properties: {
                            pod: {type: "text"}//part of the day (n - night, d - day)
                        }
                    },
                    hour_time: {
                        type: "date",
                        format: "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
                    }
                }
            }
        }
    }
    try {
        const resp = await addmappingToIndex('forecast2', 'weather_forecast', mapping);
        console.log(resp);
    } catch (e) {
        console.log(e);
    }
}

test();