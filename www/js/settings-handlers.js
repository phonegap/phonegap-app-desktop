function saveSettings(evt) {
    console.log("saveSettings");
    
    var portNumber = global.jQuery("#portNumber").val();
    
    if (isNaN(portNumber)) {
        displayPortError();
    } else {
        localStorage.portNumber = portNumber;
        hideSettingsOverlay();
        toggleServerStatus();
    }  
}

function cancelSettings(evt) {
    console.log("cancelSettings");
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