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
            list: {
                type: "nested",
                properties: {
                    co_grade: {type: "integer"},
                    co_value: {type: "integer"},
                    date_time: {type: "date",
                    format: "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"},
                    khai_grade: {type: "integer"},//통합대기환경지수
                    khai_value: {type: "integer"},//통합대기환경수치
                    mang_name: {type: "text"},//측정 망 정보
                    no2_grade : {type: "integer"},
                    no2_value: {type: "float"},
                    o3_grade : {type : "integer"},
                    o3_value: {type: "float"},
                    pm10_grade: {type: "integer"},
                    pm10_grade_1h: {type: "integer"},
                    pm10_value: {type: "integer"},
                    pm10_value_24h: {type: "integer"},
                    pm25_grade: {type: "integer"},
                    pm25_grade_1h: {type: "integer"},
                    pm25_value: {type: "integer"},
                    pm25_value_24h: {type: "integer"},
                    so2_grade: {type: "integer"},
                    so2_value: {type: "float"},
                    station_name: {type: "text"},
                    region_name: {type: "text"}
                }
            }
        }
    }
    try {
        const resp = await addmappingToIndex('dust', 'dust_info_hourly', mapping);
        console.log(resp);
    } catch (e) {
        console.log(e);
    }
}

test();