function addProjectWidget(id, projectName, projectVersion, projectIcon, projectDir) {
    console.log("addProjectWidget: " + projectName);
    
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
    widgetDOM += "<div class='localPath'>Local path:</div>"
    widgetDOM += "<div class='projDir'><a href='#' id='" + projectDirId + "' class='projectDirLink'>" + projectDir + "</a></div>";
    widgetDOM += "</div>";
    widgetDOM += "</div>";
    
    widgetDOM += "</div>";  // close the widget
    
    global.jQuery("#drop_zone").append(widgetDOM);
    enableMinusButton();
    global.jQuery("#guide-add").hide();
        
    global.jQuery("#" + deleteId).on("click", function(event) {
        console.log(deleteId);
        
        var temp = global.jQuery("#" + deleteId).attr("id").split("_");
        var clickedId = temp[1];
        
        removeProjectWidget(clickedId);
    });
        
    global.jQuery("#" + projectDirId).on("click", function() {
        opener(projectDir);     
    });
    
    global.jQuery("#start-icon_" + id.toString()).on("mouseover", function() {
        imgSwapper("start-icon_" + id.toString(), "img/icons/hover/start-hover.svg");
    });
    
    global.jQuery("#start-icon_" + id.toString()).on("mouseout", function() {
        if (id == global.activeWidget.projectId) {
            imgSwapper("start-icon_" + id.toString(), "img/icons/active/start-active.svg");
        } else {
            imgSwapper("start-icon_" + id.toString(), "img/icons/normal/start.svg");
        }        
    });

    global.jQuery("#start-icon_" + id.toString()).on("click", function() {
       setActiveWidget(id, projectDir);
       widgetServerOnlineState(id);
    });

    global.jQuery("#stop-icon_" + id.toString()).on("mouseover", function() {
        imgSwapper("stop-icon_" + id.toString(), "img/icons/hover/stop-hover.svg");
    });
    
    global.jQuery("#stop-icon_" + id.toString()).on("mouseout", function() {
        imgSwapper("stop-icon_" + id.toString(), "img/icons/normal/stop.svg");
    });
    
    global.jQuery("#stop-icon_" + id.toString()).on("click", function() {
        if (global.jQuery("#stop-icon_" + id.toString()).hasClass("stop-icon-active")) {
            // turn off the server
            setServerOffline();
            serverOfflineState();
            widgetSeverOfflineState(id);
        }
    });
}

function widgetServerOnlineState(id) {
    // update view to reflect that server is running
    global.jQuery("#widgetStatus_" + id.toString()).addClass("widget-online");
    global.jQuery("#widgetStatusBottom_" + id.toString()).addClass("widget-online");                                                                           
    global.jQuery("#start-icon_" + id.toString()).attr("src", "img/icons/active/start-active.svg");
    global.jQuery("#hr-icon_" + id.toString()).css("opacity", 1.0);
    global.jQuery("#stop-icon_" + id.toString()).css("opacity", 1.0);
    global.jQuery("#stop-icon_" + id.toString()).addClass("stop-icon-active"); 
    global.jQuery("#" + global.activeWidget.widgetId).css("background-color", "#f0f0f0");  
}

function widgetSeverOfflineState(id) {
    // update view to reflect that server is stopped
    global.jQuery("#widgetStatus_" + id.toString()).removeClass("widget-online");
    global.jQuery("#widgetStatusBottom_" + id.toString()).removeClass("widget-online");
    global.jQuery("#stop-icon_" + id.toString()).css("opacity", 0.0);
    global.jQuery("#start-icon_" + id.toString()).attr("src", "img/icons/normal/start.svg"); 
    global.jQuery("#stop-icon_" + id.toString()).removeClass("stop-icon-active");   
    global.jQuery("#hr-icon_" + id.toString()).css("opacity", 0.0); 
    global.jQuery("#" + global.activeWidget.widgetId).css("background-color", "#e8e9e9");    
}

