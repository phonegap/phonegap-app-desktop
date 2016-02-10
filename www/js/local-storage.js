function generateId() {
    // used to generate Ids for user & projects
    var id = uuid.v1();
    return id;
}

function getUserId() {
    var id = null;
    if (!localStorage.userId) {
        localStorage.userId = generateId();
    }
    id = localStorage.userId;
    return id;
}

function addProject(projName, projVersion, iconPath, projDir) {
    var id = generateId();
    var projectObj = {};
    projectObj.id = id;
    projectObj.projDir = projDir;
    projectObj.projName = projName;

    if (localStorage.projects) {
        // retrieve exsiting projects to appending a new project
        var projects = JSON.parse(localStorage.projects);
        projects.push(projectObj);
        localStorage.projects = JSON.stringify(projects);
    } else {
        var myProjects = new Array();
        myProjects.push(projectObj);
        localStorage.projects = JSON.stringify(myProjects);
    }

    // render newly added project to GUI & set it as the active widget
    addProjectWidget(id, projName, projVersion, iconPath, projDir);
    setActiveWidget(id, projDir);
}

function getProjects() {
    if (localStorage.projects) {

        var projects = JSON.parse(localStorage.projects);
        var index = 0;

        $.each(projects, function(idx, project) {
            var projDir = project.projDir;
            var id = project.id;

            fs.exists(projDir, function(exists) {
                if (exists) {
                    if (index === 0) {
                        global.firstProjectDir = projDir;
                    }
                    getProjectConfig(id, projDir, idx);
                    index++;
                } else {
                    // project folder not found...store the IDs to be removed from localStorage
                    missingId(id);
                }
            });
        });

        setTimeout(removeMissingProjects, 1000);

    }
}

function missingId(id) {
    global.missing.push(id);
}

function removeMissingProjects() {
    var projects = JSON.parse(localStorage.projects);
    var index = projects.length;
    var missing = global.missing;

    for (var j=0;j<missing.length;j++) {

        var currentId = missing[j];

        for (var i=0;i<index;i++) {
            var id = projects[i].id;
            if (id == currentId) {
                projects.splice(i, 1);
                index = projects.length;
                break;
            }
        }
    }

    localStorage.projects = JSON.stringify(projects);
    trackProjectsLoaded(projects.length);

    // if there are still projects remaining, set an active widget
    if (index > 0) {
        setActiveWidget(projects[0].id, projects[0].projDir);
    }

}

function getProjectConfig(id, projDir, i) {

    var oldPathToConfigFile = projDir + buildPathBasedOnOS("/www/config.xml");
    var newPathToConfigFile = projDir + buildPathBasedOnOS("/config.xml");

    fs.readFile(newPathToConfigFile, 'utf8', function(err, data) {
        if (err) {
            fs.readFile(oldPathToConfigFile, 'utf8', function(err, data) {
                if (err) {
                    console.log("config.xml not found in: " + oldPathToConfigFile + " or " + newPathToConfigFile);
                    displayErrorMessage("config.xml not found in: " + oldPathToConfigFile + " or " + newPathToConfigFile);
                } else {
                    parseConfigForRendering(data, id, projDir, i);
                }
            });
        } else {
            parseConfigForRendering(data, id, projDir, i);
        }
    });

}

function parseConfigForRendering(data, id, projDir, i) {
    console.log("parseConfigForRendering");
    var iconPath = projDir + buildPathBasedOnOS("/www/");

    $.xmlDoc = $.parseXML(data);
    $.xml = $($.xmlDoc);

    // get the project name
    var projectName = $.xml.find("name").text();

    // get the project version
    var projectVersion = $.xml.find("widget").attr("version");

    // get the app icon
    var projectIcon = $.xml.find("icon").attr("src");
    iconPath += projectIcon;

    addProjectWidget(id, projectName, projectVersion, iconPath, projDir);

    if (global.firstProjectDir === projDir) {
        toggleServerStatus(projDir);
    }
}

function removeProjectById(currentId) {

    // retrieve exsiting projects to find the project to remove
    var projects = JSON.parse(localStorage.projects);
    var index = projects.length;

    for (var i=0;i<index;i++) {

        var id = projects[i].id;

        if (id == currentId) {
            projects.splice(i, 1);
            break;
        }
    }

    localStorage.projects = JSON.stringify(projects);

    index = projects.length;

     // set new active widget if there are still projects, otherwise disable the remove button
    if (index > 0) {
        setActiveWidget(projects[0].id, projects[0].projDir);
        toggleServerStatus(projects[0].projDir);
    } else {
        disableMinusButton();
        $("#status-field").hide();
        $("#guide-add").show();
        serverOfflineState();
    }

}

function updateProjectNameInLocalStorage(id, projectName) {
    if (localStorage.projects) {
        var projects = JSON.parse(localStorage.projects);

        for (var i = 0; i < projects.length; i++) {
            if (id === projects[i].id) {
                projects[i].projName = projectName;
                break;
            }
        }

        localStorage.projects = JSON.stringify(projects);
    }
}
