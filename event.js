'use strict'

// const latLong = $('#gps').val();
// const mapApi = 'nDSF3MMaZSDTFvy4ilNGaYg0VvzAnt5L';
// const mapUrl = `https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json?key=nDSF3MMaZSDTFvy4ilNGaYg0VvzAnt5L&point=${latLong}`;

function gpsLoc(latLong) {
    console.log(latLong);
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

function showGps(flowSegmentData) {
    console.log(flowSegmentData);
    $('.traffic-container').append(`
    <p>${flowSegmentData[0].coordinates.currentSpeed}mph</p>
    `)
}

/*function gpsWatch() {
    $('.tomtom-form').on('submit', function(e) {
        e.preventDefault();
        console.log(e);
        const latLong = $('#gps').val();
        gpsLoc(latLong);
    })
}

function runGps() {
    gpsWatch();
}

$(runGps)*/