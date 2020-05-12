# Installation and Configuration

Installing Taiko couldn’t be easier. It’s a single command: 
`npm install -g taiko`. But there’s plenty more that you can 
do to configure and customize Taiko once it’s installed.

## Install Taiko

```
$ npm install -g taiko

/Users/scott/.nvm/versions/node/v12.14.1/bin/taiko ->
/Users/scott/.nvm/versions/node/v12.14.1/lib/node_modules/
  taiko/bin/taiko.js

> taiko@1.0.7 install /Users/scott/.nvm/versions/node/v12.14.1/lib/node_modules/taiko
> node lib/install.js

Downloading Chromium r724157 - 117.6 Mb [====================] 100% 0.0s

> taiko@1.0.7 postinstall /Users/scott/.nvm/versions/node/v12.14.1/lib/node_modules/taiko
> node lib/documentation.js

Generating documentation to lib/api.json
+ taiko@1.0.7
added 73 packages from 114 contributors in 50.835s
```

When you install Taiko, notice that you get a known-compatible version
of Chromium installed as well. Chromium is an open-source, bare-bones web 
browser that, as you might’ve guessed by the name, is the core of the Google 
Chrome browser. Interestingly, Chromium is also the foundation of the Opera browser, 
the Microsoft Edge browser, and many others. Chromium-based browsers make up roughly 
two-thirds of the browser market, so using Chromium with Taiko covers the widest 
possible swath of typical web users.

## Run the Taiko REPL

```
$ taiko

Version: 1.0.7 (Chromium:81.0.3994.0)
Type .api for help and .exit to quit

> openBrowser()
 ✔ Browser opened
> goto('wikipedia.org')
 ✔ Navigated to URL http://wikipedia.org
> click('Search')
 ✔ Clicked element matching text "Search" 1 times
> write('User (computing)')
 ✔ Wrote User (computing) into the focused element.
> press('Enter')
 ✔ Pressed the Enter key
> click('Terminology')
 ✔ Clicked element matching text "Terminology" 1 times
> closeBrowser()
 ✔ Browser closed
> .exit
```

The Taiko REPL (Read Evaluate Print Loop) is an interactive terminal
shell that allows you to experiment with a live browser. When you type
`openBrowser()`, a browser window should open on your computer. When 
you type `goto('wikipedia.org')`, you should end up on the Wikipedia
website.

The Taiko REPL is the perfect way to experiment with Taiko whether
you are brand new to the DSL or an experienced user.