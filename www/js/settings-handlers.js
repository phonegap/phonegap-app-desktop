function initSettings() {
    // set default port number if it has not been set
    if (!localStorage.portNumber) {
        localStorage.portNumber = 3000;
    }

    // set default analytics flag if it has not been set
    var key = "sendUsage";
    if (!conf.has(key) || !localStorage.sendUsage) {
        conf.set(key, "true");
        localStorage.sendUsage = "true";
    }

}

function getSendUsageFlag() {
    /*
    var usageFlag = true;
    if (localStorage.sendUsage == "false") {
        usageFlag = false;
    }
    return usageFlag;
    */
    var usageFlag = true;

    var key = 'sendUsage';
    if (conf.get(key) == "false") {
        usageFlag = false;
    }
    return usageFlag;
}

function saveSettings(evt) {
    var portNumber = $("#portNumber").val();

    if (isNaN(portNumber)) {
        displayPortError();
    } else {
        localStorage.portNumber = portNumber;
        toggleSettings();
        toggleServerStatus("");
    }

    var key = "sendUsage";
    if ($("#sendUsage").is(":checked")) {
        conf.set(key, "true");
        localStorage.sendUsage = "true";
    } else {
        conf.set(key, "false");
        localStorage.sendUsage = "false";
    }
}

function cancelSettings(evt) {
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
