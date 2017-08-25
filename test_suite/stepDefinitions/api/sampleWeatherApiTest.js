/**
 * Created by Ferkat on 8/25/17.
 */

var request = require('superagent');
var assert = require('assert');
module.exports = function () {
    "use strict";

    var cityName;
    var obj;
    var apiKey = '16c5aa26f743259bd62b857fd7b0b6f4';

    Given(/^I have a city name that I need to get the weather data for$/, function () {
        return cityName = 'Baltimore';
    });


    When('I send a city name to the weather api', function (callback) {
        request.get('api.openweathermap.org/data/2.5/weather?')
            .query({q: cityName, APPID: apiKey})
            .end(function (err, res) {
                if (err) {
                    console.log('Something gone wrong: \n' + res.body.message);
                    return false;
                }

                //Returning response body as obj so we can use in next step
                obj = res;
                callback();
            });


    });


    Then('I should receive weather information', function (callback) {
        console.log('Weather in ' + cityName + ' is: ' + obj.body.weather[0].description);
        console.log('Coordinates of the city ' + cityName + ' is: \n' + 'Lon: ' +
            obj.body.coord.lon + '\nlat: ' + obj.body.coord.lat)
        assert.equal('4347778', obj.body.id);
        callback();
    });
};




