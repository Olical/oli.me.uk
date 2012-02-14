---
layout: post
title: Multiple borders with CSS
date: 2012-02-15 00:00:00
tags:
 - midweek
 - css
 - borders
 - box-shadow
---

Any time that I spot an element with multiple borders in a design that I am coding I instantly turn to Google. Sadly, it never yields the results I seek. I am always hopeful that in the last month every browser has implemented something like this.

{% highlight css %}
div.multi-border {
	width: 100px;
	height: 100px;
	background-color: rgba(0, 0, 0, 0.25);
	
	/* Someday - sigh~ */
	border: 3px solid #333333, 2px solid #338833;
}
{% endhighlight %}

Obviously, this will not be implemented any time soon (no matter how many birthday wishes I spend on it). So instead we have to use alternatives. There are a few, such as using multiple elements (*argh, my semantics!*), `outline` + `border` (only *two* borders? Bah!) and pseudo elements (let's not go there).

So what are we left with? Well, I am sure there are a few, but my personal favorite is putting `border` in a blender with `box-shadow`. You can have one border (mainly for old browsers so they at least get *something*) and as many shadows as you want. **But a shadow is not a border!** I hear you cry! Well, I don't, but you were probably thinking something along those lines. Well, look at this then say / thing something like that.

<iframe class='example' src='/examples/box-shadow-borders/basic.html'>.</iframe>

See, you can make a shadow look like a border.