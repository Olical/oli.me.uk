---
layout: post
title: Getting started with LESS
date: 2012-02-25 00:00:00
tags:
 - less
 - nodejs
 - git
 - npm
---

Taking your first step in any language can be a daunting task. And starting with [LESS](http://lesscss.org/) is no different. The main difficulty with LESS is getting your development environment set up to work with it correctly. In this post I am going to try and guide you through getting up and running with this brilliant CSS preprocessor.

## Prerequisites

Before you can actually use LESS you need a few things. Sure you can get started at a basic level by including the JavaScript file in your page. But that can be inefficient and should only be used while in development. To use LESS properly you need a few tools.

 * [Git](#git)

### Git

[Git](http://git-scm.com/) is a version control system. If you are not using it already then you are really missing out. It allows you to store every change in your code and collaborate with others on sites such as [GitHub](https://github.com/). It also has a handy feature called submodules. A submodule is a git project nested inside your git project. We will use this to download less.js (the in browser version of LESS) and keep it up to date.

If you are on Ubuntu, you can install git the usual easy way: `sudo apt-get install git`. Job done. For all other operating systems (such as Mac) you are going to want to use the installer. It can be found on [the git website](http://git-scm.com/). You may need to run a script that comes with that install to make the git commands available in your terminal.