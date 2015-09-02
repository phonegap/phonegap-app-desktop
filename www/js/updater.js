function displayUpdateAvailablePrompt() {
    $("#updateOverlayTitle").text("Update Available");
    $("#updateOverlayPrompt").text("A new version of the PhoneGap Desktop App is available.");
    $("#updateNow").text("Update");
    $("#updateOverlay").addClass("animated slideInDown");
    $("#updateOverlay").show();
    $("#overlay-bg").show();
}

function displayInstallUpdatePrompt() {
    $("#updateOverlayTitle").text("Update Downloaded");
    $("#updateOverlayPrompt").text("Install the downloaded update and restart PhoneGap Desktop.");
    $("#updateNow").text("Restart");
    $("#updateOverlay").addClass("animated slideInDown");
    $("#updateOverlay").show();
    $("#overlay-bg").show();
}

function hideUpdateOverlay() {
    $("#updateOverlay").removeClass("animated slideInDown");
    $("#updateOverlay").addClass("animated slideOutUp");
    $("#updateOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", hideUpdateOverlayAnimationEnd);
}

function hideUpdateOverlayAnimationEnd() {
    $("#updateOverlay").hide();
    $("#updateOverlay").removeClass("animated slideOutUp");
}

function restartApp () {
    // run the new version & quit the old app
    console.log("restartApp");
    var newAppPath = global.newAppPath;
    var execPath = process.execPath.substr(0,process.execPath.search("PhoneGap\\.")-1);
    var copyPath = execPath;

    switch (determineOperatingSystem()) {
        case 'darwin':
            copyPath = execPath + "/PhoneGap.app";

            console.log("newAppPath: " + newAppPath);
            console.log("execPath: " + execPath);
            console.log("copyPath: " + copyPath);

            upd.runInstaller(newAppPath, [copyPath, execPath],{});// this line crashes windows...
            gui.App.quit();
            break;
        case 'win32':
            // TODO: determine correct path for windows
            // execPath = execPath + "\\";
            // copyPath = execPath;
            break;
    }

}

function updateApp() {

    var manifest = global.manifest;

    console.log("manifest: " + JSON.stringify(manifest));

    if (manifest) {
        // if new version found, download new package to a temp dir
         upd.download(function(error, filename) {
             if (!error) {
                 console.log("downloading new version");

                 // unpack new package in temp dir
                 upd.unpack(filename, function(error, newAppPath) {
                     if (!error) {
                         console.log("unpack & run the new version");
                         global.newAppPath = newAppPath;
                         displayInstallUpdatePrompt();
                     }
                 }, manifest);
             }
         }, manifest);
    } else {
        gui.Shell.openExternal("https://github.com/phonegap/phonegap-app-desktop/releases");
    }
}
