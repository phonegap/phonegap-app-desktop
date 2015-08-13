function initSettings() {
    // set default port number if it has not been set
    if (!localStorage.portNumber) {
        localStorage.portNumber = 3000;
    }

    // set default analytics flag if it has not been set
    if (!localStorage.sendUsage) {
        localStorage.sendUsage = "true";
    }
}

function getSendUsageFlag() {
    var usageFlag = true;
    if (localStorage.sendUsage == "false") {
        usageFlag = false;
    }
    return usageFlag;
}

function saveSettings(evt) {
    var portNumber = global.jQuery("#portNumber").val();

    if (isNaN(portNumber)) {
        displayPortError();
    } else {
        localStorage.portNumber = portNumber;
        hideSettingsOverlay();
        toggleServerStatus("");
    }

    if (global.jQuery("#sendUsage").is(":checked")) {
        localStorage.sendUsage = "true";
    } else {
        localStorage.sendUsage = "false";
    }
}

function cancelSettings(evt) {
    hideSettingsOverlay();
}

function displayPortError() {
    global.jQuery("#port-number-error").show();
    global.jQuery("#settingsOverlay").addClass("settings-port-error");
}

function hidePortError() {
    global.jQuery("#port-number-error").hide();
    global.jQuery("#settingsOverlay").removeClass("settings-port-error");
}

function settingsFormValidatePortNumber() {
    var portNumber = global.jQuery("#portNumber").val();

    if (isNaN(portNumber)) {
        displayPortError();
    } else {
        hidePortError();
    }
}
