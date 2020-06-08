const axios = require("axios");
const log = console.log;

const BaseUrl = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
const ServiceKey = '0WeuBFfdGU8wOdx32dI3grgPH09Hdeb3XsMBKI9Mq8hGRyzcXKhuQ%2BHKGYVjxcoR4R8EpH3Erx%2B%2BJF9y9lS04Q%3D%3D';

const regionList  =['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종']

function getDustApi(regionName){
    return axios.get(`${BaseUrl}?serviceKey=${ServiceKey}&numOfRows=100&pageNo=1&sidoName=${encodeURIComponent(regionName)}&ver=1.3&_returnType=json`)
}

const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

const dData =[];

async function getDustData(){
    try {
        for(const item of regionList){
            log(item)
            await sleep(4000)
            log('시작')
            const response = await getDustApi(item);
            dData.push(response.data.list);
        }
        log(dData);
    } catch (error) {
        log('에러')
    }
}

// getDustData()
const dustList = []

async function getDustData2(){
    try {
        log('인천')
        // await sleep(1000)
        log('시작')
        const response = await getDustApi('인천');
        if(response.status == 200){
            log('sucess')
            var i = 0;
            for(let i of response.data.list){
                const dust_data = {
                    co_grade: i.coGrade,
                    co_value: i.coValue,
                    date_time: i.dataTime+":00",
                    khai_grade: i.khaiGrade,
                    khai_value: parseInt(i.khaiValue),
                    mang_name: i.mangName,
                    no2_grade: i.no2Grade,
                    no2_value: i.no2Value,
                    o3_grage: i.o3Grade,
                    o3_value: i.o3Value,
                    pm10_grade: i.pm10Grade,
                    pm10_grade_1h: i.pm10Grade1h,
                    pm10_value: i.pm10Value,
                    pm10_value_24h: i.pm10Value24,
                    pm25_grade: i.pm25Grade,
                    pm25_grade_1h: i.pm25Grade1h,
                    pm25_value: parseInt(i.pm25Value),
                    pm25_value_24: i.pm25Value24,
                    so2_grade: i.so2Grade,
                    so2_value:i.so2Value ,
                    station_name: i.stationName,
                    region_name: response.data.parm.sidoName
                };
                dustList.push(dust_data);
            }
            log(dustList.length)
            const data = {
                list : dustList
            };
            const resp = await insertDoc('dust','dust_info_hourly', data);
        }
    } catch (error) {
        log('에러')
    }
}

getDustData2();

const esClient = require('./client');
const insertDoc = async function(indexName, mappingType, data){
    return await esClient.index({
        index: indexName,
        type: mappingType,
        body: data
    });
}

module.exports = insertDoc;
