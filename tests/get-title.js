var log = require('log-util');
var wdio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var browser = wdio.remote(options);

log.info('Getting CSSG.ROCKS title');

browser
    .init()
    .url('http://cssg.rocks/')
    .getTitle().then(function(title) {
        log.info('CSS.ROCKS title:');
        log.debug(title + ' is awesome!');
    })
    .end();
