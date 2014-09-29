function createProject(e) {
    console.log("createProject handler");

    var projectPath = global.jQuery("#projectPath").text().trim();
    var projectName = global.jQuery("#projectName").val().trim();
    var projectId = global.jQuery("#project-id").val().trim();
    
    var isProjectPathEmpty = isProjectPathFieldEmpty(projectPath);
    var isProjectNameEmpty = isEmptyField(projectName);
    var isProjectIdEmpty = isEmptyField(projectId);

    hideProjectPathError();
    hideProjectNameError();
    hideProjectIdError();
    resetProjectCreationFormHeight();

    if(!isProjectIdEmpty && !isProjectNameEmpty && !isProjectPathEmpty) {
        localStorage.projDir = projectPath + "/" + projectName; 
        if(!projectExistsInLocalStorage(localStorage.projDir)) {

            var filename = projectPath + "/www/config.xml";

            fs.readFile(filename, 'utf8', function(err, data) {
                if (err) {
                    // if no www/config.xml found then create a new project
                    create(projectName, projectId);
                } else {
                    displayErrorMessage("Selected folder already contains an existing project");
                }
            });
            
        } else {
            displayErrorMessage("Selected folder already contains an existing project");
        }
    } else {

        if (isProjectPathEmpty) {
            // error with project path
            displayProjectPathError();           
        }
                
        if (isProjectNameEmpty) {
            // error with project name
            displayProjectNameError();
        }
        
        if (isProjectIdEmpty) {   
            // error with project id
            displayProjectIdError(); 
        }

        adjustProjectCreationFormHeight(isProjectPathEmpty, isProjectNameEmpty, isProjectIdEmpty);
    }    
}

function selectProjectPath(e) {
    global.createClicked = true;
    global.jQuery("#projectDirectory").trigger("click");
}

function openProject(e) {
    console.log("open project click handler");
    global.jQuery("#projectDirectory").trigger("click");
}

function selectDirectory(e) {
    console.log("change handler");
    console.log(global.jQuery("#projectDirectory").val());
    localStorage.projDir = global.jQuery("#projectDirectory").val();
    
    if(global.createClicked) {
        // new project creation workflow
        global.createClicked = false;
        global.jQuery("#projectPath").removeClass("overlay-form-item-description");
        global.jQuery("#projectPath").removeClass("italics");
        hideProjectPathError();
        global.jQuery("#projectPath").text(localStorage.projDir);
        global.jQuery("#projectName").focus();
        
        if(!projectExistsInLocalStorage(localStorage.projDir)) {

            var filename = projectPath + "/www/config.xml";

            fs.readFile(filename, 'utf8', function(err, data) {
                if (err) {
                    // assume that no www/config.xml means a project doesn't exist in selected local path
                    hideProjectPathError();
                    global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-project-path-error");
                } else {
                    // www/config.xml exists in selected local path, assume that there is an existing project in the local path
                    displayPhoneGapProjectInFolderError();
                }
            });
            
        } else {
            // selected local path already exists in local storage, assume that there is an existing project in the local path
            displayPhoneGapProjectInFolderError();
        }
                
    } else {
        if (global.jQuery("#projectDirectory").val().length > 0) {
            // open existing project workflow
            checkIfProjectConfigExists();
            global.jQuery("#overlay-bg").hide();
            hideAddCreateProjectOverlay();
            global.jQuery("#plus-icon").attr("src", "img/icons/normal/plus.svg");
        }
    } 
}

function create(projectName, projectId) {
    console.log("create();")
	var options = {};
       options.path = localStorage.projDir;
       options.version = global.pgVersion;
                   
       global.pgServer.create(options)
          .on("progress", function(state) {
              if (state.percentage) {
                  console.log("downloaded: " + state.percentage + "%");
              }
          })               
          .on("error", function(e) {
              console.log(e.message);
              displayErrorMessage(e.message);
          })                 
          .on("complete", function(data) {
              console.log("created project at:" + data.path);

              // update the config.xml of the newly created project with the project name & project id entered by the user
              updateConfig(projectName, projectId);
              
              global.jQuery("#overlay-bg").hide();
              hideAddNewProjectOverlay();
          });
}

