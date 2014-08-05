function saveSettings(evt) {
    console.log("saveSettings");
    
    var portNumber = global.jQuery("#portNumber").val();
    
    if (isNaN(portNumber)) {
        //displayErrorMessage("Port must be a numeric value.");
        global.jQuery("#port-number-error").addClass("animatedNotification slideInRight");
        global.jQuery("#port-number-error").show();
        global.jQuery("#port-number-error").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", hidePortError);
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

function hidePortError() {
    global.jQuery("#port-number-error").removeClass("animatedNotification slideInRight"); 
    global.jQuery("#port-number-error").addClass("animatedFade fadeOut");    
    global.jQuery("#port-number-error").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", resetPortError);    
}

function resetPortError() {
    global.jQuery("#port-number-error").removeClass("animatedFade fadeOut"); 
    global.jQuery("#port-number-error").hide();
}