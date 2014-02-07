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
        global.createClicked = false;
        create();
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
              alert("created project at:" + data.path);
          });
}