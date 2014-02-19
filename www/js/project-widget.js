function addProjectWidget(id, projectName, projectVersion, projectIcon) {
    console.log("addProjectWidget");
    console.log("id: " + id);
    console.log("name: " + projectName);
    console.log("version: " + projectVersion);
    console.log("projectIcon: " + projectIcon);
    
    var widgetId = "projectWidget" + id.toString();
    var buttonId = "button" + id.toString();
    
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
        // get widgetId
        alert(global.jQuery("#" + widgetId).attr("id"));
        // TODO: when a project is clicked, we need to set widget to selected state -> this will provide us with the Id for removing the project
    });
}