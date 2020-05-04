const geocode = require('./geocode.js');
const request = require('postman-request');

const weather = (address, callback) => {
    geocode(address, (err, data) => {
        if(err) {
            callback(err, undefined);
        }
        else {
            //console.log(data);
            let data1 = data;
            const url = `http://api.weatherstack.com/current?access_key=5a9371aaf1d9a13183b213047f6405a3&query=${data.center[1]},${data.center[0]}`;
            request( {url: url, json: true}, (err, data) => {
                //console.log(data.body.current);
                if(err) {
                    callback('Unable to connect to weatherstack', undefined);
                } else if(data.body.error) {
                    callback(data.body.error, undefined);
                } else{
                    data = data.body;
                //data = JSON.parse(res.body);
                    callback(undefined, data, data1.place_name);
                }
            })       
        }
    })
}

module.exports = weather;