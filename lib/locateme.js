var getLocation = require('./getLocation');
var geoCoder = require('geocoder');

var locateme = function(verbose, callback) {
  getLocation(verbose, function(err, location) {
    if (err) {
      callback(err, null);
    } else if (!location) {
      callback(new Error('Network error'), null);
    } else {
      accuracy = location.accuracy;
      lat = location.location.lat;
      lng = location.location.lng;
      if (verbose) {
        console.log('Latitude: ' + lat);
        console.log('Longitude: ' + lng);
        console.log('Radius: ' + accuracy); 
      }
      console.log('Looking up your coordinates...'.yellow);
      geoCoder.reverseGeocode(lat, lng, function(err, data) {
        // do something with data
        if (err) {
          callback(err, null);
        } else {
          callback(null, data, accuracy)
        }
      }, {
        sensor: true
      });
    }

  });
}

module.exports = locateme;
