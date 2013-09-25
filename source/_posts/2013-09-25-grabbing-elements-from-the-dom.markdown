---
layout: post
title: "Grabbing elements from the DOM"
date: 2013-09-25 21:31
comments: true
categories:
 - dom
 - javascript
---

If, like me, you actually quite enjoy working with the vanilla DOM implementations, you may wonder how you're actually supposed to find the elements in the first place. I've been using quite a nice technique for a while now that allows you to have hyphenated names in your HTML, but keep camel case in your JavaScript even though you're searching for the elements en masse.

<!-- more -->

## What the end result looks like

When invoking my little snippet, you will use something like this.

```javascript
var elements = getElements([
	'login-form',
	'signup-form',
	'search-form',
	'unleash-hell',
	'but-i-am-le-tired',
	'well-have-a-nap-then-fire-the-missiles'
]);
```

Which will leave you with a neatly formatted object for you to work with. Nice `id`s, nice JavaScript. It's a win-win.

```javascript
elements.loginForm.addEventListener('submit', login);
elements.signupForm.addEventListener('submit', signup);
```

As you can see, it's magically converted the names to camel case to stop our eyes from witnessing any hyphenated JavaScript atrocities.

## Camelification

The first part of my little snippet is a function that converts a hyphenated string to camel case. This will be used within the function that goes off to find all of the elements.

```javascript
function hyphensToCamelCase(hyphenated) {
	return hyphenated.replace(/-(\w)/ig, function (match, hump) {
		return hump.toUpperCase();
	});
}
```

All this will do is convert our names.

 * `hello-world` becomes `helloWorld`
 * `login-form` becomes `loginForm`
 * `but-i-am-le-tired` becomes `butIAmLeTired`

Pretty slick, right?

## Fetching the elements

And now for the actual function. It will simply iterate over an array of IDs and insert them into an object with camel case names instead of hyphenated.

```javascript
function getElements(ids) {
	var i;
	var length = ids.length;
	var elements = {};

	for (i = 0; i < length; i++) {
		elements[hyphensToCamelCase(ids[i])] = document.getElementById(ids[i]);
	}

	return elements;
}
```

That's all there is to it. You can now fetch your elements easily using nice HTML naming conventions, then access them from within your JavaScript under a namespace with camel case names. **Bonus:** Here's [a live copy on JSFiddle][fiddle] for you to play around with.

<iframe width="100%" height="300" src="http://jsfiddle.net/Wolfy87/JFZQZ/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

[fiddle]: http://jsfiddle.net/Wolfy87/JFZQZ/