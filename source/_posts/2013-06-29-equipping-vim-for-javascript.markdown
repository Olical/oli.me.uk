---
layout: post
title: "Equipping Vim for JavaScript"
date: 2013-06-29 11:33
comments: true
categories:
 - vim
 - javascript
---

I absolutely love Vim. I use it for all of my writing, be that code or blog posts, which includes the funny language JavaScript. Sure you can open up Vim and start mashing JavaScript, but you'll probably be yearning for a little help from your editor.

With a little bit of work you can actually set up Vim to give you pretty good suggestions (not just based on dumb strings!), great highlighting, perfect indentation and automatic linting. If you haven't tried this kind of thing before, welcome to the wonderful world of [Vim bundle soup][bundle-soup].

<!-- more -->

## Managing the bundles

I use [Vundle][] to manage all of my bundles, I'd recommend it to anyone looking to manage an extensive amount of bundles. It's pretty easy to use and is kind of built for downloading from GitHub, which is where all the bundles I am going to suggest are located.

I'm not going to cover using Vundle here because [the repository covers it perfectly][vundle-quickstart]. So you should go and get Vundle set up before proceeding, it should only take a couple of minutes.

## All things syntax

You may notice that JavaScript isn't exactly smooth to write in a default Vim install. You can rectify all of it's problems *really* easily.

### Colours (British spelling, deal with it)

First, you will want to make sure that you have decent normal Vim colouring by adding something like this to your `.vimrc`.

```vim
set t_Co=256
syntax on
set background=dark
colorscheme distinguished
```

This is mainly geared towards terminal Vim, so just take what you need. It will help to enable the 256 colour pallet, enable syntax highlighting, let Vim know we want a dark background and light foreground and finally set a different colour scheme.

I use [distinguished][] at the moment, it's a great dark theme that runs excellently in a terminal and is really easy on the eyes. You should use a theme you want, but it's good to grab one that was built with JavaScript in mind.

Now you are going to want to install [`jelera/vim-javascript-syntax`][vim-javascript-syntax] by adding this to your `.vimrc` (or [dedicated bundle file][bundle-soup] as I have).

```vim
Bundle 'jelera/vim-javascript-syntax'
```

