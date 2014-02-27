function addProjectWidget(id, projectName, projectVersion, projectIcon, projectDir) {
    console.log("addProjectWidget");
    
    var widgetId = "projectWidget_" + id.toString();
    var iconId = "icon_" + id.toString();
    
    var widgetDOM = "";
    widgetDOM += "<div style='display: table; border-bottom: 1px solid black; width: 100%;' id='" + widgetId + "'>";
    widgetDOM += "<div style='display: table-row;'>";
    widgetDOM += "<div style='float:left; display: table-cell;'><img src='" + projectIcon + "'></div>";
    widgetDOM += "<div style='float:left; display: table-cell;'>";
    widgetDOM += "Name: " + projectName + "<br>";
    widgetDOM += "Version: " + projectVersion + "</div>"; 
    widgetDOM += "<div style='float:right; display: table-cell;'><span id='" + iconId + "' class='icomatic'>arrowright</span></div>";
    widgetDOM += "</div>";  // row
    widgetDOM += "</div>";  // table
    
    global.jQuery("#drop_zone").append(widgetDOM);
    
    global.jQuery("#" + widgetId).on("click", function() {
        var temp = global.jQuery("#" + widgetId).attr("id").split("_");
        var id = temp[1];
        setActiveWidget(id, projectDir);       
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
    
    // TODO: we should consider updating the widget's background colour to indicate the active widget
    // update GUI to display details of the active widget         
    var iconId = "icon_" + id.toString(); 
    global.jQuery("#" + activeWidget.widgetId).css("background-color", "#C4C4C4");                                                                                  
    global.jQuery("#" + iconId).text("rectangleoutline");     
    global.jQuery("#projectFolder").text("Current project folder: " + localStorage.projDir); 
    
    // reset the previous active widget
    if (previousActiveWidget) {
        var prevIconId = "icon_" + previousActiveWidget.projectId.toString(); 
        global.jQuery("#" + previousActiveWidget.widgetId).css("background-color", "");
        global.jQuery("#" + prevIconId).text("arrowright");        
    }
}

function removeProjectWidget() {
    console.log("removeProjectWidget - id: " + global.activeWidget.projectId);
    global.jQuery("#" + global.activeWidget.widgetId).remove();
    removeProjectById(global.activeWidget.projectId);
}