// -- template overlay
function displayTemplateOverlay(evt) {
    if (!global.backTemplateClicked) {        
        animateTemplateOverlayEntry();
        hideAddCreateProjectOverlay();                
    }
}

function animateTemplateOverlayEntry() {
    $("#plus-icon").attr("src", "img/icons/active/plus-active.svg");
    $("#plus-holder").addClass("sidebar-button-active");

    if (global.backTemplateClicked) {
        global.backTemplateClicked = false;
        $("#templateOverlay").addClass("animated slideInLeft");
    } else {
        $("#templateOverlay").addClass("animated slideInDown");
    }

    $("#templateOverlay").show();
    $("#overlay-bg").show();    
        
}

function hideTemplateOverlay(evt) {
    $("#plus-icon").attr("src", "img/icons/normal/plus.svg");
    $("#plus-holder").removeClass("sidebar-button-active");
    $("#templateOverlay").removeClass("animated slideInDown slideInLeft");

    if(global.nextTemplateClicked) {
        $("#templateOverlay").addClass("animated slideOutLeft");
    } else {
        $("#templateOverlay").addClass("animated slideOutUp");
    }

    $("#templateOverlay").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideTemplateOverlayAnimationEnd);
}

function handleHideTemplateOverlayAnimationEnd() {
    $("#templateOverlay").off("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideTemplateOverlayAnimationEnd);
    $("#templateOverlay").hide();

    if(global.nextTemplateClicked) {
        global.nextTemplateClicked = false;
        $("#templateOverlay").removeClass("animated slideOutLeft");
    } else {
        $("#templateOverlay").removeClass("animated slideOutUp");
    }

}

// -- project details overlay
function displayProjectDetailsOverlay(evt) {
    hideTemplateOverlay();
    animateProjectDetailsOverlayEntry();
}

function animateProjectDetailsOverlayEntry() {
    $("#plus-icon").attr("src", "img/icons/active/plus-active.svg");
    $("#plus-holder").addClass("sidebar-button-active");
    $("#projectDetailsOverlay").addClass("animated slideInRight");
    $("#projectDetailsOverlay").show();
    $("#overlay-bg").show();
}

function hideProjectDetailsOverlay(evt) {
    $("#projectDetailsOverlay").removeClass("animated slideInRight");

    if (!global.backTemplateClicked) {
        global.createChosen = false;
        $("#projectDetailsOverlay").addClass("animated slideOutUp");
        $("#plus-icon").attr("src", "img/icons/normal/plus.svg");
        $("#plus-holder").removeClass("sidebar-button-active");
    } else {
        $("#projectDetailsOverlay").addClass("animated slideOutRight");
        $("#templateOverlay").show();
        $("#templateOverlay").addClass("animated slideInLeft");
    }

    $("#projectDetailsOverlay").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handlehideProjectDetailsOverlayAnimationEnd);    
    
}

function handlehideProjectDetailsOverlayAnimationEnd() {
    $("#projectDetailsOverlay").off("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handlehideProjectDetailsOverlayAnimationEnd);
    // Toggle the server status afterthe overlay is hidden to avoid janky UI, but only if we definitely added one
    // and didn't just cancel out
    if (global.projDir != undefined) {        
        $("#projectDetailsOverlay").hide(toggleServerStatus(global.projDir));
    } else $("#projectDetailsOverlay").hide();


    if (!global.backTemplateClicked) {
        $("#projectDetailsOverlay").removeClass("animated slideOutUp");
        $("#plus-icon").attr("src", "img/icons/normal/plus.svg");
        resetProjectCreationForm();
        hideProjectPathError();
        hideProjectNameError();
        hideProjectIdError();        
    } else {
        $("#projectDetailsOverlay").removeClass("animated slideOutRight");
        $("#templateOverlay").removeClass("animated slideInLeft");
        $("#templateOverlay").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideTemplateOverlayAnimationEnd);
        global.backTemplateClicked = false;
    }        
}

