var getLocation = require('./getLocation');
var geoCoder = require('geocoder');

var locateme = function(callback) {
  getLocation(function(err, location) {
    lat = location.location.lat;
    lng = location.location.lng;
    console.log('Looking up your coordinates...');
    geoCoder.reverseGeocode(lat, lng, function(err, data) {
      // do something with data
      if (err) {
        callback(err, null);
      } else {
        callback(null, data)
      }
    }, {
      sensor: true
    });
  });
}

module.exports = locateme;
