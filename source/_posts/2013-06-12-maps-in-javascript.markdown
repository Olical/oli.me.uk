---
layout: post
title: "Maps in JavaScript"
date: 2013-06-12 19:48
comments: true
categories:
 - javascript
 - maps
---

No, I don't mean the things that help you find obscure places, I mean the things you can store data within. Your average JavaScript object that makes up just about everything in the language is actually a map, it just restricts you to mapping string keys to values of any kind.

Wouldn't it be great if you could map anything to anything though? Maybe a user model to a view, for example. Well that's something you can achieve with a map implementation. You can replace the string key in an object with anything you want. If you want to see a good example of a map, I'd turn to [C++'s map documentation][cpp-map-docs].

<!-- more -->

## A vanilla implementation

You can actually use the default JavaScript objects as a [hash map][hash-map]. This requires adding a `toString` method to every item you want to use as a key though. So if you were mapping user models to their view counterparts, your user model would need to have a `toString` method that returned a unique identifier.

This identifier could be the users email, a generated unique ID number or any other value that will never be repeated between objects. You could also prefix the unique value with the class or objects name to reduce collisions further. Here's an example of this technique. You can also play with [a similar thing on jsFiddle][simple-map-fiddle].

```javascript
// This will be our map storage.
// It will map users to views.
var userViews = {};

// Now your user class needs to have a toString method.
function User(name) {
	this._name = name;
}

// user.toString will return the class name and the user name stored within the object.
// You should probably use something that is definitely going to be unique.
User.prototype.toString = function () {
	return this.constructor.name + '-' + this._name;
};

var myUser = new User('Oliver Caldwell');

console.log(myUser.toString()); // "User-Oliver Caldwell"

// Now you can assign values to the object using the user object.
userViews[myUser] = new View(myUser);

// The object would now look something like this:
{
	"User-Oliver Caldwell": [view object]
}

// You can access it again in the same way.
var viewForUser = userViews[myUser];
```

It works because when you use an object as a key, JavaScript automatically calls `toString` on it. So the object reference is converted to our key style using the class name and user name.

This gives you nice vanilla code that should be incredibly quick; it's about as direct as you can get. This is great, but you can still take it further with a fairly small amount of code. A better method does not involve relying on `toString`, it should use the real references to things as keys in exchange for a little bit of speed and simplicity.

[cpp-map-docs]: http://www.cplusplus.com/reference/map/map/
[hash-map]: http://en.wikipedia.org/wiki/Hash_table
[simple-map-fiddle]: http://jsfiddle.net/Wolfy87/ATUSS/
