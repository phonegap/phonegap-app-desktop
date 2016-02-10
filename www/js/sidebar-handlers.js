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
    global.createChosen = false;
    $("#plus-icon").attr("src", "img/icons/normal/plus.svg");
    $("#plus-holder").removeClass("sidebar-button-active");
    $("#newProjectOverlay").removeClass("animated slideInDown");
    $("#newProjectOverlay").addClass("animated slideOutUp");
    $("#newProjectOverlay").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideAddNewProjectOverlayAnimationEnd);
}

function handleHideAddNewProjectOverlayAnimationEnd() {
    $("#newProjectOverlay").off("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideAddNewProjectOverlayAnimationEnd);
    $("#newProjectOverlay").hide();
    $("#newProjectOverlay").removeClass("animated slideOutUp");
    $("#plus-icon").attr("src", "img/icons/normal/plus.svg");
    resetProjectCreationForm();
    hideProjectPathError();
    hideProjectNameError();
    hideProjectIdError();
}

function displayAddCreateProjectOverlay(evt) {
    $("#overlay-bg").show();
    $("#plus-holder").addClass("sidebar-button-active");
    $("#plus-icon").attr("src", "img/icons/active/plus-active.svg");
    $("#createOpenProjectOverlay").addClass("animated slideInLeft");
    $("#createOpenProjectOverlay").show();
}

function hideAddCreateProjectOverlay(evt) {
    $("#createOpenProjectOverlay").removeClass("animated slideInLeft");
    $("#createOpenProjectOverlay").addClass("animated slideOutLeft");
    $("#createOpenProjectOverlay").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", handleHideAddCreateProjectOverlayAnimationEnd);
    $("#plus-holder").removeClass("sidebar-button-active");
}

function handleHideAddCreateProjectOverlayAnimationEnd() {
    $("#createOpenProjectOverlay").off("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend");
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
        $("#status-field").hide();
        $("#ip-holder").hide();
        $("#overlay-bg").show();
        $("#serverLogOverlay").show();
    }
}

function handleHideServerLogAnimationEnd() {
    $("#status-field").show();
    $("#ip-holder").show();
    $("#serverLogOverlay").hide();
    $("#serverLogOverlay").removeClass("animated slideOutLeft");
}

function overlayBackgroundHandler(evt) {
    global.createChosen = false;
    $("#overlay-bg").hide();
    hideOverlays();
}

function hideOverlays() {
    if ($("#createOpenProjectOverlay").is(":visible")) {
        hideAddCreateProjectOverlay();
    }

    if ($("#settingsOverlay").is(":visible")) {
        toggleSettings();
    }

    if ($("#newProjectOverlay").is(":visible")) {
        hideAddNewProjectOverlay();
    }

    if ($("#serverLogOverlay").is(":visible")) {
        toggleLog();
    }

    if ($("#helpOverlay").is(":visible")) {
        toggleHelp();
    }

    if ($("#updateOverlay").is(":visible")) {
        hideUpdateOverlay();
    }
}
