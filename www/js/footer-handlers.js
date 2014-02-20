function addProjectOverlay(evt) {
    console.log("addProjectOverlay - plus click handler");
    global.jQuery("#createOpenProjectOverlay").show();
}

function removeProjectOverlay(evt) {
    console.log("removeProjectOverlay");
    // TODO: we should probably prompt the user to confirm that they want to delete the project
    removeProjectWidget();
}

function toggleServerStatus(evt) {
    console.log("toggleServerStatus");
    
     if (global.jQuery("#server-status").is(":checked")) {
         console.log("server started");
         
         fs.exists(localStorage.projDir + "/www", function(exists) {
             if (exists) {
                 process.chdir(localStorage.projDir);
                 console.log("project opened at: " + localStorage.projDir);                     
                 global.pgServer.listen({ port: localStorage.portNumber })
                    .on("complete", function(data) {
                        console.log("server started at: " + data.address + ":" + data.port);
                        global.server = data.server;
                        global.jQuery("#server-status-label").text("Server is online");
                    })
                    .on("error", function(e) {
                        console.log(e.message);
                    })
                    .on("log", function(status, url) {
                        console.log(status, url);
                    });
             } else {
                 var errMsg = "an existing project doesn't exist in this folder";
                 console.log(errMsg);      
                 global.jQuery("#server-status").prop("checked", false);
             }
         });
                  
     } else {
         console.log("server stopped");
         global.jQuery("#server-status-label").text("Server is offline");
     }
}