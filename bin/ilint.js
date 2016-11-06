#! /usr/bin/env node
'use strict';

/**
 * @fileoverview Main CLI that is run via the ilint command.
 * @author Mahesh Khatri
 */

const init = (process.argv.indexOf('--init') > -1),
  debug = (process.argv.indexOf('--debug') > -1);

// must do this initialization *before* other requires in order to work
if (debug) {
  require('debug').enable('ilint:*,-ilint:code-path');
}

// other required modules
const cli = require('../lib/api'),
  fs = require('fs'),
  path = require('path');

// exception handling
process.on('uncaughtException', function(err) {
  console.log(err.message);
  console.log(err.stack);
  process.exit(1);
});

// If its a init command the creat ilintrc file else call the execute method of api
if (init) {
  const configInit = require('../lib/config/config_initializer');

  configInit.initializeConfig(function(err) {
    if (err) {
      process.exitCode = 1;
      console.error(err.message);
      console.error(err.stack);
    } else {
      process.exitCode = 0;
    }
  });
} else {

}