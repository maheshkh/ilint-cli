'use strict';

/**
 * @fileoverview Asks questions for .ilintsrc json config file
 * @author Mahesh Khatri
 */

const inquirer = require('inquirer'),
  ConfigFile = require('./config_file'),
  log = require('../logger');

/**
 * Create .eslintrc file in the current working directory
 * @param {Object} config object that contains user's answers and default answers
 * @returns {void}
 */
function writeFile(config) {
  ConfigFile.writeJSONConfigFile(config, '.ilintrc');
  log.info('Successfully created .ilintrc file');
}

/**
 * Add defaults (csslint and eslint options) to users answers
 * @param {Object} config object that contains user's answers
 * @returns {Object}
 */
function processAnswers(answers) {
  var config = {
    'cssLintOptions': {
      'filesOrFolders': [],
      'errors': '',
      'warnings': '',
      'ignore': '',
      'exclude-list': ''
    },
    'esLintOptions': {
      'filesOrFolders': [],
      'configPath': '',
      'rulesdir': ''
    },
    'dbSettings': {},
    'iLintSettings': {}
  };

  config.projectName = answers.projectName;
  config.projectFolder = answers.projectFolder;
  config.dbSettings.dbUserName = answers.dbUserName;
  config.dbSettings.dbPassword = answers.dbPassword;
  config.dbSettings.dbHost = answers.dbHost;
  config.dbSettings.dbPort = answers.dbPort;
  config.iLintSettings.binFolder = answers.binFolder;
  return config;
}

/**
 * Ask user a few questions on command prompt
 * @param {Function} callback callback function when file has been written
 * @returns {void}
 */
function promptUser(callback) {
  inquirer.prompt([
  {
    type: 'input',
    name: 'projectName',
    message: 'Name of the project?',
    validate: function(input) {
      if (input.trim().length === 0 && input.trim() !== ',') {
        return 'Please enter valid project name';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'projectFolder',
    message: 'Name of the project folder?',
    validate: function(input) {
      if (input.trim().length === 0 && input.trim() !== ',') {
        return 'Please enter valid project folder name';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'dbUserName',
    message: 'MySql database UserName?',
    default: 'iLintUser',
    validate: function(input) {
      if (input.trim().length === 0 && input.trim() !== ',') {
        return 'Please enter valid database username';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'dbPassword',
    message: 'MySql database password?',
    default: 'password',
    validate: function(input) {
      if (input.trim().length === 0 && input.trim() !== ',') {
        return 'Please enter valid password';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'dbHost',
    message: 'Database Host?',
    default: 'localhost',
    validate: function(input) {
      if (input.trim().length === 0 && input.trim() !== ',') {
        return 'Please enter valid database host';
      }
      return true;
    }
  },
  {
    type: 'input',
    name: 'dbPort',
    message: 'Database Port?',
    default: 3306,
    validate: function(input) {
      if (!(input % 1 === 0)) {
        return 'Please enter valid port number';
      }
      return true;
    }
  }
  ]).then(function(answers) {
    try {
      var config = processAnswers(answers);
      writeFile(config);
    } catch (err) {
      callback(err);
      return;
    }
    return;
  });
}

module.exports = {
  initializeConfig(callback) {
    promptUser(callback);
  }
};