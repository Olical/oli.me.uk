As my last post mentioned, I recently read [Functional JavaScript][fjs] can't physically recommend it enough. This book has caused me to make the mental leap between real world applications and functional programming due to the fact that it's written in a language I live and breath.

After reading this I was inspired to pick up [Haskell][hs] from where I left off last time; a "Hello, World!" application. I've since started to work through [Learn You a Haskell for Great Good!][lyah], which is yet another excellent book. Reading this has caused me to think about certain programming things we don't have in JavaScript.

One of the (many) things I saw in Haskell that I couldn't think of an alternative to in JavaScript were [tuples][]. Sure you can use an array, but it won't have a fixed size or pseudo named properties. I say pseudo because they are not named, like an array, but they can easily be mapped to names, like an object. It seems to work like a middle ground between the two in my opinion.

So, I set about writing a tiny tuple implementation in JavaScript; this is what I came up with.

<!-- more -->

## The base class definition

For starters, I needed a simple class definition that created the tuple instance, set it's size and stored some initial data.

```javascript
function Tuple(/* values */) {
	this._store = new Array(arguments.length);
}
```

By calling `new Typle(...)` you can now define a tuple that creates an internal storage array of the appropriate length. Now we need a function that sets those values, that function also needs to be called from the constructor.

```javascript
function Tuple(/* values */) {
	var args = Array.prototype.slice.call(arguments, 0);
	this._store = new Array(args.length);
	this.pack.apply(this, args);
}

Tuple.prototype.pack = function pack(/* values */) {
	var store = this._store;
	var i = store.length;

	while (i--) {
		store[i] = arguments[i];
	}

	return this;
};
```

Now the arguments you pass to the constructor are sliced into an array and pushed onto the `pack` method which bundles them into the storage array. The pack method simply iterates over it's arguments and assigns each one to it's place in the storage.

## Getting the data out

It's all well and good dumping values into a fixed size tuple, but how do you get them out? Better still, how do you get them out in a Haskell-ish way the will allow you to assign each value to a variable of your choice?

```javascript
Tuple.prototype.unpack = function unpack(callback) {
	return callback.apply(this, this._store);
};
```

When you call unpack all of the values in the storage array are passed to your callback function for you to do with as you please. That means you can assign each value to any name you want; `x`, `y` and `z` for example. This is inspired by pattern matching a tuple in Haskell and unpacking the values into variables of your choosing.

So with the current code, you could do something like this.

```javascript
var box = new Tuple(10, 20, 15);

var volume = box.unpack(function (x, y, z) {
	return x * y * z;
});

console.log(volume); // 3000
```

This creates a tuple that contains three numbers: A width, height and depth of a box. We can then use `unpack` to assign each value to a variable, do some stuff with them and return their result. You could recreate [Haskell's `fst` and `snd` functions][fns] fairly easily with similar code.

```javascript
function fst(tuple) {
	return tuple.unpack(function (first, second) {
		return first;
	}):
}

function snd(tuple) {
	return tuple.unpack(function (first, second) {
		return second;
	}):
}
```

I would not advise using anonymous functions like I have done above in production. Please place them into stand alone functions that are not declared every time. I have only written them like that for brevity.

## Integration with other tuples and types

> Talk about toString and valueOf here.

[fjs]: http://shop.oreilly.com/product/0636920028857.do
[hs]: http://www.haskell.org/
[lyah]: http://learnyouahaskell.com/
[tuples]: https://en.wikipedia.org/wiki/Tuple
[fns]: https://en.wikibooks.org/wiki/Haskell/Lists_and_tuples#Example:_fst_and_snd