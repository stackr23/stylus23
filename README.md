# Stylus23
> Stylus mixins, utilities, helpers, ...
The main feature is the [MQ mixin](#mq-mixin)

## Usage
```Stylus
@import 'stylus23'

body
  font-size mFontSize
  +MQ('tablet')
    font-size tFontSize
  +MQ('desktop')
    font-size dFontSize

+MQ('tablet')
  .wrapper
    width 100%
    @extend .clearfix

+MQ('desktop')
  #page
    @extend .wrapper
```

## Installation

```bash
$ npm install stylus23
```

## JavaScript API

__with connect/express:__
```javascript
var connect             = require('connect')
,   server              = connect()
,   stylus              = require('stylus')
,   stylus23            = require('stylus23')

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(stylus23(options))
}

server.use(stylus.middleware({
    src:      __dirname
,   compile:  compile
}))
```

__with webpack:__
```javascript
var stylus23     = require('stylus23')
,   stylusLoaderDef     = {
        loader: 'stylus-loader',
        options: {
            sourceMap:  true,
            compress:   isDevelopment,
            use:        [stylus23(options)]
        }
    }
,   config              = {
        module: {
            rules: [
                {
                    test: /\.styl$/,
                    use: isDevelopment ? [
                        { loader: 'style-loader',   options: { sourceMap: true } },
                        { loader: 'css-loader',     options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        stylusLoaderDef
                    ]
                    // for production (https://github.com/webpack-contrib/extract-text-webpack-plugin)
                    : ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'postcss-loader', stylusLoaderDef]
                    })
                }
            ]
        }
    }

```

### default options

```javascript
{
      envVars:        process.env
  ,   envPrefix:      '$ENV__'
  ,   imgUrlPrefix:   process.env.ROOT_PATH + '/assets' // TBD
}
```

## Stylus Imports  

To gain access to everything the lib has to offer, simply add:  
  ```stylus
  @import 'stylus23'
  ```
  Or you may also pick only the MQ Vars and Mixins

  ```stylus
  @import 'stylus23/mqs'
  ```

## MQs

```stylus
// default mediaquery vars
$stylus_mq_xs   ?= 'only screen and (max-width: 333px)'
$stylus_mq_s    ?= 'only screen and (min-width: 640px)'
$stylus_mq_m    ?= 'only screen and (min-width: 768px)'
$stylus_mq_l    ?= 'only screen and (min-width: 1024px)'
$stylus_mq_xl   ?= 'only screen and (min-width: 1200px)'
```

We do a simple `lookup('$stylus_mq_' + name)`,  
so you can easily add or overwrite mqs before you load stylus23.

you can also modify them via JS per passing them in options:
```
{mediaQueries: {
    name:   'only screen and (min-width: 999px)'
}}
```

> **to avoid duplicate mediaqueries i use '[node-css-mqpacker](https://github.com/hail2u/node-css-mqpacker)' in my webpack setup**

## Changelog:

**1.1.0** - renamed to __STYLUS23__
  
**1.0.0** - **breaking changes:**   
* renamed mq variables ($stylus_mq_{name})  
* allows to pass mediaQueries per options ([#JavaScript API](#javascript-api))  
* shows error-div on top of page if an undefined MQ name is used
* ALWAYS (!) injects NODE_ENV (both ways: $ENV__NODE_ENV and {envPrefix + 'NODE_ENV'})

**0.3.0** - stylus23 now accepts options (envVars, envPrefix, imgUrlPrefix)  
**0.2.3** - added assetPath() to use 'process.env.ROOT_PATH' as url-prefix  
**0.2.1** - injects process.env.NODE_ENV into stylus (global var $ENV__NODE_ENV)  
**0.1.1** - ready for Stylus.use() API  

### Roadmap
* rethink/refactor "seperated MQ files" (see oldREADME)
  * MQ "base" 
* remove /inc path
* [ ] refactor "imgUrlPrefix"  
* [ ] refactor assetPath - ROOT_PATH => APP_ROOT
* [ ] testing  
* [x] extend MQs per options  

## Contributors
  - [DoubleU23](https://github.com/DoubleU23) (Original Creator)
