As JavaScript developers, or even web developers as a whole, we seem terrified by the thought of direct usage. No technique or idea seems to be considered "legit" until it has been abstracted by several layers of syntactic sugar and, potentially useless, fluff.

One of the common abstractions is the addition of "classes" to JavaScript; prototypical inheritance isn't good enough for us lot by the looks of things. We seem to crave the features of other languages when our language of choice isn't really built for them, it's built in a different way and should not have classical inheritance principals forced down its VM / throat.

So what if we worked with JavaScript in a more natural way? First, what would *be* a more natural methodology? Personally I believe that, like the language, everything should revolve around objects; we create and manipulate these malleable entities instead of trying to lock things down and restrict our data.

This idea lends its self exceptionally well to functional programming and the actual VM, which no longer needs to mess with prototype chains or any other form of inheritance for that matter. It's as raw as JavaScript usage can get, it's kind of like C structs (although nothing like them at the same time) and I think it's pretty elegant.

<!-- more -->