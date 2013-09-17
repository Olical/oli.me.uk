As JavaScript developers, or even web developers as a whole, we seem terrified by the thought of direct usage. No technique or idea seems to be considered "legit" until it has been abstracted by several layers of syntactic sugar and, potentially useless, fluff.

One of the common abstractions is the addition of "classes" to JavaScript; prototypical inheritance isn't good enough for us lot by the looks of things. We seem to crave the features of other languages when our language of choice isn't really built for them, it's built in a different way and probably shouldn't have classical inheritance principals forced down its VM / throat.

So what if we worked with JavaScript in a more natural way? First, what would *be* more natural? Personally I believe that, like the underlying language, everything should revolve around objects; we create and manipulate these malleable entities instead of trying to lock things down and restrict our data.

This idea lends its self exceptionally well to functional programming and the actual VM, which no longer needs to mess with prototype chains or any other form of inheritance for that matter. It's as raw as JavaScript usage can get, it's kind of like C structs (although nothing like them at the same time) and I think it's pretty elegant.

<!-- more -->

## An example

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

I have not used `new`, yet I have achieved the same functionality as `new` + `function` + `prototype`. I have an incredibly simple object with some namespaced methods that can be used to manipulate it. These methods can be altered using functional programming techniques such as partial application to provide even more powerful and expressive code.

## Why? Other than minimalism?

Well you may have noticed that I pass an empty object to the `create` function, this is because you can actually pull that new object from anywhere you want, say, an object pool. You don't have to ask the browser to create new objects and garbage collect them at odd intervals, you can control it yourself, to a point.

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

You could even have a `destroy` function for each namespace that wipes the object's values, eliminating the potential for memory leaks. This could easily be part of a pooling tool though, one that makes sure the objects you get out are all sanitised in the same way.

## Improving the pool

If you don't want to write a `destroy` method for each namespace then, as I mentioned above, you could have your pool code manage it for you. This means your objects will be sanitised as they are added to the pool, removing the risk of memory leaks.

```javascript
var pool = {
	create: function (self) {
		self.objects = [];
		return self;
	},
	add: function (self, obj) {
		var key;

		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				delete obj[key];
			}
		}

		self.objects.push(obj);
	},
	get: function (self) {
		return self.objects.pop() || {};
	}
};

// Accidental pun inbound!
var carPool = pool.create({});

var original = {
	foo: true,
	bar: false
};

console.log(JSON.stringify(original)); // "{"foo":true,"bar":false}"

pool.add(carPool, original);
var output = pool.get(carPool);

console.log(original === output); // true
console.log(JSON.stringify(output)); // "{}"
```

The pool namespace allows you to create a pool object. When you add to this pool the object is emptied to prevent memory leaks. When you fetch from it, it will either return an object from the pool or a new object where required. As you can see, the object I get back out is still *the same object* according to the browser, it just happens to be empty now.