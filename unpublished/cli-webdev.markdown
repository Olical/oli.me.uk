My entire web development work flow takes place within my terminal; obviously I need a browser too, but other than that I have no GUI tools floating around. I'm going to show you what I use and how I use them.

<!-- more -->

## A quick overview

I make use of [tmux][] for multitasking, [Vim][] for any editing with [my extensive configuration][vim-config], [git][] (normal CLI, not GUI), [ag][] (also known as "The Silver Searcher") as a grep replacement, [Python][] for simple HTTP servers, [node][] and a few linters including [JSHint][], [CSSLint][] and [JSONLint][]. These linters are completely integrated into Vim with [Syntastic][], so I don't need to worry about running them.

I also use the general unix tools which include `less`, `grep`, `curl` and `ssh`.

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
