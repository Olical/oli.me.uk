---
layout: post
title: "Building for browsers in a terminal"
date: 2013-08-08 12:41
comments: true
categories:
 - terminal
 - linux
 - unix
 - vim
 - cli
---

My entire web development work flow takes place within my terminal; obviously I need a browser too, but other than that I have no GUI tools floating around. I'm going to show you what tools I use and how I use them. Take from this what you will.

<!-- more -->

## A quick overview

I make use of [tmux][] for multitasking, [Vim][] for any editing with [my extensive configuration][vim-config], [git][], [ag][] (also known as "The Silver Searcher") as a grep replacement, [Python][] for simple HTTP servers, [node][] and a few linters including [JSHint][], [CSSLint][] and [JSONLint][]. These linters are completely integrated into Vim with [Syntastic][], so I don't need to worry about running them.

I also use the general Unix tools a lot which include `less`, `grep`, `curl` and `ssh`. Never underestimate the base tools that come with your OS; if you're on Linux or Mac that is. I personally prefer a clean [Arch][] Linux install with [XFCE][] as a desktop environment. Combine that with my SSD wielding laptop and you have yourself some insane speeds to help you get your work done.

## Tying things together

All of those tools would have no edge over GUIs if they all ran separately and could not be linked together easily. That's why I have multiple bundles within my [Vim configuration][vim-config] that allow me to interface with programs such as ag ([ag.vim][]) and git ([vim-fugitive][]). I don't have to worry about running my linters either, [Syntastic][] does that for me and shows me where the problems reside.

## Multitasking

So I can do 80% of my work comfortably without leaving Vim by tying other programs into it via bundles. For the last 20% which are easier to do outside of Vim, such as manipulating large portions of the file system, I can send my Vim to the background with `<C-z>` and bring it back by running `fg` when I'm done.

I can also use tmux for a huge amount of flexibility by splitting (`<Leader><%>` or `<Leader><">`) or by creating a new window with `<Leader><c>`. I have remapped my leader key to `<C-Space>` too, just to make it easier to hit.

## Why?

It may be because I have been working like this for a while now, but this kind of thing feels so natural now. If I work inside my terminal 100% of the time I know that any tool I use will work in a similar way. I can search any output and pipe it around however I like. I can tie things into my editor with minimal effort and I can fix things when they go wrong (which is very, very rare).

After working with and getting used to Unix terminal style tooling for long enough you stop thinking about the interface; it no longer gets in the way, it just works. There doesn't seem to be a learning curve for anything I start using now either because the interfaces are so very similar.

This way of working seems ridiculous and backwards to some people; it's not worse, it's just different. *I* love it.

[tmux]: http://tmux.sourceforge.net/
[Vim]: http://www.vim.org/
[vim-config]: https://github.com/Wolfy87/vim-config
[git]: http://git-scm.com/
[ag]: https://github.com/ggreer/the_silver_searcher
[Python]: http://docs.python.org/3.0/library/http.server.html
[node]: http://nodejs.org/
[JSHint]: http://www.jshint.com/
[CSSLint]: https://github.com/stubbornella/csslint
[JSONLint]: https://github.com/zaach/jsonlint
[Syntastic]: https://github.com/scrooloose/syntastic
[Arch]: https://www.archlinux.org/
[XFCE]: http://www.xfce.org/
[ag.vim]: https://github.com/rking/ag.vim
[vim-fugitive]: https://github.com/tpope/vim-fugitive
