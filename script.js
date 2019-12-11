'use strict'
                
function getWeather(CORDS) {
    console.log(CORDS);
    const url = `https://api.openweathermap.org/data/2.5/find?lat=${CORDS[0]}&lon=${CORDS[1]}&units=metric&appid=2b66302e97ef0cc8c1f7bf359ac95715`;
    fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText)
        }
        return response.json()
    })
    .then(responseJson => showResult(responseJson))
    .catch(err => {
        alert(err.message)
    })
    
}

function showResult(responseJson) {
    console.log(responseJson);
    let i = null;
    for(let i = 0; i < responseJson.list[0].weather.length; i++) {
        $('#weather-container').append(`
        <!--img src=${responseJson.list[0].weather[0].icon}-->
        <p>${Math.floor(responseJson.list[0].main.temp)}&#8451 </p>
        <p>${responseJson.list[0].weather[0].main}</p>
        `)
    }
}

function getLocation(wgs, country) {
    const locUrl = `https://api.opencagedata.com/geocode/v1/json?q=${wgs},${country}&min_confidence=8&key=96d46d5ed9764000afb371a04ad3ef5b&pretty=1`;
    fetch(locUrl) 
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
    .then(responseJson => locResult(responseJson))
    .catch(err => {
        alert(err.message)
    })
}

function locResult(responseJson, results) {
    console.log(results);
    const CORDS = [responseJson.results[0].geometry.lat, responseJson.results[0].geometry.lng];
    const latLong = `${responseJson.results[0].geometry.lat},${responseJson.results[0].geometry.lng}`;
    getWeather(CORDS);
    gpsLoc(latLong);
}

function locationClick() {
    $('.location-form').on('submit', function(e) {
        e.preventDefault();
        console.log(e);
        const wgs = $('#user-input').val();
        const country = $('#pays').val();
        console.log(wgs, country);
        getLocation(wgs, country);
    })
}

function run() {
    locationClick();
}

$(run);

// let wgs = [];
// $('wgs').push($('#user-input')).split(',');
// const chez = $('#chez').val().split(',')

//it should be responseJson.results.filter( x => x.components._type === postcodde)