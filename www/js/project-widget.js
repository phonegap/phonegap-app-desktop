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
    var altText = getProjectInitials(projectName);
    widgetDOM += "<div class='column project-icon-column'>";

    widgetDOM += "<div class='flip-container'>";
    widgetDOM += "<div class='flipper'>";

    widgetDOM += "<div class='front'>";
    widgetDOM += "<img id='" + projectIconId + "' alt='" + altText + "' height='64' width='64' src='" + projectIcon + "' />";
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

    $("#" + projectIconId).on("error",function(){
        var image = $("#" + projectIconId);
        image.hide();
        image.parent().addClass('noimage').text(image.attr('alt'));
    });

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
        if (!global.isServerRunning || global.activeWidget.projectId != id) {
            setActiveWidget(id, projectDir);
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
                multipleServersOfflineState();
                serverOfflineState();
                widgetServerOfflineState(id, widgetId);
                //global.activeWidget = null;
            }
        }
    });
}

function getProjectInitials(projName) {
    return (projName).split(" ").map(function(elem) {
        return elem.substr(0,1);
    }).slice(0,2).join("");
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

function widgetServerOfflineState(id, widgetId) {
    // update view to reflect that server is stopped
    $("#widgetStatus_" + id.toString()).removeClass("widget-online");
    $("#widgetStatusBottom_" + id.toString()).removeClass("widget-online");
    $("#stop-icon_" + id.toString()).css("opacity", 0.0);
    $("#start-icon_" + id.toString()).attr("src", "img/icons/normal/start.svg");
    $("#stop-icon_" + id.toString()).removeClass("stop-icon-active");
    $("#hr-icon_" + id.toString()).css("opacity", 0.0);
    $("#" + widgetId).css("background-color", "#e8e9e9");
}

function setActiveWidget(id, projDir) {
    if (global.activeWidget){
        global.activeWidget.watcher.close();
    }

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

    // Auto-Scroll to the newly created project
    var scrollAmt = $("#drop_zone")[0].scrollTop + $("#" + activeWidget.widgetId).position().top;
    if (scrollAmt>$("#drop_zone")[0].scrollHeight)
        scrollAmt = $("#" + activeWidget.widgetId).position().top+160
    $("#drop_zone").animate({scrollTop:scrollAmt},800)

    // If loader was still showing, hide it
    $("#overlay-bg").hide();
    hideLoader();

    // Start the server on the newly added project if we got here by drag-n-drop since the UI animation handler
    // wouldn't have run in that case
    if (global.isDragDrop) {
        toggleServerStatus(projDir);
    }

    widgetServerOnlineState(activeWidget.projectId);

    // set a watch on the config.xml of the active project
    setConfigWatcher(id, projDir);

    // reset the previous active widget
    if (previousActiveWidget) {
        //$("#" + previousActiveWidget.widgetId).css("background-color", "#e8e9e9");
        widgetServerOfflineState(previousActiveWidget.projectId, previousActiveWidget.widgetId);
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

    console.log("setWatcher(" + filePath + ", " + projDir + ", " + id + ");");

    var chokidar = require("chokidar");

    var watcher = chokidar.watch(filePath, {
        ignored: /[\/\\]\./,
        persistent: true
    });

    // Declare the listeners of the watcher
    watcher.on('change', function(filePath) {
        // Ensure the config.xml gets added to avoid timing issues reading/updating it after
        console.log('config.xml file changed at ' + filePath);

        // reload the updated values from config.xml & update the GUI
        fs.readFile(filePath, {encoding:'utf8'}, function(err, data) {
            if (err) {
                console.log(err.message);
                displayErrorMessage(err.message);
            }

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
            var iconPath = path.join(projDir, findIconPath($.xml.find("icon")));

            $("#" + projectNameLabel).text(projectName);
            $("#" + projectVersionLabel).text("v" + projectVersion);
            $("#" + projectIconId).attr("src", iconPath);
        });

    });

    global.activeWidget.watcher = watcher;
    return watcher;
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
