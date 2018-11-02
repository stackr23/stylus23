/*!
 * stylus23
 * Copyright (c) 2015 Stefan Friedl <dev@project23.org>
 * MIT Licensed
 *
 * v1.1 published in 10/2018
 */

/**
 * Module dependencies.
 */

let stylus  = require('stylus'),
    path    = require('path'),
    nodes   = stylus.nodes,
    utils   = stylus.utils

exports = module.exports = plugin

/**
 * Library version.
 */

exports.version = require(path.join(__dirname, '../package.json')).version

/**
 * Stylus path.
 */

exports.path = __dirname

var imgUrlPrefix,
    envVars, envVarsToInject, envPrefix, envVal,
    parseBoolean = function(val) {
        if (val === 'true' || val === 'TRUE')   return true
        if (val === 'false' || val === 'FALSE') return false

        return val
    }

/**
 * Return the plugin callback for stylus.
 *
 * @return {Function}
 * @api public
 */
function plugin(_options) {
    var options     = _options.constructor === Object
        ? _options
        : {}
    envVars         = options.envVars      || {}
    envPrefix       = options.envPrefix    || '$ENV__'
    imgUrlPrefix    = options.imgUrlPrefix || '/assets'

    envVarsToInject = Object.keys(envVars).length ? envVars : process.env

    return function(style) {
        // you shouldn't auto include!
        // becasue of performance and declarative style (= no black magick)
        // style.include(__dirname)

        // allow @import 'stylus23/xyz'
        style.set('paths', [__dirname])

        // to be clarified
        // doesn't seem to work like expected
        //
        // pass the filename option to provide better error reporting.
        // style.set('filename', __filename)

        // envVars
        Object.keys(envVarsToInject).map(function(envKey) {
            envVal = parseBoolean(envVarsToInject[envKey])
            style.define(envPrefix + envKey, envVal)
        })

        // always (!) set $ENV__NODE_ENV
        if ((options.envVars != null && options.envVars['NODE_ENV'] == null)
        || envPrefix !== '$ENV__') {
            style.define('$ENV__' + 'NODE_ENV', process.env.NODE_ENV)
        }

        // assetPath()
        style.define('assetPath', function(input) {
            return imgUrlPrefix + input.val
        })

        // mediaQueries
        if (options.mediaQueries) {
            Object.keys(options.mediaQueries).map(function(key) {
                style.define('$stylus_mq_' + key, options.mediaQueries[key])
                return true
            })
        }
    }
}
