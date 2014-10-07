function displayAddNewProjectOverlay(evt) {
    hideAddCreateProjectOverlay();
    animateAddNewProjectOverlayEntry();
}

function animateAddNewProjectOverlayEntry() {
    global.jQuery("#plus-icon").attr("src", "img/icons/active/plus-active.svg");
    global.jQuery("#plus-holder").addClass("sidebar-button-active");
    global.jQuery("#newProjectOverlay").addClass("animated slideInDown");
    global.jQuery("#newProjectOverlay").show();
    global.jQuery("#overlay-bg").show();    
}

function hideAddNewProjectOverlay(evt) {
    global.jQuery("#plus-icon").attr("src", "img/icons/normal/plus.svg");
    global.jQuery("#plus-holder").removeClass("sidebar-button-active");
    global.jQuery("#newProjectOverlay").removeClass("animated slideInDown");
    global.jQuery("#newProjectOverlay").addClass("animated slideOutUp");
    global.jQuery("#newProjectOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHideAddNewProjectOverlayAnimationEnd);
}

function handleHideAddNewProjectOverlayAnimationEnd() {
    console.log("handle hide add new");
    global.jQuery("#newProjectOverlay").hide();
    global.jQuery("#newProjectOverlay").removeClass("animated slideOutUp");
    global.jQuery("#plus-icon").attr("src", "img/icons/normal/plus.svg");
    resetProjectCreationForm();
    hideProjectPathError();
    hideProjectNameError();
    hideProjectIdError();
}

function displayAddCreateProjectOverlay(evt) {
    console.log("addProjectOverlay - plus click handler");
    //hideOverlays();
    global.jQuery("#plus-holder").addClass("sidebar-button-active");
    global.jQuery("#plus-icon").attr("src", "img/icons/active/plus-active.svg");
    global.jQuery("#createOpenProjectOverlay").addClass("animated slideInLeft");
    global.jQuery("#createOpenProjectOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function hideAddCreateProjectOverlay(evt) {
    global.jQuery("#createOpenProjectOverlay").removeClass("animated slideInLeft");
    global.jQuery("#createOpenProjectOverlay").addClass("animated slideOutLeft");
    global.jQuery("#createOpenProjectOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHideAddCreateProjectOverlayAnimationEnd);  
    global.jQuery("#plus-holder").removeClass("sidebar-button-active");
}

function handleHideAddCreateProjectOverlayAnimationEnd() {
    console.log("handle hide add create");
    global.jQuery("#createOpenProjectOverlay").hide();
    global.jQuery("#createOpenProjectOverlay").removeClass("animated slideOutLeft");
    if (!global.createChosen) {
        global.jQuery("#plus-icon").attr("src", "img/icons/normal/plus.svg");
    } 
}

function toggleRemoveProjectView(evt) {
    console.log("toggleRemoveProjectView - minus click handler");
   
    overlayBackgroundHandler();
    
    if (!global.jQuery(".flip-container").hasClass("flipped")) {        
        global.jQuery(".flip-container").addClass("animated flipped");    
        global.jQuery("#minus-holder").addClass("sidebar-button-active");
        global.jQuery("#minus-icon").attr("src", "img/icons/active/minus-active.svg");
        global.allowRemoveNotification = "true";          
    } else {        
        resetMinusButtonState();   
    }
}

function disableMinusButton() {
    global.jQuery("#minus-icon").attr("src", "img/icons/inactive/minus-inactive.svg");
    global.jQuery(".flip-container").removeClass("animated flip");
    global.jQuery("#minus-holder").removeClass("sidebar-button-holder");
    global.jQuery("#minus-holder").removeClass("sidebar-button-active");
    global.jQuery("#minus-holder").addClass("sidebar-button-holder-inactive");
    global.jQuery("#minus").addClass("sidebar-button-inactive");
    global.jQuery("#minus").prop("disabled", true);
}

function enableMinusButton() {
    global.jQuery("#minus-icon").attr("src", "img/icons/normal/minus.svg");
    global.jQuery("#minus-holder").removeClass("sidebar-button-holder-inactive");
    global.jQuery("#minus").removeClass("sidebar-button-inactive");
    global.jQuery("#minus-holder").addClass("sidebar-button-holder");
    global.jQuery("#minus").addClass("sidebarbutton");
    global.jQuery("#minus").prop("disabled", false);
}

function resetMinusButtonState() {
    global.jQuery(".flip-container").removeClass("animated flipped"); 
    global.jQuery("#minus-icon").attr("src", "img/icons/normal/minus.svg");
    global.jQuery("#minus-holder").removeClass("sidebar-button-active");
    
    global.allowRemoveNotification = "false";
}

function handleFlipEnded() {
    global.jQuery("#flip-container").removeClass("animated flip");
}

function displaySettingsOverlay(evt) {
    console.log("settingsOverlay - settings click handler");
    hideOverlays();
    // prepopulate port number from localStorage
    global.jQuery("#portNumber").val(localStorage.portNumber);
    global.jQuery("#settings-holder").addClass("sidebar-button-active");
    global.jQuery("#settings-icon").attr("src", "img/icons/active/settings-active.svg");
    global.jQuery("#settingsOverlay").addClass("animated slideInLeft");
    global.jQuery("#settingsOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function hideSettingsOverlay(evt) {
    hidePortError();
    global.jQuery("#settings-icon").attr("src", "img/icons/normal/settings.svg");
    global.jQuery("#settingsOverlay").removeClass("animated slideInLeft");
    global.jQuery("#settingsOverlay").addClass("animated slideOutLeft");
    global.jQuery("#settings-holder").removeClass("sidebar-button-active");
    global.jQuery("#settingsOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHideSettingsAnimationEnd);
}


function handleHideSettingsAnimationEnd() {
    global.jQuery("#settingsOverlay").hide();
    global.jQuery("#overlay-bg").hide();
    global.jQuery("#settingsOverlay").removeClass("animated slideOutLeft");
}

function displayHelpOverlay(evt) {
    hideOverlays();
    global.jQuery("#help-holder").addClass("sidebar-button-active");
    global.jQuery("#help-icon").attr("src", "img/icons/hover/help-hover.svg");
    global.jQuery("#helpOverlay").addClass("animated slideInLeft");
    global.jQuery("#helpOverlay").show();
    global.jQuery("#overlay-bg").show();    
}

function hideHelpOverlay(evt) {
    global.jQuery("#helpOverlay").removeClass("animated slideInLeft");
    global.jQuery("#helpOverlay").addClass("animated slideOutLeft");
    global.jQuery("#helpOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHelpOverlayAnimationEnd);  
    global.jQuery("#help-holder").removeClass("sidebar-button-active"); 
    global.jQuery("#help-icon").attr("src", "img/icons/normal/help.svg"); 
} 

function handleHelpOverlayAnimationEnd() {
    global.jQuery("#helpOverlay").hide();
    global.jQuery("#overlay-bg").hide();
    global.jQuery("#helpOverlay").removeClass("animated slideOutLeft"); 
}

function toggleLog() {
    console.log("toggleLog - log click handler");    
    if (global.jQuery("#serverLogOverlay").is(":visible")) {
        global.jQuery("#serverLogOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHideServerLogAnimationEnd);       
        global.jQuery("#log-holder").removeClass("sidebar-button-active");
        global.jQuery("#serverLogOverlay").removeClass("animated slideInLeft");     
        global.jQuery("#serverLogOverlay").addClass("animated slideOutLeft");
        global.jQuery("#overlay-bg").hide();
    } else {     
        hideOverlays();
        global.jQuery("#log-holder").addClass("sidebar-button-active");
        global.jQuery("#serverLogOverlay").removeClass("animated slideOutLeft"); 
        global.jQuery("#serverLogOverlay").addClass("animated slideInLeft");
        global.jQuery("#status-field").hide();        
        global.jQuery("#overlay-bg").show();
        global.jQuery("#serverLogOverlay").show();      
    }
}

function handleHideServerLogAnimationEnd() {
    global.jQuery("#status-field").show();
    global.jQuery("#serverLogOverlay").hide();
    global.jQuery("#serverLogOverlay").removeClass("animated slideOutLeft");
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
    
    if (global.jQuery("#helpOverlay").is(":visible")) {
        hideHelpOverlay();
    }  
}