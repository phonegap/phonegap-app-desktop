function addProjectWidget(id, projectName, projectVersion, projectIcon, projectDir) {
    console.log("addProjectWidget");
    
    var widgetId = "projectWidget_" + id.toString();
    var iconId = "icon_" + id.toString();
    var projectStatusId = "project-status_" + id.toString();
    
    var widgetDOM = "";
    widgetDOM += "<div style='display: table; border-bottom: 1px solid black; width: 100%; height: 130px;' id='" + widgetId + "'>";
    
    widgetDOM += "<div style='display: table-row;'>";
    
    // display the project icon
    widgetDOM += "<div style='float:left; display: table-cell;'><img width='128' height='128' src='" + projectIcon + "'></div>";
    
    // display project info
    widgetDOM += "<div style='float:left; display: table-cell; height: 100%;'>";
    widgetDOM += projectName + "<br>";
    widgetDOM += projectVersion + "<br></div>";
    
    // checkbox indicator used for indicating active project
    widgetDOM += "<div class='status-field' style='float: right;'>";
    widgetDOM += "<input type='checkbox' disabled='true' id='" + projectStatusId + "' />";
    widgetDOM += "<label for='project-status' id='project-status-label'>&nbsp;</label>";
    widgetDOM += "</div>";

    widgetDOM += "</div>";  // row 1
    
    // display project directory
    widgetDOM += "<div style='display: table-row;'>";
    widgetDOM += "<div style='width:350px; overflow:hidden; white-space: nowrap;'>" + projectDir + "</div>"; 
    widgetDOM += "</div>";  // row 2
    
    widgetDOM += "</div>";  // table
    
    global.jQuery("#drop_zone").append(widgetDOM);
    
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
            global.jQuery("#" + widgetId).css("background-color", "#C4C4C4");
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
    var iconId = "icon_" + id.toString(); 
    var projectStatusId = "project-status_" + id.toString();
    global.jQuery("#" + activeWidget.widgetId).css("background-color", "#C4C4C4");                                                                                  
    global.jQuery("#" + iconId).text("rectangleoutline");
    global.jQuery("#" + projectStatusId).prop("checked", true);

    // turn on the server
    global.jQuery("#server-status").prop("checked", true);
    toggleServerStatus();
       
    // reset the previous active widget
    if (previousActiveWidget) {
        var prevIconId = "icon_" + previousActiveWidget.projectId.toString(); 
        var prevProjectStatusId = "project-status_" + previousActiveWidget.projectId.toString();
        global.jQuery("#" + prevProjectStatusId).prop("checked", false);
        global.jQuery("#" + previousActiveWidget.widgetId).css("background-color", "");
        global.jQuery("#" + prevIconId).text("arrowright");        
    }
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
                    global.jQuery("#server-status-label").text("http://" + data.address + ":" + data.port);
                    global.jQuery("#log").prop("disabled", false);
                })
                .on("error", function(e) {
                    console.log(e.message);
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
         
         global.jQuery("#server-status-label").text("server is offline");
         global.jQuery("#log").prop("disabled", true);
     }
}