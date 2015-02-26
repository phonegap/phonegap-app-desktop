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

                         // run the new version & quit the old app
                         upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()],{});
                         gui.App.quit();
                     }
                 }, manifest);
             }
         }, manifest);        
    } else {
        gui.Shell.openExternal("https://github.com/phonegap/phonegap-app-desktop/releases");
    }
 
}