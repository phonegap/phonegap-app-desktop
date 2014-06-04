function displayAddNewProjectOverlay(evt) {
    global.jQuery("#createOpenProjectOverlay").hide();
    global.jQuery("#newProjectOverlay").addClass("animated slideInDown");
    global.jQuery("#newProjectOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function hideAddNewProjectOverlay(evt) {
    hideAddCreateProjectOverlay();
    global.jQuery("#newProjectOverlay").removeClass("animated slideInDown");
    global.jQuery("#newProjectOverlay").hide();
}

function displayAddCreateProjectOverlay(evt) {
    console.log("addProjectOverlay - plus click handler");
    hideOverlays();
    global.jQuery("#plus-holder").css("background-color", "rgb(31,35,38)");
    global.jQuery("#plus").css("background-color", "rgb(31,35,38)");
    global.jQuery("#plus-icon").attr("src", "img/icons/active/plus-active.svg");
    global.jQuery("#createOpenProjectOverlay").addClass("animated slideInLeft");
    global.jQuery("#createOpenProjectOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function hideAddCreateProjectOverlay(evt) {
    global.jQuery("#createOpenProjectOverlay").removeClass("animated slideInLeft");
    global.jQuery("#createOpenProjectOverlay").hide();
    global.jQuery("#plus-icon").attr("src", "img/icons/normal/plus.svg");   
    global.jQuery("#plus-holder").css("background-color", "rgb(45,48,51)");
    global.jQuery("#plus").css("background-color", "rgb(45,48,51)");    
}

function toggleRemoveProjectView(evt) {
    console.log("toggleRemoveProjectView - minus click handler");
   
    overlayBackgroundHandler();
    
    if (!global.jQuery(".flip-container").hasClass("flip")) {        
        global.jQuery(".flip-container").addClass("animated flip");    
        global.jQuery("#minus-holder").css("background-color", "rgb(31,35,38)");
        global.jQuery("#minus").css("background-color", "rgb(31,35,38)");
        global.jQuery("#minus-icon").attr("src", "img/icons/active/minus-active.svg");             
    } else {        
        global.jQuery(".flip-container").removeClass("animated flip"); 
        global.jQuery("#minus-icon").attr("src", "img/icons/normal/minus.svg");
        global.jQuery("#minus-holder").css("background-color", "rgb(45,48,51)");
        global.jQuery("#minus").css("background-color", "rgb(45,48,51)");              
    }
}

function handleFlipEnded() {
    global.jQuery("#flip-container").removeClass("animated flip");
}

function displaySettingsOverlay(evt) {
    console.log("settingsOverlay - settings click handler");
    hideOverlays();
    // prepopulate port number from localStorage
    global.jQuery("#portNumber").val(localStorage.portNumber);
    global.jQuery("#settings-holder").css("background-color", "rgb(31,35,38)");
    global.jQuery("#settings").css("background-color", "rgb(31,35,38)");
    global.jQuery("#settings-icon").attr("src", "img/icons/active/settings-active.svg");
    global.jQuery("#settingsOverlay").addClass("animated slideInLeft");
    global.jQuery("#settingsOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function hideSettingsOverlay(evt) {
    global.jQuery("#settings-icon").attr("src", "img/icons/normal/settings.svg");
    global.jQuery("#settingsOverlay").removeClass("animated slideInLeft");
    global.jQuery("#settingsOverlay").addClass("animated slideOutLeft");
    global.jQuery("#settings-holder").css("background-color", "rgb(45,48,51)");
    global.jQuery("#settings").css("background-color", "rgb(45,48,51)");
    global.jQuery("#settingsOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHideSettingsAnimationEnd);
}

function handleHideSettingsAnimationEnd() {
    global.jQuery("#settingsOverlay").hide();
    global.jQuery("#overlay-bg").hide();
    global.jQuery("#settingsOverlay").removeClass("animated slideOutLeft");  
}

function toggleLog() {
    console.log("toggleLog - log click handler");    
    if (global.jQuery("#serverLogOverlay").is(":visible")) {
        global.jQuery("#log-holder").css("background-color", "rgb(45,48,51)");
        global.jQuery("#log").css("background-color", "rgb(45,48,51)");
        global.jQuery("#status-field").show();
        global.jQuery("#serverLogOverlay").hide();
        global.jQuery("#overlay-bg").hide();        
    } else {
        hideOverlays();
        global.jQuery("#log-holder").css("background-color", "rgb(31,35,38)");
        global.jQuery("#log").css("background-color", "rgb(31,35,38)");
        global.jQuery("#status-field").hide();
        global.jQuery("#serverLogOverlay").show();
        global.jQuery("#overlay-bg").show();
    }
}

function overlayBackgroundHandler(evt) {
    console.log("overlayBackgroundHandler - click handler");   
    global.jQuery("#overlay-bg").hide(); 
    hideOverlays();
}

function hideOverlays() {
    if (global.jQuery("#createOpenProjectOverlay").is(":visible")) {
        hideAddCreateProjectOverlay();
    }
    
    if (global.jQuery("#settingsOverlay").is(":visible")) {
        hideSettingsOverlay();
    }
    
    if (global.jQuery("#newProjectOverlay").is(":visible")) {
        hideAddNewProjectOverlay();
    } 
    
    if (global.jQuery("#serverLogOverlay").is(":visible")) {
        toggleLog();
    }   
}