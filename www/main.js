window.onerror = function(messageOrEvent, source, lineno, colno, error) {
    var errorData = {};
    errorData.message = messageOrEvent;
    errorData.source = source;
    errorData.line = lineno;
    errorData.col = colno;
    errorData.stack = error.stack;
    trackErrors(errorData);
    // parse error.stack into array so it doesn't cause ipcMain to barf
    var stack = error.stack.split('\n');
    // send to ipcMain process
    ipc.send('errorInWindow', messageOrEvent, source, lineno, colno, stack);
};

global.phonegap = require(path.join(__dirname, 'node_modules/phonegap/lib/main.js').replace('app.asar', 'app.asar.unpacked'));
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
global.isRemoving = false;
global.optInChanged = false;

$(document).ready(function() {

    var metricsServer = 'https://crashreporter.phonegap.com/';

    setDebugFlag();

    if (getDebugFlag()) {
        metricsServer = 'https://serene-harbor-73595.herokuapp.com/';
    }

    crashReporter.start({
        productName: 'PhoneGap-Desktop',
        companyName: 'Adobe',
        submitURL: metricsServer,
        uploadToServer: true,
        extra: crashReporterJSON()
    });

    // add node binary to PATH
    if (process.platform == 'darwin') {
        process.env.PATH += ':' + path.join(__dirname, 'bin');
    } else {
        process.env.PATH += ';' + path.join(__dirname, 'bin').replace('app.asar', 'app.asar.unpacked');
    }

    $('img').attr('draggable', 'false');

    $("#updateOverlay").hide();
    $("#projectDirectory").hide();
    $("#templateOverlay").hide();
    $("#projectDetailsOverlay").hide();
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
                adjustProjectCreationFormHeight();
            } else {
                var project = projectPath + "/" + projectName;
                folderExistsInFileSystem(project);
            }
        }
    });

    $("#nextTemplate").click(function() {
        global.nextTemplateClicked = true;
        displayProjectDetailsOverlay();
    });

    $("#cancelTemplate").click(overlayBackgroundHandler);

    $("#createProject").click(function() {
        global.createChosen = true;
        displayTemplateOverlay();
    });

    $("#backNewProject").click(function() {
        global.backTemplateClicked = true;
        hideProjectDetailsOverlay();
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

        // reset these values since we're creating or opening
        // a new project
        global.isDragDrop = false;
        global.projDir = undefined;
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
        if (determineOperatingSystem() === 'darwin') {
            // initiate the squirrel.mac auto-updater
            updateDesktopApp(autoUpdater);
        } else {
            // other platforms just open the GitHub releases page
            shell.openExternal("https://github.com/phonegap/phonegap-app-desktop/releases");
        }
    });

    $("#sendUsage").click(function() {
        global.optInChanged = true;
    });

    initSettings();

    $("#projectPath").text(getLastSelectedProjectPath());
    $(".tooltiptext").text(getLastSelectedProjectPath());

    hideProjectPathError();
    hideProjectNameError();
    hideProjectIdError();
    disableMinusButton();

    initFileMenu();

    //trackAppOpened();
    gaAppLoaded();
    getProjects();
    getTemplates();

    checkForUpdates(autoUpdater);

    var hideLoaderTimeout = setTimeout(function() {
        hideLoader();

        // need to fire this event after missing projects have been removed
        var projects = JSON.parse(localStorage.projects);
        trackProjectsLoaded(projects.length);

        if (projects.length > 0)
            setActiveWidget(projects[0].id, projects[0].projDir);
    }, 2000);

    //process.crash();

});

function getProjectPath(e) {
    var path = dialog.showOpenDialog({properties: ['openDirectory']});
    if ($.isArray(path)) {
        if (path.length > 0) {
            path = path[0];
            $('#projectDirectory').val(path);
            $(".tooltiptext").text(path);

            if (global.createChosen) {
                selectProjectPath(e);
            } else {
                openProject(e);
            }

        }
    }
}

function imgSwapper(img, src) {
    $("#" + img).attr("src", src);
}
