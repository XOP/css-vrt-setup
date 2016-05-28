var log = require('log-util');

var wdio = require('webdriverio');
var wdcss = require('webdrivercss');

var test = require('tape');

var TEST_NAME = 'new-content-check';

var wdioOptions = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var wdcssOptions = {
    screenshotRoot: 'screenshots',

    //failedComparisonsRoot: 'diffs',
    //misMatchTolerance: 0.05,

    screenWidth: [400]

    //updateBaseline: false
};

var browser = wdio.remote(wdioOptions);

wdcss.init(browser, wdcssOptions);

log.info('Checking new content on the site');

var siteUrl = 'https://davidwalsh.name/';

var bigHeading = {
    elem: '.post-list > .big-show > h2 > a',
    name: 'big heading'
};

var firstHeading = {
    elem: '.post-list > li.vert + li > .preview > h2 > a',
    name: 'first heading'
};

test(TEST_NAME, function (t) {

    browser
        .init()
        .url(siteUrl)

        .getUrl()
        .then(function (url) {
            log.debug('Current URL: ', url);
        })

        .webdrivercss(TEST_NAME, [
            bigHeading,
            firstHeading
        ], function (err, shots) {
            t.notok(
                err,
                'should not error'
            );

            Object.keys(shots).forEach(function (element) {
                shots[element].forEach(function (shot) {
                    t.ok(
                        shot.isWithinMisMatchTolerance,
                        shot.message
                    );
                });
            });
        })

        .end();

    t.end();
});
