#!/usr/bin/env node

var program = require('commander');
var colors = require('colors');
var Table = require('cli-table');
var table = new Table({
  head: ['Formatted Address', 'Type']
});
var changeCase = require('change-case');

program
  .version('0.0.1')
  .option('-v, --verbose', 'Verbose')
  .parse(process.argv);

var locateme = require('./lib/locateme');

locateme(program.verbose, function(err, location, accuracy) {
  if (err) {
    console.error(err.toString().red);
    console.log('Aborting'.red);
  } else if (!location) {
    console.log('Something went wrong. Please try again!'.red);
  } else if (program.verbose) {
    location.results.forEach(function(result) {
      table.push([result.formatted_address, changeCase.titleCase(result.types[0])]);
    });
    console.log('Here are your address components'.green);
    console.log(table.toString());
  } else {
    console.log('Found you!'.green);
    console.log('You are located within a ' + accuracy + 'm radius from ' + location.results[0].formatted_address);
  }
});
