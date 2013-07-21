No matter how amazing your script is, you will need to expose it to the wider world at some point. By that I don't mean publication through NPM or any other package managers, I mean you need to actually expose your classes and functions to the code that needs to consume them.

You may be using AMD, CommonJS or the global object to do this, but are you using all of them at the same time? Because it's actually quite possible, I use the same technique in [my EventEmitter project][ee-expose]. If you set this up right, your users will be able to hook into your code in any way they choose.

<!-- more -->

## The target

This little snippet is the kind of code my following code was designed for. It's a single class that simply exposes by leaking into the global name space.

```javascript
function Foo(result) {
	this._result = result;
}

Foo.prototype.get = function get() {
	return this._result;
};

function someHelper() {
	// ...
}
```

You will also notice how I have named my `get` method in two places. This is so you can call it with `.get()`, as usual, but it will show up as a function called `get` if you were trying to debug something that called it. The usual practice is to assign anonymous functions which makes it harder to work out what is going where at a glance.

Another thing to note is that my helper function, aptly named `someHelper`, is also leaking into the global name space. That's awful! Well, presuming it's meant to be a private method.

## Selectively exposing globally

You can stop any of your functions, variables or classes from leaking by wrapping them in an anonymous function call like this.

```javascript
(function () {
	// YOUR ORIGINAL CODE HERE
}.call(this));
```

By calling the anonymous function with with `call(this)` it sets the `this` variable within the anonymous function to that of the global name space. This would be `window` in a browser. This is assuming the anonymous function is defined within a global scope though.

With that set up you can selectively expose the values you want to without leaking anything.

```javascript
(function () {
	// YOUR ORIGINAL CODE HERE

	this.Foo = Foo;
}.call(this));
```

Now only the `Foo` class is exposed. You can have as many local methods or variables as you require without creating a pile of rubbish that floats around in the `window` object for all eternity.

[ee-expose]: https://github.com/Wolfy87/EventEmitter/blob/ae0c5099bd8f08a61f70a0ebc39b32a2ce52ddb0/EventEmitter.js#L425-L436