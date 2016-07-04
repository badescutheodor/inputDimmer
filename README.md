# Introduction
inputDimmer is a jQuery plugin used to dim the rest of the page on input focus increasing the user attention onto some element on the website.

# Installation
Clone the repository and copy the minified folder content inside your project assets folder and load them using link and script tags respectively.

# Documentation
All elements that have class ```.id-dimmer``` would trigger the plugin on inside input / textarea focus. You may initialize the plugin manually using ```$("textarea").inputDimmer()```. Once initialized, you can manually close or open the dimmer using ```$("textarea").inputDimmer("close");``` or ```$("textarea").inputDimmer("open");```. You may also implement custom behaviour on dim open, close event on plugin initializing.

```
$("textarea").inputDimmer({
	"open": function(element) { // The element that got focused

	},
	"close": function() {

	}
});
```