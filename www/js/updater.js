function displayUpdateAvailablePrompt() {
    global.jQuery("#updateOverlayTitle").text("Update Available");
    global.jQuery("#updateOverlayPrompt").text("A new version of the PhoneGap Desktop App is available.");
    global.jQuery("#updateNow").text("Update");
    global.jQuery("#updateOverlay").addClass("animated slideInDown");
    global.jQuery("#updateOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function displayInstallUpdatePrompt() {
    global.jQuery("#updateOverlayTitle").text("Update Downloaded");
    global.jQuery("#updateOverlayPrompt").text("Install the downloaded update and restart PhoneGap Desktop.");
    global.jQuery("#updateNow").text("Restart");
    global.jQuery("#updateOverlay").addClass("animated slideInDown");
    global.jQuery("#updateOverlay").show();
    global.jQuery("#overlay-bg").show();
}

function hideUpdateOverlay() {
    global.jQuery("#updateOverlay").removeClass("animated slideInDown");
    global.jQuery("#updateOverlay").addClass("animated slideOutUp");
    global.jQuery("#updateOverlay").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd onanimationend animationend", hideUpdateOverlayAnimationEnd);
}

function hideUpdateOverlayAnimationEnd() {
    global.jQuery("#updateOverlay").hide();
    global.jQuery("#updateOverlay").removeClass("animated slideOutUp");
}

function restartApp () {
    // run the new version & quit the old app
    console.log("restartApp");
    var newAppPath = global.newAppPath;
    var execPath = process.execPath.substr(0,process.execPath.search("PhoneGap\\.")-1);
    var copyPath = execPath;

    switch (determineOperatingSystem()) {
        case 'darwin':
            copyPath = copyPath + "/PhoneGap.app";
            break;
        case 'win32':
            // TODO: determine correct path for windows
            // copyPath = ?????;
            break;
    }

    upd.runInstaller(newAppPath, [copyPath, execPath],{});
    gui.App.quit();
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
