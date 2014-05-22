function saveSettings(evt) {
    console.log("saveSettings");
    
    var portNumber = global.jQuery("#portNumber").val();
    
    if (isNaN(portNumber)) {
        alert("Port must be a numeric value.");
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

function setSettingsOverlayIP(ipAddress) {
    global.jQuery("#settings-ip").text(ipAddress + ":");
}