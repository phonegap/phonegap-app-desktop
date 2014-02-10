function addProjectWidget(projectName, projectVersion) {
    var widgetDOM = "";
    
    widgetDOM += "<div>";
    widgetDOM += "<span class='icomatic'>folder</span>";
    widgetDOM += "Project Name: " + projectName + "<br>";
    widgetDOM += "Project Version: " + projectVersion + "<br>";
    widgetDOM += "</div>";
    
    global.jQuery("#drop_zone").append(widgetDOM);
}