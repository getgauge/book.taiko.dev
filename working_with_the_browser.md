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
tab.](/assets/images/section_open_and_close_a_browser.png)

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
`--window-position`](/assets/images/section_open_and_close_a_browser.png)

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

Goto a URL
----------

**In the REPL.**

    > openBrowser()
     ✔ Browser opened
    > goto('https://thirstyhead.com/conferenceworks/')
     value: {
      url: 'https://thirstyhead.com/conferenceworks/',
      status: { code: 200, text: '' }
    }

**In a script.**

    const { openBrowser, goto, closeBrowser } = require('taiko');
    (async () => {
        try {
            await openBrowser();
            await goto('https://thirstyhead.com/conferenceworks/');
        } catch (error) {
            console.error(error);
        } finally {
            await closeBrowser();
        }
    })();

![`goto(URL)` visits the URL, just like a user typing the URL into the
address bar.](/assets/images/section_goto_a_url.png)

Once you have a browser window open, you’ll almost certainly want to
visit a website by using the `goto(URL)` action. This action returns a
`value` object that contains the `url` you visited, as well as a
`status` object that represents the HTTP response from the website.

The `goto(URL)` action accepts any partial URL fragment that the
underlying browser does. For example, if you type
`goto('thirstyhead.com/conferenceworks')`, notice that three separate
HTTP GET requests are sent:

1.  The first HTTP response is a `301` redirect to upgrade the request
    from an unsecure `http` address to a secure `https` one.

2.  The second HTTP response is another `301` redirect, this time to
    include the trailing `/` in the URL (indicating that
    `conferenceworks` is a directory instead of a file).

3.  The third HTTP response is a `200`, showing us the final successful
    HTTP request for the implicit `index.html` file in the
    `/conferenceworks/` directory.

**`goto(URL)` accepts URL fragments and follows HTTP redirects..**

    > openBrowser()
     ✔ Browser opened
    > goto('thirstyhead.com/conferenceworks')
     value: {
      redirectedResponse: [
        {
          url: 'http://thirstyhead.com/conferenceworks',
          status: { code: 301, text: 'Moved Permanently' }
        },
        {
          url: 'https://thirstyhead.com/conferenceworks',
          status: { code: 301, text: '' }
        }
      ],
      url: 'https://thirstyhead.com/conferenceworks/',
      status: { code: 200, text: '' }
    }

This series of `HTTP` redirects is the normal behavior of the Chromium
browser, and of all browsers in general.

Click a Link
------------

**In the REPL.**

    > openBrowser()
     ✔ Browser opened
    > goto('https://thirstyhead.com/conferenceworks/')
     ✔ Navigated to URL https://thirstyhead.com/conferenceworks/
    > click('Register')
     ✔ Clicked element matching text "Register" 1 times
    > goBack()
     ✔ Performed clicking on browser back button
    > goForward()
     ✔ Performed clicking on browser forward button
    > click('Home')
     ✔ Clicked element matching text "Home" 1 times

**In a script.**

    const { openBrowser, goto, click, goBack, goForward, closeBrowser } = require('taiko');
    (async () => {
        try {
            await openBrowser();
            await goto('https://thirstyhead.com/conferenceworks/');
            await click('Register');
            await goBack();
            await goForward();
            await click('Home');
        } catch (error) {
            console.error(error);
        } finally {
            await closeBrowser();
        }
    })();

![`click` emulates a user clicking on a link like `Register`, or tabbing
to it and pressing `Enter`.](/assets/images/section_click_a_link.png)

![The new web page after the `Register` link is clicked on the previous
page.](/assets/images/section_click_a_link_2.png)

Using the `click(SELECTOR)` action emulates the user clicking on the
selected element. You can also use the `goBack` and `goForward` actions
to emulate the user clicking on the `Back` and `Forward` browser
buttons.

Taiko has a sophisticated Smart Selector algorithm that allows you to
interact with the web page just like a user would by using *what the
user sees on screen* rather than *what the web developer sees from a
source code perspective*. While you can use detailed CSS or XPath
selectors, that can lead to brittle tests if the underlying source code
changes without changing the visible user experience.

For example, while `click('Register')` and
`click($('body > main > p:nth-child(2) > a'))` are both functionally
equivalent, the former is more readable, better represents the user’s
interaction with the web page, and ultimately will be more maintainable
over time.

### Semantic and Proximity Selectors

`click(SELECTOR)` eagerly matches the first item on the page. If you
have multiple elements on the page — all with 'Register' as a visual
indicator — the first thing you should do is re-evaluate your design.
After that, you can refine your selector with semantic selectors like
`click(link('Register'))` or `click(button('Register'))`.

