'use strict'
                
function getWeather(CORDS) {
    console.log('from getWeather', CORDS);
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

function gpsLoc(latLong) {
    console.log('from gpsLoc', latLong);
    const mapUrl = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?unit=mph&key=nDSF3MMaZSDTFvy4ilNGaYg0VvzAnt5L&point=${latLong}`;
    fetch(mapUrl)
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
    })
    .then(responseJson => showGps(responseJson))
    .catch(err => {
        alert(err.message)
    })
}

function showResult(responseJson) {
    console.log('from showResult', responseJson);
    $('#weather-container').empty();
    let i = null;
    for(i = 0; i < responseJson.list[0].weather.length; i++) {
        $('#weather-container').append(`
        <!--img src=${responseJson.list[0].weather[0].icon}-->
        <p>${Math.floor(responseJson.list[0].main.temp)}&#8451 </p>
        <p>${responseJson.list[0].weather[0].main}</p>
        `)
    }
}

function showGps(responseJson) {
    console.log('from showGps', responseJson);
    $('.traffic-container').empty();
    let i = null;
    for(i = 0; i < responseJson.flowSegmentData[0].length; i++) {
        $('.traffic-container').append(`
        <p>${responseJson.flowSegmentData[0].currentSpeed} mph</p>
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

function locResult(responseJson) {
    // console.log('from locResult', results);
    console.log('from locResult', responseJson);
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