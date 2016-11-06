'use strict';
/**
 * @fileoverview Reads the .ilintrc Json file
 * @author Mahesh Khatri
 */

const log = require('../logger'),
      debug = require('debug')('ilint:*,-ilint:code-path');

/**
  * Reads the .ilintrc file and converts it into Json
  * @param {string} config config object to to read .ilintrc file
  * @returns {Object} Object of.ilintrc Json config
  */
function readConfigData(config) {
  var data = readConfigFile(config),
      json;
  if (data) {
    if (data.charAt(0) === '{') {
      try {
        json = JSON.parse(data);
      } catch (e) {
        debug(`Error reading .ilintrc JSON file`);
      }
    }
  }
  return validateConfig(json);
}

/**
  * Reads the .ilintrc file
  * @param {string} args config object to read .ilintrc file
  * @returns {string} returns Json string
  */
function readConfigFile(args) {
  log.info('Reading .ilintrc file');
  var ilintrc = '.ilintrc',
      configJson = args.readFile(args.getFullPath(ilintrc));
  return configJson;
}

/**
  * Validates the Config file attributes and adds default values
  * @param {string} configJson validate .ilintrc config for default values
  * @returns {string}
  */
function validateConfig(configJson) {
  log.info('Validating .ilintrc file');
  configJson.iLintSettings.nodeBinPath = configJson.iLintSettings.nodeBinPath || './node_modules/.bin';
  return configJson;
}

module.exports = {
  readConfigData
};