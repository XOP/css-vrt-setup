var log = require('log-util');

var wdio = require('webdriverio');
var wdcss = require('webdrivercss');

var test = require('tape');

var TEST_NAME = 'visibility-check';

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

log.info('Testing h1 visibility');

var visibleHeader = {
    elem: 'h1:first-of-type',
    name: 'h1-actual'
};

var hiddenHeader = {
    elem: '#css-o-gram-cssg-',
    name: 'h1-meta'
};

test(TEST_NAME + ' h1', function (t) {

    browser
        .init()
        .url('http://cssg.rocks')

        .getUrl()
        .then(function (url) {
            log.debug('Current URL: ', url);
        })

        .isVisible(visibleHeader.elem)
        .then(function (visible) {
            t.equal(
                visible,
                true,

                visibleHeader.name + ' should be visible'
            );
        })
        .isVisible(hiddenHeader.elem)
        .then(function (visible) {
            t.equal(
                visible,
                false,

                hiddenHeader.name + ' should be hidden'
            );
        })
        .end();

    t.end();
});
