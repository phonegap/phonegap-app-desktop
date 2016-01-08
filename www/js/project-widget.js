function addProjectWidget(id, projectName, projectVersion, projectIcon, projectDir) {
    var widgetId = "projectWidget_" + id.toString();
    var projectStatusId = "project-status_" + id.toString();
    var projectDetailsId = "project-details_" + id.toString();
    var projectDirId = "project-dir_" + id.toString();
    var deleteId = "delete_" + id.toString();
    var projectIconId = "projectIconId_" + id.toString();
    var projectNameLabel = "projectNameLabel_" + id.toString();
    var projectVersionLabel = "projectVersionLabel_" + id.toString();
    var widgetStatus = "widgetStatus_" + id.toString();
    var widgetStatusBottom = "widgetStatusBottom_" + id.toString();

    var widgetDOM = "";

    // open the widget
    widgetDOM += "<div class='row widget-border' id='" + widgetId + "'>";

    widgetDOM += "<div id='" + widgetStatus + "' class='column widget-offline'>";
    widgetDOM += "</div>";

    // project icon
    widgetDOM += "<div class='column project-icon-column'>";

	widgetDOM += "<div class='flip-container'>";
	widgetDOM += "<div class='flipper'>";

	widgetDOM += "<div class='front'>";
    widgetDOM += "<img id='" + projectIconId + "' height='64' width='64' src='" + projectIcon + "' />";
    widgetDOM += "</div>";  // front content

    widgetDOM += "<div class='back delete-holder' id=" + deleteId + ">";
    widgetDOM += "<button class='delete-button'>";
    widgetDOM += "<img src='img/icons/normal/delete.svg' />";
    widgetDOM += "</button>";
    widgetDOM += "</div>";  // back content

	widgetDOM += "</div>";  // flipper
	widgetDOM += "</div>";  // flip-container

    widgetDOM += "</div>";

    // project info
    widgetDOM += "<div class='column project-details-column' id='" + projectDetailsId + "'>";
    widgetDOM += "<div id='" + projectNameLabel + "' class='project-name'>" + projectName + "</div>";
    widgetDOM += "<div id='" + projectVersionLabel + "' class='project-version'>v" + projectVersion + "</div>";
    widgetDOM += "</div>";

    // indicator active project
    widgetDOM += "<div class='column project-indicator'>";
    widgetDOM += "<img id='start-icon_" + id.toString() + "' class='start-icon' src='img/icons/normal/start.svg' />";
    widgetDOM += "<img id='hr-icon_" + id.toString() + "' class='hr-icon' src='img/icons/normal/hr.svg' />";
    widgetDOM += "<img id='stop-icon_" + id.toString() + "' class='stop-icon' src='img/icons/normal/stop.svg' />";
    widgetDOM += "</div>";

    // project folder
    widgetDOM += "<div class='row'>";

    widgetDOM += "<div id='" + widgetStatusBottom + "' class='column widget-offline'>";
    widgetDOM += "</div>";

    widgetDOM += "<div class='column project-folder-column'>";
    widgetDOM += "<div class='localPath'>Local path:</div>";
    widgetDOM += "<div class='projDir'><a href='#' id='" + projectDirId + "' class='projectDirLink'>" + projectDir + "</a></div>";
    widgetDOM += "</div>";
    widgetDOM += "</div>";

    widgetDOM += "</div>";  // close the widget

    $("#drop_zone").append(widgetDOM);
    enableMinusButton();
    $("#guide-add").hide();

    $("#" + deleteId).on("click", function(event) {
        var temp = $("#" + deleteId).attr("id").split("_");
        var clickedId = temp[1];

        removeProjectWidget(clickedId);
    });

    $("#" + projectDirId).on("click", function() {
        opener(projectDir);
    });

    $("#start-icon_" + id.toString()).on("mouseover", function() {
        if (global.isServerRunning) {
            imgSwapper("start-icon_" + id.toString(), "img/icons/hover/start-hover.svg");
        }
    });

    $("#start-icon_" + id.toString()).on("mouseout", function() {
        if (global.isServerRunning) {
            if (id == global.activeWidget.projectId) {
                imgSwapper("start-icon_" + id.toString(), "img/icons/active/start-active.svg");
            } else {
                imgSwapper("start-icon_" + id.toString(), "img/icons/normal/start.svg");
            }
        }
    });

    $("#start-icon_" + id.toString()).on("click", function() {
        setActiveWidget(id, projectDir);
        if (global.isServerRunning) {
            widgetServerOnlineState(id);
        } else {
            toggleServerStatus(projectDir);
        }
    });

    $("#stop-icon_" + id.toString()).on("mouseover", function() {
        imgSwapper("stop-icon_" + id.toString(), "img/icons/hover/stop-hover.svg");
    });

    $("#stop-icon_" + id.toString()).on("mouseout", function() {
        imgSwapper("stop-icon_" + id.toString(), "img/icons/normal/stop.svg");
    });

    $("#stop-icon_" + id.toString()).on("click", function() {
        if ($("#stop-icon_" + id.toString()).hasClass("stop-icon-active")) {
            if (global.isServerRunning) {
                // turn off the server
                global.stopClicked = true;
                setServerOffline();
                serverOfflineState();
                widgetSeverOfflineState(id);
                global.activeWidget = null;
            }
        }
    });
}

