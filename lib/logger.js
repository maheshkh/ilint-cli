'use strict';
/**
 * @fileoverview logs argument as console log or error
 * @author Mahesh Khatri
 */


/**
 * Logs the information on console
 * @param {string} info info which needs to be logged on console
 * @returns {void}
 */
function info(info) {
  console.log(info);
}

/**
 * Logs the error on console as error
 * @param {string} error error which neeeds to be logged on console
 * @returns {void}
 */
function error(error) {
  console.error(error);
}

module.exports = {
  info,
  error
};