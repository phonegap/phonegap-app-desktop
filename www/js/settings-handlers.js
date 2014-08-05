function saveSettings(evt) {
    console.log("saveSettings");
    
    var portNumber = global.jQuery("#portNumber").val();
    
    if (isNaN(portNumber)) {
        displayInlineError(global.jQuery("#port-number-error"));
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