As JavaScript developers, or even web developers as a whole, we seem terrified by the thought of direct usage. No technique or idea seems to be considered "legit" until it has been abstracted by several layers of syntactic sugar and, potentially useless, fluff.

One of the common abstractions is the addition of "classes" to JavaScript; prototypical inheritance isn't good enough for us lot by the looks of things. We seem to crave the features of other languages when our language of choice isn't really built for them, it's built in a different way and should not have classical inheritance principals forced down its VM / throat.

So what if we worked with JavaScript in a more natural way? First, what would *be* a more natural methodology? Personally I believe that, like the language, everything should revolve around objects; we create and manipulate these malleable entities instead of trying to lock things down and restrict our data.

This idea lends its self exceptionally well to functional programming and the actual VM, which no longer needs to mess with prototype chains or any other form of inheritance for that matter. It's as raw as JavaScript usage can get, it's kind of like C structs (although nothing like them at the same time) and I think it's pretty elegant.

<!-- more -->

## Example

I wouldn't be surprised if that rather oversized introduction still left you at a loss; what do I actually mean by focussing on objects? This.

```javascript
var nameList = {
	create: function (self) {
		self.names = [];
		self.characters = 0;
		return self;
	},
	add: function (self, name) {
		self.names.push(name);
		self.characters += name.length;
	}
};

var users = nameList.create({});

nameList.add(users, 'Oliver');
nameList.add(users, 'Sam');
nameList.add(users, 'Reece');
nameList.add(users, 'Robin');

console.log(users.characters); // 19
```

I have not used `new`, yet I have achieved the same functionality as `new` + `function` + `prototype`. I have an incredibly simple object with some namespaced methods that can be used to manipulate it. These methods can be altered using functional programming techniques such as partial application.

## Why? Other than minimalism?

Well you may have noticed that I pass an empty object to the `create` function, this is because you can actually pull that new object from somewhere, say, an object pool. You don't have to ask the browser to create new objects and garbage collect them at odd intervals, you can control it yourself, to a point.

This should lighten up the load your application puts on the browser (if you're a heavy <del>ab</del>user of objects) by making it create and free less objects overall. All you need to do is make sure your create function doesn't leave anything uninitialised. You can reuse a `nameList` object in a completely different piece of code, you just need to make sure `create` is thorough.

```javascript
var pool = [];

var nameList = {
	create: function (self) {
		self.names = [];
		self.characters = 0;
		return self;
	},
	add: function (self, name) {
		self.names.push(name);
		self.characters += name.length;
	}
};

var car = {
	create: function (self) {
		self.fuel = 100;
		return self;
	},
	drive: function (self) {
		self.fuel -= 5;
		return self.fuel > 0;
	}
};

// The pool is empty, so it will create a new object.
var users = nameList.create(pool.pop() || {});
nameList.add(users, 'Oliver');
nameList.add(users, 'Sam');
// ...
// And now we're done with our name list.
pool.push(users);

// Reuse the SAME object.
var polo = car.create(pool.pop() || {});
while (car.drive(polo)) {
	console.log(polo.fuel);
}
console.log('Out of fuel!');
```

Here I am creating a name list, adding some values and then dropping that object into a pool when I'm done. Then I'm requesting that object back out of the pool and reusing it as a car. This is a very simple example though, so much could have gone on in between those two creation calls that you don't even know what object you're reusing, but it doesn't matter.

You could even have a `destroy` function for each namespace that wipes the objects values, eliminating the potential for memory leaks. This could easily be part of a pooling tool though, one that makes sure the objects you get out are all sanitised in the same way.