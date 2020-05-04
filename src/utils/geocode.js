const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmI2MDkiLCJhIjoiY2s5ZHY1dm1lMDVsZjNmbno2MzZ0cm9jMSJ9.YjNC9WUjMm6FqktR1U29AQ&limit=1';
    request({url: url, json: true}, (err, data) => {
        //console.log(data.body.features[0]);
        if(err) {
            callback('Unable to connect to mapbox', undefined);
        } else if(data.body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            place = data.body.features[0];
            coor = place.center;
            callback(undefined, place);
        }
    })
}

module.exports = geocode;