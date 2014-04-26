---
layout: post
title: "Installing Vimdeck on Arch"
date: 2014-04-26 14:07:06 +0100
comments: true
categories:
 - vim
 - arch
 - linux
---

I'm going to be talking at [Vim London][] again on Tuesday, so I thought I'd knock a quick presentation together. I was planning on using [Vimdeck][] but it turns out it freaks out on Arch based Linux distributions, such as Manjaro (probably some other Linux distributions too).

When executing `gem install vimdeck` it tries to install [RMagick][] which fails on my machine due to [ImageMagick][] being installed with HDRI enabled, whatever the hell that is. Apparently the Arch team enabled it a few months back.

The solution? Clone the [RMagick][] repository and execute the following.

```bash
gem buld rmagick.gemspec
gem install rmagick-{VERSION}.gem
```

Where `{VERSION}` is the version of the gem you just built. This will vary from the time when this post was written so I won't bother putting the version I had in there. Now you have a fixed version of the gem install you can execute `gem install vimdeck` and it will install perfectly. If not, congratulations, you've discovered a new issue!

Now to write my presentation...

[Vim London]: http://www.meetup.com/Vim-London/events/174682642/
[Vimdeck]: https://github.com/tybenz/vimdeck
[RMagick]: https://github.com/rmagick/rmagick
[ImageMagick]: http://www.imagemagick.org/
