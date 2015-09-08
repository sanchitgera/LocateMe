var querystring = require('querystring');
var https = require('https');
var wifiscanner = require('node-wifiscanner');
var geocoder = require('geocoder');
var Table = require('cli-table');

var table = new Table({
  head: ['SSID', 'Mac', 'Signal Strength']
});

function buildRequestAndPrint(verbose, cells) {
  var maxCells = 10;
  var options = {
    method: 'GET',
    hostname: 'maps.googleapis.com',
    port: 443,
    path: null
  };
  var path = "/maps/api/browserlocation/json?browser=firefox&sensor=true";


  var wifis = [];
  var cell;
  for (var i = 0, l = cells.length; i < l; i++) {
    if (i > maxCells) {
      break;
    }
    cell = [];
    cell.push('mac:' + cells[i].mac);
    cell.push('ssid:' + cells[i].ssid);
    cell.push('ss:' + cells[i].signal_level);
    table.push(
      [cells[i].mac, cells[i].ssid, cells[i].signal_level]
    );
    wifis.push(querystring.stringify({
      'wifi': cell.join('|')
    }));
  }
  if (verbose && wifis.length) {
    console.log(table.toString());
  }
  options.path = path + '&' + wifis.join('&');

  return options;
}

function getLocation(verbose, callback) {
  console.log('Scanning wifi ports around you...'.yellow);
  wifiscanner.scan(function(err, data) {

    if (err) {
      callback(err, null);
      return;
    }

    var cells = data;
    var options = buildRequestAndPrint(verbose, cells);
    console.log('Fetching geocoordinates...'.yellow);
    var req = https.request(options, function(res) {
      var responseText = '';
      res.on('data', function(data) {
        responseText += data.toString();
      });
      res.on('end', function() {
        var location = JSON.parse(responseText);
        callback(null, location);
        return;
      });
    }).on('error', function(e) {
      callback(err, null);
      return;
    });
    req.end();
  });
}

module.exports = getLocation;
