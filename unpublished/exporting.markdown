No matter how amazing your script is, you will need to expose it to the wider world at some point. By that I don't mean publication through NPM or any other package managers, I mean you need to actually expose your classes and functions to the code that needs to consume them.

You may be using AMD, CommonJS or the global object to do this, but are you using all of them at the same time? Because it's actually quite possible, I use the same technique in [my EventEmitter project][ee-expose]. If you set this up right, your users will be able to hook into your code in any way they choose.

<!-- more -->

[ee-expose]: https://github.com/Wolfy87/EventEmitter/blob/ae0c5099bd8f08a61f70a0ebc39b32a2ce52ddb0/EventEmitter.js#L425-L436