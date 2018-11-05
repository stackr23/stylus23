# Stylus23
> Stylus mixins, utilities, helpers, ...
The main feature is the [MQ mixin](#mq-mixin)

## Usage
```Stylus
@import 'stylus23'

html,
body
  font-size mFontSize
  +MQ('tablet')
    font-size tFontSize
  +MQ('desktop')
    font-size dFontSize

+MQ('tablet')
  .wrapper
    width 100%

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
,   doubleu23Stylus     = require('stylus23')
,   options             = {
    // these are the defaults
        envVars:        process.env
    ,   envPrefix:      '$ENV__'
    ,   imgUrlPrefix:   process.env.ROOT_PATH + '/assets' // TBD
    ,   mediaQueries:       {
            'xs':       'only screen and (min-width: 666px)', // overwrite 'xs'
            'custom':   'only screen and (max-width: 555px)'  // or define your own
        }
    }

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(doubleu23Stylus(options))
}

// don't ask! (copied from "nib")
// may be out of date
server.use(stylus.middleware({
    src:      __dirname
,   compile:  compile
}))
```

__with webpack:__
```javascript
var options             = {
    // these are the defaults
        envVars:        process.env
    ,   envPrefix:      '$ENV__'
    ,   imgUrlPrefix:   process.env.ROOT_PATH + '/assets' // TBD
    }
,   doubleu23Stylus     = require('stylus23')
,   stylusLoaderDef     = {
        loader: 'stylus-loader',
        options: {
            sourceMap:  true,
            compress:   isDevelopment,
            use:        [doubleu23Stylus(options)]
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

## Stylus Imports  

To gain access to everything the lib has to offer, simply add:  
  ```stylus
  @import 'stylus23'
  ```
  Or you may also pick only the MQ Vars and Mixins

  ```stylus
  @import 'stylus23/mqs'
  ```

## MQ-Mixin
```stylus
// use it on top of selectors
body
    font-size 12px
+MQ('tablet')
    body
      font-size 14px
+MQ('deskop')
    body
        font-size 16px

// or use the mixin beetween the properties
body
    font-size 12px
    +MQ('tablet')
        font-size 14px
    +MQ('deskop')
        font-size 16px 50px 10px
    margin-right 1px
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
* remove broken versions from README?
* rethink/refactor "seperated MQ files" (see oldREADME)
  * MQ "base"
  * + documentation in README (wrap all in MQ, output files, mediaqueried style links, ...)  
* remove /inc path
  * remove imports in index.styl (just import what you need!)
* ?rename "_reset.styl" to "_preset.styl"?
* extended README  
  * migration to 1.0.0  
  * more infos for MQ mixin  
  * describe file contents of /inc/*  
* refactor "imgUrlPrefix"  
* change package title  
* testing (per ?mocha) if all imports and mixins are working  
* testing?  
* ~~user should be able to overwrite MQ breakpoints (extend options)~~  
* ~~imports? paths?~~  
* ~~let user define which process.env vars should be injected + varPrefix~~

## Contributors
  - [DoubleU23](https://github.com/DoubleU23) (Original Creator)
