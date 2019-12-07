'use strict'

//Weather API
// const chez = $('#chez').val();
// const url = 'https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/weather?q='
//                 + chez + '&appid=2b66302e97ef0cc8c1f7bf359ac95715';


//Maps API
const city = $('#user-input').val();
const locUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=96d46d5ed9764000afb371a04ad3ef5b`;

function getWeather(url) {
    debugger;
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
    $('#chez').val("");
    let result = " ";
    let i = null;
    for(i = 0; i < responseJson.data.length; i++) {
        result += `<img>${responseJson.data.weather[i].icon}>
                   <p>${Math.floor(responseJson.data.main[i].temp)}</p>
                   <p>${responseJson.data.weather[i].main}</p>}`;
                   console.log(responseJson.data.weather[i].main);
    }
    $('#weather').append(result);
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
    $('.weather-form').on('submit', function(e) {
        e.preventDefault();
        console.log(e);
        const chez = $('#chez').val();
        const url = `https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/weather?q=
                        ${chez}&appid=2b66302e97ef0cc8c1f7bf359ac95715`;
        getWeather(url);
    })
}

function locationClick() {
    $('.location-form').on('submit', function(e) {
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