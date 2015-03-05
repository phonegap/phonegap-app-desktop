function displayUpdateAvailablePrompt() {
    global.jQuery("#updateOverlayTitle").text("Update Available");
    global.jQuery("#updateOverlayPrompt").text("A new version of the PhoneGap Desktop App is available.");
    global.jQuery("#updateNow").text("Update");
    global.jQuery("#updateOverlay").show();
}

function displayInstallUpdatePrompt() {
    global.jQuery("#updateOverlayTitle").text("Update Downloaded");
    global.jQuery("#updateOverlayPrompt").text("Install the downloaded update and restart PhoneGap Desktop.");
    global.jQuery("#updateNow").text("Restart");
    global.jQuery("#updateOverlay").show();   
}

function hideUpdateOverlay() {
    global.jQuery("#updateOverlay").hide();
}

function restartApp () {
    // run the new version & quit the old app
    var newAppPath = global.newAppPath;
    upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()],{});
    gui.App.quit();    
}

function updateApp() {

    var manifest = global.manifest;
    
    if (manifest) {
        // if new version found, download new package to a temp dir
         upd.download(function(error, filename) {
             if (!error) {
                 console.log("downloading new version");

                 // unpack new package in temp dir
                 upd.unpack(filename, function(error, newAppPath) {
                     if (!error) {
                         console.log("unpack & run the new version");

                         console.log("appPath: " + upd.getAppPath());
                         console.log("execPath: " + upd.getAppExec());
                         
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