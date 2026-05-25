const getTime = {}
const displayTime = document.querySelector("#displayTime")
const temperature = document.querySelector("#temperature")
const weatherInfo = document.querySelector("#weatherInfo")
const btnCity = document.querySelectorAll(".btn-city")
const showcity = document.querySelector("#showcity")
const body = document.querySelector("body")
setInterval(() => {
    timerReflash()
}, 1000);
// 可簡寫為 setInterval(timerReflash, 1000);
function timerReflash() {
 var dateTime = new Date();
    displayTime.innerHTML = dateTime.toLocaleString();
}
//取得時間的各種方式
// getTime.year = dateTime.getMonth()+1
// getTime.date = dateTime.getDate()
// getTime.hour = dateTime.getHours()
// getTime.minute = dateTime.getMinutes()
// getTime.second = dateTime.getSeconds()
const Authorization = 'CWA-AC8248B4-C6B9-4DE9-9ABF-A764D9592C17'
const api = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${Authorization}`
let weatherData  = {}
const handleAsync = async (city) => {
    try {
        const res = await axios.get(api)
        console.log(res.data);
        weatherData  = res.data.records.location;
        displayWeather(city)
        document.getElementById('loading').style.display = 'none';
    } catch (error) {
        console.error(error);
    }
}
btnCity.forEach(element => {
    element.addEventListener("click", (e) => {
        displayWeather(e.target.textContent)
    })
})
function displayWeather(city) {
    showcity.innerHTML = city
    body.style.backgroundImage = `url(./img/${city}.jpg)`
    weatherData .forEach(element => {
        if (element.locationName == city) {
            weatherInfo.innerHTML = element.weatherElement[0].time[0].parameter.parameterName
            const minT = element.weatherElement[2].time[0].parameter.parameterName
            const maxT = element.weatherElement[4].time[0].parameter.parameterName
            temperature.innerHTML = `${minT}℃~${maxT}℃`
            console.log(element);
        }
    });
}
handleAsync('臺北市')
timerReflash()

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(registration => {
        console.log("Service Worker 註冊成功：", registration);
      })
      .catch(error => {
        console.log("Service Worker 註冊失敗：", error);
      });
  });
}
