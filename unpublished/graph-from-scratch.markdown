[James][] mentioned the other day that he was drinking tea "at a rate of 0.75 OC", OC being the base speed at which I myself consume a mug of that wonderful <span style='color:#FFEBCD'>#FFEBCD</span> liquid. A little [flurry of tweets][tea-tweets] ensued which resulted in me kind of accepting a joke/challenge using a meme.

This post is mainly about plotting a graph with nothing but JavaScript and a canvas element, but it also gives me a chance to finally document my tea drinking habits for the world to gaze upon in wonder.

<!-- more -->

## Aim

I'm going to build a simple plotted graph using JavaScript and a canvas element but without any external dependencies. I'll try to walk you through each step of the way too, so you can pick and choose which parts of this code you'd like to use in your possibly unrelated canvas project.

This will be self contained within a neat little class, so you'll easily be able to pull it out and modify it to your hearts content.

## Setup

First I'm going to setup a couple of empty classes. I'm going to have a `LineGraph` class which inherits (using [prototypical inheritance][proto]) from `Graph`. The base class will contain anything a generic graph would, such as containing data points and rendering.

It will be up to the individual implementations, a `LineGraph` in this case, to turn those data points into something visual.

```javascript
/**
 * Base graph class, handles containment of data points and the overarching
 * interface of all graph classes.
 *
 * @class
 */
function Graph() {
}

/**
 * Line graph, used for plotting a value over time.
 *
 * @class
 * @augments Graph
 */
function LineGraph() {
	Graph.apply(this, arguments);
}

LineGraph.prototype = Object.create(Graph.prototype);
```

## Storing the data

The base `Graph` class needs to take a set of data and store it for later use by it's child classes. This data could be an array (line graphs) or an object containing simple numbers (pie chart).

We'll do this by adding a `setDataSource` method which is called from the constructor.

```javascript
/**
 * Base graph class, handles containment of data points and the overarching
 * interface of all graph classes.
 *
 * @class
 * @param {*} [initialDataSource]
 */
function Graph(initialDataSource) {
	this.setDataSource(initialDataSource);
}

/**
 * Updates the current data source. The values contained within are used to
 * render the actual graph.
 *
 * @param {*} dataSource
 */
Graph.prototype.setDataSource = function (dataSource) {
	this._dataSource = dataSource;
};
```

## Creating the canvas

We'll leave it to the base class to create and prepare the canvas element. It will create the element at a specified size and then store it's context.

```javascript
/**
 * Base graph class, handles containment of data points and the overarching
 * interface of all graph classes.
 *
 * @class
 * @param {Number} width
 * @param {Number} height
 * @param {*} [initialDataSource]
 */
function Graph(width, height, initialDataSource) {
	this.setDataSource(initialDataSource);
	this.initialiseCanvas(width, height);
}

/**
 * Initialises the canvas element and stores it's context object. It will also
 * set the initial width and height.
 *
 * @param {Number} width
 * @param {Number} height
 */
Graph.prototype.initialiseCanvas = function (width, height) {
	this._canvas = document.createElement('canvas');
	this._context = this._canvas.getContext('2d');
	this.setSize(width, height);
};

/**
 * Updates the current size of the graph.
 *
 * @param {Number} width
 * @param {Number} height
 */
Graph.prototype.setSize = function (width, height) {
	this._canvas.width = this._width = width;
	this._canvas.height = this._height = height;
};
```

We'll also add a way to fetch the canvas element for later. This will be used to inject the element into the DOM where you see fit.

```javascript
/**
 * Fetches the actual canvas DOM node. This can be used to place the canvas
 * within your page.
 *
 * @return {HTMLElement}
 */
Graph.prototype.getCanvasElement = function () {
	return this._canvas;
};
```

You'll now be able to create the canvas and inject it into your page with something like this.

```javascript
var g = new Graph(300, 200);
var canvas = g.getCanvasElement();
document.body.appendChild(canvas);
```

## Setting up the data

This isn't very well defined, it's kind of up to how the specific graph child class wishes to implement it. Here's how I'm going to implement the data structure for the `LineGraph` class.

```javascript
var teaGraph = new LineGraph(300, 200, {
	consumptionSpeed: {
		colour: '#FF0000',
		values: [
			0, 0, 0, 0, 0,
			0, 0, 0, 0.1, 0.3,
			0.8, 1, 3, 8, 16, 32
		]
	},
	temperature: {
		color: '#0000FF',
		values: [
			80, 80, 80, 80, 80,
			79, 78, 76, 72, 60,
			55, 54, 40, 10, 0, -32
		]
	}
});
```

This allows us to name our plotted lines (even if they're not displayed yet, they might be), colour them and specify the actual values they should display. I think the `LineGraph` class should be able to work with that.

[james]: https://twitter.com/jamesfublo
[tea-tweets]: http://www.exquisitetweets.com/tweets?eids=EjQYN9DC57.EjRXe1BtqC.ElgZl6JxF6.ElhqBY5I1Q.Elhyot1C20.ElhGxGBZoi
[proto]: http://oli.me.uk/2013/06/01/prototypical-inheritance-done-right/