// -- add new or open existing overlay
function displayAddCreateProjectOverlay(evt) {
    $("#overlay-bg").show();
    $("#plus-holder").addClass("sidebar-button-active");
    $("#plus-icon").attr("src", "img/icons/active/plus-active.svg");
    $("#createOpenProjectOverlay").addClass("animated slideInLeft");
    $("#createOpenProjectOverlay").show();
}

function hideAddCreateProjectOverlay(evt) {
    $("#templateOverlay").off("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend");
    $("#createOpenProjectOverlay").removeClass("animated slideInLeft");
        
    if ($("#templateOverlay").css('display') == 'none')
        $("#createOpenProjectOverlay").addClass("animatedFast slideOutLeft");
    else $("#createOpenProjectOverlay").addClass("animatedFast fadeOut");
    
    $("#createOpenProjectOverlay").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideAddCreateProjectOverlayAnimationEnd);
    $("#plus-holder").removeClass("sidebar-button-active");
}

function handleHideAddCreateProjectOverlayAnimationEnd() {
    $("#createOpenProjectOverlay").off("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend");    
    //$("#createOpenProjectOverlay").hide();
    // Toggle the server status afterthe overlay is hidden to avoid janky UI, but only if we definitely added one
    // and didn't just cancel out 
    if (global.projDir != undefined) {        
        $("#createOpenProjectOverlay").hide(toggleServerStatus(global.projDir));
    } else $("#createOpenProjectOverlay").hide();

    $("#createOpenProjectOverlay").removeClass("animatedFast fadeOut slideOutLeft");
    if (!global.createChosen) {
        $("#plus-icon").attr("src", "img/icons/normal/plus.svg");
    }
}

// -- remove project
function toggleRemoveProjectView(evt) {
    overlayBackgroundHandler();

    if (!$(".flip-container").hasClass("flipped")) {
        $(".flip-container").addClass("animated flipped");
        $("#minus-holder").addClass("sidebar-button-active");
        $("#minus-icon").attr("src", "img/icons/active/minus-active.svg");

        setServerOffline();
        serverOfflineState();
        multipleServersOfflineState();
        widgetServerOfflineState(global.activeWidget.projectId, global.activeWidget.widgetId);

        global.allowRemoveNotification = "true";
    } else {
        resetMinusButtonState();

        // begin serving project once user is done removing from list
        var projects = JSON.parse(localStorage.projects);
        var length = projects.length;

        if (length > 0) {
            if (global.activeWidget) {
                // continue serving the previous active widget
                setActiveWidget(global.activeWidget.projectId, localStorage.projDir);
                toggleServerStatus(localStorage.projDir);
            } else {
                // if previous active widget was removed, serve first project in list
                setActiveWidget(projects[0].id, projects[0].projDir);
                toggleServerStatus(projects[0].projDir);
            }
        }
    }
}

function disableMinusButton() {
    $("#minus-icon").attr("src", "img/icons/inactive/minus-inactive.svg");
    $(".flip-container").removeClass("animated flip");
    $("#minus-holder").removeClass("sidebar-button-holder");
    $("#minus-holder").removeClass("sidebar-button-active");
    $("#minus-holder").addClass("sidebar-button-holder-inactive");
    $("#minus").addClass("sidebar-button-inactive");
    $("#minus").prop("disabled", true);
}

function enableMinusButton() {
    $("#minus-icon").attr("src", "img/icons/normal/minus.svg");
    $("#minus-holder").removeClass("sidebar-button-holder-inactive");
    $("#minus").removeClass("sidebar-button-inactive");
    $("#minus-holder").addClass("sidebar-button-holder");
    $("#minus").addClass("sidebarbutton");
    $("#minus").prop("disabled", false);
}

function resetMinusButtonState() {
    $(".flip-container").removeClass("animated flipped");
    $("#minus-icon").attr("src", "img/icons/normal/minus.svg");
    $("#minus-holder").removeClass("sidebar-button-active");

    global.allowRemoveNotification = "false";
}

function handleFlipEnded() {
    $("#flip-container").removeClass("animated flip");
}

