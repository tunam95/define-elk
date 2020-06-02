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
            coord: {
                type: "geo_point"
            },
            weather: {
                properties: {
                    id: {type: "integer"},
                    main: {type: "text"},
                    description: {type: "text"},
                    icon: {type: "text"}
                }
            },
            main: {
                properties: {
                    temp: {type : "float"},
                    feels_like: {type: "float"},//체감온도
                    temp_min: {type: "float"},
                    temp_max: {type: "float"},
                    pressure: {type: "integer"},
                    current_humidity: {type: "integer"}
                }
            },
            wind: {
                properties: {
                    speed: {type: "double"},
                    deg: {type: "double"}
                }
            },
            clouds: {
                properties: {
                    cloudiness: {type: "integer"}
                }
            },
            time_data: {
                type: "integer"
            },
            sunrise: {
                type: "integer"
            },
            sunset: {
                type: "integer"
            },
            city_id: {
                type: "keyword"
            },
            city_name: {
                type: "keyword"
            }
        }
    }
    try {
        const resp = await addmappingToIndex('weather', 'current_weather', mapping);
        console.log(resp);
    } catch (e) {
        console.log(e);
    }
}

test();