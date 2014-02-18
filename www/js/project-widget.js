function addProjectWidget(id, projectName, projectVersion, projectIcon) {
    console.log("addProjectWidget");
    console.log("id: " + id);
    console.log("name: " + projectName);
    console.log("version: " + projectVersion);
    console.log("projectIcon: " + projectIcon);
    
    var widgetDOM = "";
    widgetDOM += "<div style='display: table; border: 1px solid black;'>";
    widgetDOM += "<div style='display: table-row;'>";
    widgetDOM += "<div style='float:left; display: table-column;'><img src='" + projectIcon + "'></div>";
    widgetDOM += "<div style='float:left; display: table-column;'>";
    widgetDOM += "Project Name: " + projectName + "<br>";
    widgetDOM += "Project Version: " + projectVersion + "</div>"; 
    widgetDOM += "<div style='float:right' display: table-column><button>start/stop</button></div>"; // TODO: add the start/stop project icon
    widgetDOM += "</div>";  // row
    widgetDOM += "</div>";  // table
    
    global.jQuery("#drop_zone").append(widgetDOM);
}