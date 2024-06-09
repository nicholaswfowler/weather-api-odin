async function getWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=03a9534dc565497b901202950240806&q=${location}`, {mode: 'cors'});
    const allData = await response.json();
    const weatherData = [JSON.stringify(allData.location.name), 
                        JSON.stringify(allData.location.region), 
                        JSON.stringify(allData.location.country),
                        JSON.stringify(allData.current.condition.text),
                        JSON.stringify(allData.current.temp_f),
                        JSON.stringify(allData.current.feelslike_f),
                        JSON.stringify(allData.current.humidity),
                        JSON.stringify(allData.current.heatindex_f),
                        JSON.stringify(allData.current.uv)];
    return weatherData;
}

const searchBtn = document.querySelector('.location-btn');

searchBtn.addEventListener("click", ()=>{
    const input = prompt('Enter City or Zip Code: ');
    getWeather(input).then(function(weatherData){
        for(let i = 0; i < 4; i++){
            weatherData[i] = weatherData[i].substring(1, weatherData[i].length - 1);
        }
        displayWeather(weatherData);
    })
})

function displayWeather(data){
    const location = document.querySelector('#location');
    location.textContent = `${data[0]}, ${data[1]} (${data[2]})`
    const temp = document.querySelector('#temp');
    temp.textContent = `${data[4]} F (Feels Like: ${data[5]} F)`
    const condition = document.querySelector('#condition');
    condition.textContent = `${data[3]}`
    const humidity = document.querySelector('#humidity');
    humidity.textContent = `Humidity: ${data[6]}%`
    const heatIndex = document.querySelector('#heat-index');
    heatIndex.textContent = `Heat Index: ${data[7]}`
    const uv = document.querySelector('#uv');
    uv.textContent = `UV: ${data[8]}`


}