After configuring and executing `vim +BundleInstall` ([learn about Vundle](vundle-quickstart) if you haven't already!) your JavaScript should *look* a lot nicer.

### Indenting (plus a couple of extra visual features)

The perfect bundle to compliment `vim-javascript-syntax` is [`pangloss/vim-javascript`][vim-javascript]. This bundle will add a tiny bit more highlighting as well as completely fix the weird indentation in standalone JavaScript files and code that's embedded within HTML (*shudder*).

You can combine `vim-javascript` with [`nathanaelkane/vim-indent-guides`][vim-indent-guides] to get lovely highlighting for your perfectly indented callback hell. It's a great indicator for what is lined up with what.

You'll also need to actually [enable indentation in Vim][enable-indentation] if you haven't already.

```vim
Bundle 'pangloss/vim-javascript'
Bundle 'nathanaelkane/vim-indent-guides'
```

### Automate some typing

One bundle I can't live without is [`Raimondi/delimitMate`][delimitMate], it will automatically add the closing quote, bracket or any other thing you're typing that needs a counterpart character to stop your browser going haywire on the next refresh.

```vim
Bundle 'Raimondi/delimitMate'
```

Something I've found to be very useful, which doesn't require any bundles other than `delimitMate` really, is to add a key binding that will split my current line. So if I type `{`, `delimitMate` will insert `}` after my cursor, then I can execute my binding that will insert a new line in the middle of the two ready to receive some code.

```javascript
// My cursor is indicated by the underscore.
// I type...
if (flag) {_

// delimitMate adds...
if (flag) {_}

// Then I hit my special key...
if (flag) {
	_
}
```

This is actually very easy to set up, all you need to do is add this to your `.vimrc` and tweak it as you see fit.

```vim
imap <C-c> <CR><Esc>O
```

That will map `Ctrl+C` whilst still within insert mode to the line splitting command. You can obviously rebind it if you want, but I think this works really well.

## Linting integration

If you need linting in *any* language you should turn to [`scrooloose/syntastic`][syntastic]. It doesn't do much on its own, but combine it with an external linter and you have amazing live linting with indicators pointing to your problems within your actual code.

```vim
Bundle 'scrooloose/syntastic'

" This does what it says on the tin. It will check your file on open too, not just on save.
" You might not want this, so just leave it out if you don't.
let g:syntastic_check_on_open=1
```

So once you have `syntastic` installed you will want to grab something that will lint your JavaScript. The obvious choice is the absolutely wonderful [JSHint][]. All you have to do is install it globally with NPM and syntastic will do the rest.

```bash
npm install -g jshint
```

## Amazing code completion

This is the most complicated thing to get going, but it's still pretty easy as install processes go. My first suggestion for auto completing your code would be to install [`Valloric/YouCompleteMe`][YouCompleteMe].

This is an optional extra really, it will automatically popup with suggestions as you type and works for a lot of languages. It's a bit dumb with JavaScript to begin with though, that's because it uses string based suggestions. It has no idea what variables actually contain, it just lists words and names you have used previously to help you along.

```vim
Bundle 'Valloric/YouCompleteMe'

" These are the tweaks I apply to YCM's config, you don't need them but they might help.
" YCM gives you popups and splits by default that some people might not like, so these should tidy it up a bit for you.
let g:ycm_add_preview_to_completeopt=0
let g:ycm_confirm_extra_conf=0
set completeopt-=preview
```

Now to put the icing on the cake: [`marijnh/tern_for_vim`][tern_for_vim]. [Tern][] is a tool that parses your JavaScript properly. It actually understands what type a property of an object is and is a lot more powerful than basic string suggestions.

Once installed, Tern will hook into YouCompleteMe (if you have installed it) through Vim's [omni completion][omnicomplete] which can be trigger manually if you need it. So as you're typing, Tern will be parsing your JavaScript and sending back it's suggestions via the omni completion menu which can be displayed by YouCompleteMe.

```vim
Bundle 'marijnh/tern_for_vim'
```

You will need to do some extra install work for both Tern and YouCompleteMe though, so please be sure to read though there documentation. YouCompleteMe requires you to compile a module to enable ridiculously fast completion and Tern needs to you go into it's directory and download it's NPM dependencies. Once done though, they will "just work".

## Now go and write some JavaScript

Hopefully you will now get to enjoy a similar environment to me. If you like the kind of bundles and configuration options I use then you might want to cherry-pick even more from [my Vim configuration repository][vim-config]. It's kind of spilled over into Tmux and Bash configuration now too, so you should be able to find at least one nice thing in there.

[bundle-soup]: https://github.com/Wolfy87/vim-config/blob/master/bundles.vim
[Vundle]: https://github.com/gmarik/vundle
[vundle-quickstart]: https://github.com/gmarik/vundle#quick-start
[distinguished]: https://github.com/Lokaltog/vim-distinguished
[vim-javascript-syntax]: https://github.com/jelera/vim-javascript-syntax
[vim-javascript]: https://github.com/pangloss/vim-javascript
[vim-indent-guides]: https://github.com/nathanaelkane/vim-indent-guides
[delimitMate]: https://github.com/Raimondi/delimitMate
[syntastic]: https://github.com/scrooloose/syntastic
[YouCompleteMe]: https://github.com/Valloric/YouCompleteMe
[tern_for_vim]: https://github.com/marijnh/tern_for_vim
[enable-indentation]: http://vim.wikia.com/wiki/Indenting_source_code
[JSHint]: http://www.jshint.com/
[Tern]: http://ternjs.net/
[omnicomplete]: http://vim.wikia.com/wiki/Omni_completion
[vim-config]: https://github.com/Wolfy87/vim-config
