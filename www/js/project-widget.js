function addProjectWidget(id, projectName, projectVersion, projectIcon) {
    console.log("addProjectWidget");
    console.log("id: " + id);
    console.log("name: " + projectName);
    console.log("version: " + projectVersion);
    console.log("projectIcon: " + projectIcon);
    
    var widgetId = "projectWidget_" + id.toString();
    var buttonId = "button_" + id.toString();
    
    var widgetDOM = "";
    widgetDOM += "<div style='display: table; border: 1px solid black;' id='" + widgetId + "'>";
    widgetDOM += "<div style='display: table-row;'>";
    widgetDOM += "<div style='float:left; display: table-column;'><img src='" + projectIcon + "'></div>";
    widgetDOM += "<div style='float:left; display: table-column;'>";
    widgetDOM += "Project Name: " + projectName + "<br>";
    widgetDOM += "Project Version: " + projectVersion + "</div>"; 
    widgetDOM += "<div style='float:right' display: table-column><button id='" + buttonId + "'>start/stop</button></div>"; // TODO: add the start/stop project icon
    widgetDOM += "</div>";  // row
    widgetDOM += "</div>";  // table
    
    global.jQuery("#drop_zone").append(widgetDOM);
    
    global.jQuery("#" + widgetId).on("click", function() {
        var temp = global.jQuery("#" + widgetId).attr("id").split("_");
        var id = temp[1];
        setActiveWidget(id);       
    });
}

function setActiveWidget(id) {
    // TODO: when a project is clicked, we need to set widget to selected state
    console.log("setActiveWidget - id: " + id);
    var activeWidget = {};
    activeWidget.widgetId = "projectWidget_" + id.toString();
    activeWidget.projectId = id;
    global.activeWidget = activeWidget;
}

function removeProjectWidget() {
    console.log("removeProjectWidget - id: " + global.activeWidget.projectId);
    global.jQuery("#" + global.activeWidget.widgetId).remove();
    removeProjectById(global.activeWidget.projectId);
}