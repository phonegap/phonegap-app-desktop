function generateId() {
    // used to generate Ids for user & projects
    var id = uuid();
    return id;
}

function getUserId() {
    // check the configstore to see if clientId exists
    var key = 'clientId';
    if (!conf.has(key)) {
        conf.set(key, generateId());
    }
    return conf.get(key);
}


function getSessionId() {
    var key = 'sessionId';
    var sessionId = generateId();
    if (conf.has(key)) {
        sessionId = conf.get(key);
    } else {
        conf.set(key, sessionId);
    }
    return sessionId;
}

function getLastSelectedProjectPath() {
    var projectPath = "Please choose a local path";
    if (localStorage.projectPath) {
        projectPath = localStorage.projectPath;
    }
    return projectPath;
}

function setLastSelectedProjectPath(projectPath) {
    // Set to the parent of the last created project
    projectPath = projectPath.substring(0,projectPath.lastIndexOf('/'));
    localStorage.projectPath = projectPath;
}

function addProject(projName, projVersion, iconPath, projDir) {
    var id = generateId();
    var projectObj = {};
    projectObj.id = id;
    projectObj.projDir = projDir;
    projectObj.projName = projName;
    var projects = [];

    if (localStorage.projects) {
        // retrieve exsiting projects to appending a new project
        projects = JSON.parse(localStorage.projects);
    }

    projects.push(projectObj);
    projects.sort(function(a, b) {
        return a["projName"].toUpperCase().localeCompare(b["projName"].toUpperCase());
    })
    localStorage.projects = JSON.stringify(projects);

    // Store the project folder so we can access it when we toggle the server status for the newly added project.
    // The toggle will happen when the overlay animation ends to avoid janky UI (see the sidebar-handlers.js)
    // rather than here like it used to.
    global.projDir = projDir;

    // Render newly added project to GUI & set it as the active widget
    // Have to pass in the previous item id so we can add it into the list at the right spot
    // if there is one. Could get moved into the 1st location because of alpha but there are others so we need to insert it
    // first in widget
    function getCurrentProj(obj) {
        return obj["projName"] === projectObj.projName;
    }
    var prevProjID = -1;
    var currentProjIndex = projects.findIndex(getCurrentProj);
    if (currentProjIndex > 0) {
        prevProjIndex = currentProjIndex-1;
        prevProjID = projects[prevProjIndex].id;
    }
    else if (currentProjIndex==0 && projects.length > 0) {
        // It's getting added to top of list so don't need prev proj id
        prevProjID = 0;
    }

    addProjectWidget(id, projName, projVersion, iconPath, projDir, prevProjID);
    setActiveWidget(id, projDir);
}

function getProjects() {
    if (localStorage.projects) {

        var projects = JSON.parse(localStorage.projects);
        var index = 0;

        projects.sort(function(a, b) {
            return a["projName"].toUpperCase().localeCompare(b["projName"].toUpperCase());
        })

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

    $.xmlDoc = $.parseXML(data);
    $.xml = $($.xmlDoc);

    // get the project name
    var projectName = $.xml.find("name").text();

    // get the project version
    var projectVersion = $.xml.find("widget").attr("version");

    // get the app icon
    var iconPath = path.join(projDir, findIconPath($.xml.find("icon")));

    setTimeout(function() { addProjectWidget(id, projectName, projectVersion, iconPath, projDir); }, 0)


    if (global.firstProjectDir === projDir) {
        toggleServerStatus(projDir);
    }
    var removeMissingProjectsTimeout = setTimeout(removeMissingProjects, 1000);
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

    // if remove active project, close watcher and reset global
    if (global.activeWidget && currentId === global.activeWidget.projectId) {
        global.activeWidget.watcher.close();
        global.activeWidget = undefined;
    }

    // disable the remove button
    // setting new active widget is handled once user is done removing projects
    if (index === 0) {
        disableMinusButton();
        $("#status-field").hide();
        $("#guide-add").show();
        if (global.isServerRunning) {
            setServerOffline();
        }
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
