> this README is a leftover of my [My SCSS Boilerplate](https://github.com/DoubleU23/scss.boilerplate) (branch stylus)  
in my SCSS setup i compile the files without webpack/browserify so we got an more complex approach on handling the output and writing modules

# ToDo:
* Clean Documentation
* split open and closed versions
* extend the mixins
* test/improve the ability for Backbone/Foundation Boilerplate implementation
* update the doc (mq's changed ... import flow improved)
* find solution for importflow (reset, shame, ...) maybe put it in all/mobile MQ
* seperated files VS. full.scss

# SASS-Boilerplate Documentation
[TOC]

## MQ's in use:
__CAUTION ! IE8 has no MQ's - just a min-width__

__Small (=All)__  
because we are working with "mobile first" this is the MQ's that's loaded for all Clients  
> no MQ to use

__Medium__  
for all tablet devices
> sreen and (min-width: 640px)

__Large__  
for the desktop view
> screen and (min-width: 1024px)

<a name="mq_mixin"></a>
## The MQ mixin
```
@mixin mq($name) {
	@if( $mq == $name ) {
		@content;
	}
}
```
__usage:__
```
body {
	@include mq('desktop') { color: red; }
	@include mq('mobile') { color: red; }
}
```
__OR__
```
@include mq('desktop') {
	body {
		color: red;
	}
}

```

## FILES

### /inc
This is the order in wich they will be included into the _main.scss

__/inc/_reset.scss__  
html5 doctor css reset - 
[http://html5doctor.com/html-5-reset-stylesheet](http://html5doctor.com)  

__/inc/_variables.scss__  
Yes... This is the File were we put all variables  
We could also put it in /_main.scss but i think configuration should be seperated from the code

__/inc/_mixins.scss__  
Here are the functional definitions of the mixins and the functions

__/inc/_helpers.scss__  
helpers like clearfix, border box model, and margin auto ...  
These classes can be uses either as normal CSS-class or as an @extend argugment

### /mq
__/mq/_mobile.scss__, __/mq/_tablet.scss__, __/mq/_dektop.scss__
> The mobile file could also be named "all.scss" because it is loaded for every device  
=> [__mobile first__](http://lmgtfy.com?q=mobile+first)

These are the MQ-specific files. Each MQ in it's own file because of two reasons:  

* We need to set the context per `$mq` variable  
	This variable is recognized by the `mq()` mixin used in _main.scss and /modules/*.scss  
	See [MQ-mixin](#mq_mixin)
	
* Because we have the MQ's in seperate files  
	we can __set the media queries directly in the `<link>`-Tag__ in our HTML header.  
	This __prevents that mobile devices have to load the full CSS__ code for all MQ  
	( WOW! very fast! such performance! )
```
<link rel="alternate" media="only screen and (min-width: 640px)" href="/css/tablet.css">  
<link rel="alternate" media="only screen and (min-width: 1024px)" href="/css/desktop.css">
```