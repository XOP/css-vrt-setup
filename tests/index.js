var wdio = require("webdriverio");

var options = {
    desiredCapabilities: {
        browserName: "chrome"
    }
};

var browser = wdio.remote(options);

browser
    .init()
    .url("http://cssg.rocks/")
    .getTitle().then(function(title) {
        console.log(title + " is awesome!");
    })
    .end();
