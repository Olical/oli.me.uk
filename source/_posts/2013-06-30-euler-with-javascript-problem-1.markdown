---
layout: post
title: "Euler with JavaScript: Problem 1"
date: 2013-06-30 20:36
comments: true
categories:
 - euler
 - javascript
---

I've always struggled to find interesting topics to write about that will still teach me something. I've never been interested in the "10 functions you didn't know existed but could of found through [MDN][] anyway" posts, so I've decided to look for something a little different.

I tried to solve some problems within [Project Euler][euler] a long time ago using any language I could get my hands on other than JavaScript. Since I've had a sudden interest in writing stuff and learning more about the algorithm side of programming, I thought I'd give it a go. So, without further ado, here's my first Euler problem, with *many* more to come.

<!-- more -->

## The problem

[Problem 1][problem-1] is described as follows:

> If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
>
> Find the sum of all the multiples of 3 or 5 below 1000.

At a first glance I feel that there will be an obvious brute force way (loop and add as we go) and a dainty efficient one. I'll try a brute force attempt first, and then see how graceful I can get it. All of my solution posts will follow a similar format, I will learn as I write the post so you can see my full thought process as I progress.

[MDN]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[euler]: https://projecteuler.net/
[problem-1]: https://projecteuler.net/problem=1
