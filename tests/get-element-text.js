var log = require('log-util');
var wdio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var browser = wdio.remote(options);

log.info('Getting Smashing Magazine latest article title');

browser
    .init()
    .url('https://www.smashingmagazine.com/')
    .getText('#content > article:first-of-type > h2 > a > span').then(function (title) {
        log.info('Smashing Magazine latest article title:');
        log.debug(title);
    })
    .end();