function widgetServerOnlineState(id) {
    if (global.isServerRunning) {
        // update view to reflect that server is running
        $("#widgetStatus_" + id.toString()).addClass("widget-online");
        $("#widgetStatusBottom_" + id.toString()).addClass("widget-online");
        $("#start-icon_" + id.toString()).attr("src", "img/icons/active/start-active.svg");
        $("#hr-icon_" + id.toString()).css("opacity", 1.0);
        $("#stop-icon_" + id.toString()).css("opacity", 1.0);
        $("#stop-icon_" + id.toString()).addClass("stop-icon-active");
        $("#" + global.activeWidget.widgetId).css("background-color", "#f0f0f0");
    }
}

function widgetSeverOfflineState(id) {
    // update view to reflect that server is stopped
    $("#widgetStatus_" + id.toString()).removeClass("widget-online");
    $("#widgetStatusBottom_" + id.toString()).removeClass("widget-online");
    $("#stop-icon_" + id.toString()).css("opacity", 0.0);
    $("#start-icon_" + id.toString()).attr("src", "img/icons/normal/start.svg");
    $("#stop-icon_" + id.toString()).removeClass("stop-icon-active");
    $("#hr-icon_" + id.toString()).css("opacity", 0.0);
    $("#" + global.activeWidget.widgetId).css("background-color", "#e8e9e9");
}

function setActiveWidget(id, projDir) {

    var previousActiveWidget = global.activeWidget;

    var activeWidget = {};
    activeWidget.widgetId = "projectWidget_" + id.toString();
    activeWidget.widgetStatus = "widgetStatus_" + id.toString();
    activeWidget.widgetStatusBottom = "widgetStatusBottom_" + id.toString();
    activeWidget.projectId = id;
    global.activeWidget = activeWidget;
    localStorage.projDir = projDir;

    // update GUI to display details of the active widget
    $("#" + activeWidget.widgetId).css("background-color", "#f0f0f0");
    widgetServerOnlineState(activeWidget.projectId);

    // set a watch on the config.xml of the active project
    setConfigWatcher(id, projDir);

    // turn on the server
    toggleServerStatus(projDir);

    // reset the previous active widget
    if (previousActiveWidget) {
        $("#" + previousActiveWidget.widgetId).css("background-color", "#e8e9e9");
        widgetSeverOfflineState(previousActiveWidget.projectId);
    }
}

function setConfigWatcher(id, projDir) {
    var oldPathToConfigFile = projDir + buildPathBasedOnOS("/www/config.xml");
    var newPathToConfigFile = projDir + buildPathBasedOnOS("/config.xml");

    fs.readFile(newPathToConfigFile, {encoding:'utf8'}, function(err, newPathData) {
        if (err) {
            fs.readFile(oldPathToConfigFile, {encoding:'utf8'}, function(err, oldPathData) {
                if (err) {
                    displayErrorMessage(err.message);
                } else {
                    process.chdir(projDir + buildPathBasedOnOS("/www"));
                    setWatcher(oldPathToConfigFile, projDir, id);
                }
            });
        } else {
            process.chdir(projDir);
            setWatcher(newPathToConfigFile, projDir, id);
        }
    });
}

function setWatcher(filePath, projDir, id) {
    gaze("config.xml", function (err, watcher) {

        this.on("error", function(e) {
            console.log(e.message);
        });

        this.on("changed", function(filepath) {
            // reload the updated values from config.xml & update the GUI
            fs.readFile(filePath, {encoding:'utf8'}, function(err, data) {
                if (err) {
                    console.log(err.message);
                    displayErrorMessage(err.message);
                }

                var iconPath = projDir + buildPathBasedOnOS("/www/");
                var projectDetailsId = "project-details_" + id.toString();
                var projectIconId = "projectIconId_" + id.toString();
                var projectNameLabel = "projectNameLabel_" + id.toString();
                var projectVersionLabel = "projectVersionLabel_" + id.toString();

                $.xmlDoc = $.parseXML(data);
                $.xml = $($.xmlDoc);

                // get the project name
                var projectName = $.xml.find("name").text();
                updateProjectNameInLocalStorage(id, projectName);

                // get the project version
                var projectVersion = $.xml.find("widget").attr("version");

                // get the app icon
                var projectIcon = $.xml.find("icon").attr("src");
                iconPath += projectIcon;

                $("#" + projectNameLabel).text(projectName);
                $("#" + projectVersionLabel).text("v" + projectVersion);
                $("#" + projectIconId).attr("src", iconPath);
            });
        });
    });
}

function removeProjectWidget(idToDelete) {
    var widgetId = "projectWidget_" + idToDelete.toString();
    $("#" + widgetId).addClass("animated slideOutLeft");
    $("#" + widgetId).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", function() {
        trackProjectRemoved();
        deleteProjectWidget(idToDelete);
    });
    if (global.allowRemoveNotification === "true") {
        global.allowRemoveNotification = "false";
        displayRemoveNotification();
    }
}

function deleteProjectWidget(idToDelete) {
    var widgetId = "projectWidget_" + idToDelete.toString();
    $("#" + widgetId).removeClass("animated slideOutLeft");
    $("#" + widgetId).hide();
    $("#" + widgetId).remove();
    removeProjectById(idToDelete);
}

function displayRemoveNotification() {
    setNotificationText("Project removed from this list, but not deleted from your computer.");
    displayNotification();
}
