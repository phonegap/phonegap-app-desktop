function toggleServerStatus(projDir) {
    if (global.isServerRunning) {
        // if server is currently running, stop it before opening a new server instance
        setServerOffline();
    }

    if (projDir.length > 0) {
        localStorage.projDir = projDir;
    } else {
        if (projDir.length <= 0) {
            projDir = localStorage.projDir;
        }
    }

    fs.exists(projDir + buildPathBasedOnOS("/www"), function(exists) {
        if (exists) {
            process.chdir(projDir);

            global.pgServer.listen({ browser: true, phonegap: require('phonegap'), port: localStorage.portNumber })
            .on("complete", function(data) {

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

                widgetServerOnlineState(global.activeWidget.projectId);

                $("#log").prop("disabled", false);
            })
            .on("error", function(e) {
                console.log(e.message);
                $("#server-status-label").text(e.message);

                $("#status-field").css("background-color", "rgb(153,153,153)");
                widgetSeverOfflineState(global.activeWidget.projectId);

            })
            .on("log", function(status, url) {
                $("#serverLog").append(status + " " + url + "\n");
            });
        } else {
            var errMsg = "an existing project doesn't exist in this folder";
            console.log(errMsg);
            $("#server-status").prop("checked", false);
            $("#log").prop("disabled", true);
        }
    });
}

function setServerOffline() {
    global.server.close();
    global.isServerRunning = false;
}

function serverOfflineState() {
    $("#status-field").css("background-color", "rgb(153,153,153)");
    $("#server-status-label").text("Server is offline");
    $("#status-field").show();
}

function serverOnlineState(data, label) {
    $("#status-field").show();
    $("#status-field").css("background-color", "rgb(43,169,77)");
    $("#server-status-label").text(label);
    $("#settings-ip").text(data.address + ":");
}

function multipleServersOnlineState(data) {
    // data.addresses to access all IP addresses found
    var ipAddressesFound = data.addresses.length;
    var ipAddresses = "<div style='height: 15px;'></div>";
    var ipListHeight = 30;

    for (var address of data.addresses) {
        ipAddresses += "<div style='height: 20px; padding-top: 2px; padding-bottom: 2px;'>"
        ipAddresses += "http://";
        ipAddresses += address;
        ipAddresses += ":";
        ipAddresses += data.port;
        ipAddresses += "</div>";
    }

    ipAddresses += "<div style='height: 15px;'></div>";

    if (ipAddressesFound > 5) {
        ipListHeight = ipListHeight + (24 * 5);
    } else {
        ipListHeight = ipListHeight + (24 * ipAddressesFound);
    }

    console.log(ipListHeight);

    var ipListTop = 600 - ipListHeight;
    console.log(ipListTop);

    var statusFieldTop = ipListTop - 50;
    console.log(statusFieldTop);

    $("#ip-list").append(ipAddresses);
    $("#ip-list").css("height", ipListHeight);

    $("#ip-holder").css("top", ipListTop);
    $("#ip-holder").show();

    // set the server status bar
    $("#status-field").css("top", statusFieldTop);
    serverOnlineState(data, "Server is running on multiple IP addresses:");

    $("#drop_zone").css("height", statusFieldTop);

}
