[James][] mentioned the other day that he was drinking tea "at a rate of 0.75 OC", OC being the base speed at which I myself consume a mug of that wonderful <span style='color:#FFEBCD'>#FFEBCD</span> liquid. A little [flurry of tweets][tea-tweets] ensued which resulted in me kind of accepting a joke/challenge using a meme.

This post is mainly about plotting a graph with nothing but JavaScript and a `&lt;canvas&gt;` element, but it also gives me a chance to finally document my tea drinking habits for the world to gaze upon in wonder.

<!-- more -->

## Aim

I'm going to build a simple plotted graph using JavaScript and a `&lt;canvas&gt;` element but without any external dependencies. I'll try to walk you through each step of the way too, so you can pick and choose which parts of this code you'd like to use in your possibly unrelated canvas project.

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
 * @param {*} initialDataSource
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

We may as well add a public `getDataSource` while we're at it too. If our descendant `LineGraph` class accessed `_dataSource` directly it would be treating it as protected. As we all know, anything prefixed with an underscore is completely private and nothing can touch it. If you try to, bad things will happen. **Very** bad things.

```javascript
/**
 * Fetches the current data source. Obviously.
 *
 * @return {*}
 */
Graph.prototype.getDataSource = function () {
	return this._dataSource;
};
```

[james]: https://twitter.com/jamesfublo
[tea-tweets]: http://www.exquisitetweets.com/tweets?eids=EjQYN9DC57.EjRXe1BtqC.ElgZl6JxF6.ElhqBY5I1Q.Elhyot1C20.ElhGxGBZoi
[proto]: http://oli.me.uk/2013/06/01/prototypical-inheritance-done-right/
