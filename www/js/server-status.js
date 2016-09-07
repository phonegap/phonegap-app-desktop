function toggleServerStatus(projDir) {
   console.log("TOGGLE SERVER - is server running? " + global.isServerRunning)
    if (global.isServerRunning) {
        // if server is currently running, stop it before opening a new server instance
        setServerOfflineThenOnline(projDir);
    } else {
        setServerOnline(projDir);
    }
}

var onLogCallback = function appendToServerLog(status, url) {
    //$("#serverLog").append(status + " " + url + "\n");
    var serverLog = $("#serverLog");
    var args = Array.prototype.slice.call(arguments);
    var message = args.join(' ');
    if (serverLog.val() !== undefined) {
        serverLog.val(serverLog.val() + message + "\n");
    } else {
        serverLog.val(message + "\n");
    }
}

function setServerOnline(projDir) {
    console.log("Serving project - " + projDir)
    if (projDir != undefined && projDir.length > 0) {
        localStorage.projDir = projDir;
    } else {
        projDir = localStorage.projDir;        
    }

    fs.exists(projDir + buildPathBasedOnOS("/www"), function(exists) {
        if (exists) {
            process.chdir(projDir);

            // need to change this for browser platform because of Cordova Issue: CB-5687
            process.env.PWD = projDir;

            global.phonegap.serve({ browser: true, isDesktop: true, phonegap: require('phonegap'), port: localStorage.portNumber }, function(e, data) {
                var ipAddressesFound = data.addresses.length;
                trackNumIPsFound(ipAddressesFound);

                global.server = data.server;
                global.isServerRunning = true;

                if (ipAddressesFound > 1) {
                    multipleServersOnlineState(data);
                } else {
                    $("#status-field").css("top", "550px");
                    serverOnlineState(data, "Server is running on http://" + data.addresses[0] + ":" + data.port);
                }

                // check for global.activeWidget; on initial load of app this is not set
                if (global.activeWidget) {
                    widgetServerOnlineState(global.activeWidget.projectId);
                }

                $("#log").prop("disabled", false);
            })
            .on("error", function(e) {
                console.log(e.message);
                $("#server-status-label").html(e.message);

                $("#status-field").css("background-color", "rgb(153,153,153)");
                widgetServerOfflineState(global.activeWidget.projectId, global.activeWidget.widgetId);
            })
            .on("log", onLogCallback);
        } else {
            var errMsg = "an existing project doesn't exist in this folder";
            console.log(errMsg);
            $("#log").prop("disabled", true);
        }
    });
}

function setServerOffline() {
    global.server.closeServer(function() {
        global.isServerRunning = false;
        global.phonegap.removeListener("log", onLogCallback);
        console.log("server closed");
    });
}

function setServerOfflineThenOnline(projDir) {
    global.server.closeServer(function() {
        global.isServerRunning = false;
        global.phonegap.removeListener("log", onLogCallback);
        setServerOnline(projDir);
    });
}

function serverOfflineState() {
    $("#status-field").css("background-color", "rgb(153,153,153)");
    $("#server-status-label").html("Server is offline");
    $("#status-field").show();
}

function serverOnlineState(data, label) {
    var serverIP = data.address.toString() + ":" + data.port.toString();
    var ipAddressLink = "Server is running on ";
    ipAddressLink += "<a class='ip-link' onclick='openIPLink(\"" + serverIP + "\");'>";
    ipAddressLink += "http://" + serverIP;
    ipAddressLink += "</a>";

    $("#status-field").show();
    $("#status-field").css("background-color", "rgb(43,169,77)");

    //$("#server-status-label").text(label);
    $("#server-status-label").html(ipAddressLink);

    $("#settings-ip").text(data.address + ":");
}

function multipleServersOnlineState(data) {
    // data.addresses to access all IP addresses found
    var ipAddressesFound = data.addresses.length;
    var ipAddresses = "<div style='height: 15px;'></div>";
    var ipListHeight = 30;

    for (var address of data.addresses) {
        var serverIP = address.toString() + ":" + data.port.toString();
        ipAddresses += "<div style='height: 20px; padding-top: 2px; padding-bottom: 2px;'>";
        ipAddresses += "<a class='ip-link' onclick='openIPLink(\"" + serverIP + "\");'>";
        ipAddresses += "http://" + serverIP;
        ipAddresses += "</a>";
        ipAddresses += "</div>";
    }

    ipAddresses += "<div style='height: 15px;'></div>";

    if (ipAddressesFound > 5) {
        ipListHeight = ipListHeight + (24 * 5);
    } else {
        ipListHeight = ipListHeight + (24 * ipAddressesFound);
    }

    var ipListTop = 600 - ipListHeight;
    var statusFieldTop = ipListTop - 50;

    $("#ip-list").html(ipAddresses);
    $("#ip-list").css("height", ipListHeight);

    $("#ip-holder").css("top", ipListTop);
    $("#ip-holder").show();

    // set the server status bar
    $("#status-field").css("top", statusFieldTop);
    serverOnlineState(data, "Server is running on multiple IP addresses:");

    $("#drop_zone").css("height", statusFieldTop);
}

function multipleServersOfflineState() {
    $("#ip-holder").hide();
    $("#drop_zone").css("height", "550px");
    $("#status-field").css("top", "550px");
}