function updateConfig(projectName, projectId) {
    var filename = localStorage.projDir + "/www/config.xml";
    
    fs.readFile(filename, {encoding: 'utf8'}, function(err, data) {
        if (err) {
            //throw err;
            displayErrorMessage("Selected folder doesn't contain a config.xml file");
        } else {
            var iconPath = localStorage.projDir + "/www/"

            global.jQuery.xmlDoc = global.jQuery.parseXML(data);
            global.jQuery.xml = global.jQuery(global.jQuery.xmlDoc); 
            
            var serializer = new XMLSerializer();
            var contents = serializer.serializeToString(global.jQuery.xmlDoc);    
            
            var xml = new XML(contents);
        
            // update project name
            var projName = projectName;
            xml.child("name").setValue(projName);
            
            // update project id                                     
            xml.attribute("id").setValue(projectId);
        
            // get the project version
            var projVersion = global.jQuery.xml.find("widget").attr("version");
        
            // get the app icon
            var projectIcon = global.jQuery.xml.find("icon").attr("src");
            iconPath += projectIcon;
            
            // write the user entered project name & project id to the config.xml file
            fs.writeFile(filename, xml, function (err, data) {
                if (err) {
                    // throw err
                } else {
                    // check if the project exists in PG-GUI's localstorage before adding
                    if(!projectExistsInLocalStorage(localStorage.projDir)) {
                        addProject(projName, projVersion, iconPath, localStorage.projDir);       
                    } else {
                        displayErrorMessage("project already exists");
                    }                    
                }
            });
        }
    });    
}

function checkIfProjectConfigExists() {
    
    var oldPathToConfigFile = localStorage.projDir + "/www/config.xml";
    var newPathToConfigFile = localStorage.projDir + "/config.xml";
        
    fs.readFile(newPathToConfigFile, 'utf8', function(err, data) {
        if (err) {
            fs.readFile(oldPathToConfigFile, 'utf8', function(err, data) {
                if(err) {
                    displayErrorMessage("Selected folder doesn't contain a config.xml file");
                } else {
                    parseProjectConfig(data);
                }
            });
        } else {
           parseProjectConfig(data); 
        }
    });    
}

function parseProjectConfig(data) {
    
    var iconPath = localStorage.projDir + "/www/"

    global.jQuery.xmlDoc = global.jQuery.parseXML(data);
    global.jQuery.xml = global.jQuery(global.jQuery.xmlDoc);

    // get the project name
    var projectName = global.jQuery.xml.find("name").text();

    // get the project version
    var projectVersion = global.jQuery.xml.find("widget").attr("version");

    // get the app icon
    var projectIcon = global.jQuery.xml.find("icon").attr("src");
    iconPath += projectIcon;

    // check if the project exists in PG-GUI's localstorage before adding
    if(!projectExistsInLocalStorage(localStorage.projDir)) {
        addProject(projectName, projectVersion, iconPath, localStorage.projDir);       
    } else {
        displayProjectExistsNotification();
    }    
}

function displayProjectExistsNotification() {
    setNotificationText("You tried to add a project that already exists. A duplicate has not been added.");
    displayNotification();
}

function projectExistsInLocalStorage(projDir) {
    
    var projectFound = false;
    
    if (localStorage["projects"]) {
        var projects = JSON.parse(localStorage["projects"]);
        var index = projects.length;
                 
        for (var i=0;i<index;i++) {
            if(projDir == projects[i].projDir) {
                projectFound = true;
                break;
            }
        }           
    }  
    
    return projectFound;
}

function folderExistsInFileSystem(projDir) {
  
    fs.exists(projDir, function(exists) {
        if (exists) {
            displayDuplicateProjectNameError();
            global.jQuery("#newProjectOverlay").addClass("new-project-overlay-duplicate-project-name-error");
        } else {
            hideDuplicateProjectNameError();
            global.jQuery("#newProjectOverlay").removeClass("new-project-overlay-duplicate-project-name-error");            
        }
    });
}
