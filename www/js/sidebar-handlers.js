function displayAddNewProjectOverlay(evt) {
    hideAddCreateProjectOverlay();
    animateAddNewProjectOverlayEntry();
}

function animateAddNewProjectOverlayEntry() {
    $("#plus-icon").attr("src", "img/icons/active/plus-active.svg");
    $("#plus-holder").addClass("sidebar-button-active");
    $("#newProjectOverlay").addClass("animated slideInDown");
    $("#newProjectOverlay").show();
    $("#overlay-bg").show();
}

function hideAddNewProjectOverlay(evt) {
    $("#plus-icon").attr("src", "img/icons/normal/plus.svg");
    $("#plus-holder").removeClass("sidebar-button-active");
    $("#newProjectOverlay").removeClass("animated slideInDown");
    $("#newProjectOverlay").addClass("animated slideOutUp");
    $("#newProjectOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHideAddNewProjectOverlayAnimationEnd);
}

function handleHideAddNewProjectOverlayAnimationEnd() {
    $("#newProjectOverlay").hide();
    $("#newProjectOverlay").removeClass("animated slideOutUp");
    $("#plus-icon").attr("src", "img/icons/normal/plus.svg");
    resetProjectCreationForm();
    hideProjectPathError();
    hideProjectNameError();
    hideProjectIdError();
}

function displayAddCreateProjectOverlay(evt) {
    $("#plus-holder").addClass("sidebar-button-active");
    $("#plus-icon").attr("src", "img/icons/active/plus-active.svg");
    $("#createOpenProjectOverlay").addClass("animated slideInLeft");
    $("#createOpenProjectOverlay").show();
    $("#overlay-bg").show();
}

function hideAddCreateProjectOverlay(evt) {
    $("#createOpenProjectOverlay").removeClass("animated slideInLeft");
    $("#createOpenProjectOverlay").addClass("animated slideOutLeft");
    $("#createOpenProjectOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHideAddCreateProjectOverlayAnimationEnd);
    $("#plus-holder").removeClass("sidebar-button-active");
}

function handleHideAddCreateProjectOverlayAnimationEnd() {
    $("#createOpenProjectOverlay").hide();
    $("#createOpenProjectOverlay").removeClass("animated slideOutLeft");
    if (!global.createChosen) {
        $("#plus-icon").attr("src", "img/icons/normal/plus.svg");
    }
}

function toggleRemoveProjectView(evt) {
    overlayBackgroundHandler();

    if (!$(".flip-container").hasClass("flipped")) {
        $(".flip-container").addClass("animated flipped");
        $("#minus-holder").addClass("sidebar-button-active");
        $("#minus-icon").attr("src", "img/icons/active/minus-active.svg");
        global.allowRemoveNotification = "true";
    } else {
        resetMinusButtonState();
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

function displaySettingsOverlay(evt) {
    var usageFlag = getSendUsageFlag();
    hideOverlays();
    // prepopulate port number from localStorage
    $("#portNumber").val(localStorage.portNumber);
    $("#sendUsage").prop("checked", usageFlag);
    $("#settings-holder").addClass("sidebar-button-active");
    $("#settings-icon").attr("src", "img/icons/active/settings-active.svg");
    $("#settingsOverlay").addClass("animated slideInLeft");
    $("#settingsOverlay").show();
    $("#overlay-bg").show();
}

function hideSettingsOverlay(evt) {
    hidePortError();
    $("#settings-icon").attr("src", "img/icons/normal/settings.svg");
    $("#settingsOverlay").removeClass("animated slideInLeft");
    $("#settingsOverlay").addClass("animated slideOutLeft");
    $("#settings-holder").removeClass("sidebar-button-active");
    $("#settingsOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHideSettingsAnimationEnd);
}


function handleHideSettingsAnimationEnd() {
    $("#settingsOverlay").hide();
    $("#overlay-bg").hide();
    $("#settingsOverlay").removeClass("animated slideOutLeft");
}

function displayHelpOverlay(evt) {
    hideOverlays();
    $("#help-holder").addClass("sidebar-button-active");
    $("#help-icon").attr("src", "img/icons/hover/help-hover.svg");
    $("#helpOverlay").addClass("animated slideInLeft");
    $("#helpOverlay").show();
    $("#overlay-bg").show();
}

function hideHelpOverlay(evt) {
    $("#helpOverlay").removeClass("animated slideInLeft");
    $("#helpOverlay").addClass("animated slideOutLeft");
    $("#helpOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHelpOverlayAnimationEnd);
    $("#help-holder").removeClass("sidebar-button-active");
    $("#help-icon").attr("src", "img/icons/normal/help.svg");
}

function handleHelpOverlayAnimationEnd() {
    $("#helpOverlay").hide();
    $("#overlay-bg").hide();
    $("#helpOverlay").removeClass("animated slideOutLeft");
}

function toggleLog() {
    if ($("#serverLogOverlay").is(":visible")) {
        $("#serverLogOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", handleHideServerLogAnimationEnd);
        $("#log-holder").removeClass("sidebar-button-active");
        $("#serverLogOverlay").removeClass("animated slideInLeft");
        $("#serverLogOverlay").addClass("animated slideOutLeft");
        $("#overlay-bg").hide();
    } else {
        hideOverlays();
        $("#log-holder").addClass("sidebar-button-active");
        $("#serverLogOverlay").removeClass("animated slideOutLeft");
        $("#serverLogOverlay").addClass("animated slideInLeft");
        $("#status-field").hide();
        $("#overlay-bg").show();
        $("#serverLogOverlay").show();
    }
}

function handleHideServerLogAnimationEnd() {
    $("#status-field").show();
    $("#serverLogOverlay").hide();
    $("#serverLogOverlay").removeClass("animated slideOutLeft");
}

function overlayBackgroundHandler(evt) {
    $("#overlay-bg").hide();
    hideOverlays();
}

function hideOverlays() {
    if ($("#createOpenProjectOverlay").is(":visible")) {
        hideAddCreateProjectOverlay();
    }

    if ($("#settingsOverlay").is(":visible")) {
        hideSettingsOverlay();
    }

    if ($("#newProjectOverlay").is(":visible")) {
        hideAddNewProjectOverlay();
    }

    if ($("#serverLogOverlay").is(":visible")) {
        toggleLog();
    }

    if ($("#helpOverlay").is(":visible")) {
        hideHelpOverlay();
    }

    if ($("#updateOverlay").is(":visible")) {
        hideUpdateOverlay();
    }
}
