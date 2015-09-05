#!/usr/bin/env node

var program = require('commander');
var colors = require('colors');

program
  .version('0.0.1')
  .option('-v, --verbose', 'Verbose')
  .parse(process.argv);

var locateme = require('./lib/locateme');

if(program.verbose) {
}
console.log('Initiating request...'.green)
locateme(function(err, location, accuracy){
  // console.log(err, location);
  console.log('Found you!'.green);
  console.log('You are located within a ' + accuracy + 'm radius from ' + location.results[0].formatted_address);
});
