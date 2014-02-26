function addProjectOverlay(evt) {
    console.log("addProjectOverlay - plus click handler");
    global.jQuery("#createOpenProjectOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function removeProjectOverlay(evt) {
    console.log("removeProjectOverlay - minus click handler");
    global.jQuery("#removeProjectOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function settingsOverlay(evt) {
    console.log("settingsOverlay - settings click handler");
    alert("not implemented yet");
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
                        global.jQuery("#server-status-label").text("http://" + data.address + ":" + data.port);
                        global.jQuery("#log").prop("disabled", false);
                    })
                    .on("error", function(e) {
                        console.log(e.message);
                    })
                    .on("log", function(status, url) {
                        console.log(status, url);
                        global.jQuery("#serverLog").append(status + " " + url + "\n");
                    });
             } else {
                 var errMsg = "an existing project doesn't exist in this folder";
                 console.log(errMsg);      
                 global.jQuery("#server-status").prop("checked", false);
             }
         });
                  
     } else {
         console.log("server stopped");
         global.jQuery("#server-status-label").text("server is offline");
         global.jQuery("#log").prop("disabled", true);
     }
}

function toggleLog(evt) {
    console.log("toggleLog - log click handler");    
    if (global.jQuery("#serverLogOverlay").is(":visible")) {
        global.jQuery("#serverLogOverlay").hide();
        global.jQuery("#overlay-bg").hide();
    } else {
        global.jQuery("#serverLogOverlay").show();
        global.jQuery("#overlay-bg").show();
    }
}