// ==UserScript==
// @name        HN "More" autoloader
// @namespace   http://me.aaron-miller.me/userscripts/hn-more-autoloader
// @description When Hacker News lists a user's comments, the "More" links suffixed to each page invoke lambdas which expire rapidly enough that actually reading a page's worth of (worthwhile) comments incurs significant risk that the lambda will have expired by the time you reach the bottom of the page. This breaks the "More" chain to the extent that one is required to start over from the beginning, which is really annoying. Hence, a script which preloads the "More" pages and appends their content to the first page's DOM.
// @include     https://news.ycombinator.com/threads?id=*
// @version     1
// @grant       none
// @downloadURL ...
// @updateURL   ...
// ==/UserScript==

function findMoreLink() {
    var container = document.querySelector('td.title');
    if (!container) { return false; };
    return container.querySelector('a');
};

function getMoreLink(href, callback) {
    var req = new XMLHttpRequest();
    var content;

    var listeners = {
        'load': function() {
            unsafeWindow.console.log('Loaded "More" link #'
                                     + requestNumber.toString());
            callback(req.responseText);
        },
        'error': function() {
            alert('Unable to load "More" link #'
                  + requestNumber.toString()
                  + '.');
        }
    };

    for (var event in listeners) {
        req.addEventListener(event, listeners[event]);
    };

    requestNumber += 1;
    req.open('get', href, true);
    req.send();
};

function replaceMoreLink(content) {
    // Replace the content of the second-to-last <tr> in the first
    // <table> with the content of the Ajax result's first <table>
    var id = 'gm_hnmore_container_'
            + requestNumber.toString();

    var container = document.createElement('div');
    container.innerHTML = content;
    container.style.display = 'none';
    container.id = id;

    document.body.appendChild(container);

    var srcTrs = document
            .querySelectorAll('div#' + id + ' > center > table > tbody > tr');

    var target = document.querySelector('table')
            .querySelector('tbody');

    var dstTrs = target
            .querySelectorAll('body > center > table > tbody > tr');

    for (var i = (dstTrs.length - 3); i < dstTrs.length; i++) {
        var el = dstTrs.item(i);
        el.parentNode.removeChild(el);
    };

    for (var i = 0; i < srcTrs.length; i++) {
        if (i < 3) continue;
        target.appendChild(srcTrs.item(i));
    };

    window.setTimeout(replaceMoreLinks, 2000);
};

function replaceMoreLinks() {
    var moreLink = findMoreLink();
    if (!moreLink) {
        unsafeWindow.console.log('No more "More" links.');
        return false;
    };

    getMoreLink(moreLink.href, replaceMoreLink);
    return true;
};

var requestNumber = 0;
replaceMoreLinks();
