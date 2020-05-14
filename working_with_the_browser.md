---
layout: chapter.njk
chapter: 2
---

Working with the Browser
========================

In this chapter, you’ll learn how to open and close a browser, open and
close tabs, and take a screenshot.

Open and Close a Browser
------------------------

**In the REPL.**

    > openBrowser()
     ✔ Browser opened
    > closeBrowser()
     ✔ Browser closed

**In a script.**

    const { openBrowser, closeBrowser } = require('taiko');
    (async () => {
        try {
            await openBrowser()
        } catch (error) {
            console.error(error);
        } finally {
            await closeBrowser();
        }
    })();

![`openBrowser` opens a new browser window with a single empty new
tab.](../assets/images/section_open_and_close_a_browser.png)

Every Taiko action assumes that you have an open, active browser window
as the result of an `openBrowser` call. You’ll also want to close the
browser window at the end of your Taiko script by calling
`closeBrowser`.

If you are typing these examples yourself in the Taiko REPL, you can
type `.code` to view the script output, or type
`.code name-of-your-file.js` to save the code to a filename of your
choice in the current working directory.

The script example shows you one way to structure your code in a
standard JavaScript `try/catch/finally` block. The `finally` block
ensures that the browser window closes at the end of the script run,
regardless of whether the run was successful (`try`) or encountered
errors along the way (`catch`).

All Taiko actions are asynchronous. When running Taiko in a script
outside of the REPL, be sure to mark the function as `async` and preceed
each Taiko action with `await` to ensure that it has fully completed
before the next Taiko action is called.

Open a Browser with a Specific Window Size
------------------------------------------

**In the REPL.**

    > openBrowser({args:['--window-size=1024,768']})
     ✔ Browser opened

**In a script.**

    const { openBrowser, closeBrowser } = require('taiko');
    (async () => {
        try {
            await openBrowser({args:['--window-size=1024,768']});
        } catch (error) {
            console.error(error);
        } finally {
            await closeBrowser();
        }
    })();

![`openBrowser` accepts any Chrome command line switches, including
`--window-size` and
`--window-position`](../assets/images/section_open_and_close_a_browser.png)

If you are testing your website across multiple platforms (desktop,
tablet, smartphone, smart TV, etc.), then you’ll need the ability to
test across multiple window sizes. The `openBrowser` action accepts a
JSON argument with an array of `args`. Any command line switch that
you’d normally pass into Chrome can be passed into `openBrowser` using
the `args` array.

You can pass in a comma-separated list of command line switches to
`args`. For example,
`openBrowser({args:['--window-size=1024,768', '--window-position=2048,0']})`.
For a full list of Chrome command line switches, see
<https://peter.sh/experiments/chromium-command-line-switches/>.

\*Goto a URL
------------

    goto
    goBack
    goForward
    reload
    currentURL
    title

\*Open and Close a Tab
----------------------

    openTab
    closeTab
    switchTo

\*Open and Close an Incognito Window
------------------------------------

    openIncognitoWindow
    closeIncognitoWindow

\*Scroll the Web Page
---------------------

    scrollTo
    scrollRight
    scrollLeft
    scrollUp
    scrollDown

\*Take a Screenshot
-------------------

    screenshot
