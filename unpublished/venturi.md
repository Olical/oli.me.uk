[Venturi][] is a little script I've just recently cooked up. It's basically a fairly small dependency injection framework that happens to involve prototypical inheritance and the linking of inheritance tree paths.

In this post I'm going to attempt to show you what it can do and how to use it, just in case the tests, source code, JSDoc and small examples weren't enough.

<!-- more -->

## A quick overview

With the DI framework found within AngularJS you can add certain types of constructors to the module and import other modules by string references. I've taken a different approach, everything you add to a module is a simple factory function, what it returns is held within the DI containers memory. You can also create a module off of another module which inherits the parents constructors, so you can build an inheritance tree of constructors that each own their own DI memory container.

If you get to a point where something deep down inside the tree needs access to something a few branches over, you can create a link between that tree and your desired provider. This allows you to share objects and classes in memory across vast distances in the constructor inheritance tree.

## Basic DI

At the most basic level, you can add a constructor and fetch an instance like so.

```javascript
var injector = new Venturi();

injector.set('languageEnum', function () {
	return {
		javascript: 'JavaScript',
		html: 'HTML',
		css: 'CSS'
	}
});

var dependencies = injector.get('languageEnum');

/*
{
	languageEnum: {
		javascript: 'JavaScript',
		html: 'HTML',
		css: 'CSS'
	}
}
*/
```

When you call `get` on an injector, it will go off and fetch the instances for all arguments that you pass in. It returns an object that contains all of your dependency's results under their respective names. With this setup, you can call get as many times as you want, but the constructor will only be executed once, so all references to it are shared in memory.

[venturi]: https://github.com/Wolfy87/venturi