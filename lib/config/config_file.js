'use strict';

/**
 * @fileoverview Writes .ilintsrc json config file
 * @author Mahesh Khatri
 */


const fs = require('fs'),
  stringify = require('json-stable-stringify'),
  debug = require('debug')('ilint:*,-ilint:code-path');

/**
 * Determines sort order for object keys for json-stable-stringify
 * @param   {Object} a The first comparison object ({key: akey, value: avalue})
 * @param   {Object} b The second comparison object ({key: bkey, value: bvalue})
 * @returns {number}   1 or -1, used in stringify cmp method
 */
function sortByKey(a, b) {
    return a.key > b.key ? 1 : -1;
}

/**
 * Writes a configuration file in JSON format.
 * @param {Object} config The configuration object to write.
 * @param {string} fileName The filename to write to.
 * @returns {void}
 */
function writeJSONConfigFile(config, fileName) {
    debug(`Writing JSON config file: ${fileName}`);

    const content = stringify(config, {cmp: sortByKey, space: 2});
    fs.writeFileSync(fileName, content, 'utf8');
}

module.exports = {
    writeJSONConfigFile
};