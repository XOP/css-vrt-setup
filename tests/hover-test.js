var log = require('log-util');

var wdio = require('webdriverio');
var wdcss = require('webdrivercss');

var TEST_NAME = 'logo-hover';

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

log.info('Testing Logo hover');

browser
    .init()
    .url('http://cssg.rocks')

    .webdrivercss(TEST_NAME, {
        name: 'logo',
        elem: '.logo'
    })
    .moveToObject('.logo')
    .pause(100) // animation in progress
    .webdrivercss(TEST_NAME, {
        name: 'logo',
        elem: '.logo'
    })

    .end();
