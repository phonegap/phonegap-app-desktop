function generateId() {
    var id = new Date().getTime();
    return id;
}

function addProject(projName, projVersion, iconPath, projDir) {
    var id = generateId();
    var projectObj = {};
    projectObj.id = id;
    projectObj.projDir = projDir;

    if (localStorage["projects"]) {
        // retrieve exsiting projects to appending a new project
        var projects = JSON.parse(localStorage["projects"]);        
        projects.unshift(projectObj);      
        localStorage["projects"] = JSON.stringify(projects);   
        console.log(JSON.stringify(projects));    
    } else {
        var myProjects = new Array();
        myProjects.push(projectObj);        
        localStorage["projects"] = JSON.stringify(myProjects);
        console.log(JSON.stringify(myProjects));
    }

    // render newly added project to GUI & set it as the active widget
    addProjectWidget(id, projName, projVersion, iconPath, projDir);
    setActiveWidget(id, projDir);
}

function getProjects() {
    if (localStorage["projects"]) {
        var projects = JSON.parse(localStorage["projects"]);
        var index = projects.length;
        
        console.log(JSON.stringify(projects));
        
        for (var i=0;i<index;i++) {
            
            var id = projects[i].id;
            var projDir = projects[i].projDir
            
            getProjectConfig(id, projDir, i);
        }
    }  
}

function getProjectConfig(id, projDir, i) {
    var filename = projDir + "/www/config.xml";

    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;

        var iconPath = projDir + "/www/"

        global.jQuery.xmlDoc = global.jQuery.parseXML(data);
        global.jQuery.xml = global.jQuery(global.jQuery.xmlDoc);

        // get the project name
        var projectName = global.jQuery.xml.find("name").text();

        // get the project version
        var projectVersion = global.jQuery.xml.find("widget").attr("version");

        // get the app icon
        var projectIcon = global.jQuery.xml.find("icon").attr("src");
        iconPath += projectIcon;

        addProjectWidget(id, projectName, projectVersion, iconPath, projDir);
        if (i == 0) {
            setActiveWidget(id, projDir);            
        }
    });
}
