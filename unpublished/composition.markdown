Whenever I dive into a frontend \*VC project of my own I always end up getting frustrated at the framework selection stage. I quite like aspects of Backbone et al, but none of them feel like that exact thing I'm looking for. This leaves me with three choices; put up with the little things that annoy me about a given framework, write my own *or* compose my own from smaller libraries.

I find this second approach **really** appealing and I'll probably put it into practice soon. One of the many reasons that I am drawn to composing my own framework (possibly on a per-project basis) is the similarities between that and the Unix philosophy.

{% blockquote Doug McIlroy https://en.wikipedia.org/wiki/Unix_philosophy The Unix philosophy %}
This is the Unix philosophy: *Write programs that do one thing and do it well*. Write programs to work together. Write programs to handle text streams, because that is a universal interface.
{% endblockquote %}

I want my router, MVC and templating modules to do one thing and do it well.

<!-- more -->

## Selecting frameworks

It didn't take me very long at all to find these frameworks and libraries. If you know what you need then you just have to find the most used and best supported project in that field. The things I decided I would need were: MVC classes, routing, templating, file loading (including templates and JavaScript modules) and a bucket load of little helpers.

When you are starting out your project you can have a think about what you actually need. Maybe you don't need templating or everything will be within one file. You can just drop dependencies as you see fit. No bloat, no getting tied in to massive code bases.

All you need is Google, GitHub and an idea of what you are building.

## MVC

I decided I wanted something that focussed purely on the MVC structure and nothing else. I also wanted something that worked through AMD and kept opinions to a minimum. This is why I settled on [Maria][] which also mentions that it is the Gang Of Four MVC framework; that's something I find very attractive.

So this library can be loaded via AMD, it's pure and simple MVC and it lets you build your application exactly how you want. It seems to lack opinions which is nice for this kind of thing; it would be awful if one library said "you must use this directory structure" and another suggested something entirely different.

[Maria]: http://peter.michaux.ca/maria/
