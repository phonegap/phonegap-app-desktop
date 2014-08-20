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
        if(!projectExists(localStorage.projDir)) {

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
            displayErrorMessage("project already exists in the selected folder");
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
    } else {
        if (global.jQuery("#projectDirectory").val().length > 0) {
            // open existing project workflow
            parseProjectConfig();
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
        
            // update project name
            var projName = projectName;
            global.jQuery.xml.find("name").text(projName);
            
            // update project id
            global.jQuery.xml.find("widget").attr("id", projectId);
        
            // get the project version
            var projVersion = global.jQuery.xml.find("widget").attr("version");
        
            // get the app icon
            var projectIcon = global.jQuery.xml.find("icon").attr("src");
            iconPath += projectIcon;
            
            //var serializer = new XMLSerializer();
            //var contents = serializer.serializeToString(global.jQuery.xmlDoc);
            
            // write the user entered project name & project id to the config.xml file
            //fs.writeFile(filename, contents, {encoding: 'utf8'}, function (err, data) {
            //    if (err) {
                    // throw err
            //    } else {
                    // check if the project exists in PG-GUI's localstorage before adding
                    if(!projectExists(localStorage.projDir)) {
                        addProject(projName, projVersion, iconPath, localStorage.projDir);       
                    } else {
                        displayErrorMessage("project already exists");
                    }                    
            //    }
            //});
        }
    });    
}

function parseProjectConfig() {
    
    var filename = localStorage.projDir + "/www/config.xml";
    
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            //throw err;
            displayErrorMessage("Selected folder doesn't contain a config.xml file");
        } else {
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
            if(!projectExists(localStorage.projDir)) {
                addProject(projectName, projectVersion, iconPath, localStorage.projDir);       
            } else {
                displayErrorMessage("project already exists");
            }
        }
    });    
}

function projectExists(projDir) {
    
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
