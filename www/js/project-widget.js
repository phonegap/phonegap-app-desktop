function addProjectWidget(projectName, projectVersion, projectIcon) {
    var widgetDOM = "";
    
    widgetDOM += "<div style='display: table; border: 1px solid black;'>";
    widgetDOM += "<div style='display: table-row;'>";
    
    // TODO: display the icon from config.xml
    // widgetDOM += "<div style='float:left; width: 20%; display: table-column;'><span class='icomatic'>folder</span></div>";
    widgetDOM += "<div style='float:left; display: table-column;'><img src='" + projectIcon + "'></div>";
    widgetDOM += "<div style='float:left; display: table-column;'>";
    widgetDOM += "Project Name: " + projectName + "<br>";
    widgetDOM += "Project Version: " + projectVersion + "</div>";  
    widgetDOM += "</div>";  // row
    widgetDOM += "</div>";  // table
    
    global.jQuery("#drop_zone").append(widgetDOM);
}