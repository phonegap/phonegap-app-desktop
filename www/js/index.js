var gui = require('nw.gui');
var win = gui.Window.get();   

// load file system module
var fs = require("fs");
var gaze = require("gaze");
var opener = require("opener"); 
var jsxml= require("node-jsxml");
var uuid = require("node-uuid");

var Namespace = jsxml.Namespace,
    QName = jsxml.QName,
    XML = jsxml.XML,
    XMLList = jsxml.XMLList;

win.setResizable(false);

/*
 1. Check the manifest for version (from your running "old" app).
 2. If the version is different from the running one, download new package to a temp directory.
 3. Unpack the package in temp.
 4. Run new app from temp and kill the old one (i.e. still all from the running app).
 5. The new app (in temp) will copy itself to the original folder, overwriting the old app.
 6. The new app will run itself from original folder and exit the process.
*/

var updater = require("node-webkit-updater");
var pkg = require("../package.json");
var upd = new updater(pkg);
var copyPath, execPath;



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
