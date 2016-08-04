function isEmptyField(value) {
    var isEmpty = true;

    if (value){
        if (value.length > 0) {
            isEmpty = false;
        }
    }

    return isEmpty;
}

function isProjectPathFieldEmpty(value) {
    var isEmpty = true;
    var prompt = "Please choose a local path";

    if (value != prompt) {
        isEmpty = false;
    }

    return isEmpty;
}

function sortByProperty(property) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] < b[property]) {
            sortStatus = -1;
        } else if (a[property] > b[property]) {
            sortStatus = 1;
        }
        return sortStatus;
    }
}

function determineOperatingSystem() {
    // valid return values: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
    return process.platform;
}

function buildPathBasedOnOS(existingPath) {
    var path = existingPath;
    if (determineOperatingSystem() == 'win32') {
        path = existingPath.replace(/\//g,"\\");
    }
    return path;
}

function getVersion() {
    var app = require('electron').remote.app;//remote.require('app');
    return app.getVersion();
}

function getDebugFlag() {
    return global.debugMode;
}

function setDebugFlag(debugMode) {
    var pathToPackageJSON = buildPathBasedOnOS("/www/package.json");

    if (debugMode) {
        global.debugMode = debugMode;
        console.log('setDebugFlag - debug passed in: ' + global.debugMode);
    } else {
        fs.readFile(pathToPackageJSON, {encoding:'utf8'}, function(err, data) {
            if (err) {
                // set debugMode default to false;
                global.debugMode = false;
            } else {
                global.debugMode = data.window.devTools;
            }
            console.log('setDebugFlag - get debug from JSON: ' + global.debugMode);
        });
    }
    trackAppOpened();
}

function openIPLink(serverIP) {
    shell.openExternal("http://" + serverIP.toString());
}

function openTutorials() {
    shell.openExternal("http://docs.phonegap.com/references/desktop-app/");
}

function openTermsOfUse() {
    shell.openExternal("http://www.adobe.com/legal/general-terms.html");
}

function openPrivacyPolicy() {
    shell.openExternal("http://www.adobe.com/privacy.html");
}

function aboutContent() {
    var year = new Date().getFullYear();
    alert("PhoneGap (v" + getVersion() + ")\nCopyright \u00A9 " + year + " Adobe Systems Incorporated.\nAll rights reserved.");
}

function quitApp() {
    var win = remote.getCurrentWindow();
    win.close();
}
