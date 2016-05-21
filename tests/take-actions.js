var log = require('log-util');

var wdio = require('webdriverio');
var wdcss = require('webdrivercss');

var TEST_NAME = 'take-actions';

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

log.info('Testing Editor window');

var navEditorLink = {
    name: 'Nav Editor Link',
    elem: 'a.nav_i[href*="editor"]'
};

var editorInput = {
    name: 'Editor Input',
    elem: '#cssgInput'
};

var editorOutput = {
    name: 'Editor Output',
    elem: '#cssgOutput'
};

var editorClear = {
    name: 'Editor Clear Button',
    elem: '#cssgClear'
};

var editorInit = {
    name: 'Editor Init Button',
    elem: '#cssgInit'
};

browser
    .init()
    .url('http://cssg.rocks')

    .getUrl()
    .then(function (url) {
        log.debug('Current URL: ', url);
    })

    // go to the editor page
    .click(navEditorLink.elem)

    // clear the fields
    .webdrivercss(TEST_NAME + ' ' + 'editor-default', [
        editorInput,
        editorOutput
    ])
    .click(editorClear.elem)
    .webdrivercss(TEST_NAME + ' ' + 'editor-cleared', [
        editorInput,
        editorOutput
    ])

    // check if init button visible
    .isVisible(editorInit.elem)
    .then(function (isVisible) {
        log.debug(isVisible ? editorInit.name + ' visible' : editorInit.name + ' hidden');
    })

    // enter new value
    .setValue(editorInput.elem, '' +
        '<section>' +
            '<h2>Hello Test!</h2>' +
        '</section>'
    )
    .pause(300) // required changes to apply
    .webdrivercss(TEST_NAME + ' ' + 'editor-filled', [
        editorInput,
        editorOutput
    ])

    .end();
