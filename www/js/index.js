var gui = require('nw.gui');
var win = gui.Window.get();

// load dependencies module
var fs = require("fs");
var gaze = require("gaze");
var jsxml= require("node-jsxml");
var opener = require("opener");
var path = require("path");
var uuid = require("node-uuid");

var Namespace = jsxml.Namespace,
    QName = jsxml.QName,
    XML = jsxml.XML,
    XMLList = jsxml.XMLList;

win.setResizable(false);

/**
    Auto-updater code
*/
var updater = require("node-webkit-updater");
var pkg = require("./package.json");
var upd = new updater(pkg);
var copyPath1, execPath1;

if(gui.App.argv.length) {
    console.log("auto-updating");
    // in the original dir, overwrite the old app with the new version
    copyPath1 = gui.App.argv[0];
    execPath1 = gui.App.argv[1];

    // run the new version from the original dir (instead of the temp dir)
    upd.install(copyPath1, function(err) {
        if(!err) {
            console.log("run the newest version");
            //upd.run(execPath1, null);
            gui.Shell.openItem(execPath1);
            //gui.App.quit();
        }
    });
} else {
    // check manifest to see if version has been updated
    upd.checkNewVersion(function(error, newVersionExists, manifest) {
        if (!error && newVersionExists) {
            console.log("new version found");
            global.manifest = manifest;
            displayUpdateAvailablePrompt();
        } else {
            if (!newVersionExists) {
                console.log("latest version");
            }
        }
    });
}
/* End of Auto-updater code */

/**
    Menubar generation code, currently only works for Mac
*/
// valid return values: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
if (process.platform == 'darwin') {

    var menubar = new gui.Menu({'type':'menubar'});
    var file = new gui.Menu();
    var help = new gui.Menu();

    menubar.createMacBuiltin("PhoneGap", {hideEdit:true,hideWindow:true});

    win.menu = menubar;
    win.menu.append(new gui.MenuItem({ label: 'File', submenu: file }));

    // add menuItems for the File option
    menubar.items[menubar.items.length-1].submenu.append(new gui.MenuItem({
   	    label: "New Project",
   	    click: function () {
		    console.log("new project from menubar");
		    resetMinusButtonState();
		    // create a new project
            animateAddNewProjectOverlayEntry();
   	    }
    }));

    menubar.items[menubar.items.length-1].submenu.append(new gui.MenuItem({
   	    label: "Open Project",
   	    click: function () {
      	    console.log("open project from menubar");
      	    resetMinusButtonState();
		    // open an existing project
		    openProject();
   	    }
    }));

    win.menu.append(new gui.MenuItem({ label: 'Help', submenu: help }));

    // add menuItems for the Help option
    menubar.items[menubar.items.length-1].submenu.append(new gui.MenuItem({
   	    label: "Tutorials",
   	    click: function () {
   	        openTutorials();
   	    }
    }));

    menubar.items[menubar.items.length-1].submenu.append(new gui.MenuItem({
   	    label: "Report Issue",
   	    click: function () {
   	        openIssueTracker();
   	    }
    }));

    menubar.items[menubar.items.length-1].submenu.append(new gui.MenuItem({
   	    label: "Terms of Use",
   	    click: function () {
   	        openTermsOfUse();
   	    }
    }));

    menubar.items[menubar.items.length-1].submenu.append(new gui.MenuItem({
   	    label: "Privacy Policy",
   	    click: function () {
   	        openPrivacyPolicy();
   	    }
    }));

    console.log("menubar items: " + win.menu.items.length);

}
/* End of Menubar generation code */

win.show();

win.on("close", function () {
	console.log("window close handler");

    if (global.isServerRunning) {
        // if server is currently running, stop it before opening a new server instance
        setServerOffline();
    } else {
        localStorage.projDir = "";
        win.close(true);
    }

	global.server.on("close", function(e) {
	    localStorage.projDir = "";
	    win.close(true);
	});
});
