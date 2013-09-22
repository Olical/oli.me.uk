*This is a follow on from my previous post, [Classless JavaScript][]. You might want to read, or at least skim, that first.*

I've been having a think about all this classless JavaScript stuff, which is basically normal JavaScript without traditional constructors, and I've come up with a few ideas to refine it. The first of which being **DRY** (Don't Repeat Yourself). I'm going to show you the things I thought of and a few working examples of object loving format.

<!-- more -->

## DRY

I realised that I was creating and destroying a lot of objects in the same way, so I thought the first thing to do would be to add a base object that all others can extend by default. This object simply creates a new object where required and will wipe an object, preparing it for a pool, if you wish to destroy it.

```javascript
var base = {
	create: function (self) {
		return self || {};
	},
	destroy: function (self) {
		var key;

		for (key in self) {
			if (self.hasOwnProperty(key)) {
				delete self[key];
			}
		}

		return self;
	}
};
```

Pretty short and simple. By using this base object on all of your other objects you get creation and destruction by default. If you want to override `create` to define things or replace `destroy` with a method that deletes keys by name, rather than a loop, then you're free to do so. Here's how you put this object to use.

```javascript
var model = Object.create(base);
```

That's it. The model object is still empty but it now holds the base object within it's prototype chain, ready for you to override or add to.

## Inheritance

There isn't any, well, in a way. All objects can be used in any function you want, you just have to make sure they have the right values pre-defined, so you just have to make sure you call the correct create methods.

For instance, say we wanted to add `events` support to our `model` code, you'd just need something like this.

```javascript
var model = Object.create(base);

model.create = function (self) {
	self = events.create(self);
	self.modelData = {};
	return self;
};

model.set = function (self, key, value) {
	// ...
};

var user = model.create();
events.addListener(user, 'change', function () {
	console.log('There was a change!');
});
model.set(user, 'name', 'Oliver');
```

Now our model can have `model` methods or `events` methods such as `events.addListener` called on it interchangeably. This can be used with as many other types as you like!

## Calling methods internally

Amazingly, the `this` object still works, so feel free to use that to reference internal methods.

```javascript
model.set = function (self, key, value) {
	this.modelData[key] = value;
	events.emitEvent(self, 'change');
	this.save(self);
};

model.save = function (self) {
	// Maybe write to a server here.
};
```

I found that quite surprising in my experimentation, but it's pretty cool all the same.

[Classless JavaScript]: /2013/09/17/classless-javascript/