Here’s a list of semantic selectors:

-   button

-   checkBox

-   color

-   dropDown

-   fileField

-   image

-   link

-   listItem

-   radioButton

-   range

-   tableCell

-   text

-   textBox

-   timeField

Taiko also provides proximity selectors, like `toRightOf` and `below`.
Here’s a list of proximity selectors:

-   above

-   below

-   toLeftOf

-   toRightOf

-   near

The Taiko actions `click('Register')` and
`click(link('Register', toLeftOf(text('now before this event sells out'))))`
are functionally equivalent.

### Smart Selectors and Shadow DOM

Sometimes, a user can see an element on screen that isn’t selectable
programmatically by Taiko. A common example of this is when a web
developer includes a Web Component that uses a Shadow DOM. As the name
implies, a Shadow DOM is a separate DOM tree that is hidden from the
main DOM, as well as any JavaScript outside of the Web Component. (For
more information on Shadow DOM, see ['Using Shadow DOM' on
MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).)

The ConferenceWorks website uses a Web Component named `<cw-header>` to
encapsulate and reuse the header across multiple pages. This header
contains two links: `SCHEDULE` and `SPEAKERS`. Since Shadow DOM makes
these links invisible to JavaScript outside of the Web Component, they
are invisible to Taiko as well.

**Shadow DOM elements are invisible to Taiko’s Smart Selectors.**

    > openBrowser()
     ✔ Browser opened
    > goto('https://thirstyhead.com/conferenceworks/')
     ✔ Navigated to URL https://thirstyhead.com/conferenceworks/
    > click('SPEAKERS')
     ✘ Error: Element with text SPEAKERS not found, run `.trace` for more info.
    > link('SPEAKERS').exists()
     value: false
     ✔ Does not exists

In this case, you can simply use
`goto('https://thirstyhead.com/conferenceworks/speakers/')` in your
script instead of attempting (and failing, due to the Shadow DOM
contract with the browser) to click on the link programmatically.

Open and Close a Tab
--------------------

**In the REPL.**

    > openBrowser()
     ✔ Browser opened
    > goto('https://thirstyhead.com/conferenceworks/')
     ✔ Navigated to URL https://thirstyhead.com/conferenceworks/

    > openTab()
     ✔ Opened tab with URL http://about:blank
    > closeTab()
     ✔ Closed current tab matching about:blank

    > const cwPageTitle = title()
    > cwPageTitle
     value: 'ConferenceWorks'
    > openTab('https://thirstyhead.com/groceryworks/')
     ✔ Opened tab with URL https://thirstyhead.com/groceryworks/
    > const gwURL = currentURL()
    > gwURL
     value: 'https://thirstyhead.com/groceryworks/'
    > switchTo(cwPageTitle)
     ✔ Switched to tab matching ConferenceWorks
    > closeTab(gwURL)
     ✔ Closing last target and browser.

**In a script.**

    const { openBrowser, goto, openTab, closeTab, title, currentURL, switchTo, closeBrowser } = require('taiko');
    (async () => {
        try {
            await openBrowser();
            await goto('https://thirstyhead.com/conferenceworks/');
            await openTab();
            await closeTab();
            const cwPageTitle = title();
            cwPageTitle;
            await openTab('https://thirstyhead.com/groceryworks/');
            const gwURL = currentURL();
            gwURL;
            await switchTo(cwPageTitle);
            await closeTab(gwURL);
        } catch (error) {
            console.error(error);
        } finally {
            await closeBrowser();
        }
    })();

![Taiko actions `openTab` and `closeTab` allow you to open and close new
browser tabs.](/assets/images/section_open_and_close_a_tab.png)

As your app grows in complexity, your user might need to have multiple
browser tabs open to accomplish certain tasks. The Taiko actions
`openTab` and `closeTab` emulate the user opening and closing new tabs.

By default, `openTab()` opens a new, blank tab. If you’d like to open
the tab to a specific URL, simply pass in the URL as an argument:
`openTab('https://thirstyhead.com/groceryworks/')`.

As you begin working with tabs in Taiko, you’ll quickly discover that
being able to grab and store the `title()` of the tab and the
`currentURL()` will be quite helpful. This is especially true when it
comes to closing tabs. The Taiko action `closeTab()` closes the current
tab, unless you pass in the target tab title `closeTab('GroceryWorks')`
or the target tab URL
`closeTab('https://thirstyhead.com/groceryworks/')`.

