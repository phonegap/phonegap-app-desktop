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
    var pathToPackageJSON = path.join(__dirname, "package.json");

    try {
        var data = fs.readFileSync(pathToPackageJSON, {encoding:'utf8'});
        global.debugMode = JSON.parse(data).window.devTools;
    } catch (err) {
        // set debugMode default to true; pathToPackageJSON is relative to the bundled app,
        //  therefore if it can't be found we are using a debug build
        global.debugMode = true;
    }
    trackAppOpened();
}

function findIconPath(icons) {
    var icon = '';
    icons.each(function()  {
        if ($(this).attr("height") > 64 && ($(this).attr("height") == $(this).attr("width"))) {
            icon = $(this).attr("src");
            return false;
        }
    });

    return icon;
}

function openIPLink(serverIP) {
    shell.openExternal("http://" + serverIP.toString());
}

function openTutorials() {
    shell.openExternal("http://docs.phonegap.com/references/desktop-app/");
}

function openIssueTracker() {
    shell.openExternal("https://github.com/phonegap/phonegap-app-desktop/issues");
}

function openTermsOfUse() {
    shell.openExternal("http://www.adobe.com/legal/general-terms.html");
}

function openPrivacyPolicy() {
    shell.openExternal("http://www.adobe.com/privacy.html");
}

function openFAQ() {
    shell.openExternal("http://docs.phonegap.com/references/desktop-app/troubleshoot-faq/");
}

function aboutContent() {
    var year = new Date().getFullYear();
    alert("PhoneGap (v" + getVersion() + ")\nCopyright \u00A9 " + year + " Adobe Systems Incorporated.\nAll rights reserved.");
}

function quitApp() {
    var win = remote.getCurrentWindow();
    win.close();
}
