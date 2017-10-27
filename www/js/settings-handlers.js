function initSettings() {
    // set default port number if it has not been set
    var key = "portNumber";
    if (!conf.has(key) || !localStorage.portNumber) {
        conf.set(key, 3000);
        localStorage.portNumber = 3000;
    }

    // set default analytics flag if it has not been set
    key = "sendUsage";
    if (!conf.has(key) || !localStorage.sendUsage) {
        conf.set(key, "true");
        localStorage.sendUsage = "true";
    }

}

function getPortNumber() {
    var portNumber = 3000;
    var key = "portNumber";

    if (conf.has(key)) {
        // retrieve portNumber from configstore
        portNumber = conf.get(key);
    } else {
        // if configstore doesn't have portNumber, try to get it from localStorage
        if (localStorage.portNumber) {
            conf.set(key, localStorage.portNumber);
            portNumber = localStorage.portNumber;
        }
    }

    return portNumber;

}

function getSendUsageFlag() {
    var usageFlag = true;

    var key = 'sendUsage';
    if (conf.get(key) == "false") {
        usageFlag = false;
    }
    return usageFlag;
}

function saveSettings(evt) {
    var portNumber = $("#portNumber").val();
    var key = "portNumber";

    if (isNaN(portNumber)) {
        displayPortError();
    } else {
        conf.set(key, portNumber);
        localStorage.portNumber = portNumber;
        toggleSettings();
        toggleServerStatus("");
    }

    key = "sendUsage";
    if ($("#sendUsage").is(":checked")) {
        conf.set(key, "true");
        localStorage.sendUsage = "true";
    } else {
        conf.set(key, "false");
        localStorage.sendUsage = "false";
    }

    if (global.optInChanged) {
        trackOptIn();
        global.optInChanged = false;
    }

}

function cancelSettings(evt) {
    global.optInChanged = false;
    toggleSettings();
}

function displayPortError() {
    $("#port-number-error").show();
    $("#settingsOverlay").addClass("settings-port-error");
}

function hidePortError() {
    $("#port-number-error").hide();
    $("#settingsOverlay").removeClass("settings-port-error");
}

function settingsFormValidatePortNumber() {
    var portNumber = $("#portNumber").val();

    if (isNaN(portNumber)) {
        displayPortError();
    } else {
        hidePortError();
    }
}
