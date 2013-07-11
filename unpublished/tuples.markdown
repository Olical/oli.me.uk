As my last post mentioned, I recently read [Functional JavaScript][fjs] can't physically recommend it enough. This book has caused me to make the mental leap between real world applications and functional programming due to the fact that it's written in a language I live and breath.

After reading this I was inspired to pick up [Haskell][hs] from where I left off last time; a "Hello, World!" application. I've since started to work through [Learn You a Haskell for Great Good!][lyah], which is yet another excellent book. Reading this has caused me to think about certain programming things we don't have in JavaScript.

One of the (many) things I saw in Haskell that I couldn't think of an alternative to in JavaScript were [tuples][]. Sure you can use an array, but it won't have a fixed size or pseudo named properties. I say pseudo because they are not named, like an array, but they can easily be mapped to names, like an object. It seems to work like a middle ground between the two in my opinion.

So, I set about writing a tiny tuple implementation in JavaScript; this is what I came up with.

<!-- more -->

[fjs]: http://shop.oreilly.com/product/0636920028857.do
[hs]: http://www.haskell.org/
[lyah]: http://learnyouahaskell.com/
[tuples]: https://en.wikipedia.org/wiki/Tuple