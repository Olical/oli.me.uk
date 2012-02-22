---
layout: post
title: Color in JavaScript
date: 2012-02-22 00:00:00
tags:
 - javascript
 - color
---

Quite a while ago I wrote some JavaScript to help with manipulating colors. I wrote it before I perfected the way I wrote classes and JavaScript in general. That means that it is pretty shabby in comparison to what I can do now. Here is [Color in it's old form](https://github.com/Wolfy87/Color/tree/45a83fecda62c086e788895182e403a9c9b42807). I say old because I am going to rewrite it. This time using classes, making it run in a browser or a server, and having it validate in [JSHint](http://www.jshint.com/). I will probably even drop it on [NPM](http://npmjs.org/).

Now, to rewrite this I am going to need some functions to convert colors in various formats to a base format. I will be using an array as a base. This array will simply contain the red green and blue values for the color. In the final class everything will be orderly and packaged away with nice function names. For now, I am just going to write some color conversion functions that you are free to use where ever you want.

{% highlight javascript %}
// Color names, used in a function down below
var colors = {
	aliceblue: [240, 248, 255],
	antiquewhite: [250, 235, 215],
	/*
		...
		To get all of the colors please visit the fiddle
		http://jsfiddle.net/Wolfy87/XDnEL/
		There were just too many to drop into here
		...
	*/
	yellow: [255, 255, 0],
	yellowgreen: [154, 205, 50]
};

/**
 * Converts a hexadecimal color to an array
 * Containing it's red, green and blue values
 *
 * @param {String} color Hexadecimal color
 * @return {Array} Red, green and blue values of the color
 */
function hex2array(color) {
	// Initialise variables
	var rgb = [];
	
	// Take off the hash
	color = color.slice(1);
	
	// Convert it to the right length if it is the shorthand
	if(color.length === 3) {
		color = color.replace(/([0-9a-f])/ig, '$1$1');
	}
	
	// Split the string into its main components and convert them to RGB
	for(i = 0; i < 3; i += 1) {
		rgb.push(parseInt(color.slice(i * 2, (i + 1) * 2), 16));
	}
	
	// Return the finished array
	return rgb;
}

/**
 * Converts an RGB color to an array
 * Containing it's red, green and blue values
 * The RGB color must resemble `rgb(0, 0, 0)`
 *
 * @param {String} color RGB color
 * @return {Array} Red, green and blue values of the color
 */
function rgb2array(color) {
	// Initialise variables
	var i = null,
		rgb = null;
	
	// Take out the 'rgb(', ')', spaces and split it by commas
	rgb = color.replace(/rgb\(|\)|\s/gi, '').split(',');
	
	// Loop over the rgb values converting them to integers
	for(i = 0; i < 3; i += 1) {
		rgb[i] = parseInt(rgb[i], 10);
	}
	
	// Return the finished array
	return rgb;
}


/**
 * Converts a color to an array by it's name
 * Containing it's red, green and blue values
 * Will return false if the color was not recognised
 *
 * @param {String} color A colors name
 * @return {Array|Boolean} Red, green and blue values of the color or false if the color could not be found
 */
function name2array(color) {
	// Initialise variables
	var i = null;
	
	// Loop over all of the color names
	for(i in colors) {
		// Check if the color matches
		if(colors.hasOwnProperty(i) && i === color.toLowerCase()) {
			// It does, return it's RGB array
			// We have to build a new array otherwise the reference to the original will be returned
			// If this happens changes made to the returned array will effect this one
			return [colors[i][0], colors[i][1], colors[i][2]];
		}
	}
	
	// Default to returning false
	// This will happen if the color was not recognised
	return false;
}

console.log(hex2array('#DDCCAA'));
console.log(rgb2array('rgb(10,  20  ,200)'));
console.log(name2array('Red'));
{% endhighlight %}

Whew! That's a lot of code! I have had to leave out a lot of the color names simply because of how many there are. You can find the full code in [the fiddle I created](http://jsfiddle.net/Wolfy87/XDnEL/). These functions will convert hexadecimal, RGB and color names to an array containing their RGB values. I have not added functions to convert the other way in here because they will come with the Color class I am going to write. Well, just in case you really need to convert something now, here is how to convert back to an RGB value.