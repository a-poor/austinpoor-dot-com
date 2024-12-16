---
isDraft: false
title: Command or Control
subtitle: Knowing What Modifier Key to Put in Your Search Bar
description: Should your hotkeys use "Cmd" or "Ctrl"? How can you tell if your user is on a Mac or not? This blog post walks through multiple approaches to OS detection in JavaScript.
image:
    src: /images/command-and-control-search-samples.png
    alt: Screenshots from the TailwindCSS and TanStack Query doc sites showing the hotkey "Cmd + K" used for opening search.
    caption: Screenshots from the TailwindCSS and TanStack Query doc sites showing the hotkeys used for opening search.
publishDate: "2023-09-10"
tags:
- javascript
- hotkey
- user-agent
- javascript-framework
- browser-detection
recommended:
- js-in-rs
- astro-rewrite
- apoor-dot-dev
---

You've just built a cool new site and now you want to add search. Maybe GPT-powered vector search, maybe just Algoila. You put in a search button and you want the user to be able to open it with the hotkey `Cmd + K`. But should the hotkey be `Cmd + K` or `Ctrl + K`?

If your user is on a Mac, it should be `Cmd` (aka "command" aka `⌘` ). Otherwise it should be `Ctrl` (aka "control" aka `^`). So how can you tell?

One option is [`navigator.platform`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform), a string identifying the platform on which the browser is running (e.g. `"MacIntel"`, `"Win32"`, etc.). While it's been supported for quite a while, unfortunately it is now marked as deprecated.

!["navigator.platform" MDN support grid](/images/navigator-platform-support-grid.png)
_"navigator.platform" MDN support grid_

Pre-deprecation, MDN recommended avoiding using this feature _except_ in this case, when identifying the platform's modifier key.

> `navigator.platform` should almost always be avoided in favor of feature detection. But there is one case where, among the options you could use, `navigator.platform` may be the least-bad option: When you need to show users advice about whether the modifier key for keyboard shortcuts is the `⌘` command key (found on Apple systems) rather than the `⌃` control key (on non-Apple systems)

See their example reproduced below:

```js
let modifierKeyPrefix = "^"; // control key
if (
  navigator.platform.indexOf("Mac") === 0 ||
  navigator.platform === "iPhone"
) {
  modifierKeyPrefix = "⌘"; // command key
}
```

If `navigator.platform` is deprecated, what should we use instead?

Well MDN points you to [`navigator.userAgentData.platform`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/platform). Here `navigator.userAgentData` is of type [`NavigatorUAData`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData) which has the properties `platform` (a string identifying the platform running the browser), `mobile` (a boolean set to `true` if running on a mobile device), and `brands` (an array with brand data about the user's browser).

As a brief aside, MDN notes that those properties are considered "low entropy". The `NavigatorUAData` object also contains a method for obtaining "high entropy" values from the user-agent – called `getHighEntropyValues` – where low entropy values are unlikely to be able to be used to identify the user and high entropy values are more likely to be usable in identifying the user.

!["navigator.userAgentData.platform" MDN support grid](/images/navigator-userAgentData.platform-support.png)
_"navigator.userAgentData.platform" MDN support grid_

Unfortunately, `navigator.userAgentData.platform` is considered experimental and currently is only supported by Chromium-based browsers (Chrome, Edge, Opera).

So now we have one deprecated API and one experimental API. Are there any other options? Fortunately, yes! The third option is... the [`User-Agent`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent), a string that contains information about how a user is accessing the site (browser type and version, operating system, etc.) and is sent as an HTTP header in requests to the server.

The good news is that `User-Agent` data is available and well-supported in both the browser (via [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent); see below support table) and on the server side (again, as an HTTP request header). This means, unlike with `navigator.platform` and `navigator.userAgentData.platform`, the `User-Agent` data can be used with a SSR framework like NextJS, rather than needing to wait for the code to run on the client before determining the user's OS.

!["navigator.userAgent" MDN support grid](/images/navigator-userAgent-support.png)
_"navigator.userAgent" MDN support grid_

The bad news is `User-Agent` data can be messy and unreliable. According to MDN:

> Browser identification based on detecting the user agent string is **unreliable** and **is not recommended**, as the user agent string is user configurable.

That said, while this may not be the most reliable method of _browser_ identification, hopefully the _operating system_ information is a bit more reliable.

MDN has a great article with advice on gleaning information from `User-Agent`, which you can find [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#os).

Currently there isn't one consistent way to detect the user's OS. Until `navigator.userAgentData` is fully supported, we may be stuck polyfilling it with the deprecated `navigator.platform` or the unreliable `User-Agent` string. Fortunately, between those three APIs you should be able to get a good enough answer. And worst case, if you guess wrong it isn't the end of the world this is just a progressive enhancement that shouldn't break your site.

![Screenshot from the Astro docs showing the search hotkey is "/"](/images/astro-search.png)
_Screenshot from the [Astro docs](https://docs.astro.build/en/getting-started/)_

If you _really_ care that much about making sure you don't show your user the wrong modifier key you can always skip `Ctrl+K`/`Cmd+K` and use `/` instead, like Astro does!
