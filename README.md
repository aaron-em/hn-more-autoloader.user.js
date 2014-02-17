hn-more-autoloader.user.js
==========================

Politely autoload "More" links on Hacker News users' comment pages.

Copyright (c) 2014 Aaron Miller. All rights reversed. Share and Enjoy!

Last revision: Monday, February 17, 2014, ca 14:30.

Author: Aaron Miller <me@aaron-miller.me>

Commentary
----------

When Hacker News lists a user's comments, the "More" links suffixed to each page invoke lambdas in HN's lambda store; these expire rapidly enough that actually reading a page's worth of (worthwhile) comments incurs significant risk that the lambdas, up to and including that for the current page's "More" link, will have expired by the time you reach the bottom of the page. This behavior breaks the "More" chain to the extent that one is required to start over from the beginning, which is really annoying.

In order to ameliorate that annoyance, I wrote this script, which recursively loads "More" links on a threads page and appends their content to the bottom of the original page's DOM. This way, you can read at your own pace, without worrying about whether clicking "More" when you get to it will result in the dreaded "Unknown or expired link" error, forcing you to go back to the first page of the user's threads and work your way back from there.

Links are loaded at a rate of one every two seconds, which seems well within the bounds of both politeness and HN's lambda expiry policy, and auto-loading continues until there are no more "More" links to load.

Installation
------------

If your browser recognizes Greasemonkey-style user scripts as such and offers a direct install option, just [visit the script source directly.][SRC] Otherwise, download the script and point your browser's user script manager at it.

There's nothing to configure.

If your browser's user script manager automatically checks for updates, then it should automatically notice when a new version of the script is available. Otherwise, I shouldn't worry too hard about it, since I don't expect to be updating this script often enough to matter.

Bugs/TODO
---------

I'm aware of no bugs in this code, which is not the same as saying none exist. Should you find one, please feel free to open an issue here on Github about it, or (ideally) fix it and submit a pull request.

Miscellany
----------

The canonical version of this file is hoſted in [my Github
repoſitory] [REPO]. If you didn't get it from there, great! I'm
happy to hear my humble efforts have achieved wide enough intereſt
to reſult in a fork hoſted ſomewhere elſe. I'd be obliged if you'd
drop me a line to let me know about it.


[SRC]: https://github.com/aaron-em/hn-more-autoloader.user.js/raw/master/hn-more-autoloader.user.js
[REPO]: https://github.com/aaron-em/hn-more-autoloader.user.js
