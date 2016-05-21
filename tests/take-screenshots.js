var log = require('log-util');

var wdio = require('webdriverio');
var wdcss = require('webdrivercss');

var TEST_NAME = 'take-screenshots';

var wdioOptions = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var wdcssOptions = {
    screenshotRoot: 'screenshots'

    //failedComparisonsRoot: 'diffs',
    //misMatchTolerance: 0.05,
    //screenWidth: [320,480,640,1024],
    //updateBaseline: false
};

var browser = wdio.remote(wdioOptions);

wdcss.init(browser, wdcssOptions);

log.info('Getting images');

browser
    .init()
    .url('http://cssg.rocks/')
    .webdrivercss(TEST_NAME, [
        {
            name: 'share',
            elem: '.nav .share',
            screenWidth: [360, 800, 1000]
        }
    ], function () {

    })
    .end();
