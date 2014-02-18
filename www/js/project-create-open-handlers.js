function createProject(e) {
    console.log("createProject handler");
    global.createClicked = true;
    // get the user to select a directory
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

    global.jQuery("#projectFolder").text("Project folder: " + localStorage.projDir);

    console.log(global.createClicked);
    if(global.createClicked) {
        // create new project
        global.createClicked = false;
        create();
    } else {
        // parse config.xml of an existing project
        parseProjectConfig();
    }
    
    global.jQuery("#createOpenProjectOverlay").hide();  
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
              // handle error
              console.log(e.message);
              alert(e.message);
          })                 
          .on("complete", function(data) {
              console.log("created project at:" + data.path);
              //alert("created project at:" + data.path);
              
              // parse config.xml of newly created project
              parseProjectConfig();
          });
}

function parseProjectConfig() {
    
    var filename = localStorage.projDir + "/www/config.xml";
    
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;

        var iconPath = localStorage.projDir + "/www/"

        global.jQuery.xmlDoc = global.jQuery.parseXML(data);
        global.jQuery.xml = global.jQuery(global.jQuery.xmlDoc);
        
        // get the project name
        var projectName = global.jQuery.xml.find("name").text();
        console.log("project name: " + projectName);
        
        // get the project version
        var projectVersion = global.jQuery.xml.find("widget").attr("version");
        console.log("project version: " + projectVersion);
        
        // get the app icon
        var projectIcon = global.jQuery.xml.find("icon").attr("src");
        iconPath += projectIcon;
        console.log("project icon path: " + iconPath);
        
        addProjectWidget(projectName, projectVersion, iconPath);
        addProject(projectName, projectVersion, iconPath);
    });
    
}
