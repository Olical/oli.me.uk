---
layout: post
title: Multiple borders with CSS
date: 2012-02-15 21:00:00
comments: true
categories:
 - css
 - borders
 - box-shadow
---

Any time that I spot an element with multiple borders in a design that I am coding, I instantly turn to Google. Sadly, it never yields the results I seek. I am always hopeful that in the last month every browser has implemented something like this.

<!-- more -->

```css
div.multi-border {
	width: 100px;
	height: 100px;
	background-color: rgba(0, 0, 0, 0.25);
	
	/* Someday - sigh~ */
	border: 3px solid #333333, 2px solid #338833;
}
```

Obviously, this will not be implemented any time soon (no matter how many birthday wishes I spend on it). So instead we have to use alternatives. There are a few, such as using multiple elements (*argh, my semantics!*), `outline` + `border` (only *two* borders? Bah!) and pseudo elements (let's not go there).

So what are we left with? Well, I am sure there are a few, but my personal favorite is putting `border` in a blender with `box-shadow`. You can have one border (mainly for old browsers so they at least get *something*) and as many shadows as you want. **But a shadow is not a border!** I hear you cry! Well, I don't, but you were probably thinking something along those lines. Well, look at this then say / think something like that.

<iframe height='270' class='example' src='/examples/box-shadow-borders/basic.html'>.</iframe>

See, you can make a shadow look like a border. That is one div with two borders, one is a shadow, one is an actual border. Lets check out the CSS for this.

```css
div.shadow-border {
	border: 3px solid #333333;
	box-shadow: 0 0 0 2px #338833;
}
```

I have left out the CSS for the background color and other visual things. Now, all we are doing is adding a border, which will work in everything, and a second border using a shadow, which will work in newer browsers. So because `box-shadow` supports my ideal `border` syntax of a comma separated list, we can add as many as we want.

<iframe height='270' class='example' src='/examples/box-shadow-borders/multi-wrong.html'>.</iframe>

Ah, and theres your problem. We have specified a second border with the following code.

```css
div.shadow-border {
	border: 3px solid #333333;
	box-shadow: 0 0 0 2px #338833, 0 0 0 2px #883333;
}
```

But where is our second red border?! Think about it. A border would stack one after the other so you can see each border. Where as a shadow&hellip; if a shadow stacked against the previous shadow then it would be a shadow of a shadow. Not a shadow of the element. Got it? The red shadow is **under** the green one. It's just shy. So we help it along with a width of *it* + *the previous width*. So that will be `4px`.

<iframe height='270' class='example' src='/examples/box-shadow-borders/multi-right.html'>.</iframe>

**Bingo!** So now we can keep adding more and more borders. Hundreds if you really want. Aren't shadow borders brilliant! Here is our final CSS.

```css
div.shadow-border {
	border: 3px solid #333333;
	box-shadow: 0 0 0 2px #338833, 0 0 0 4px #883333;
}
```

Just always remember to add the previous shadows width on top of the latest one. And always use a base `border` attribute as a default border for all those poor older browsers out there.