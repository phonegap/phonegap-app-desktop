function displayAddNewProjectOverlay(evt) {
    global.jQuery("#createOpenProjectOverlay").hide();
    global.jQuery("#newProjectOverlay").show();
    global.jQuery("#overlay-bg").show();    
}

function hideAddNewProjectOverlay(evt) {
    hideAddCreateProjectOverlay();
    global.jQuery("#newProjectOverlay").hide();
}

function displayAddCreateProjectOverlay(evt) {
    console.log("addProjectOverlay - plus click handler");
    global.jQuery("#plus-holder").css("background-color", "rgb(31,35,38)");
    global.jQuery("#plus").css("background-color", "rgb(31,35,38)");
    global.jQuery("#plus-icon").attr("src", "img/icons/active/plus-active.svg");
    global.jQuery("#createOpenProjectOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function hideAddCreateProjectOverlay(evt) {
    global.jQuery("#createOpenProjectOverlay").hide();
    global.jQuery("#plus-icon").attr("src", "img/icons/normal/plus.svg");   
    global.jQuery("#plus-holder").css("background-color", "rgb(45,48,51)");
    global.jQuery("#plus").css("background-color", "rgb(45,48,51)");    
}

function displayRemoveProjectOverlay(evt) {
    console.log("removeProjectOverlay - minus click handler");
    global.jQuery("#minus-icon").attr("src", "img/icons/active/minus-active.svg");
    global.jQuery("#removeProjectOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function hideRemoveProjectOverlay(evt) {
    global.jQuery("#minus-icon").attr("src", "img/icons/normal/minus.svg");
    global.jQuery("#removeProjectOverlay").hide();
    global.jQuery("#overlay-bg").hide();
}

function displaySettingsOverlay(evt) {
    console.log("settingsOverlay - settings click handler");
    // prepopulate port number from localStorage
    global.jQuery("#portNumber").val(localStorage.portNumber);
    global.jQuery("#settings-icon").attr("src", "img/icons/active/settings-active.svg");
    global.jQuery("#settingsOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function hideSettingsOverlay(evt) {
    global.jQuery("#settings-icon").attr("src", "img/icons/normal/settings.svg");
    global.jQuery("#settingsOverlay").hide();
    global.jQuery("#overlay-bg").hide();
}

function toggleLog(evt) {
    console.log("toggleLog - log click handler");    
    if (global.jQuery("#serverLogOverlay").is(":visible")) {
        global.jQuery("#serverLogOverlay").hide();
        global.jQuery("#overlay-bg").hide();
    } else {
        global.jQuery("#serverLogOverlay").show();
        global.jQuery("#overlay-bg").show();
    }
}

function overlayBackgroundHandler(evt) {
    console.log("overlayBackgroundHandler - click handler");
    
    global.jQuery("#overlay-bg").hide(); 
    
    if (global.jQuery("#createOpenProjectOverlay").is(":visible")) {
        hideAddCreateProjectOverlay();
    }
    
    if (global.jQuery("#removeProjectOverlay").is(":visible")) {
        hideRemoveProjectOverlay();
    }
    
    if (global.jQuery("#settingsOverlay").is(":visible")) {
        hideSettingsOverlay();
    }
    
    if (global.jQuery("#newProjectOverlay").is(":visible")) {
        hideAddNewProjectOverlay();
    }
}