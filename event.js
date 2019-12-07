'use strict'

// const latLong = $('#gps').val();
// const mapApi = 'nDSF3MMaZSDTFvy4ilNGaYg0VvzAnt5L';
// const mapUrl = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=nDSF3MMaZSDTFvy4ilNGaYg0VvzAnt5L&point=${latLong}`;

function gpsLoc() {
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

function showGps() {
    $('.tomtom').append(`
    
    `)
}

function gpsWatch() {
    $('.tomtom-form').on('submit', function(e) {
        e.preventDefault();
        console.log(e);
        const latLong = $('#gps').val();
        const mapUrl = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=nDSF3MMaZSDTFvy4ilNGaYg0VvzAnt5L&point=${latLong}`;
        gpsLoc(mapUrl);
    })
}

function runGps() {
    gpsWatch();
}

$(runGps)