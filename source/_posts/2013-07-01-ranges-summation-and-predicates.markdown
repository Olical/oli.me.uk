---
layout: post
title: "Ranges, summation and predicates"
date: 2013-07-01 21:19
comments: true
categories:
 - javascript
 - functional-programming
---

I've been reading a book called [Functional JavaScript][functionaljs] by [Michael Fogus][fogus] which, surprisingly, is all about applying functional programming to JavaScript. The majority of the book depends upon [Underscore][] to make JavaScript have a more functional feel, but on the whole it's fairly vanilla.

I have since started trying to apply functional concepts to problems I have come across. This post will detail my approach to solving a small problem inspired by a [Project Euler][euler] problem. It may not be the most efficient imperative solution but it should be quite elegant in nature.

The problem I wish to solve is this: Find the product of all numbers within an array that pass a specific test. In this case I will be finding the sum of all *even* numbers within a specific range.

<!-- more -->

## Decimating it with Underscore

Okay, this might not be a vanilla solution, but *wow* does it look pretty.

```javascript
var result = _.reduce(_.filter(_.range(1, 11), isEven), add);

function add(a, b) {
	return a + b;
}

function isEven(value) {
	return value % 2 === 0;
}

result; // 30
```

This adds every even value in the range of 1 to 10 together using minimal and functional JavaScript. I have defined a couple of functions to help it along the way; `isEven` is a predicate that is used to extract all even numbers through the `_.filter` function and `add` is used by reduce to add the even values together.

`_.reduce` works by passing each of the values in an array to a function (in this case: `add`) and having that function do something with two arguments. The first is the previous value carried over from the last step in the reduce process; the second is the next value in the array ready for adding to or manipulating the carried value with.

This can be made a bit more functional and probably a bit more readable. These could probably be abstracted even further by using currying and partial application too.

```javascript
var even = filterer(isEven);
var summation = reducer(add);
var upTo = rangeFrom(1);

var result = summation(even(upTo(11)));

function add(a, b) {
	return a + b;
}

function isEven(value) {
	return value % 2 === 0;
}

function filterer(predicate) {
	return function (list) {
		return _.filter(list, predicate);
	};
}

function reducer(applicator) {
	return function (list) {
		return _.reduce(list, applicator);
	};
}

function rangeFrom(lower) {
	return function (upper) {
		return _.range(lower, upper);
	};
}

result; // 30
```

The main difference is that I am now creating functions with other functions. The end result is a summation of all even numbers up to, but excluding, 11; identical to the original code, just more abstraction in the form of reusable functions.

I don't know about you, but I think the line that actually calculates the result clearly expresses it's intent without need for comments or any other sort of explanation. It took me a while to stop thinking in a solely imperative way, but I understood the high level side of functional JavaScript pretty quickly. I'm only now beginning to grasp the thought processes involved in writing it. It feels like unlearning bad habits, I love it.

## The imperative equivalent

...

## In summary

Using functional programming techniques where appropriate can result in an incredibly clean and reusable API where the imperative version would probably encounter spaghettification.

I encourage you to go out and read [Functional JavaScript][functionaljs] and have a play with my code on [JSFiddle][fjsfiddle]. You can take so much away from this side of programming even if you never use it directly in your day to day work. It should influence your decisions slightly in a *very* good way.

[functionaljs]: http://shop.oreilly.com/product/0636920028857.do
[fogus]: http://blog.fogus.me/
[Underscore]: http://underscorejs.org/
[euler]: https://projecteuler.net/
[fjsfiddle]: http://jsfiddle.net/Wolfy87/2fv3b/