Open and Close an Incognito Window
----------------------------------

**In the REPL.**

    > openBrowser()
     ✔ Browser opened
    > openIncognitoWindow('https://thirstyhead.com/conferenceworks/',
                          {name:'New Incognito Window'})
     ✔ Incognito window opened with name New Incognito Window
    > closeIncognitoWindow('New Incognito Window')
     ✔ Window with name New Incognito Window closed

**In a script.**

    const { openBrowser, openIncognitoWindow, closeBrowser, closeIncognitoWindow } = require('taiko');
    (async () => {
        try {
            await openBrowser();
            await openIncognitoWindow(
              'https://thirstyhead.com/conferenceworks/',
              {name:'New Incognito Window'});
            await closeIncognitoWindow('New Incognito Window');
        } catch (error) {
            console.error(error);
        } finally {
            await closeBrowser();
        }
    })();

![Open a new Incognito window with
`openIncognitoWindow`.](/assets/images/section_open_and_close_an_incognito_window.png)

The Taiko action `openIncognitoWindow` allows you to run your scripts in
an Incognito window instead of a standard window. Two arguments are
required to open a new Incognito window — a URL and a window name:
`openIncognitoWindow('https://thirstyhead.com/conferenceworks/', {name:'New Incognito Window'})`.

The window name is especially important, because it is required to close
an Incognito window: `closeIncognitoWindow('New Incognito Window')`.

You should probably store the window name in a constant or variable so
that you can use it later to close the Incognito window.

**Be sure to store the name of your new Incognito window so that you can
close it later.**

    > openBrowser()
     ✔ Browser opened

    > const windowName = 'Private Window'
    > const windowURL = 'https://thirstyhead.com/conferenceworks/'
    > openIncognitoWindow(windowURL, {name:windowName})
     ✔ Incognito window opened with name Private Window
    > closeIncognitoWindow(windowName)
     ✔ Window with name Private Window closed

Take a Screenshot
-----------------

**In the REPL.**

    > openBrowser({args:['--window-size=1024,768']})
     ✔ Browser opened
    > goto('https://thirstyhead.com/conferenceworks/')
     ✔ Navigated to URL https://thirstyhead.com/conferenceworks/
    > click('Register')
     ✔ Clicked element matching text "Register" 1 times

    > screenshot({path:'form-before-entry.png'})
     ✔ Screenshot is created at form-before-entry.png
    > click('First Name')
     ✔ Clicked element matching text "First Name" 1 times
    > write('Suzi')
     ✔ Wrote Suzi into the focused element.
    > click('Last Name')
     ✔ Clicked element matching text "Last Name" 1 times
    > write('Q')
     ✔ Wrote Q into the focused element.
    > click('Email')
     ✔ Clicked element matching text "Email" 1 times
    > write('suzi@q.org')
     ✔ Wrote suzi@q.org into the focused element.
    > click('Phone')
     ✔ Clicked element matching text "Phone" 1 times
    > write('3035551212')
     ✔ Wrote 3035551212 into the focused element.
    > screenshot({path:'form-after-entry.png'})
     ✔ Screenshot is created at form-after-entry.png

**In a script.**

    const { openBrowser, goto, click, screenshot, write, closeBrowser } = require('taiko');
    (async () => {
        try {
            await openBrowser({args:['--window-size=1024,768']});
            await goto('https://thirstyhead.com/conferenceworks/');
            await click('Register');
            await screenshot({path:'form-before-entry.png'});
            await click('First Name');
            await write('Suzi');
            await click('Last Name');
            await write('Q');
            await click('Email');
            await write('suzi@q.org');
            await click('Phone');
            await write('3035551212');
            await screenshot({path:'form-after-entry.png'});
        } catch (error) {
            console.error(error);
        } finally {
            await closeBrowser();
        }
    })();

![`form-before-entry.png` captured using Taiko action
`screenshot()`](/assets/images/form-before-entry.png)

![`form-after-entry.png` captured using Taiko action
`screenshot()`](/assets/images/form-after-entry.png)

The ability to capture screenshots at key points in your Taiko script
helps illustrate the User Journey you are automating. The `screenshot()`
action with no arguments creates a PNG image in the current directory
named `Screenshot-1589490638953.png`. The last half of the filename is a
timestamp.

You’ll almost certainly want to give your screenshot a more descriptive
name, like `screenshot({path:'form-before-entry.png'})` or
`screenshot({path:'form-after-entry.png'})`. In this example, we are
capturing a screenshot of an HTML form before data entry begins, and
then another screenshot after data entry is complete.
