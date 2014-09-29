var gui = require('nw.gui');
var win = gui.Window.get();   

// load file system module
var fs = require("fs");
var gaze = require("gaze");
var opener = require("opener"); 
var jsxml= require("node-jsxml");

var Namespace = jsxml.Namespace,
    QName = jsxml.QName,
    XML = jsxml.XML,
    XMLList = jsxml.XMLList;

var menubar = new gui.Menu({ type: 'menubar' });
var file = new gui.Menu();

win.setResizable(false);

win.menu = menubar;
win.menu.insert(new gui.MenuItem({ label: 'File', submenu: file }), 1);

// TODO: gotta be a better way of adding menu items by index number...
menubar.items[0].submenu.append(new gui.MenuItem({
   	label: "New Project",
   	click: function () {
		console.log("new project from menubar");
		resetMinusButtonState();
		// create a new project
        animateAddNewProjectOverlayEntry();
   	}
}));
menubar.items[0].submenu.append(new gui.MenuItem({
   	label: "Open Project",
   	click: function () {
      	console.log("open project from menubar");
      	resetMinusButtonState();
		// open an existing project
		openProject();
   	}
}));

var help = new gui.Menu();
win.menu.append(new gui.MenuItem({ label: 'Help', submenu: help }));

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

win.show();    

win.on("close", function () {
	console.log("window close handler");
	
    if (global.isServerRunning) {
        // if server is currently running, stop it before opening a new server instance
        setServerOffline();
    } else {
        win.close(true);
    }
	
	global.server.on("close", function(e) {
	    win.close(true);
	});
});
