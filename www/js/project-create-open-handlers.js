function createProject(e) {
    console.log("createProject handler");

    var projectName = global.jQuery("#projectName").val();
    var projectPath = global.jQuery("#projectPath").val();
 
    if(projectName.length > 0 && projectPath.length > 0) {
        localStorage.projDir = projectPath + "/" + projectName;
        create();
    } else {
        displayErrorMessage("new project requires a project name and a project path");
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
        global.jQuery("#projectPath").val(localStorage.projDir);
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

function create() {
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

              // parse config.xml of newly created project
              parseProjectConfig();
              
              global.jQuery("#overlay-bg").hide();
              hideAddNewProjectOverlay();
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
