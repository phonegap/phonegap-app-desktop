var request = require('request');

ga_storage._setAccount('UA-94271-31'); //Replace with your own
ga_storage._trackPageview('/index.html');

global.client = new Keen({
    projectId: "546d2e572481967ede7222b9",       // String (required)
    writeKey: "84948a28890f632d6fe87abc758380d985a3a0a4f67168d0d23d63c167641f7f32a53e81bb027466b0041d163646bec625a2be3c587fe9a5831308f93c4584ab73a577b5e65fea588d2a02fc409e8be8e6ecaa223717c274e4cc8b0e080388278d91a908a259117ca6f0176c4258f2db", // String (required for sending data)
    readKey: "f8f1a1c93f38c292c7187da662697ad2c8ee1864835104e1f9549ebda75ab71a9d4fec047eac78aa1610f75059ee320bbfaa1370e1e877a49377d8f68a63eba62909ab013c8a429ffb7bd0e36fdb12bd66dd95f6f12472ec818d117d90a901585ea8b276f6a5c6c06f9653f9452354a3",   // String (required for querying data)
    protocol: "https",                  // String (optional: https | http | auto)
    host: "api.keen.io/3.0",            // String (optional)
    requestType: "jsonp"                // String (optional: jsonp, xhr, beacon)
});

function basicGELF() {
    return {
        "version": "1.1",
        "host": "desktop",
        "short_message": "",
        "_userID": getUserId(),
        "_platform": process.platform,
        "_appVersion": getVersion(),
        "_env": getDebugFlag() ? 1 : 0
    };
}

function sendAnalytics(data) {
    if (!data) return;

    request.post({
        url: 'https://metrics.phonegap.com/gelf',
        form: JSON.stringify(data)
    }, function(err, res, body) {
        if (err) {
            console.log('*** post error: ' + err);
        } else {
            console.log('*** post success: ' + body);
        }
    });
}

function trackAppOpened() {

    console.log('usage flag: ' + getSendUsageFlag());
    console.log('debug flag: ' + getDebugFlag());

    if(getSendUsageFlag()) {
        var appOpened = {
            userId: getUserId(),
            platform: determineOperatingSystem(),
            debug: getDebugFlag(),
            version: getVersion()
        };

        var json = basicGELF();
        json.short_message = 'appOpened';

        sendAnalytics(json);
        global.client.addEvent("appOpened", appOpened);
    }
}

function trackNumIPsFound(count) {
    if(getSendUsageFlag()) {
        var numIPsFound = {
            userId: getUserId(),
            platform: determineOperatingSystem(),
            debug: getDebugFlag(),
            version: getVersion(),
            quantity: count
        };

        var json = basicGELF();
        json.short_message = 'numIPsFound';
        json._quantity = count;

        sendAnalytics(json);
        global.client.addEvent("numIPsFound", numIPsFound);
    }
}

function trackProjectsLoaded(count) {
    if(getSendUsageFlag()) {
        var projectsLoaded = {
            userId: getUserId(),
            platform: determineOperatingSystem(),
            debug: getDebugFlag(),
            version: getVersion(),
            quantity: count
        };

        var json = basicGELF();
        json.short_message = 'projectsLoaded';
        json._quantity = count;

        sendAnalytics(json);
        global.client.addEvent("projectsLoaded", projectsLoaded);
    }
}

function trackProjectCreated() {
    if(getSendUsageFlag()) {
        var projectCreated = {
            userId: getUserId(),
            platform: determineOperatingSystem(),
            debug: getDebugFlag(),
            version: getVersion()
        };

        var json = basicGELF();
        json.short_message = 'projectCreated';

        sendAnalytics(json);
        global.client.addEvent("projectCreated", projectCreated);
    }
}

function trackProjectOpened() {
    if(getSendUsageFlag()) {
        var projectOpened = {
            userId: getUserId(),
            platform: determineOperatingSystem(),
            debug: getDebugFlag(),
            version: getVersion()
        };

        var json = basicGELF();
        json.short_message = 'projectOpened';

        sendAnalytics(json);
        global.client.addEvent("projectOpened", projectOpened);
    }
}

function trackProjectRemoved() {
    if(getSendUsageFlag()) {
        var projectRemoved = {
            userId: getUserId(),
            platform: determineOperatingSystem(),
            debug: getDebugFlag(),
            version: getVersion()
        };

        var json = basicGELF();
        json.short_message = 'projectRemoved';

        sendAnalytics(json);
        global.client.addEvent("projectRemoved", projectRemoved);
    }
}

function trackDragAndDrop() {
    if(getSendUsageFlag()) {
        var dragAndDrop = {
            userId: getUserId(),
            platform: determineOperatingSystem(),
            debug: getDebugFlag(),
            version: getVersion()
        };

        var json = basicGELF();
        json.short_message = 'dragAndDrop';

        sendAnalytics(json);
        global.client.addEvent("dragAndDrop", dragAndDrop);
    }
}

function trackDeviceConnected() {
    if (getSendUsageFlag()) {
        var deviceConnected = {
            userId: getUserId(),
            platform: determineOperatingSystem(),
            debug: getDebugFlag(),
            version: getVersion()
        };

        var json = basicGELF();
        json.short_message = 'deviceConnected';

        sendAnalytics(json);
        global.client.addEvent("deviceConnected", deviceConnected);
    }
}
