var autoUpdater = require('electron').remote.autoUpdater;
var dialog = require('electron').remote.dialog;

global.pgServer = require("connect-phonegap");
global.pgVersion = "6.2.6";
global.createClicked = false;
global.server = null;
global.isServerRunning = false;
global.allowRemoveNotification = "false";
global.createChosen = false;
global.missing = new Array();
global.manifest = null;
global.newAppPath = null;
global.stopClicked = false;
global.firstProjectDir = null;

$(document).ready(function() {

    $("#updateOverlay").hide();
    $("#projectDirectory").hide();
    $("#newProjectOverlay").hide();
    $("#createOpenProjectOverlay").hide();
    $("#settingsOverlay").hide();
    $("#serverLogOverlay").hide();
    $("#helpOverlay").hide();
    $("#overlay-bg").hide();
    $("#notification-bar").hide();
    $("#port-number-error").hide();
    $("#ip-holder").hide();

    $("#body").on("drop", handleDrop);
    $("#body").on("dragover", handleDragOver);

    $("#overlay-bg").click(overlayBackgroundHandler);

    $("#addNewProject").click(function(e) {
        global.createChosen = false;
        createProject(e);
    });

    $("#chooseNewProjectPath").click(function(e) {
        getProjectPath();
        //selectProjectPath(e);
    });

    $("#projectName").blur(function() {

        var projectPath = $("#projectPath").text().trim();
        var projectName = $("#projectName").val().trim();

        var isProjectPathEmpty = isProjectPathFieldEmpty(projectPath);
        var isProjectNameEmpty = isEmptyField(projectName);

        if (projectName.length > 0) {

            if (isProjectPathEmpty) {
                // error with project path
                displayProjectPathError();
                adjustProjectCreationFormHeight(isProjectPathEmpty, isProjectNameEmpty);
            } else {
                var project = projectPath + "/" + projectName;
                folderExistsInFileSystem(project);
            }
        }
    });

    $("#createProject").click(function() {
        global.createChosen = true;
        displayAddNewProjectOverlay();
    });

    $("#cancelNewProject").click(overlayBackgroundHandler);

    $("#openProject").click(function(e) {
        global.createChosen = false;
        getProjectPath();
    });

    $("#saveSettings").click(saveSettings);
    $("#cancelSettings").click(cancelSettings);

    $("#portNumber").blur(settingsFormValidatePortNumber);

    $("#closeServerLog").click(toggleLog);

    $("#clearServerLog").click(function() {
        //console.log($("#serverLog").val());
        var serverLog = $("#serverLog");
        serverLog.val("");
        serverLog.val(serverLog.val());
     });

    $("#about").click(function() {
        aboutContent();
        toggleHelp();
    });

    //tutorials & reportIssue
    $("#tutorials").click(function() {
        openTutorials();
        toggleHelp();
    });

    $("#reportIssue").click(function() {
        openIssueTracker();
        toggleHelp();
    });

    $("#termsOfUse").click(function() {
        openTermsOfUse();
        toggleHelp();
    });

    $("#privacyPolicy").click(function() {
        openPrivacyPolicy();
        toggleHelp();
    });

    $("#plus-holder").click(function() {
        if ($("#createOpenProjectOverlay").is(":visible") || $("#newProjectOverlay").is(":visible")) {
            overlayBackgroundHandler();
            if (global.createChosen) {
                global.createChosen = false;
            }
        } else {
            resetMinusButtonState();
            hideOverlays();
            displayAddCreateProjectOverlay();
        }
    });

    $("#minus-holder").click(function() {
        if(!$("#minus-holder").hasClass("sidebar-button-holder-inactive")) {
            toggleRemoveProjectView();
        }
    });

    $("#settings-holder").click(function() {
        if (!$("#settingsOverlay").is(":visible")) {
            resetMinusButtonState();
        }
        toggleSettings();
    });

    $("#log-holder").click(function() {
        resetMinusButtonState();
        toggleLog();
    });

    $("#help-holder").click(function() {
        resetMinusButtonState();
        toggleHelp();
    });

    $("#plus-holder").on("mouseout", function() {
        if (!$("#createOpenProjectOverlay").is(":visible") && !$("#newProjectOverlay").is(":visible")) {
            imgSwapper('plus-icon', 'img/icons/normal/plus.svg');
        }

        if ($("#createOpenProjectOverlay").is(":visible") || $("#newProjectOverlay").is(":visible")) {
            imgSwapper('plus-icon', 'img/icons/active/plus-active.svg');
        }
    });

    $("#minus-holder").on("mouseover", function() {
        if(!$("#minus-holder").hasClass("sidebar-button-holder-inactive")) {
            imgSwapper('minus-icon', 'img/icons/hover/minus-hover.svg');
        }

        if($("#minus-holder").hasClass("sidebar-button-active")) {
            imgSwapper('minus-icon', 'img/icons/active/minus-active.svg');
        }
    });

    $("#minus-holder").on("mouseout", function() {
        if(!$("#minus-holder").hasClass("sidebar-button-holder-inactive")) {
            if (!$(".flip-container").hasClass("flip")) {
                imgSwapper('minus-icon', 'img/icons/normal/minus.svg');
            }

            if ($(".flip-container").hasClass("flip")) {
                imgSwapper('minus-icon', 'img/icons/active/minus-active.svg');
            }
        }

        if($("#minus-holder").hasClass("sidebar-button-active")) {
            imgSwapper('minus-icon', 'img/icons/active/minus-active.svg');
        }
    });

    $("#settings-holder").on("mouseout", function() {
        if (!$("#settingsOverlay").is(":visible")) {
            imgSwapper('settings-icon', 'img/icons/normal/settings.svg');
        } else {
            imgSwapper('settings-icon', 'img/icons/active/settings-active.svg');
        }
    });

    $("#help-holder").on("mouseout", function() {
        if (!$("#helpOverlay").is(":visible")) {
            imgSwapper('help-icon', 'img/icons/normal/help.svg');
        } else {
            imgSwapper('help-icon', 'img/icons/hover/help-hover.svg');
        }
    });

    $("#updateLater").click(function() {
        overlayBackgroundHandler();
        $('#updateOverlay').hide();
    });

    $("#updateNow").click(function() {
        overlayBackgroundHandler();
        $('#updateOverlay').hide();
        updateDesktopApp();
    });

    initSettings();

    hideProjectPathError();
    hideProjectNameError();
    hideProjectIdError();
    disableMinusButton();

    initFileMenu();

    //trackAppOpened();
    gaAppLoaded();
    getProjects();

    // auto-update on Mac OSX
    if (determineOperatingSystem() === 'darwin') {
        checkForUpdates(autoUpdater);
    }

    var hideLoaderTimeout = setTimeout(hideLoader, 2000);
});

function getProjectPath(e) {
    var path = dialog.showOpenDialog({properties: ['openDirectory']});
    if ($.isArray(path)) {
        if (path.length > 0) {
            path = path[0];
            $('#projectDirectory').val(path);
            console.log(path);

            if (global.createChosen) {
                selectProjectPath(e);
            } else {
                openProject(e);
            }

        } else {
            console.log("path array was empty");
        }
    } else {
        console.log("path returned was not array");
    }
}

function imgSwapper(img, src) {
    $("#" + img).attr("src", src);
}
