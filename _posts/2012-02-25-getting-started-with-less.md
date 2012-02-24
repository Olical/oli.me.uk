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
 * [Node.js](#nodejs)
 * [NPM](#npm)

### Git

[Git](http://git-scm.com/) is a version control system. If you are not using it already then you are really missing out. It allows you to store every change in your code and collaborate with others on sites such as [GitHub](https://github.com/). It also has a handy feature called submodules. A submodule is a git project nested inside your git project. We will use this to download less.js (the in browser version of LESS) and keep it up to date.

If you are on Ubuntu, you can install git the usual easy way: `sudo apt-get install git`. Job done. For all other operating systems (such as Mac) you are going to want to use the installer. It can be found on [the git website](http://git-scm.com/). You may need to run a script that comes with that install to make the git commands available in your terminal.

### Node.js

[Node.js](http://nodejs.org/) allows you to run JavaScript on your local machine or server. We will use this to compile our LESS to CSS before deployment. You should never be compiling LESS live in the browser when the site is in production. Only do that while it is in development so you don't have to recompile with every change.

You should always install the latest version of node from source. The Ubuntu apt-get version is **way** behind. Node releases a lot of updates very regularly. Some include huge changes to the underlying system. The first step is to download the latest version of node's source. At this time that is v0.6.11, although it may have already changed. So hit [the node website](http://nodejs.org/) and copy the download link to the latest version. Use that in place of the one below if it is different.

{% highlight bash %}
# Change to a suitable folder
# This will be where we download and compile node
# You can delete everything when done because it will be installed in your system
cd ~/Downloads

# Download the latest version of node
curl http://nodejs.org/dist/v0.6.11/node-v0.6.11.tar.gz -o node.tar.gz

# Uncompress it
tar -xf node.tar.gz

# Navigate to the extracted folder (different name depending on version)
cd node-v0.6.11

# Make sure you have the required programs to build it
# If you get errors, Google is your friend
# You just need to search node + what ever errors you are getting
# Use some common sense and it will be easy
./configure

# If configure went well then you can compile it
# This may take some time
make

# Finally install your compiled node install
sudo make install
{% endhighlight %}

If you just can't get this to work, then try the installers on the node site. I do not recommend them, they may cause trouble in the long run. But they should work okay as a quick fix.

### NPM

[NPM](http://npmjs.org/) stands for node package manager. It allows you to install packages written in JavaScript to be run with node incredibly easily. I believe NPM now comes built into node. To check if you have it installed simply type `npm` into your terminal. If you get an error then here is how to install it.

{% highlight bash %}
curl http://npmjs.org/install.sh | sudo sh
{% endhighlight %}

That line is taken from the NPM website. It should install NPM onto your system. Once done you are going to want to install a package. We will be installing `less` via NPM. Less provides a program called `lessc` which allows you to compile your LESS to CSS on the command line.

{% highlight bash %}
# Install the less package
sudo npm install less -g

# Now when running this you should get the following error:
#     lessc: no input files
lessc
{% endhighlight %}