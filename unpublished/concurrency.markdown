If you've worked with JavaScript in a browser, or indeed on the server, for any length of time you've probably had to deal with asynchronous spaghetti. This kind of spaghetti is not delicious in any way, shape or form.

You end up with multiple boolean variables and function calls constantly checking if all of those AJAX requests have finished; it is far from ideal. I'm going to show you how to break the problem down and come out of the other side with your sanity still intact.

<!-- more -->

## An example

The first step in explaining this involves creating a problem, here's the scenario: You're running a site like [gist.github.com][] and you need to fetch some meta data for a list of gists from the server. This is going to involve you making multiple requests and then doing something when they're all finished, you'll probably want a loading spinner overlay or something while it fetches them as well.

The way to do this in an elegant way is to have something execute a set of functions or requests that can each tell the central component when they have finished. I'm going to create a very simple class called `Batch` that will do just that.

```javascript
/**
 * Executes a list of functions that call back when they are finished.
 *
 * @class
 * @param {Array} functions Target methods to execute when requested.
 * @param {Function} completionHandler Executed when all target functions are finished.
 */
function Batch(functions, completionHandler) {
	this._functions = functions;
	this._completionHandler = completionHandler;
}
```

This is just an empty class that will take an array of functions that it will execute later. It also takes a `completionHandler` function argument; it is executed when all of the functions are completely finished.

## Starting the requests

Now we need a method that will execute all of our provided functions.

```javascript
Batch.prototype.execute = function execute() {
	var i;
	var functions = this._functions;
	var length = this._remaining = functions.length;
	this._results = [];

	for (i = 0; i < length; i += 1) {
		functions[i](this);
	}
};
```

When called, this will store the amount of remaining functions left to finish executing (`this._remaining`) and then begin the execution of each and every one of them. Each function will be passed the current instance of `Batch`, the functions will then have to call a method on that instance to signify that they are done.

The `this._results` array will be used to hand the results of each function back to the completion handler when everything is finished.

[gist]: https://gist.github.com/