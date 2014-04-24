function addProjectWidget(id, projectName, projectVersion, projectIcon, projectDir) {
    console.log("addProjectWidget");
    
    var widgetId = "projectWidget_" + id.toString();
    var iconId = "icon_" + id.toString();
    var projectStatusId = "project-status_" + id.toString();
    var projectDetailsId = "project-details_" + id.toString();
    
    var widgetDOM = "";  
    
    // open the widget
    widgetDOM += "<div class='row widget-border' id='" + widgetId + "'>";

    // project icon
    widgetDOM += "<div class='column-2-hand' id='" + iconId + "'>"
    widgetDOM += "<img height='64' width='64' src='" + projectIcon + "'>";
    widgetDOM += "</div>";
    
    // project info
    widgetDOM += "<div class='column-9-hand' id='" + projectDetailsId + "'>";
    widgetDOM += projectName + "<br>";
    widgetDOM += projectVersion + "<br>";
    widgetDOM += "</div>";
    
    // indicator active project
    widgetDOM += "<div class='column-1-hand'>";
    widgetDOM += "<div class='widget-status-field'>";
    widgetDOM += "<input type='checkbox' disabled='true' id='" + projectStatusId + "' />";
    widgetDOM += "<label for='project-status' id='project-status-label'>&nbsp;</label>";
    widgetDOM += "</div>";
    widgetDOM += "</div>";
    
    // project folder
    widgetDOM += "<div class='row'>";
    widgetDOM += "<div class='column' style='padding-left: 10px; padding-bottom: 10px;'>";
    widgetDOM += "<div class='box'>";
    widgetDOM += "<div class='localPath'>Local path:</div>"
    widgetDOM += "<div class='projDir'>" + projectDir + "</div>"; 
    widgetDOM += "</div>";
    widgetDOM += "</div>";
    widgetDOM += "</div>";
    
    widgetDOM += "</div>";  // close the widget
    
    global.jQuery("#drop_zone").append(widgetDOM);
    global.jQuery("#minus").prop("disabled", false);
    global.jQuery("#guide-add").hide();
    
    global.jQuery("#" + widgetId).on("click", function() {
        var temp = global.jQuery("#" + widgetId).attr("id").split("_");
        var id = temp[1];
        
        // only allow setting of active widget if another project widget is selected
        if (id != global.activeWidget.projectId) {   
            setActiveWidget(id, projectDir);  
        }             
    });
    
    global.jQuery("#" + widgetId).on("mouseover", function() {
        global.jQuery("#" + widgetId).css("background-color", "#99CCFF");
    });
    
    global.jQuery("#" + widgetId).on("mouseout", function() {
        if (widgetId == global.activeWidget.widgetId) {
            global.jQuery("#" + widgetId).css("background-color", "rgb(240,240,240)");
        } else {
            global.jQuery("#" + widgetId).css("background-color", "");
        }
    });
}

function setActiveWidget(id, projDir) {
    console.log("setActiveWidget - id: " + id); 
   
    var previousActiveWidget = global.activeWidget;
        
    var activeWidget = {};
    activeWidget.widgetId = "projectWidget_" + id.toString();
    activeWidget.projectId = id;
    global.activeWidget = activeWidget;
    localStorage.projDir = projDir;
    
    // update GUI to display details of the active widget          
    var projectStatusId = "project-status_" + id.toString();
    global.jQuery("#" + activeWidget.widgetId).css("background-color", "rgb(240,240,240)");                                                                                  
    global.jQuery("#" + projectStatusId).prop("checked", true);

    // set a watch on the config.xml of the active project
    setConfigWatcher(id, projDir);
    
    // turn on the server
    global.jQuery("#server-status").prop("checked", true);
    toggleServerStatus();
           
    // reset the previous active widget
    if (previousActiveWidget) {
        var prevProjectStatusId = "project-status_" + previousActiveWidget.projectId.toString();
        global.jQuery("#" + prevProjectStatusId).prop("checked", false);
        global.jQuery("#" + previousActiveWidget.widgetId).css("background-color", "");       
    }
}

function setConfigWatcher(id, projDir) {
    
    var configFile = projDir + "/www/config.xml";
    
    process.chdir(projDir + "/www");
   
    gaze("config.xml", function (err, watcher) {
        
        console.log(this.watched());
        
        this.on("error", function(e) {
            console.log(e.message);
        });
        
        this.on("changed", function(filepath) {          
            // reload the updated values from config.xml & update the GUI
            fs.readFile(configFile, 'utf8', function(err, data) {
                if (err) throw err;

                var iconPath = projDir + "/www/";
                var projectDetailsId = "project-details_" + id.toString();
                var iconId = "icon_" + id.toString();

                global.jQuery.xmlDoc = global.jQuery.parseXML(data);
                global.jQuery.xml = global.jQuery(global.jQuery.xmlDoc);

                // get the project name
                var projectName = global.jQuery.xml.find("name").text();

                // get the project version
                var projectVersion = global.jQuery.xml.find("widget").attr("version");

                // get the app icon
                var projectIcon = global.jQuery.xml.find("icon").attr("src");
                iconPath += projectIcon;
                
                var updatedText = projectName + "<br>" + projectVersion + "<br>";
                var updatedIconPath = "<img width='128' height='128' src='" + iconPath + "'>";
                
                global.jQuery("#" + projectDetailsId).html(updatedText);
                global.jQuery("#" + iconId).html(updatedIconPath);
            });
        });
    });
}

function removeProjectWidget() {
    console.log("removeProjectWidget - id: " + global.activeWidget.projectId);
    global.jQuery("#" + global.activeWidget.widgetId).remove();
    removeProjectById(global.activeWidget.projectId);
}

function toggleServerStatus() {
    console.log("toggleServerStatus");

    if (global.isServerRunning) {
        global.server.close();
        global.isServerRunning = false;
    }
            
    if (global.jQuery("#server-status").is(":checked")) {
        fs.exists(localStorage.projDir + "/www", function(exists) {
            if (exists) {
                process.chdir(localStorage.projDir);
                console.log("server started");
                console.log("project opened at: " + localStorage.projDir);
                                   
                global.pgServer.listen({ port: localStorage.portNumber })
                .on("complete", function(data) {
                    console.log("server started at: " + data.address + ":" + data.port);
                    global.server = data.server;
                    global.isServerRunning = true;
                    global.jQuery("#status-field").css("background-color", "rgb(43,169,77)");
                    global.jQuery("#server-status-label").text("Server is running on http://" + data.address + ":" + data.port);
                    global.jQuery("#status-field").show();
                    global.jQuery("#log").prop("disabled", false);
                })
                .on("error", function(e) {
                    console.log(e.message);
                    global.jQuery("#server-status-label").text(e.message);
                })
                .on("log", function(status, url) {
                    console.log(status, url);
                    global.jQuery("#serverLog").append(status + " " + url + "\n");
                });
            } else {
                var errMsg = "an existing project doesn't exist in this folder";
                console.log(errMsg);      
                global.jQuery("#server-status").prop("checked", false);
                global.jQuery("#log").prop("disabled", true);
            }
        });
                  
     } else {
         //console.log("server stopped");
         if (global.isServerRunning) {
             global.server.close();
             global.isServerRunning = false;
         }
         
         global.jQuery("#status-field").css("background-color", "rgb(153,153,153)");
         global.jQuery("#server-status-label").text("server is offline");
         global.jQuery("#log").prop("disabled", true);
     }
}