'use strict'

//Weather API
const apiKey ='2b66302e97ef0cc8c1f7bf359ac95715';
const url = 'api.openweathermap.org/data/2.5/forecast?lat=35&lon=139';
const safeKey = {headers: new Headers(
        {"X-Api-Key": apiKey
    })
};

//Maps API
const latLong = $('#locBut').val();
//const apiLoc = '96d46d5ed9764000afb371a04ad3ef5b';
const locUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latLong}&key=96d46d5ed9764000afb371a04ad3ef5b`;
/*const locSafe = {headers: new Headers(
        {"X-Api-Key": apiLoc
    })
};*/

function getWeather() {
    fetch(url, safeKey)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText)
        }
        return(response.json)
    })
    .then(responseJson => showResult(responseJson))
    .catch(err => {
        alert(err.message)
    })
    console.log(responseJson);
}

function showResult() {
    $('#weather').append(`
    
    `)
}

function getLocation() {
    fetch(locUrl) 
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText)
        }
        return(response.json)
    })
    .then(responseJson => locResult(responseJson))
    .catch(err => {
        alert(err.message)
    })
    console.log(responseJson);
}

function locResult() {
    $('#location').append(`
    
    `)
}

function weatherClick() {
    $('.button').on('click', function(e) {
        e.preventDefault();
        console.log(e);
        getWeather();
    })
}

function locationClick() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        console.log(e);
        getLocation();
    })
}

function run() {
    weatherClick();
    locationClick();
}

$(run);