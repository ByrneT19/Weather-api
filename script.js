'use strict'
                
function getWeather(CORDS) {
    const url = `https://api.openweathermap.org/data/2.5/find?lat=${CORDS[0]}&lon=${CORDS[1]}&units=imperial&appid=2b66302e97ef0cc8c1f7bf359ac95715`;
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

/*function showResult() {
    console.log(responseJson);
    $('#chez').val("");
    let i = null;
    for(i = 0; i < responseJson.data.length; i++) {
        $('#weather-container').append(
            `<ul>
                <li class="weatherResults">
                    <img src=${responseJson.data.weather[i].icon}>
                    <p>${Math.floor(responseJson.data.main[i].temp)}</p>
                    <p>${responseJson.data.weather[i].main}</p>
                </li>
            </ul>`
        )
    }
}*/

function getLocation(wgs, country) {
    const locUrl = `https://api.opencagedata.com/geocode/v1/json?q=${wgs},${country}&key=96d46d5ed9764000afb371a04ad3ef5b&pretty=1`;
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

function locResult(results, _type, responseJson) {
    console.log(responseJson);
    const CORDS = [`${results.geometry.lat}`,`${results.geometry.lng}`];//use push method here with two let variables?
    getWeather(CORDS);
}

/*function weatherClick() {
    $('.weather-form').on('submit', function(e) {
        e.preventDefault();
        console.log(e);
        // const chez = $('#chez').val();
        const chez = $('#chez').val().split(',');
        console.log(chez);
        const country = $('#pays').val();
        getWeather(chez, country);
    })
}*/

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
    // weatherClick();
    locationClick();
}

$(run);

// let wgs = [];
// $('wgs').push($('#user-input')).split(',');
// const chez = $('#chez').val().split(',')