// -- settings overlay
function toggleSettings() {
    if ($("#settingsOverlay").is(":visible")) {
        hidePortError();
        $("#settingsOverlay").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideSettingsAnimationEnd);
        $("#settings-holder").removeClass("sidebar-button-active");
        $("#settingsOverlay").removeClass("animated slideInLeft");
        $("#settingsOverlay").addClass("animated slideOutLeft");
        $("#settings-icon").attr("src", "img/icons/normal/settings.svg");
        $("#overlay-bg").hide();
    } else {
        var usageFlag = getSendUsageFlag();
        hideOverlays();
        $("#settingsOverlay").off("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideSettingsAnimationEnd);
        // prepopulate port number from localStorage
        $("#portNumber").val(localStorage.portNumber);
        $("#sendUsage").prop("checked", usageFlag);
        $("#settings-holder").addClass("sidebar-button-active");
        $("#settingsOverlay").removeClass("animated slideOutLeft");
        $("#settingsOverlay").addClass("animated slideInLeft");
        $("#settings-icon").attr("src", "img/icons/active/settings-active.svg");
        $("#overlay-bg").show();
        $("#settingsOverlay").show();
    }
}

function handleHideSettingsAnimationEnd() {
    $("#settingsOverlay").hide();
    $("#settingsOverlay").removeClass("animated slideOutLeft");
}

// -- help overlay
function toggleHelp() {
    if ($("#helpOverlay").is(":visible")) {
        $("#helpOverlay").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHelpOverlayAnimationEnd);
        $("#help-holder").removeClass("sidebar-button-active");
        $("#helpOverlay").removeClass("animated slideInLeft");
        $("#helpOverlay").addClass("animated slideOutLeft");
        $("#help-icon").attr("src", "img/icons/normal/help.svg");
        $("#overlay-bg").hide();
    } else {
        hideOverlays();
        $("#helpOverlay").off("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHelpOverlayAnimationEnd);
        $("#help-holder").addClass("sidebar-button-active");
        $("#helpOverlay").removeClass("animated slideOutLeft");
        $("#helpOverlay").addClass("animated slideInLeft");
        $("#help-icon").attr("src", "img/icons/hover/help-hover.svg");
        $("#overlay-bg").show();
        $("#helpOverlay").show();
    }
}

function handleHelpOverlayAnimationEnd() {
    $("#helpOverlay").hide();
    $("#helpOverlay").removeClass("animated slideOutLeft");
}

// -- server log overlay
function toggleLog() {
    if ($("#serverLogOverlay").is(":visible")) {
        $("#serverLogOverlay").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideServerLogAnimationEnd);
        $("#log-holder").removeClass("sidebar-button-active");
        $("#serverLogOverlay").removeClass("animated slideInLeft");
        $("#serverLogOverlay").addClass("animated slideOutLeft");
        $("#overlay-bg").hide();
    } else {
        hideOverlays();
        $("#serverLogOverlay").off("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideServerLogAnimationEnd);
        $("#log-holder").addClass("sidebar-button-active");
        $("#serverLogOverlay").removeClass("animated slideOutLeft");
        $("#serverLogOverlay").addClass("animated slideInLeft");
        $("#overlay-bg").show();
        $("#serverLogOverlay").show();
    }
}

function handleHideServerLogAnimationEnd() {

    if (global.isServerRunning) {
        $("#ip-holder").show();
    }

    $("#serverLogOverlay").hide();
    $("#serverLogOverlay").removeClass("animated slideOutLeft");
}

// -- general overlay handlers
function overlayBackgroundHandler(evt) {
    global.createChosen = false;
    $("#overlay-bg").hide();
    hideOverlays();
}

function hideOverlays() {
    if ($("#templateOverlay").is(":visible")) {
        hideTemplateOverlay();
    }

    if ($("#createOpenProjectOverlay").is(":visible")) {
        hideAddCreateProjectOverlay();
    }

    if ($("#settingsOverlay").is(":visible")) {
        toggleSettings();
    }

    if ($("#projectDetailsOverlay").is(":visible")) {
        hideProjectDetailsOverlay();
    }

    if ($("#serverLogOverlay").is(":visible")) {
        toggleLog();
    }

    if ($("#helpOverlay").is(":visible")) {
        toggleHelp();
    }

    if ($("#updateOverlay").is(":visible")) {
        $('#updateOverlay').hide();
    }
}
