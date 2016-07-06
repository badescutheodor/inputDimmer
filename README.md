# Introduction
inputDimmer is a jQuery plugin used to dim the rest of the page on input focus increasing the user attention onto some element on the website.

# Installation
Clone the repository and copy the minified folder content inside your project assets folder and load them using link and script tags respectively.

# Documentation
All elements that have class ```.id-dimmer``` would trigger the plugin on inside input / textarea focus. You may initialize the plugin manually using ```$("textarea").inputDimmer()```. Once initialized, you can manually close or open the dimmer using ```$("textarea").inputDimmer("close");``` or ```$("textarea").inputDimmer("open");```. You may also implement custom behaviour on dim open, close event on plugin initializing.

## Initialization

```
$("textarea").inputDimmer({
	open: function(el) { // jQuery object of the focused element
        // triggered whenever one of the inputs of the initialized elements gets focused
	},
	close: function() {
        // triggered whenever the inputDimmer is closed
	}
});
```

OR

```
<textarea class="id-dimmer"><textarea>

<div class="id-dimmer">
    <textarea></textarea>
</div>
```

## Methods
note: All methods require initialization of plugin before usage.

### Destroy
Removes all bindings of the inputDimmer requiring to reinitialize for reuse.

```
$("textarea").inputDimmer("destroy");

$("textarea").inputDimmer("destroy", function() {
    // triggered after the destroy is done
});
```

### Close
Manually closes the dimmer
```
$("textarea").inputDimmer("close");

$("textarea").inputDimmer("close", function() {
    // triggered after the dimmer closed
});
```

### Open
Manually opens the dimmer for element
```
$("textarea").inputDimmer("open");

$("textarea").inputDimmer("open", function() {
    // triggered after the dimmer has opened
});
```


