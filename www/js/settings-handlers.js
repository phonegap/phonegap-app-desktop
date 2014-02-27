function saveSettings(evt) {
    console.log("saveSettings");
    
    var portNumber = global.jQuery("#portNumber").val();
    
    if (isNaN(portNumber)) {
        alert("Port must be a numeric value.");
    } else {
        localStorage.portNumber = portNumber;
        global.jQuery("#settingsOverlay").hide();
        global.jQuery("#overlay-bg").hide();
        toggleServerStatus();
    }  
}

function cancelSettings(evt) {
    console.log("cancelSettings");
    global.jQuery("#settingsOverlay").hide();
    global.jQuery("#overlay-bg").hide();
}