function setActiveWidget(id, projDir) {
    console.log("setActiveWidget"); 
   
    var previousActiveWidget = global.activeWidget;
        
    var activeWidget = {};
    activeWidget.widgetId = "projectWidget_" + id.toString();
    activeWidget.widgetStatus = "widgetStatus_" + id.toString();
    activeWidget.widgetStatusBottom = "widgetStatusBottom_" + id.toString();
    activeWidget.projectId = id;
    global.activeWidget = activeWidget;
    localStorage.projDir = projDir;
    
    console.log("activeId: " + id);
       
    // update GUI to display details of the active widget          
    global.jQuery("#" + activeWidget.widgetId).css("background-color", "#f0f0f0");
    widgetServerOnlineState(activeWidget.projectId);

    // set a watch on the config.xml of the active project
    setConfigWatcher(id, projDir);
    
    // turn on the server
    toggleServerStatus();
           
    // reset the previous active widget
    if (previousActiveWidget) {       
        console.log("prevId: " + previousActiveWidget.projectId);
        global.jQuery("#" + previousActiveWidget.widgetId).css("background-color", "#e8e9e9");
        widgetSeverOfflineState(previousActiveWidget.projectId);
    }
}

function setConfigWatcher(id, projDir) {
    console.log("config watcher");
    
    var oldPathToConfigFile = projDir + "/www/config.xml";
    var newPathToConfigFile = projDir + "/config.xml";

    fs.readFile(newPathToConfigFile, {encoding:'utf8'}, function(err, newPathData) {
        if (err) {
            fs.readFile(oldPathToConfigFile, {encoding:'utf8'}, function(err, oldPathData) {
                if (err) {
                    displayErrorMessage(err.message);
                } else {
                    process.chdir(projDir + "/www");
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
        
        console.log(this.watched());
        
        this.on("error", function(e) {
            console.log(e.message);
        });
        
        this.on("changed", function(filepath) {          
            // reload the updated values from config.xml & update the GUI
            fs.readFile(filePath, {encoding:'utf8'}, function(err, data) {
                if (err) {
                    displayErrorMessage(err.message);
                }

                var iconPath = projDir + "/www/";
                var projectDetailsId = "project-details_" + id.toString();
                var projectIconId = "projectIconId_" + id.toString();
                var projectNameLabel = "projectNameLabel_" + id.toString();
                var projectVersionLabel = "projectVersionLabel_" + id.toString();
                
                global.jQuery.xmlDoc = global.jQuery.parseXML(data);
                global.jQuery.xml = global.jQuery(global.jQuery.xmlDoc);

                // get the project name
                var projectName = global.jQuery.xml.find("name").text();
                updateProjectNameInLocalStorage(id, projectName);

                // get the project version
                var projectVersion = global.jQuery.xml.find("widget").attr("version");

                // get the app icon
                var projectIcon = global.jQuery.xml.find("icon").attr("src");
                iconPath += projectIcon;
                
                global.jQuery("#" + projectNameLabel).text(projectName);
                global.jQuery("#" + projectVersionLabel).text("v" + projectVersion);
                global.jQuery("#" + projectIconId).attr("src", iconPath);
            });
        });
    });    
}

function removeProjectWidget(idToDelete) {
    console.log("removeProjectWidget - id: " + idToDelete);
    var widgetId = "projectWidget_" + idToDelete.toString();
    global.jQuery("#" + widgetId).addClass("animated slideOutLeft");
    global.jQuery("#" + widgetId).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", function() {
        deleteProjectWidget(idToDelete);
    });
    if (global.allowRemoveNotification === "true") {
        global.allowRemoveNotification = "false";
        displayRemoveNotification();
    }   
}

function deleteProjectWidget(idToDelete) {
    console.log("deleteProjectWidget")
    var widgetId = "projectWidget_" + idToDelete.toString();
    global.jQuery("#" + widgetId).removeClass("animated slideOutLeft");
    global.jQuery("#" + widgetId).hide();
    global.jQuery("#" + widgetId).remove();
    removeProjectById(idToDelete);    
}

function displayRemoveNotification() {
    console.log("displayRemoveNotification");
    setNotificationText("Project removed from this list, but not deleted from your computer.");
    displayNotification();
}