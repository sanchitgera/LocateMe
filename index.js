#!/usr/bin/env node

var program = require('commander');
var colors = require('colors');

program
  .version('0.0.1')
  .usage('<keywords>');

var locateme = require('./lib/locateme');

console.log('Initiating request...'.green)
locateme(function(err, location){
  // console.log(err, location);
  console.log('Found you!'.green);
  console.log('You are located at: ' + location.results[0].formatted_address); 
});
