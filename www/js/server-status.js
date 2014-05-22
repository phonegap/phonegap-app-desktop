function toggleServerStatus() {
    console.log("toggleServerStatus");

    if (global.isServerRunning) {
        global.server.close();
        global.isServerRunning = false;
    }

    fs.exists(localStorage.projDir + "/www", function(exists) {
        if (exists) {
            process.chdir(localStorage.projDir);
            console.log("server started");
            console.log("project opened at: " + localStorage.projDir);

            global.pgServer.listen({ port: localStorage.portNumber })
            .on("complete", function(data) {
                console.log("server started at: " + data.address + ":" + data.port);
                global.server = data.server;
                global.isServerRunning = true;
                serverOnlineState(data);
                setSettingsOverlayIP(data.address);
                global.jQuery("#log").prop("disabled", false);
            })
            .on("error", function(e) {
                console.log(e.message);
                global.jQuery("#server-status-label").text(e.message);
            })
            .on("log", function(status, url) {
                console.log(status, url);
                global.jQuery("#serverLog").append(status + " " + url + "\n");
            });
        } else {
            var errMsg = "an existing project doesn't exist in this folder";
            console.log(errMsg);      
            global.jQuery("#server-status").prop("checked", false);
            global.jQuery("#log").prop("disabled", true);
        }
    });
}

function serverOfflineState() {
    global.jQuery("#status-field").css("background-color", "rgb(153,153,153)");
    global.jQuery("#server-status-label").text("server is offline");  
}

function serverOnlineState(data) {
    global.jQuery("#status-field").css("background-color", "rgb(43,169,77)");
    global.jQuery("#server-status-label").text("Server is running on http://" + data.address + ":" + data.port);     
}