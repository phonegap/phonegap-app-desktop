var request = require('request');

ga_storage._setAccount('UA-94271-31'); //Replace with your own
ga_storage._trackPageview('/index.html');

function crashReporterJSON() {
    var json = basicGELF();
    json.short_message = "crash";
    // crashReporter server only accepts strings; we will need to re-format _env property to int on the server side before submitting to analytics server
    json._env = getDebugFlag() ? "1" : "0";

    return json;
}

function basicGELF() {
    return {
        "version": "1.1",
        "host": "desktop",
        "short_message": "",
        "_userID": getUserId(),
        "_platform": osName(),
        "_appVersion": getVersion(),
        "_env": getDebugFlag() ? 1 : 0,
        "_session": getSessionId(),
        "_nodeVersion": process.version
    };
}

function sendAnalytics(data) {
    if (!data) return;

    request.post({
        url: 'https://metrics.phonegap.com/gelf',
        form: JSON.stringify(data)
    }, function(err, res, body) {
        if (err) {
            console.error('Error sending analytics data: ' + err);
        }
    });
}

function trackOptIn() {

    var json = basicGELF();
    json.short_message = 'optIn';
    json._optIn = getSendUsageFlag();

    sendAnalytics(json);
}

function trackErrors(errorData) {
    if(getSendUsageFlag()) {
        var json = basicGELF();
        json.short_message = 'errorInWindow';
        json.full_message = errorData.message;
        json._source = errorData.source;
        json._line = errorData.line;
        json._col = errorData.col;
        json._error_stack = errorData.stack;
        sendAnalytics(json);
    }
}

function trackAppOpened() {
    if(getSendUsageFlag()) {

        var json = basicGELF();
        json.short_message = 'appOpened';

        sendAnalytics(json);
    }
}

function trackNumIPsFound(count) {
    if(getSendUsageFlag()) {

        var json = basicGELF();
        json.short_message = 'numIPsFound';
        json._quantity = count;

        sendAnalytics(json);
    }
}

function trackProjectsLoaded(count) {
    if(getSendUsageFlag()) {

        var json = basicGELF();
        json.short_message = 'projectsLoaded';
        json._quantity = count;

        sendAnalytics(json);
    }
}

function trackProjectCreated() {
    if(getSendUsageFlag()) {

        var json = basicGELF();
        json.short_message = 'projectCreated';

        sendAnalytics(json);
    }
}

function trackProjectOpened() {
    if(getSendUsageFlag()) {

        var json = basicGELF();
        json.short_message = 'projectOpened';

        sendAnalytics(json);
    }
}

function trackProjectRemoved() {
    if(getSendUsageFlag()) {

        var json = basicGELF();
        json.short_message = 'projectRemoved';
        sendAnalytics(json);
    }
}

function trackDragAndDrop() {
    if(getSendUsageFlag()) {

        var json = basicGELF();
        json.short_message = 'dragAndDrop';

        sendAnalytics(json);
    }
}

function trackDeviceConnected() {
    if (getSendUsageFlag()) {

        var json = basicGELF();
        json.short_message = 'deviceConnected';

        sendAnalytics(json);
    }
}
